import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Flex, VStack, Text, HStack,  Button, useBreakpointValue } from '@chakra-ui/react'


const BottomNav = () => {

    const navigate = useNavigate();


    const goToAboutUs = () => {
        navigate('/about');
    }
    
    const goToContactUs = () => {
        navigate('/contact');
    }
    
    const goToTermsOfService = () => {
        navigate('/terms-of-service');
    }
    
    const goToPrivacyPolicy = () => {
        navigate('/privacy-policy');
    }
    
    const goToHelp = () => {
        navigate('/help');
    }


  return (
    
    <Box
    position="fixed"
    bottom="0"
    left="0"
    width="100%"
    bg="white"
    // borderTop="0.1px solid #e4e4e4"
    transition="transform 0.3s ease"
    zIndex="1"
    pt="8px"
    pb="8px"
    display="flex"       
    justifyContent="center" 
    
>

   
<VStack>
    <HStack
    >

        <Flex gap={5} justifyContent="center"> 
           

           
                    <Button
                        width="full"
                        onClick={goToAboutUs}
                        size='sm'
                        variant='ghost'
                        fontSize="12px"
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
                        fontSize="12px"
                        color="gray"
                        fontWeight="normal"
                        as='b'
                        _hover={{
                            color: '#06e4ed', // White text color
                            borderColor: 'white', // White border color
                        }}
                    >
                        Contact
                    </Button> 

                    <Button
                        width="full"
                        onClick={goToHelp}
                        size='sm'
                        pl="3rem"
                        pr="3rem"
                        variant='ghost'
                        fontSize="12px"
                        fontWeight="normal"
                        as='b'
                        color="gray"
                        _hover={{
                            color: '#06e4ed', // White text color
                            borderColor: 'white', // White border color
                        }}
                    >
                        Help
                    </Button> 

                    <Button
                        width="full"
                        onClick={goToTermsOfService}
                        size='sm'
                        variant='ghost'
                        fontSize="12px"
                        fontWeight="normal"
                        as='b'
                        color="gray"
                        _hover={{
                            color: '#06e4ed', // White text color
                            borderColor: 'white', // White border color
                        }}
                    >
                        Terms
                    </Button> 


                    <Button
                        width="full"
                        onClick={goToPrivacyPolicy}
                        size='sm'
                        variant='ghost'
                        fontSize="12px"
                        fontWeight="normal"
                        as='b'
                        color="gray"
                        _hover={{
                            color: '#06e4ed', // White text color
                            borderColor: 'white', // White border color
                        }}
                    >
                        Privacy Policy
                    </Button> 

           
        
        </Flex>
    </HStack>
    <Text  fontSize="10px"
                        color="gray">© {new Date().getFullYear()} PureMusic from YenZek</Text>
    </VStack>
</Box>

  )
}

export default BottomNav