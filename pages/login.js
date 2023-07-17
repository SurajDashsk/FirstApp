

import React from 'react'


import { Stack, Box, Text, Input, Tabs, TabPanels, Button, Flex } from '@chakra-ui/react'
import { FaChevronRight } from 'react-icons/fa';

export const App = () => (
  <Stack width="100vw" height="100vh" maxWidth="100%" background="#FAFAFA" align="center" >
    <Flex
      direction="row"
      width="100vw"
      height="90px"
      maxWidth="100%"
      background="#FFFFFF"
      boxShadow="0px -6px 35px 0px rgba(0, 0, 0, 0.25)"
      paddingLeft={4}
      className="topNavBar"
    >
        <img src="logo.png" className="logoImg" alt="Logo" width="50px" height="50px" />

    </Flex>
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
        <p className="welcomeBackText">Welcome Back</p>
        <Stack width="inherit" padding={8} mt={"10"} spacing={4} align="start" justify={"center"}>
            <Input variant='flushed' placeholder="Email" className="emailInput" width="311px" />
            <Input variant='flushed' placeholder="Password" className="passwordInput" width="311px" />
            
        </Stack>

        <Stack spacing={4} mt={20} align="end" justify={"end"}>
        <p className="forgotPasswordText">Forgot Password?</p>
        <Button mt={4} colorScheme='green' rightIcon={<FaChevronRight />}>Login</Button>
        </Stack>
    </Box>
    
  </Stack>
)






export default App;