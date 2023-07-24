'use client';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';
import firebase_app from '../firebase/config';

const RouteGuard = ({ children }) => {
  const auth = getAuth(firebase_app);
  const router = useRouter();
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    //else {
    //setAuthorized(true);
    //}

    // const preventAccess = () => setAuthorized(false);

    // router.events.on('routeChangeStart', preventAccess);
    // router.events.on('routeChangeComplete', authCheck);

    // return () => {
    //   router.events.off('routeChangeStart', preventAccess);
    //   router.events.off('routeChangeComplete', authCheck);
    // };
  }, [user]);

  return children;
};

export default RouteGuard;
