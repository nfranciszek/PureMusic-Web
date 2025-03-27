import React, { useEffect, useState } from 'react';
import { Flex, Image, Text, Box, ChakraProvider } from '@chakra-ui/react';
import { useBreakpointValue } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import NavigationTop from './Headers/NavigationTop';
import BottomNav from './Footers/BottomNav';
import { useAnimation, motion } from 'framer-motion';
import theme from './Utilities/theme';

const PageLayouts = ({ children }) => {
  const { pathname } = useLocation();
  const includedWelcomePagePath = ['/'];
  const isBigScreen = useBreakpointValue({ base: false, md: true });
  const WelcomePagePath = includedWelcomePagePath.some((path) =>
    pathname.includes(path)
  );

  const [showWelcome, setShowWelcome] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (WelcomePagePath) {
      setIsVisible(true);

      // Switch to the second slogan after a short delay
      setTimeout(() => {
        setShowWelcome(false); // Switch to second slogan

        // Hide the component after a delay
        setTimeout(() => {
          setIsVisible(false); // Hide component after second slogan
        }, 3000); // Delay before hiding the second slogan
      }, 2000); // Wait 2 seconds before switching to the second slogan
    }
  }, [WelcomePagePath]);

  const CenteredContent = () => (
    <ChakraProvider theme={theme}>
    <Flex
      direction="column"
      align="center"
      justify="center"
      height="100vh"
      width="100vw"
    >
      <Image
        src="/PureMusicLogo.jpeg"
        alt="Logo"
        width="220px"
        maxH="200px"
        mb={4}
      />
      
      {/* Text transition */}
      {showWelcome ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showWelcome ? 1 : 0 }}
          transition={{ duration: 2, ease: 'easeInOut' }} // Slow fade-in and fade-out for both
        >
          <Text fontSize="lg" textAlign="center" mx="2rem">
            Welcome to PureMusic
          </Text>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showWelcome ? 0 : 1 }}
          transition={{ duration: 4, ease: 'easeInOut' }} // Same slow fade-out duration
        >
          <Text fontSize="lg" textAlign="center" mx="2rem">
            Experience Musical Movies & Live Music Like Never Before
          </Text>
        </motion.div>
      )}
    </Flex>
    </ChakraProvider>
  );
  

  return (
    <Flex
    direction="column"
    justifyContent="center"
    alignItems="center"
    bg="white"
    minH="100vh" // Ensures full page height
    w="100vw" // Ensures full page width
  >

      {isVisible ? (
        <CenteredContent />
      ) : (
        <>
          <NavigationTop />
          <Box
               flex={1} // Limits max width for proper centering
               w="100%" // Ensures it takes the full available width
               pt="5rem"
               pb={isBigScreen ? "5rem" : "0rem"}
               mx="auto" // Centers horizontally
          >
            {children}
          </Box>
          {isBigScreen && <BottomNav />}
        </>
      )}
    </Flex>
  );
};

export default PageLayouts;

   