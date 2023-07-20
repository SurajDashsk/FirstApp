import React from 'react';

const ContainerBox = ({ className, children }) => {
  return <div className={`shadow-2xl bg-white rounded-lg p-6 w-full`}>{children}</div>;
};

export default ContainerBox;
