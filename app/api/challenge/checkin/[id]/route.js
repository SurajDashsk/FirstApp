import firebase_app from '@/app/firebase/config';
import getSingleDocById from '@/app/firebase/getSingleDocById';
import updateDocument from '@/app/firebase/updateDoc';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function POST(request, { params }) {
  const id = params.id;
  const body = await request.json();

  // fetch Challenge and user from firebase.
  const { result: user } = await getSingleDocById('User', body.userId);

  const { result: challenge } = await getSingleDocById('Challenge', id);

  // Check if status of challenge is active
  if (challenge.Status !== 'Active') {
    throw new Error('Challenge status not active');
  }

  // Check the start date of challenge

  // Check if user has this challenge in User_Challenge
  const db = getFirestore(firebase_app);
  const parentDocRef = doc(db, 'User', body.userId);
  const nestedDocRef = doc(parentDocRef, 'User_challenges', id);

  const challengeAlreadyExists = (await getDoc(nestedDocRef)).data();
  if (!challengeAlreadyExists) {
    throw new Error('User does not have this challenge Taken');
  }

  if (challengeAlreadyExists.Recovered >= challenge.Check_ins) {
    throw new Error('Challenge Already Completed!');
  }

  // Addition of User Progress in Challenge
  await updateDocument(`User/${body.userId}/User_challenges`, id, {
    Recovered: challengeAlreadyExists.Recovered + 1,
    Reward: challengeAlreadyExists.Reward + challenge.Daily_Buy_in,
  });

  // Add the daily-checkin amount of the challenge back to the User Credit
  await updateDocument('User', body.userId, {
    Credit: user.Credit + challenge.Daily_Buy_in,
  });

  return NextResponse.json({
    success: true,
    message: 'Succesfully Checked in',
  });
}
