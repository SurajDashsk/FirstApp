'use client';

import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import firebase_app from './firebase/config';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const Home = () => {
  const router = useRouter();
  const auth = getAuth(firebase_app);
  const [user, loading] = useAuthState(auth);

  if (user) {
    router.push(`${user ? '/home' : '/login'}`);
  }
};

export default Home;
