'use client';
import React, { useEffect } from 'react';
import {
  Stack,
  Box,
  Text,
  Input,
  Tabs,
  TabPanels,
  Button,
  Flex,
} from '@chakra-ui/react';
import { FaChevronRight } from 'react-icons/fa';
import useSidebarModal from '../hooks/useSidebarModal';
import { useRouter } from 'next/navigation';

const Login = () => {
  const sidebarModal = useSidebarModal();
  const router = useRouter();

  useEffect(() => {
    sidebarModal.onClose();
  }, []);
  return (
    <Stack
      width='100vw'
      height='100vh'
      maxWidth='100%'
      background='#FAFAFA'
      align='center'
      className='ml-0'
    >
      <Box width='150px' height='50px' />
      <Box
        borderRadius='30px'
        width='556px'
        height='fit-content'
        background='#FFFFFF'
        boxShadow='1px 1px 35px 0px rgba(0, 0, 0, 0.25)'
        mx={0}
        padding={12}
      >
        <p className='welcomeBackText'>Welcome Back</p>
        <Stack
          width='inherit'
          padding={8}
          mt={'10'}
          spacing={4}
          align='start'
          justify={'center'}
        >
          <Input
            variant='flushed'
            placeholder='Email'
            className='emailInput'
            width='311px'
          />
          <Input
            variant='flushed'
            placeholder='Password'
            className='passwordInput'
            width='311px'
          />
        </Stack>

        <Stack spacing={4} mt={20} align='end' justify={'end'}>
          <p className='forgotPasswordText'>Forgot Password?</p>
          <Button
            mt={4}
            className='bg-primary text-white hover:bg-primary_hover'
            rightIcon={<FaChevronRight />}
            onClick={() => router.push('/home')}
          >
            Login
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Login;
