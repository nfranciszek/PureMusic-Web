import React, { useEffect } from 'react';
import theme from '../Utilities/theme';
import { VStack, Image, Flex, UnorderedList, ListItem, Heading, Text, Spacer, ChakraProvider} from '@chakra-ui/react'
import BottomNav from '../Footers/BottomNav';
import { usePageTitle } from '../Utilities/pageTitles';
import { Helmet } from 'react-helmet';
const AboutUs = () => {

  usePageTitle("About Us")
  
  useEffect(() => {
    // Scroll to the top of the page when the component loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <ChakraProvider theme={theme}>
       <Helmet>
        <title>{`About YenZek`}</title>
        <meta name="description" content="PureMusic is a platform quality concert-like music experience are brought to you anytime" />
        <meta charset="UTF-8" />
      </Helmet>

      <VStack align="flex-start" pt='6rem' px={{ base: '2rem', sm: '2rem', md: '4rem', lg: '14rem' }}>
      <Heading as="h3" pb="1rem" size="lg" fontWeight="bold" mb="1rem">
    About PureMusic
  </Heading>

  <Text>
    PureMusic is a platform that produces <b>Musical Movies</b>—high-quality, cinematic recordings of live performances by local musicians. We don’t just capture music; we elevate it into an immersive visual experience, creating stunning concert-like moments that audiences can enjoy anywhere, anytime.
  </Text>

  <Text pt="1rem">
    We actively promote these performances through our recruiting team at various venues, attracting both in-person and online audiences. Viewers can <b>tip to unlock full performances</b>, directly supporting artists and fostering a deeper connection between musicians and their fans.
  </Text>

  <Text pt="1rem">
    Our mission is to help musicians gain exposure, monetize their art, and build a dedicated fanbase—transforming live music into a thriving digital experience.
  </Text>

<Text pt="2rem" fontSize='xl'>Our Vision</Text>

<Text>While we currently offer beautifully produced musical performances, our future goal is even bigger: to build a 24/7 live music platform where the world’s best artists perform in real-time, creating an ever-evolving, always-on music experience.</Text>


<Text pt="2rem" fontSize='xl'>How It Works</Text>

<UnorderedList>
    <ListItem>Scan the QR code at participating locations.</ListItem>
    <ListItem>Instantly watch a high-quality Musical Movie performed by an artist.</ListItem>
    <ListItem>Support the artist by leaving a tip.</ListItem>
  </UnorderedList>

  <Text pt="2rem" fontSize='xl'>Join the Movement</Text>

  <Text>
  Music should be more than background noise. At PureMusic, we’re creating a new way to listen, watch, and connect with live music—one performance at a time, while giving you the opportunity to support your favorite artists.</Text>

<Flex mb="3rem" flexDirection={'row'} ml="40px" mr="10px">
<Image
                      src="/PureMusicLogo.jpeg"
                      borderRadius='full'
                      boxSize='50px'
                      className="profile-image-circle"
                      alt='puremusic logo'
     />

<Text  ml="10px" as='b'>PureMusic</Text>
</Flex>


<Spacer mb="60px" />






</VStack>

<BottomNav />



    </ChakraProvider>
  )
}

export default AboutUs