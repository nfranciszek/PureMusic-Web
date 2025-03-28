import React from 'react'
import { Box, Link, Flex, Image, VStack, HStack, Spacer, Button, Text, useBreakpointValue } from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom'


const BottomLoginSignUp = ({ onSignUp, onLogin }) => {
    const { pathname } = useLocation();

 

    const includedSignupPaths = [
        '/signup',

    ];


    const isSignUpPathIncluded = includedSignupPaths.some(path => pathname.includes(path));


    const includedLoginPaths = [
        '/account/login',

    ];

    const sendToLogin = () => {
        onLogin();
      
  
      }

      const sendToSignUp = () => {

        onSignUp();
        //setShowSecondStepSignUp(false);
       // setShowThirdStepSignUp(false);
 
      }


    const isLoginPathIncluded = includedLoginPaths.some(path => pathname.includes(path));


    return (
        <Box
            position="fixed"
            bottom="0"
            justifyContent="center" // Center children horizontally
            left="0"
            width="100%"
            bg="white"
            borderTop="1px solid #e4e4e4"
            transition="transform 0.3s ease"
            // transform={isOpen ? 'translateY(0)' : 'translateY(100%)'}
            zIndex="1"
            pt="5px"
            pb="5px"
        >



            <HStack
                pl={['1rem', '6rem', '9rem']} // Responsive padding left
                pr={['1rem', '6rem', '9rem']} // Responsive padding right
                justifyContent="center" // Center children horizontally
            >
                <Flex flexDirection="row" alignItems="center" justifyItems="center">

                    {isLoginPathIncluded && (
                        <Text textAlign="center" fontSize={14}>
                            {"Don't have an account? "}
                            <Link color="blue.500" fontSize="inherit" onClick={sendToSignUp}>
                                {"Sign up"}
                            </Link>
                        </Text>
                    )}



                    {isSignUpPathIncluded && (
                        <Text textAlign="center" fontSize={14}>
                            {"Have an account? "}
                            <Link color="blue.500" fontSize="inherit" onClick={sendToLogin}>
                                {"Log in"}
                            </Link>
                        </Text>
                    )}




                </Flex>

            </HStack>


        </Box>
    )

}

export default BottomLoginSignUp