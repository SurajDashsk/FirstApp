import {
    getFirestore,
    collection,
    query,
    getDocs,
  } from 'firebase/firestore';
  import firebase_app from './config';
  
  const db = getFirestore(firebase_app);
  
  export default async function getChallengesGroupedByMapId() {
    try {
      const dataRef = collection(db, 'UserChallenge');
  
      // Query to fetch all documents in the collection
      let q = query(dataRef);
  
      const docsSnap = await getDocs(q);
  
      // Group documents by challenge.id and count the occurrences
      const groupedChallenges = docsSnap.docs.reduce((acc, doc) => {
        const challengeData = doc.data();
        const challengeId = challengeData.challenge?.id; // Get challenge.id
        const challengeName = challengeData.challenge?.title; // Get challenge.title
        const challengeDate = challengeData.challenge?.registrationDeadline.toDate().toLocaleDateString("en-US"); // Get challenge.registrationDeadline
        const challengePhoto = challengeData.challenge?.photo; // Get challenge.photo
  
        if (challengeId) {
          // If challengeId exists, increment the count for this challengeId
          if (!acc[challengeId]) {
            acc[challengeId] = { challenge: { id: challengeId, title: challengeName, date: challengeDate, photo: challengePhoto }, count: 0 };
          }
          acc[challengeId].count += 1; // Increment the count
        }
  
        return acc;
      }, {});
  
      // Convert the accumulator to an array of objects
      const result = Object.values(groupedChallenges);
  
      return result;
    } catch (err) {
      console.log('Error fetching data from Firebase: ', err);
    }
  }
  