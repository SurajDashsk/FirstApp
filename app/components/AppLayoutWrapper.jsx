'use client';
import React from 'react';
import useSidebarModal from '../hooks/useSidebarModal';
import Sidebar from './modals/Sidebar';
import Navbar from './navbar/Navbar';
import { usePathname } from 'next/navigation';
import { Toaster } from 'react-hot-toast';

const AppLayoutWrapper = ({ children }) => {
  const sidebarModal = useSidebarModal();
  const pathName = usePathname();

  return (
    <div className='relative'>
      {!pathName.includes('login') && <Navbar />}
      {!pathName.includes('login') && <Sidebar />}
      <Toaster />
      <div className={sidebarModal.isOpen ? 'ml-[15vw] p-6' : ''}>
        {children}
      </div>
    </div>
  );
};

export default AppLayoutWrapper;
