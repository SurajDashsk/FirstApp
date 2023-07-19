'use client';

import useSidebarModal from '@/app/hooks/useSidebarModal';
import { useRouter } from 'next/navigation';
import React from 'react';

const Sidebar = () => {
  const sidebarModal = useSidebarModal();
  const router = useRouter();

  return (
    sidebarModal.isOpen && (
      <div
        className='absolute w-[15vw] h-[87.5vh]'
      >
        <div className='flex flex-col justify-between shadow-2xl px-8 bg-white py-16 h-full w-full'>
          <div className='flex flex-col gap-4'>
            <h1 className='text-2xl mb-5'>Portal</h1>
            <h1
              className='text-2xl text-primary cursor-pointer'
              onClick={() => router.push('/')}
            >
              Home
            </h1>
            <h1
              className='text-2xl text-primary cursor-pointer'
              onClick={() => router.push('/users')}
            >
              Users
            </h1>
            <h1 className='text-2xl text-primary cursor-pointer'>Challenges</h1>
            <h1 className='text-2xl text-primary cursor-pointer'>Finances</h1>
            <h1 className='text-2xl text-primary cursor-pointer'>Statistics</h1>
          </div>

          <h1
            className='text-2xl text-primary self-center cursor-pointer'
            onClick={() => router.push('/login')}
          >
            Log out
          </h1>
        </div>
      </div>
    )
  );
};

export default Sidebar;
