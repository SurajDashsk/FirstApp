'use client';
import { Flex, Stack } from '@chakra-ui/react';
import React from 'react';

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
        boxShadow='0px -6px 35px 0px rgba(0, 0, 0, 0.25)'
        paddingLeft={4}
        className='topNavBar z-50'
      >
        <img
          src='logo.png'
          className='logoImg'
          alt='Logo'
          width='50px'
          height='50px'
        />
      </Flex>
    </Stack>
  );
};

export default Navbar;
