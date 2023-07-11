import { Button, Stack, Text } from '@chakra-ui/react'
import React from 'react'


const LoginPage = ({}) => {
  return (
    <Stack justifyContent={'center'} alignItems={'center'} className='h-screen w-screen' >
        <Stack width={'xl'}>
            <Text align={'center'}>Login Page</Text>
            <Button>Login</Button>
        </Stack>
    </Stack>
  )
}

export default LoginPage;