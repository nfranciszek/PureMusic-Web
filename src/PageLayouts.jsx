import React, { useEffect, useState } from 'react';
import { Flex, Image, Text, Box, ChakraProvider, HStack } from '@chakra-ui/react';
import { useBreakpointValue } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import NavigationTop from './Headers/NavigationTop';
import DashboardTop from './Headers/DashboardTop';
import BottomNav from './Footers/BottomNav';
import { useAnimation, motion } from 'framer-motion';
import theme from './Utilities/theme';
import { useData } from './App';
import { getAuth } from 'firebase/auth';
import VisitorMenu from './Headers/VisitorMenu';

import MenuDashboard from './Dashboards/MenuDashboard';

const PageLayouts = ({ children }) => {

  const auth = getAuth();
  const user = auth.currentUser;

  const { pathname } = useLocation();
  const includedWelcomePagePath = ['/'];
  const isBigScreen = useBreakpointValue({ base: false, md: true });
  const WelcomePagePath = includedWelcomePagePath.some((path) =>
    pathname.includes(path)
  );

  const isLargeScreen = useBreakpointValue({ base: false, sm: false, md: true, lg: true });
  const isMedSmallScreen = useBreakpointValue({ base: true, sm: true, md: false });
  const isSmallScreen = useBreakpointValue({ base: true, sm: false, md: false });

  const [showWelcome, setShowWelcome] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const {
    onTransferedPage, setOnTransferedPage,
    isDashboard, setIsDashboard, showMenuDashboard,
    visitorUserMenu, setVisitorUserMenu,
  } = useData();



  const dashboardPaths = [

    '/dashboard',

  ]
  const excludedPaths = [

    '/login',
    '/signup',
    '/signup/',
    '/signup/ambassador',
    '/signup/ambassador/',
    '/onboarding',
    '/account/getstarted',
    '/account/login',
    '/general',
    '/about',
    '/contact-us',
    '/company',
    '/help',
    '/terms-of-service',
    '/privacy-policy',
    '/community-guidelines',
    '/faqs',
    '/brand',
    '/legal',
    '/general/faqs/delete-account',
    '/social-reviews',
    '/prayersend',
    '/prayersend/privacy-policy',
    '/prayersend/terms',
    '/prayersend/profile',
    '/puremusic',
    '/puremusic/help',
    '/puremusic/privacy-policy',
    '/puremusic/terms',


  ];

  useEffect(() => {
    const currentUrl = window.location.href;

    console.log("video url = " + currentUrl)
    if (currentUrl.includes('video') || currentUrl.includes('promote') || currentUrl.includes('dashboard') || currentUrl.includes('signup')) {
      setOnTransferedPage(true); // Hide page cover for this specific page
    } else {
      setOnTransferedPage(false); // Show it for all other pages
    }
  }, []);

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


  useEffect(() => {




    if (!user) {


      setIsDashboard(false);
    } else {

      setIsDashboard(true);
    }


  }, [user]);

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


   const handleCloseComplete = () => {

        setVisitorUserMenu(false);
    };
  return (
    <Flex
      direction={user ? null : "column"}
      justifyContent={user ? null : "center"}
      alignItems={user ? null : "center"}
      bg="white"
      minH={user ? null : "100vh"} // Ensures full page height
      w={user ? null : "100vw"} // Ensures full page width
    >


        <>

{visitorUserMenu && (
                <VisitorMenu onCloseComplete={handleCloseComplete} />
            )}

{!visitorUserMenu && (
<>

          {!showMenuDashboard && (
            <>

              {isDashboard ? (
                <DashboardTop />
              ) : (
                <NavigationTop />
              )}
            </>
          )}



          {!excludedPaths.includes(pathname) && isLargeScreen && user && (
            <>
        
                <Box w={{ base: "70px", sm: "70px", md: "240px" }} pt="5rem" pl="30px">
                  <MenuDashboard />
                </Box>
         
            </>
          )}

{!excludedPaths.includes(pathname) && !isLargeScreen && user && showMenuDashboard && (
            <>
        
                <Box w={{ base: "70px", sm: "70px", md: "240px" }} pt="5rem" pl="30px">
                  <MenuDashboard />
                </Box>
         
            </>
          )}

{dashboardPaths.includes(pathname) && isLargeScreen && user && (
            <>
        
                <Box w={{ base: "70px", sm: "70px", md: "240px" }} pt="5rem" pl="30px">
                  <MenuDashboard />
                </Box>
         
            </>
          )}
    
          <Box
            flex={1} // Limits max width for proper centering
            // w="100%" // Ensures it takes the full available width
            pt="5rem"
            pb={isBigScreen ? "5rem" : "0rem"}
            w={(user) ? { base: "calc(100% - 70px)", md: "calc(100% - 640px)" } : null}
            mx="auto" // Centers horizontally
          >


            {children}
          </Box>

          {isBigScreen && !isDashboard && <BottomNav />}

</>
        )}


        </>

     
     
    </Flex>
  );
};

export default PageLayouts;

