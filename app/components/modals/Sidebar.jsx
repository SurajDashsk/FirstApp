'use client';

import firebase_app from '@/app/firebase/config';
import useSidebarModal from '@/app/hooks/useSidebarModal';
import { getAuth } from 'firebase/auth';
import { useRouter, usePathname } from 'next/navigation';
import React from 'react';

const Sidebar = () => {
  const sidebarModal = useSidebarModal();
  const router = useRouter();
  const pathname = usePathname();
  const auth = getAuth(firebase_app);

  const signOut = () => {
    auth.signOut();
    router.push('/login');
  };

  return (
    sidebarModal.isOpen && (
      <div className={`w-[15vw] absolute h-[100%] min-h-[87vh]`}>
        <div className='flex flex-col justify-between shadow-2xl px-1 md:px-8 bg-white py-3 md:py-16 h-full w-full'>
          <div className='flex flex-col gap-4'>
            <h1 className='md:text-xl lg:text-2xl mb-2 md:mb-5'>Portal</h1>
            <h1
              className={`md:text-lg lg:text-2xl text-primary cursor-pointer ${
                pathname.includes('home') ? 'font-extrabold' : ''
              }`}
              onClick={() => router.push('/')}
            >
              Home
            </h1>
            <h1
              className={`md:text-lg lg:text-2xl text-primary cursor-pointer ${
                pathname.includes('users') ? 'font-extrabold' : ''
              }`}
              onClick={() => router.push('/users')}
            >
              Users
            </h1>
            <h1
              className={`md:text-lg lg:text-2xl text-primary cursor-pointer ${
                pathname.includes('challenges') ? 'font-extrabold' : ''
              }`}
              onClick={() => router.push('/challenges')}
            >
              Challenges
            </h1>
            <h1
              className={`md:text-lg lg:text-2xl text-primary cursor-pointer ${
                pathname.includes('finances') ? 'font-extrabold' : ''
              }`}
              onClick={() => router.push('/finances')}
            >
              Finances
            </h1>
            <h1
              className={`md:text-lg lg:text-2xl text-primary cursor-pointer ${
                pathname.includes('statistics') ? 'font-extrabold' : ''
              } `}
              onClick={() => router.push('/statistics')}
            >
              Statistics
            </h1>
          </div>

          <h1
            className='md:text-lg lg:text-2xl text-primary self-center cursor-pointer'
            onClick={signOut}
          >
            Log out
          </h1>
        </div>
      </div>
    )
  );
};

export default Sidebar;
