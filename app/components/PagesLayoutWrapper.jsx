'use client';
import React, { useEffect } from 'react';
import useSidebarModal from '../hooks/useSidebarModal';

const PagesLayoutWrapper = ({ children }) => {
  const sidebarModal = useSidebarModal();

  useEffect(() => {
    sidebarModal.onOpen();
  }, []);
  return <div className='h-[75vh] md:h-[76vh] xl:h-[81vh]'>{children}</div>;
};

export default PagesLayoutWrapper;
