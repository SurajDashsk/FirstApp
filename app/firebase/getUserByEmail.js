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
export default async function getUserByEmail(email) {
  let docRef = collection(db, 'User');
  const q = query(
    docRef,
    where('isAdmin', '==', true),
    where('email', '==', email)
  );

  let result = null;
  let user = null;
  let error = null;

  try {
    const docsSnap = await getDocs(q);
    result = docsSnap?.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (result.length) {
      user = result[0];
    }
  } catch (e) {
    console.log(error);
    error = e;
  }

  return { user, error };
}
