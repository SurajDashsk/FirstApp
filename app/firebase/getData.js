import { getFirestore, collection, query, getDocs } from 'firebase/firestore';
import firebase_app from './config';

const db = getFirestore(firebase_app);
export default async function fetchDataFireStore(collectionName) {
  try {
    const dataRef = collection(db, collectionName);

    let q = query(dataRef);
    const docsSnap = await getDocs(q);

    const newDocs = docsSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    
    return { newDocs };
  } catch (err) {
    console.log('Err Fetching Data from firebase: ', err);
  }
}
