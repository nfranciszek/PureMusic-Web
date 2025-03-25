import React from 'react'
import theme from '../Utilities/fonts'
import { ChakraProvider, Image, Heading, VStack, Text, Spacer, Button } from '@chakra-ui/react'
import { usePageTitle } from '../Utilities/pageTitles'
import { Helmet } from 'react-helmet';
import BottomNav from '../Footers/BottomNav'
const Help = () => {
    usePageTitle("Help")
  return (

        <ChakraProvider theme={theme}>
        <VStack pt='6rem' px={{ base: '2rem', sm: '2rem', md: '4rem', lg: '14rem' }}>
    
    
    <Helmet>
            <title>{`Help PureMusic`}</title>
            <meta name="description" content="Help Center" />
            <meta charset="UTF-8" />
          </Helmet>
    
      
          <Heading mt="2rem">Help Center</Heading>
                        <Image src='/PureMusicLogo.jpeg' h={10} alt='Pure Music Logo'></Image>
    
    
    {/* Add your message here */}
    <Text mx="2rem" textAlign="center">
        If you have any questions or need help, click "Email Us" and you'll be able to contact us directly!
    </Text>
    {/* Button linking to Instagram */}
    <Button
        as="a"
        href="mailto:puremusic.us@gmail.com" // This will open the user's default email client
        target="_blank"
        bg="#06e4ed" // Custom background color
        color="white" // Custom text color
        size="lg"
        mt={4}
        _hover={{
            bg: "#04b6c3", // Darker background color on hover
            color: "white"  // White text color on hover
          }}
    >
        Email Us
    </Button>
    

    
    <Spacer mb="10rem" />
    <BottomNav />
    </VStack>
    </ChakraProvider>
    
    
    
     
      )
    }



export default Help