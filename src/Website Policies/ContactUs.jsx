import React from 'react'
import { VStack, Flex, ChakraProvider, Heading, Button, Spacer, Text, Image } from '@chakra-ui/react'
import { usePageTitle } from '../Utilities/pageTitles';
import { Helmet } from 'react-helmet';
import theme from '../Utilities/fonts';
import BottomNav from '../Footers/BottomNav';


const ContactUs = () => {





  usePageTitle("Contact Us")
  return (


<ChakraProvider theme={theme}>
<VStack pt='6rem' px={{ base: '2rem', sm: '2rem', md: '4rem', lg: '14rem' }}>


<Helmet>
    <title>{`Contact PureMusic`}</title>
    <meta name="description" content="Contact us. We'd love to hear from you." />
    <meta charset="UTF-8" />
  </Helmet>
  <Flex
  flexDirection="column"
  alignItems="center"
  justifyContent="center">
  <Heading mt="2rem">Contact Us</Heading>
                <Image src='/PureMusicLogo.jpeg'    width="70px"
        maxH="50px" alt='Pure Music Logo'></Image>
  
  
  {/* Add your message here */}
  <Text mx="2rem" textAlign="center">
If you would like to contact us directly, click the button below!
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
Contact Us
</Button>
</Flex>
  
  
  <Spacer mb="10rem" />
  <BottomNav />
  </VStack>
  </ChakraProvider>





 
  )
}

export default ContactUs


