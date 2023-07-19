'use client';
import React from 'react';
import useSidebarModal from '../hooks/useSidebarModal';
import Sidebar from './modals/Sidebar';
import Navbar from './navbar/Navbar';

const AppLayoutWrapper = ({ children }) => {
  const sidebarModal = useSidebarModal();
  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className={sidebarModal.isOpen ? 'ml-[15vw] p-6' : ''}>
        {children}
      </div>
    </div>
  );
};

export default AppLayoutWrapper;
