import React, { useEffect } from 'react';
import theme from '../Utilities/theme';
import { VStack, Image, Flex, Box, SimpleGrid, HStack, Icon, Button, UnorderedList, ListItem, Heading, Text, Spacer, ChakraProvider } from '@chakra-ui/react'
import BottomNav from '../Footers/BottomNav';
import { usePageTitle } from '../Utilities/pageTitles';
import { Helmet } from 'react-helmet';
import { FaPlay } from "react-icons/fa";
import { FaSpa } from "react-icons/fa";
import { FaBaby } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {

  usePageTitle("About Us")

  useEffect(() => {
    // Scroll to the top of the page when the component loads
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();

  const goToMotherhoodPage = () => {
    navigate('/gentle-music/motherhood');
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const goToHomePage = () => {

    navigate('/');
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

  };

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


        <Text fontSize="sm">
  PureMusic brings music to enrich your life. We believe that music is more than entertainment.
  It’s an emotional language, a sensory experience, and a way to slow down, reconnect, and feel more alive.
</Text>

<Text fontSize="sm" mt={4}>
  We focus on two core styles:
</Text>

<VStack align="start" spacing={3} pl={4} mt={2}>
  <Text fontSize="sm">
    <Text fontWeight="bold" fontSize="sm">Classical Music</Text> — timeless, emotionally rich pieces performed with beauty and care.
  </Text>
  <Text fontSize="sm">
    <Text fontWeight="bold" fontSize="sm">Gentle Music</Text> — slowed down, stripped of urgency, and full of expressive sound, helping you relax, breathe deeply, and come home to yourself.
  </Text>
</VStack>

<Text fontSize="sm" mt={4}>
Whether you're joining us virtually or in person, PureMusic gives you a moment to slow down and immerse yourself in the richness of sound.
</Text>

{/* Why We Exist */}
<Box mt="2rem">
  <Heading as="h2" size="md" mb={3}>
    Why We Exist
  </Heading>
  <VStack align="start" spacing={3}>
    <Text fontSize="sm">
      In a fast-paced, noisy world, we’re carving out space for something different:
    </Text>
    <Text fontSize="14px">• Music that slows you down.</Text>
    <Text fontSize="14px">• Music that brings you in.</Text>
    <Text fontSize="14px">• Music that supports emotional well-being and human connection.</Text>
    <Text fontSize="sm">
      Our Gentle Music sessions are especially meaningful for those navigating sensitive life
      moments whether you're a new parent, someone healing, or simply seeking peace.
      Gentle music has also been shown to support nervous system regulation and early childhood
      development, beginning as early as 18 weeks in the womb.
    </Text>
    <Text fontSize="sm">
      We offer special sessions and curated experiences for expecting and new mothers,
      giving both parent and child a chance to connect through sound, stillness,
      and shared presence.
    </Text>
  </VStack>
</Box>

{/* Vision */}
<Box mt="2rem">
  <Heading as="h2" size="md" mb={3}>
    Our Vision
  </Heading>
  <Text fontSize="sm">
    We imagine a world where people come together to rest, reflect, and reconnect surrounded by
    the soothing sounds of live, gentle music performed in real time by thoughtful musicians,
    gently shifting emotional states toward a deeper sense of peace and well-being.
  </Text>
</Box>


      

        {/* CTA Section */}
        <Box>
          <Heading as="h2"  size="md" mb={3} mt="1rem">
            Join the Movement
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <HStack spacing={4} align="start">
              <Icon as={FaPlay} boxSize={6} color="blue.500" />
              <Text fontSize="sm" >✨ Watch a Musical Movie</Text>
            </HStack>
            <HStack spacing={4} align="start">
              <Icon as={FaSpa} boxSize={6} color="green.400" />
              <Text fontSize="sm" >🧘🏽‍♀️ Attend a Live Session</Text>
            </HStack>
            <HStack spacing={4} align="start">
              <Icon as={FaBaby} boxSize={6} color="pink.400" />
              <Text
              fontSize="sm" 
                as="button"
                cursor="pointer"
                color="blue.500"
                _hover={{ textDecoration: 'underline' }}
                onClick={goToMotherhoodPage}
              >
                👶🏾 Learn how music supports development — from the womb and beyond
              </Text>
            </HStack>
          </SimpleGrid>
        </Box>


        <VStack align="center" w="100%">

        <Button
         mb="1rem"
          width="auto"
          variant="outline"
          bg="#06e4ed"
          color="white"
          borderColor="white"
          px={["1rem", "1.5rem", "2rem"]}
          py={["1.25rem", "1.5rem", "1.5rem"]}
          borderRadius="xl"
          fontWeight="bold"
          fontSize={["xs", "sm", "md"]}
          _hover={{
            bg: '#05c7d0', // Semi-transparent gray background
            color: 'white', // White text color
            borderColor: 'white', // White border color
          }}
          onClick={goToHomePage}
        >
          Start Your Gentle Music Journey
        </Button>


        <Image
            src="/PureMusicLogo.jpeg"
            borderRadius='full'
            width="50px"
            maxH="50px"
            className="profile-image-circle"
            alt='puremusic logo'

          />


        </VStack>














        <Spacer mb="60px" />






      </VStack>

      <BottomNav />



    </ChakraProvider>
  )
}

export default AboutUs