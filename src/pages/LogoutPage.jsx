import React from 'react'
import { VStack, Heading, Spacer, HStack, Text, Box, Button, Image, ChakraProvider, useBreakpointValue } from '@chakra-ui/react'
import theme from '../Utilities/theme'
import { useData } from '../App'
import { useNavigate } from 'react-router-dom'
import useLogout from './AuthPages/useLogout'
import BottomNav from '../Footers/BottomNav'
import { usePageTitle } from '../Utilities/pageTitles'
import { Helmet } from 'react-helmet';


const LogoutPage = () => {
    const isBaseScreen = useBreakpointValue({ base: true, sm: false, md: false });


    const navigate = useNavigate();
    const {
        setShowPayoutDetails,
        setHomeSelected,
        setShareQRSelected,
        setPayoutDetailsSelected,
        setHelpSelected,
        setLogoutPageSelected,
        setMenuDashboard,

    } = useData();

    const { handleLogout } = useLogout();

    const goBackToDashboard = async () => {

        setHomeSelected(true);
        setShareQRSelected(false);
        setPayoutDetailsSelected(false);
        setShowPayoutDetails(false);

        setMenuDashboard(false);

        setHelpSelected(false);

        navigate("/dashboard");


        setLogoutPageSelected(false);
    }

    const logoutUser = async () => {
        await handleLogout();
    }

  

        usePageTitle("Help")
    
      return (
    
            <ChakraProvider theme={theme}>
            <VStack pt={isBaseScreen ? "2rem" : '6rem'} px={{ base: '2rem', sm: '2rem', md: '4rem', lg: '14rem' }}>
        
      
        
          
           
    
                    <Text fontSize="lg" fontWeight="500" textColor="gray.700" textAlign="center">Log out of PureMusic?</Text>
    
   
                    <Box>
                        <Image
                            src="/PureMusicLogo.jpeg"
                            borderRadius='full'
                            width="60px"
                            maxH="50px"
                            className="profile-image-circle"
                            alt='puremusic logo'
    
                        />
                    </Box>
                    <HStack>
                        <Button
    
                            onClick={() => logoutUser()}
                            size="md"
                            bg="white"
                            color="#05c7d0" // Website color for text
                            border="2px solid #05c7d0" // Border to match the website color
                            px={{ base: "1rem", sm: "1.5rem", md: "2rem" }}
                            _hover={{
                                bg: "#05c7d0", // Button background turns to website color on hover
                                color: "white", // White text when hovering
                                borderColor: "#06e4ed", // Keep border color same as background color
                                transform: "scale(1.05)", // Slightly grow button on hover
                                transition: "0.3s ease", // Smooth transition for hover effect
                            }}
                            _active={{
                                transform: "scale(1.02)", // Slight scale on click
                                boxShadow: "none", // Remove shadow on active state
                            }}
                            _focus={{
                                outline: "none", // Remove outline on focus
                            }}>Yes</Button>
    
    
    
                        <Button
                            onClick={() => goBackToDashboard()}
                            variant="outline"
                            size="md"
                            bg="white"
                            color="#05c7d0" // Website color for text
                            border="2px solid #05c7d0" // Border to match the website color
                            px={{ base: "1rem", sm: "1.5rem", md: "2rem" }}
                            _hover={{
                                bg: "#05c7d0", // Button background turns to website color on hover
                                color: "white", // White text when hovering
                                borderColor: "#06e4ed", // Keep border color same as background color
                                transform: "scale(1.05)", // Slightly grow button on hover
                                transition: "0.3s ease", // Smooth transition for hover effect
                            }}
                            _active={{
                                transform: "scale(1.02)", // Slight scale on click
                                boxShadow: "none", // Remove shadow on active state
                            }}
                            _focus={{
                                outline: "none", // Remove outline on focus
                            }}
                        >No</Button>
                    </HStack>
        
        {/* Add your message here */}
        <Text mx="2rem" textAlign="center" textColor="white">
            If you have any questions or need help, click "Email Us" and you'll be able to contact us directly!
        </Text>
   
        
    
        
        <Spacer mb="10rem" />
        <BottomNav />
        </VStack>
        </ChakraProvider>
        
        
        
         
          )
        }
    

export default LogoutPage