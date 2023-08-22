import addNewChallengeToUser from '@/app/firebase/addNewChallengeToUser';
import firebase_app from '@/app/firebase/config';
import fetchDataFireStore from '@/app/firebase/getData';
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

  // Check if Challenge exists
  const { result: searchedChallenge } = await getSingleDocById('Challenge', id);
  if (!searchedChallenge) {
    throw new Error('Challenge not exists');
  }

  // Check if user already has involed in this challenge
  const db = getFirestore(firebase_app);
  const parentDocRef = doc(db, 'User', body.userId);
  const nestedDocRef = doc(parentDocRef, 'User_challenges', id);

  const challengeAlreadyExists = (await getDoc(nestedDocRef)).data();
  if (challengeAlreadyExists) {
    throw new Error('Challenge Already Taken');
  }

  // Check if user has enough amount to join the challenge
  if (user.Credit <= challenge.Total_Buy_in) {
    throw new Error('Not enough credits');
  }

  // Check if status of challenge is active
  if (challenge.Status !== 'Active') {
    throw new Error('Challenge status not active');
  }

  // Create a new Collection in User Doc named User_Challenges with Challenge ID.
  const data = {
    Completion: false,
    Progress: null,
    Recovered: 0,
    Reward: null,
    Start_Day: 'Wed Jul 26',
    Task_executed: null,
    Tasks: null,
  };
  await addNewChallengeToUser(id, body.userId, data);

  //Deduct challenge amount from User
  await updateDocument('User', body.userId, {
    Credit: user.Credit - challenge.Total_Buy_in,
  });

  return NextResponse.json({
    success: true,
    message: `Challenge ${id} Added to User ${body.userId}`,
  });
}
