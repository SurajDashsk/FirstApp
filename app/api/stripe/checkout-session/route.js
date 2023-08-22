import firebase_app from '@/app/firebase/config';
import getSingleDocById from '@/app/firebase/getSingleDocById';
import updateDocument from '@/app/firebase/updateDoc';

import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
} from 'firebase/firestore';
import { NextResponse } from 'next/server';
import addData from '@/app/firebase/addData';
import initializeStripe from '@/app/stripe/initializeStripe';

export async function POST(req) {
  const body = await req.json();
  const db = getFirestore(firebase_app);
  const stripe = await initializeStripe();

  // get customer details
  const { result } = await getSingleDocById('User', body.userId);

  let stripeId;
  if (!result.stripeId) {
    const stripeCustomer = await stripe.customers.create({
      email: result.Email,
      name: result.First_Name,
    });
    stripeId = stripeCustomer.id;
    await updateDocument('User', body.userId, { stripeId });
    await addData('User', stripeCustomer.id, {
      stripeId,
      ...stripeCustomer,
    });
  } else {
    stripeId = result.stripeId;
  }

  let nestedData;
  try {
    // const product = await stripe.products.create({
    //   name: 'Add to Wallet',
    // });

    const price = await stripe.prices.create({
      currency: 'usd',
      custom_unit_amount: {
        enabled: true,
      },
      product: 'prod_OUZo5DmK90YlMw',
    });

    const createCheckoutSessionRef = await addDoc(
      collection(db, `User/${stripeId}/checkout_sessions`), // customer ID here later
      {
        payment_method_types: ['us_bank_account'],
        line_items: [
          {
            price: price.id,
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/challenges',
        cancel_url: 'http://localhost:3000/challenges',
      }
    );

    const search = async () => {
      const parentDocRef = doc(db, 'User', stripeId);
      const nestedDocRef = doc(
        parentDocRef,
        'checkout_sessions',
        createCheckoutSessionRef.id
      );

      const nestedDocSnapshot = await getDoc(nestedDocRef);
      nestedData = nestedDocSnapshot.data();
    };

    await search();

    while (!nestedData?.sessionId) {
      await search();
    }
  } catch (err) {
    console.log("Couldn't create a checkout session", err);
  }

  return NextResponse.json(
    { success: true, session: nestedData.sessionId },
    { status: 200 }
  );
}
