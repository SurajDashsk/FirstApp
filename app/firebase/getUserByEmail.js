import {
  getFirestore,
  doc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
} from 'firebase/firestore';
import firebase_app from './config';

const db = getFirestore(firebase_app);
export default async function getUserByEmail(collectionName, email) {
  let docRef = collection(db, collectionName);
  const q = query(
    docRef,
    where('isAdmin', '==', true),
    where('Email', '==', email)
  );

  let result = null;
  let user = null;
  let error = null;

  try {
    const docsSnap = await getDocs(q);
    console.log(docsSnap);
    result = docsSnap?.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (result.length) {
      console.log(result);
      user = result[0];
    }
  } catch (e) {
    error = e;
  }

  return { user, error };
}
