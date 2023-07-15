//import { Button, Stack, Text } from '@chakra-ui/react'
//import React from 'react'


// const LoginPage = ({}) => {
//   return (
//     <Stack justifyContent={'center'} alignItems={'center'} className='h-screen w-screen' >
//         <Stack width={'xl'}>
//             <Text align={'center'}>Login Page</Text>
//             <Button>Login</Button>
//         </Stack>
//     </Stack>
//   )
// }

// export default LoginPage;


import { Box, Text } from '@chakra-ui/react'
import React from 'react'


export const App = () => (
  <Box>
    <Box
      borderRadius="30px"
      width="320px"
      height="424px"
      maxWidth="100%"
      background="#F5F5F5"
      boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
    />
    <Text
      fontFamily="Inter"
      fontWeight="semibold"
      fontSize="14px"
      color="#000000"
    >
      Password
    </Text>
    <Text fontFamily="Inter" fontWeight="bold" fontSize="24px" color="#0F5E2F">
      Welcome back
    </Text>
    <Text
      fontFamily="Inter"
      fontWeight="black"
      fontSize="11px"
      color="#000000"
      width="32px"
    >
      Login
    </Text>
    <span className="unsupported" />
    <Text
      fontFamily="Inter"
      fontWeight="semibold"
      fontSize="14px"
      color="#000000"
    >
      Email
    </Text>
    <span className="unsupported" />
    <span className="unsupported" />
    <Text
      fontFamily="Inter"
      fontWeight="semibold"
      fontSize="9px"
      color="#000000"
    >
      Forgot Password
    </Text>
    <Box borderRadius="70px" width="88px" height="42px" background="#0F5E2F" />
    <Text
      fontFamily="Inter"
      fontWeight="black"
      fontSize="15px"
      color="#F5F5F5"
      width="51px"
      textAlign="center"
    >
      Login
    </Text>
  </Box>
)





export default App;