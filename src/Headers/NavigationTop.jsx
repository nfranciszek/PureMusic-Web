import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";
import { Box, Flex, Image, HStack, Spacer, Button } from '@chakra-ui/react'
import { useBreakpointValue } from '@chakra-ui/react';
import { getAuth } from 'firebase/auth';
import { useData } from '../App';

const NavigationTop = () => {

    const auth = getAuth();
    const user = auth.currentUser;

    const navigate = useNavigate();


  const { visitorUserMenu, setVisitorUserMenu } = useData();


    const goToHome = () => {

        navigate('/');

    };

    const goToArtists = () => {
        navigate('/artists');


    };


    const goToLogin = () => {

        navigate('/account/login');

    };

    const goToSignUp = () => {

        navigate('/signup');

    }

    const showMenu = () => {

        setVisitorUserMenu(true);
    
      };

    const isBaseOrSm = useBreakpointValue({ base: true, sm: true, md: false, lg: false, xl: false });





    return (
        <Box
            position="fixed"
            top="0"
            left="0"
            width="100%"
            bg="white"
            borderBottom="0.2px solid #e4e4e4"
            transition="transform 0.3s ease"
            // transform={isOpen ? 'translateY(0)' : 'translateY(100%)'}
            zIndex="1"
            pt="5px"
            pb="5px"
        >




            <HStack
                // Responsive padding left
                pr={['12px', '12px', '12px', '3rem']} // Responsive padding right
            >
                <Flex flexDirection="row" alignItems="center">



                    <Image
                        src="/PureMusicLogoName.png"
                        alt="PureMusic Logo"
                        maxH="70px"
                        ml="12px"
                        onClick={goToHome}

                    />


                </Flex>

                <Spacer />

                <HStack >


                    <Flex gap={5}>





                        <Button
                            width="full"
                            onClick={goToArtists}
                            size='sm'
                            variant='ghost'
                            fontSize="16px"
                            fontWeight="normal"
                            mr={!isBaseOrSm ? "1rem" : null}
                            as='b'
                            color="gray"
                            _hover={{
                                color: '#06e4ed', // White text color
                                borderColor: 'white', // White border color
                            }}
                        >
                            Artists
                        </Button>


                        {isBaseOrSm && !user && (

                            <HStack mr="1rem" onClick={() => showMenu()} gap={3}  _hover={{
                                color: '#06e4ed', // White text color
                                borderColor: 'white', // White border color
                            }}>
                                <RxHamburgerMenu size='20px' />
                            </HStack>

                        )}

                        {!isBaseOrSm && !user && (
                            <>


                                <Button
                                    width="full"
                                    onClick={goToLogin}

                                    size='sm'
                                    bg="#06e4ed"
                                    color="white"
                                    px={{ base: '1rem', sm: '1.5rem', md: '2rem' }}
                                    _hover={{
                                        bg: '#05c7d0', // Semi-transparent gray background
                                        color: 'white', // White text color
                                        borderColor: 'white', // White border color
                                    }}
                                >
                                    Log in
                                </Button>



                                <Button
                                    variant="outline"
                                    width="full"
                                    size='sm'
                                    onClick={goToSignUp}
                                    bg="transparent"
                                    color="#06e4ed"
                                    px={{ base: '1rem', sm: '1.5rem', md: '2rem' }}
                                    _hover={{
                                        bg: 'white',
                                        color: '#05c7d0',
                                        outline: 'none', // Remove the outline on hover
                                        borderColor: '#06e4ed'

                                    }}

                                >
                                    Sign Up
                                </Button>

                            </>
                        )}



                    </Flex>





                </HStack>

            </HStack>


        </Box>

    )
}

export default NavigationTop