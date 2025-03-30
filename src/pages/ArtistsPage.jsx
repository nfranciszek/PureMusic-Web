import React, { useEffect } from 'react';
import { Box, Image, Text, VStack, Flex, Heading, Spacer, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const goToSignUp = () => {

    navigate('/signup');

  }

  return (
    <Box bg="white" minH="100vh" py={12} px={6}>
      <VStack spacing={8} align="center" mx="auto">
        <Heading mb="2rem" justifyContent="center" color="black">Artists</Heading>
        <ArtistCard
          image="/Artists1.jpg"
          name="Nathanael Fra"
          bio="Nathanael Fra is a pianist and composer with a passion for both performance and education. His creative projects include recording classical pieces, original works, and arrangements of popular tunes, as well as performing publicly and teaching beginners how to play the piano."
        />

        <Button

          onClick={() => goToSignUp()}
          mt="1rem"
          mb="1rem"
          variant="outline"
          size="sm"
          bg="white"
          color="#05c7d0" // Website color for text
          border="2px solid #05c7d0" // Border to match the website color
          px={{ base: "1rem", sm: "1.5rem", md: "2rem" }}
          _hover={{
            bg: "#05c7d0", // Button background turns to website color on hover
            color: "white", // White text when hovering
            borderColor: "#06e4ed", // Keep border color same as background color
            transform: "scale(1.05)", // Slightly grow button on hover
            transition: "0.3s ease", // Smooth transition for hover effect
          }}
          _active={{
            transform: "scale(1.02)", // Slight scale on click
            boxShadow: "none", // Remove shadow on active state
          }}
          _focus={{
            outline: "none", // Remove outline on focus
          }}>
          Become an Artist
        </Button>
      </VStack>




    </Box>
  );
};

export default ArtistsPage;