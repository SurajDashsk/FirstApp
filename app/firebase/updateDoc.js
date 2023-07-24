import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import firebase_app from './config';

const db = getFirestore(firebase_app);
export default async function updateDocument(collectionName, id, data) {
  try {
    const docRef = doc(db, collectionName, id);

    // Get the existing document data
    const documentSnapshot = await getDoc(docRef);

    if (documentSnapshot.exists()) {
      // Merge the existing data with the new data
      const updatedData = { ...documentSnapshot.data(), ...data };
      // Update the document with the merged data
      await setDoc(docRef, updatedData);
      return true; // Indicate successful update
    } else {
      return false; // Document doesn't exist
    }
  } catch (err) {
    console.log('Err updating Doc: ', err);
  }
}
