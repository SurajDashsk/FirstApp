'use client';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import firebase_app from '../firebase/config';

const RouteGuard = ({ children }) => {
  const auth = getAuth(firebase_app);
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);  // Update user state if authenticated
      } else {
        setUser(null);  // Set user to null if not authenticated
        router.push('/login');  // Redirect to login if no user
      }
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [auth, router]);

  if (user === null) {
    // Return null or a loading indicator while checking auth state
    return <div>Loading...</div>;
  }

  return children;
};

export default RouteGuard;
