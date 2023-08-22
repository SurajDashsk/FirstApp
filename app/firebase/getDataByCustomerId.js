import {
  getFirestore,
  collection,
  query,
  getDocs,
  where,
} from 'firebase/firestore';
import firebase_app from './config';

const db = getFirestore(firebase_app);
export default async function getUpcomingChallenges(customer_id) {
  try {
    const dataRef = collection(db, 'User');
    let q = query(dataRef, where('stripeId', '==', customer_id));
    const docsSnap = await getDocs(q);

    const user = docsSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { user };
  } catch (err) {
    console.log('Err Fetching Data from firebase: ', err);
  }
}
