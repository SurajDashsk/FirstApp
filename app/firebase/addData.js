import { getFirestore, doc, setDoc } from 'firebase/firestore';
import firebase_app from './config';

const db = getFirestore(firebase_app);
export default async function addData(collection, id, data) {
  let result = null;
  let error = null;

  const docRef = doc(db, collection, id);

  try {
    result = await setDoc(docRef, data, {
      merge: true,
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}
