'use client';
import { Flex, Stack } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import defaultProfileImage from '@/public/images/defaultProfileImage.svg'

const Navbar = () => {
  return (
    <Stack
      width='100vw'
      maxWidth='100%'
      background='#FAFAFA'
      align='center'
    >
      <Flex
        direction='row'
        width='100vw'
        height='90px'
        maxWidth='100%'
        background='#FFFFFF'
        alignItems="center"
        justifyContent="space-between"
        boxShadow='0px -6px 35px 0px rgba(0, 0, 0, 0.25)'
        paddingLeft={4}
        className='topNavBar z-50 px-10'
      >
        <img
          src='logo.png'
          className='logoImg'
          alt='Logo'
          width='50px'
          height='50px'
        />

        <div className='flex gap-2 justify-center items-center'>
          <p className='text-green font-semibold tracking-wider'>Jorge Ramos Putz</p>
          <Image alt='profile-image' src={defaultProfileImage} height={50} width={50} />
        </div>
      </Flex>
    </Stack>
  );
};

export default Navbar;
