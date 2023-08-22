import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import getDataByCustomerId from '@/app/firebase/getDataByCustomerId';
import updateDocument from '@/app/firebase/updateDoc';
import initializeStripe from '@/app/stripe/initializeStripe';

const stripe = await initializeStripe();

const addFunds = async (event) => {
  try {
    const customer_id = event.data.object.customer;
    const newCredits = event.data.object.amount / 100;

    const { user } = await getDataByCustomerId(customer_id);

    const creditsToAdd = newCredits + user[0].Credit;

    await updateDocument('User', user[0].id, { Credit: creditsToAdd });
  } catch (err) {
    console.log('Error adding credit', err);
  }
};

export async function POST(req) {
  const buf = await req.text();
  const headersList = headers();
  const sig = headersList.get('stripe-signature');

  let event;
  const endpointSecret = 'whsec_PaFXB7p7lgz7LTSlUFihnrtL2t3IEsax';

  try {
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err) {
    console.log(err.message);
    return NextResponse.json(
      {
        message: `Webhook Error: ${err.message}`,
      },
      {
        status: 400,
      }
    );
  }

  try {
    switch (event.type) {
      // case 'invoice.paid':
      //   addFunds(event);
      //   // Handle successful payment
      //   break;
      case 'payment_intent.succeeded':
        addFunds(event);
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error handling webhook:', error);
    return NextResponse.json('An error occurred while handling the webhook.');
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
