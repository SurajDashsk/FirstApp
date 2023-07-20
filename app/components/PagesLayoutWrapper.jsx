'use client';
import React, { useEffect } from 'react';
import useSidebarModal from '../hooks/useSidebarModal';

const PagesLayoutWrapper = ({ children }) => {
  const sidebarModal = useSidebarModal();

  useEffect(() => {
    sidebarModal.onOpen();
  }, []);
  return <div>{children}</div>;
};

export default PagesLayoutWrapper;
