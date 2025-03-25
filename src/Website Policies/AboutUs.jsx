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

  <Text 
>
At PureMusic, we're redefining how people experience music. We believe music is more than just sound—it's a story, a journey, an emotion—and it deserves to be presented in a way that is just as immersive as a live performance.
</Text>

<Text pt="1rem">
That’s why we’ve created Musical Movies—cinematic, high-quality recordings of live performances by up-and-coming musicians and local talent, captured in stunning locations with the best instruments. Whether you’re waiting at a restaurant, relaxing at home, or looking for an inspiring moment, PureMusic brings you a concert-like experience, anytime, anywhere.</Text>



<Text pt="2rem" fontSize='xl'>Our Vision</Text>

<Text>While we currently offer beautifully produced musical performances, our future goal is even bigger: to build a 24/7 live music platform where the world’s best artists perform in real-time, creating an ever-evolving, always-on music experience.</Text>


<Text pt="2rem" fontSize='xl'>How It Works</Text>

<UnorderedList>
                        <ListItem>Scan the QR code at participating locations.</ListItem>
                        <ListItem>Instantly watch a high-quality musical movie performed by an artist.</ListItem>
                        <ListItem>Support the artist by leaving a tip.</ListItem>
                    </UnorderedList>

<Text pt="2rem" fontSize='xl'>Join the Movement</Text>

<Text>Music should be more than background noise. At PureMusic, we’re creating a new way to listen, watch, and connect with live music—one performance at a time.</Text>



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