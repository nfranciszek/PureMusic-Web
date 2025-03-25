import React, { useEffect } from 'react';
import { Box, Image, Text, VStack, Flex, Heading, Spacer } from '@chakra-ui/react';

const ArtistCard = ({ image, name, bio }) => {
    useEffect(() => {
        // Scroll to the top of the page when the component loads
        window.scrollTo(0, 0);
      }, []);

    return (
      <Box
        borderRadius="lg"
        boxShadow="lg"
        p={6}
        bg="white"
        width="100%" // Make it take full width
       // maxW="1200px" // Optionally, you can set a max-width to avoid stretching too much
        mx="auto" // Center the card horizontally
        position="relative"
        zIndex="1"
        top="-40px" // Slightly raised effect
      >
        <Flex align="center">
          <Image
            src={image}
            alt={name}
            borderRadius="full"
            boxSize="80px"
            mr={4}
          />
          <VStack align="flex-start">
            <Heading as="h3" size="lg" fontWeight="bold" color="black">{name}</Heading>
            <Text fontSize="md" color="gray.600">{bio}</Text>
          </VStack>
        </Flex>
      </Box>
    );
  };
  
  const ArtistsPage = () => {
    return (
      <Box bg="white" minH="100vh" py={12} px={6}>
      <VStack spacing={8} align="center" mx="auto">
        <Heading mb="2rem" justifyContent="center" color="black">Artists</Heading>
        <ArtistCard
          image="/Artists1.jpg"
          name="Nathanael Fra"
          bio="Nathanael Fra is a pianist and composer with a passion for both performance and education. His creative projects include recording classical pieces, original works, and arrangements of popular tunes, as well as performing publicly and teaching beginners how to play the piano."
        />
       
      </VStack>
    </Box>
  );
};

export default ArtistsPage;