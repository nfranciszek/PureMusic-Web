

import React, { useEffect } from 'react';
import {
  ChakraProvider,
  VStack,
  Image,
  Box,
  SimpleGrid,
  HStack,
  Icon,
  Button,
  Heading,
  Text,
  Flex,
} from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import {
  FaMusic,
  FaVideo,
  FaHotel,
} from 'react-icons/fa';

import theme from '../Utilities/theme';
import BottomNav from '../Footers/BottomNav';
import { usePageTitle } from '../Utilities/pageTitles';

const AboutUs = () => {
  usePageTitle('About PureMusic');

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const goToContactUs = () => {
    navigate('/contact');
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  const features = [
    {
      icon: FaMusic,
      title: 'Play Your Favorite Song',
      description:
        'Learn a beginner-friendly piano part and perform your favorite song alongside a professional pianist in a private 30-minute experience.',
    },
    {
      icon: FaVideo,
      title: 'Capture the Moment',
      description:
        'Receive a video of your performance to revisit and share with friends, family, and on social media.',
    },
    {
      icon: FaHotel,
      title: 'A Unique Guest Experience',
      description:
        'Enjoy a personalized grand piano experience through participating hotels and resorts, or inquire about a private collaboration.',
    },
  ];

  return (
    <ChakraProvider theme={theme}>
      <Helmet>
        <title>About PureMusic</title>
        <meta
          name="description"
          content="Discover PureMusic, a private 30-minute grand piano experience where guests learn and perform their favorite song alongside a professional pianist. No experience necessary."
        />
        <meta charSet="UTF-8" />
      </Helmet>

      <VStack
        align="stretch"
        spacing={0}
        width="100%"
        bg="white"
      >
        {/* ABOUT PUREMUSIC */}
        <VStack
          pt={{ base: '5rem', md: '7rem' }}
          pb={{ base: 10, md: 14 }}
          px={{ base: 6, md: 12 }}
          spacing={6}
          align="center"
          textAlign="center"
          width="100%"
        >
          <Heading
            as="h1"
            fontSize={{
              base: '32px',
              md: '44px',
            }}
            color="black"
          >
            About PureMusic
          </Heading>

          <Image
            src="/PureMusicLogo.jpeg"
            alt="PureMusic Logo"
            boxSize="75px"
            objectFit="cover"
            borderRadius="full"
          />

          <Text
            fontSize={{
              base: '15px',
              md: '17px',
            }}
            color="gray.700"
            maxW="780px"
            lineHeight="1.9"
          >
            PureMusic creates private grand piano
            experiences that give people the
            opportunity to learn and perform
            their favorite songs alongside
            professional pianists.
          </Text>

          <Text
            fontSize={{
              base: '14px',
              md: '16px',
            }}
            color="gray.600"
            maxW="780px"
            lineHeight="1.9"
          >
            In just 30 minutes, participants can
            learn a beginner-friendly piano part
            and perform together with a professional
            pianist on a grand piano. No previous
            piano experience is necessary.
          </Text>

          <Text
            fontSize={{
              base: '14px',
              md: '16px',
            }}
            color="gray.600"
            maxW="780px"
            lineHeight="1.9"
          >
            Each performance is recorded, giving
            participants a personal video they
            can revisit and share with friends,
            family, and on social media.
          </Text>
        </VStack>

        {/* THE PUREMUSIC EXPERIENCE */}
        <VStack
          bg="black"
          color="white"
          py={{ base: 12, md: 16 }}
          px={{ base: 6, md: 12 }}
          spacing={8}
          align="center"
          width="100%"
        >
          <Heading
            as="h2"
            fontSize={{
              base: '26px',
              md: '36px',
            }}
            textAlign="center"
          >
            The PureMusic Experience
          </Heading>

          <Text
            fontSize={{
              base: '14px',
              md: '16px',
            }}
            color="gray.200"
            maxW="750px"
            lineHeight="1.8"
            textAlign="center"
          >
            PureMusic makes it possible to
            participate in the music you love,
            regardless of your previous
            musical experience.
          </Text>

          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            spacing={7}
            width="100%"
            maxW="1100px"
          >
            {features.map((feature) => (
              <VStack
                key={feature.title}
                align="center"
                textAlign="center"
                spacing={4}
                p={7}
                border="1px solid"
                borderColor="gray.700"
                borderRadius="xl"
              >
                <Icon
                  as={feature.icon}
                  boxSize={7}
                  color="#06e4ed"
                />

                <Heading
                  as="h3"
                  fontSize="19px"
                  color="white"
                >
                  {feature.title}
                </Heading>

                <Text
                  fontSize="sm"
                  color="gray.200"
                  lineHeight="1.8"
                >
                  {feature.description}
                </Text>
              </VStack>
            ))}
          </SimpleGrid>
        </VStack>

        {/* WHY WE EXIST */}
        <VStack
          bg="white"
          py={{ base: 12, md: 16 }}
          px={{ base: 6, md: 12 }}
          spacing={6}
          align="center"
          textAlign="center"
          width="100%"
        >
          <Heading
            as="h2"
            fontSize={{
              base: '26px',
              md: '36px',
            }}
          >
            Why We Exist
          </Heading>

          <Text
            fontSize="sm"
            color="gray.700"
            maxW="750px"
            lineHeight="1.9"
          >
            We believe music becomes even more
            meaningful when people have the
            opportunity to participate in it,
            rather than simply listen.
          </Text>

          <Text
            fontSize="sm"
            color="gray.700"
            maxW="750px"
            lineHeight="1.9"
          >
            Many people have imagined themselves
            playing a favorite song on the piano,
            but have never had the opportunity
            to try. PureMusic makes that
            experience approachable, even
            for someone who has never played
            a single note.
          </Text>

          <Text
            fontSize="sm"
            color="gray.700"
            maxW="750px"
            lineHeight="1.9"
          >
            Whether celebrating a special
            occasion, traveling with someone
            they love, or simply trying
            something new, participants can
            create a musical memory that
            lasts beyond the performance.
          </Text>
        </VStack>

        {/* HOTEL & RESORT PARTNERSHIPS */}
        <VStack
          bg="gray.50"
          py={{ base: 12, md: 16 }}
          px={{ base: 6, md: 12 }}
          spacing={6}
          align="center"
          textAlign="center"
          width="100%"
        >
          <Icon
            as={FaHotel}
            boxSize={8}
            color="#04b6c3"
          />

          <Heading
            as="h2"
            fontSize={{
              base: '26px',
              md: '36px',
            }}
          >
            Hotel & Resort Partnerships
          </Heading>

          <Text
            fontSize="sm"
            color="gray.700"
            maxW="750px"
            lineHeight="1.9"
          >
            PureMusic partners with hotels
            and resorts to offer guests a
            distinctive, beginner-friendly
            musical experience.
          </Text>

          <Text
            fontSize="sm"
            color="gray.700"
            maxW="750px"
            lineHeight="1.9"
          >
            Our reservation-based program
            provides participating properties
            with a personalized activity
            that complements their existing
            guest amenities, hospitality
            services, and special occasions.
          </Text>

          <Text
            fontSize="sm"
            color="gray.700"
            maxW="750px"
            lineHeight="1.9"
          >
            PureMusic coordinates the musical
            experience, from professional
            pianist participation to recording
            and delivering each guest's
            performance video.
          </Text>

          <Text
            fontSize="sm"
            color="gray.700"
            maxW="750px"
            lineHeight="1.9"
          >
            Guests can share their performance
            videos on social media, creating
            opportunities for participating
            hotels and resorts to gain
            additional visibility through
            memorable guest experiences.
          </Text>

          <Button
            bg="#06e4ed"
            color="white"
            borderRadius="xl"
            px={7}
            py={6}
            mt={3}
            fontWeight="bold"
            fontSize="sm"
            _hover={{
              bg: '#04b6c3',
              color: 'white',
            }}
            onClick={goToContactUs}
          >
            Inquire About a Partnership
          </Button>
        </VStack>

        {/* FINAL CALL TO ACTION */}
        <VStack
          bg="white"
          align="center"
          textAlign="center"
          width="100%"
          spacing={5}
          py={{ base: 12, md: 16 }}
          px={6}
        >
          <Heading
            as="h2"
            fontSize={{
              base: '24px',
              md: '32px',
            }}
          >
            Play Your Favorite Song in Just 30 Minutes
          </Heading>

          <Text
            fontSize="sm"
            color="gray.700"
            textAlign="center"
            maxW="600px"
            lineHeight="1.8"
          >
            No piano experience necessary.
            Learn and perform alongside a
            professional pianist on a grand
            piano, and take home a video
            of your performance to share.
          </Text>

          <Button
            bg="#06e4ed"
            color="white"
            borderRadius="xl"
            px={8}
            py={6}
            fontWeight="bold"
            fontSize={{
              base: 'sm',
              md: 'md',
            }}
            _hover={{
              bg: '#04b6c3',
              color: 'white',
            }}
            onClick={goToContactUs}
          >
            Get Started
          </Button>

          <Image
            src="/PureMusicLogo.jpeg"
            alt="PureMusic Logo"
            borderRadius="full"
            width="50px"
            height="50px"
            objectFit="cover"
          />
        </VStack>

        {/* FOOTER */}
        <Box width="100%">
          <BottomNav />
        </Box>
      </VStack>
    </ChakraProvider>
  );
};

export default AboutUs;
