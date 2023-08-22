import { getFirestore, doc, getDoc } from 'firebase/firestore';
import firebase_app from './config';

const db = getFirestore(firebase_app);
export default async function getSingleDocById(collection, id) {
  let docRef = doc(db, collection, id);

  let result = null;
  let error = null;

  try {
    result = (await getDoc(docRef)).data();
  } catch (e) {
    error = e;
  }

  return { result, error };
}
