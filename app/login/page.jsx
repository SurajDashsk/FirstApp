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
      justify="center"  // Added to center the content vertically
      className="ml-0"
    >
      <Box width="100%" maxWidth="400px" p={4} mb={4}> {/* Adjust for mobile */}
        <Box
          borderRadius="30px"
          background="#FFFFFF"
          boxShadow="1px 1px 35px 0px rgba(0, 0, 0, 0.25)"
          padding={6}
          width="100%"
        >
          {/* Container for Welcome Back text and logo */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <Stack
              direction="row"  // Keep Stack children (logo + text) in a row
              spacing={4}
              align="center"
              justify="center"  // Center content on mobile
            >
              <img
                src="logo.png"
                className="logoImg"
                alt="Logo"
                width="40px"  // Reduce size on mobile
                height="40px"
              />
              <p className="welcomeBackText" style={{ marginRight: '10px', fontSize: '20px' }}>Welcome Back</p>
            </Stack>
          </div>

          <Stack
            width="100%"
            padding={8}
            mt="6"
            spacing={4}
            align="start"
            justify="center"
            direction="column"
          >
            <Input
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              variant="flushed"
              placeholder="Email"
              className="emailInput"
              disabled={isLoading}
              width="80%"  // Make it full-width on mobile
            />
            <Input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              variant="flushed"
              placeholder="Password"
              className="passwordInput"
              disabled={isLoading}
              width="80%"  // Make it full-width on mobile
            />
          </Stack>

          <Stack spacing={4} mt={6} align="center" justify="center">
            <p className="forgotPasswordText">Forgot Password?</p>
            <Button
              mt={4}
              className="bg-primary text-white hover:bg-primary_hover"
              rightIcon={<FaChevronRight />}
              onClick={signIn}
              width="80%"  // Full width button on mobile
            >
              Login
            </Button>
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
};

export default Login;
