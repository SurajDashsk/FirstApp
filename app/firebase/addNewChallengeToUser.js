import { getFirestore, doc, setDoc } from 'firebase/firestore';
import firebase_app from './config';

const db = getFirestore(firebase_app);
export default async function addNewChallengeToUser(challengeId, userId, data) {
  let result = null;
  try {
    const docRef = doc(db, `User/${userId}/User_challenges`, challengeId);

    result = await setDoc(docRef, data, {
      merge: true,
    });
  } catch (err) {
    console.log(err);
  }

  return result;
}
