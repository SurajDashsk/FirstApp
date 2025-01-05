'use client';

import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import firebase_app from './firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';

// Simple spinner CSS class
const spinnerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',  // Full viewport height
};

const Home = () => {
  const router = useRouter();
  const auth = getAuth(firebase_app);
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push('/home');
      } else {
        router.push('/login');
      }
    }
  }, [user, loading, router]);

  return (
    <div>
      {loading ? (
        <div style={spinnerStyle}>
          <div className="spinner"></div>
        </div>
      ) : null}

      <style jsx>{`
        .spinner {
          border: 4px solid rgba(255, 255, 255, 0.3); /* Light border */
          border-top: 4px solid #3498db; /* Blue top border */
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
