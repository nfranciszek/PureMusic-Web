import React from 'react'
import { Text, Flex, Button, HStack, Box, Spacer, useBreakpointValue} from '@chakra-ui/react';
import { RxHamburgerMenu } from "react-icons/rx";

import { useNavigate } from 'react-router-dom';
import { useData } from '../App';
const DashboardTop = () => {
    const navigate = useNavigate();

    const { showMenuDashboard, setMenuDashboard } = useData();


    const resetAudioPosting = () => {
    
    }


  
    const showMenu = () => {
    
        setMenuDashboard(true);

    };

    const goToArtists = () => {
        navigate('/artists');


    };


    const goToAboutUs = () => {
        resetAudioPosting();

        navigate('/about');


    };

    const goToContactUs = () => {

        resetAudioPosting();
        navigate('/contact');


    };

    const isBaseOrSm = useBreakpointValue({ base: true, sm: true, md: false, lg: false, xl: false });


    return (
        <Box
            position="fixed"
            top="0"
            left="0"
            width="100%"
            bg="white"
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

             
<HStack ml="1rem" onClick={() => showMenu()}>
            <RxHamburgerMenu/>
                  <Text>Nathanael</Text>
                  </HStack>

                </Flex>

                <Spacer />

                <HStack >


                    <Flex gap={5}>




                    {!isBaseOrSm && (
                            <>

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
             






                                <Button
                                    width="full"
                                    onClick={goToAboutUs}
                                    size='sm'
                                    variant='ghost'
                                    fontSize="16px"
                                    fontWeight="normal"
                                    as='b'
                                    color="gray"
                                    _hover={{
                                        color: '#06e4ed', // White text color
                                        borderColor: 'white', // White border color
                                    }}
                                >
                                    About
                                </Button>


                                <Button
                                    width="full"
                                    onClick={goToContactUs}
                                    size='sm'
                                    variant='ghost'
                                    fontSize="16px"
                                    fontWeight="normal"
                                    as='b'
                                    color="gray"
                                    _hover={{
                                        color: '#06e4ed', // White text color
                                        borderColor: 'white', // White border color
                                    }}
                                >
                                    Contact
                                </Button>

                            </>
                        )}

                    </Flex>





                </HStack>

            </HStack>


        </Box>

    )

}

export default DashboardTop