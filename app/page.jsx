'use client';

import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import firebase_app from './firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';

const Home = () => {
  const router = useRouter();
  const auth = getAuth(firebase_app);
  const [user, loading] = useAuthState(auth);

  router.push(`${user ? '/home' : '/login'}`);
};

export default Home;
