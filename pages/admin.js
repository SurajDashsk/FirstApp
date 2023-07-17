

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

    {/* Write code here */}
    
    
  </Stack>
)






export default App;