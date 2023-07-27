import {
  getFirestore,
  collection,
  query,
  getDocs,
  where,
} from 'firebase/firestore';
import firebase_app from './config';
import moment from 'moment';

const db = getFirestore(firebase_app);
export default async function getUpcomingChallenges() {
  try {
    const dataRef = collection(db, 'Challenge');
    const currentDate = moment().toDate();
    let q = query(dataRef, where('startDate', '>=', currentDate));
    const docsSnap = await getDocs(q);

    const upcomingChallenges = docsSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { upcomingChallenges };
  } catch (err) {
    console.log('Err Fetching Data from firebase: ', err);
  }
}
