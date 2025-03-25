import React, { useEffect, useState } from 'react';
import { Flex, Image, Text, Box } from '@chakra-ui/react';
import { useBreakpointValue } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import NavigationTop from './Headers/NavigationTop';
import BottomNav from './Footers/BottomNav';
import { useAnimation, motion } from 'framer-motion';

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
            Welcome to Pure Music
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
  );
  

  return (
    <Flex
      direction={isVisible ? 'column' : ''}
      justifyContent='center' 
      alignItems={isVisible ? 'center' : ''}
      bg={isVisible ? 'white' : 'transparent'} // Set background to transparent when not visible
    >
      {isVisible ? (
        <CenteredContent />
      ) : (
        <>
          <NavigationTop />
          <Box
            flex={1}
            w={{ base: 'calc(100% - 70px)', md: 'calc(100% - 240px)' }}
            pt="6rem"
            pb={isBigScreen ? '6rem' : '0rem'}
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

   