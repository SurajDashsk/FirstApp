import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import firebase_app from './config';

const db = getFirestore(firebase_app);

export default async function getAppNumbers() {
  try {
    const userCollectionRef = collection(db, 'User');
    const snapshot = await getDocs(userCollectionRef);
    const users = snapshot.docs.map(doc => doc.data());

    // Calculate app numbers
    const totalUsersCount = users.length;
    const subscribedUsersCount = users.filter(user => user.isPlusSubscribed === true).length;
    const totalAge = users.reduce((acc, user) => acc + (user.age || 0), 0);
    const averageAge = totalUsersCount > 0 ? totalAge / totalUsersCount : 0;

    return {
      totalUsers: totalUsersCount,
      subscriptions: subscribedUsersCount,
      averageAge: averageAge.toFixed(1), // Round to 1 decimal point
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}

