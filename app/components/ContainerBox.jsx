import React from 'react';
import { twMerge } from "tailwind-merge";

const ContainerBox = ({ className, children }) => {
  return <div className={twMerge('shadow-2xl bg-white rounded-lg p-6 w-full', className)}>{children}</div>;
};

export default ContainerBox;
