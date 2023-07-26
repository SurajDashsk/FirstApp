import React from 'react';
import { twMerge } from 'tailwind-merge';

const Button = ({ title, className, onClick }) => {
  return (
    <div
      className={twMerge(
        'p-2 bg-primary hover:bg-primary_hover rounded-3xl text-center text-white cursor-pointer flex items-center justify-center',
        className
      )}
      onClick={onClick}
    >
      {title}
    </div>
  );
};

export default Button;
