import React from 'react'
import { VStack, Center, Flex, Image, Text } from '@chakra-ui/react'
const WelcomePage = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      height="100vh"
      width="100vw"
    >
      <Image
        src="/PureMusicLogo.jpeg"
        alt="Pure Music Logo"
        maxH="70px"
        mb="3rem"
      />
      <Text>Welcome to Pure Music</Text>
    </Flex>
  );
};

export default WelcomePage