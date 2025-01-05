'use client';
import React, { useEffect, useState } from 'react';
import { Stack, Box, Input, Button } from '@chakra-ui/react';
import { FaChevronRight } from 'react-icons/fa';
import useSidebarModal from '../hooks/useSidebarModal';
import { useRouter } from 'next/navigation';
import firebase_app from '../firebase/config';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import getUserByEmail from '../firebase/getUserByEmail';

console.log(firebase_app);

const Login = () => {
  const sidebarModal = useSidebarModal();
  const router = useRouter();
  const auth = getAuth(firebase_app);

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    sidebarModal.onClose();
  }, []);

  const signIn = async () => {
    try {
      setIsLoading(true);

      //await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

      const response = await signInWithEmailAndPassword(auth, email, password);

      if (response) {
        const { user } = await getUserByEmail(email);

        if (user) {
          toast.success('Logged in Successfully');
          router.push('/home');
        } else {
          toast.error('Not Authorized.');
        }
      }

      setIsLoading(false);
    } catch (e) {
      toast.error('Log in Failed');
      setIsLoading(false);
      console.log('error is', e);
    }
  };

  return (
    <Stack
      width="100vw"
      height="100vh"
      maxWidth="100%"
      background="#FAFAFA"
      align="center"
      className="ml-0"
    >
      <Box width="150px" height="50px" />
      <Box
        borderRadius="30px"
        width="556px"
        height="fit-content"
        background="#FFFFFF"
        boxShadow="1px 1px 35px 0px rgba(0, 0, 0, 0.25)"
        mx={0}
        padding={12}
      >
        {/* Container for Welcome Back text and logo */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <Stack
            direction="row"  // Make Stack children (image) display in a row
            spacing={4}
            align="center"
          >
            <img
              src="logo.png"
              className="logoImg"
              alt="Logo"
              width="50px"
              height="50px"
            />
            <p className="welcomeBackText" style={{ marginRight: '10px' }}>Welcome Back</p>
          </Stack>
        </div>

        <Stack width="inherit" padding={8} mt="10" spacing={4} align="start" justify="center">
          <Input
            id="email"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            variant="flushed"
            placeholder="Email"
            className="emailInput"
            disabled={isLoading}
            width="311px"
          />
          <Input
            id="password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            variant="flushed"
            placeholder="Password"
            className="passwordInput"
            disabled={isLoading}
            width="311px"
          />
        </Stack>

        <Stack spacing={4} mt={20} align="end" justify="end">
          <p className="forgotPasswordText">Forgot Password?</p>
          <Button
            mt={4}
            className="bg-primary text-white hover:bg-primary_hover"
            rightIcon={<FaChevronRight />}
            onClick={signIn}
          >
            Login
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Login;
