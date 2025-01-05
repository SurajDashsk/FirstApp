import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import firebase_app from './config';

const db = getFirestore(firebase_app);

export default async function getActiveUserChallengeCount() {
  let result = null;
  let error = null;

  try {
    // Define the query to filter documents in the "UserChallenge" collection
    const challengesQuery = query(
      collection(db, "UserChallenge"),
      where("state", "in", ["inProgress", "notStarted"])
    );

    // Execute the query
    const querySnapshot = await getDocs(challengesQuery);

    // Get the count of documents
    result = querySnapshot.size;  // `size` will give the count of documents in the query snapshot
  } catch (e) {
    error = e;
  }

  return { result, error };
}