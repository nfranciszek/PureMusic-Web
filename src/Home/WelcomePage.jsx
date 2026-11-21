
import React, { useRef, useState, useEffect } from 'react';
import {
  Button,
  Text,
  Flex,
  Image,
  VStack,
  Box,
  Heading,
  SimpleGrid,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  FaMusic,
  FaVideo,
  FaHotel,
  FaPlay,
  FaCheckCircle,
} from 'react-icons/fa';

const WelcomePage = () => {

  const mainVideoUrl = '/Piano_playing_silent.mp4';



  // Keep the original bottom video source.
  const videoUrl = 'https://firebasestorage.googleapis.com/v0/b/puremusic-d8ee8.firebasestorage.app/o/PureMusicOfficialTrailer.mp4?alt=media&token=571ae786-abd7-45c1-b326-9184704ffaea'
  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef(null);
  const containerRef = useRef(null);
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


  const scrollToExperience = () => {
    document.getElementById('puremusic-experience')
      ?.scrollIntoView({
        behavior: 'smooth',
      });
  };

  const scrollToVideo = () => {
    document.getElementById('puremusic-video')
      ?.scrollIntoView({
        behavior: 'smooth',
      });
  };

  const handlePlayClick = async () => {
    if (!videoRef.current) return;

    try {
      await videoRef.current.play();
    } catch (error) {
      console.error('Unable to play video:', error);
    }
  };

  const enterFullscreen = () => {
    const container = containerRef.current;

    if (!container) return;

    if (document.fullscreenElement) {
      return;
    }

    if (container.requestFullscreen) {
      container.requestFullscreen();
    } else if (container.webkitRequestFullscreen) {
      container.webkitRequestFullscreen();
    } else if (container.msRequestFullscreen) {
      container.msRequestFullscreen();
    }
  };

  const features = [

    {
      icon: FaMusic,
      title: 'Your Favorite Song in 30 Minutes',
      description:
        'Learn a beginner-friendly piano part and perform your favorite song alongside a professional pianist in a private 30-minute experience.',
    },

    {
      icon: FaCheckCircle,
      title: 'Beginner-Friendly',
      description:
        'No previous piano experience is necessary. Our pianist guides you throughout the experience.',
    },
    {
      icon: FaVideo,
      title: 'Capture the Moment',
      description:
        'Receive a video of your performance to revisit and share with friends, family, and on social media.',
    },
  ];

  return (
    <VStack spacing={0} w="100%" align="stretch">
      <Helmet>
        <title>
          PureMusic | Private Grand Piano Experiences
        </title>
        <meta
          name="description"
          content="PureMusic creates private, beginner-friendly grand piano experiences for hotel and resort guests. Play your favorite song with a professional pianist and receive a video to share."
        />
      </Helmet>

      {/* HERO SECTION — ORIGINAL SILENT VIDEO */}
      <Box
        position="relative"
        w="100vw"
        h="100vh"
        minH="600px"
        left="50%"
        transform="translateX(-50%)"
        mt="-1rem"
        overflow="hidden"
      >
        <video
          width="100%"
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        >
          <source
            src={mainVideoUrl}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Dark overlay */}
        <Box
          position="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
          bg="rgba(0, 0, 0, 0.48)"
          zIndex={1}
        />

        {/* Hero content */}
        <Flex
          direction="column"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex={2}
          align="center"
          textAlign="center"
          gap={4}
          width={{
            base: '90%',
            md: '75%',
            lg: '65%',
          }}
        >
          <Heading
            as="h1"
            color="white"
            fontSize={{
              base: '36px',
              md: '56px',
              lg: '68px',
            }}
            lineHeight="1.1"
          >
            PureMusic
          </Heading>

          <Image
            src="/PureMusicWhiteLogo.png"
            alt="PureMusic Logo"
            width="80px"
            maxH="80px"
          />

          <Heading
            as="h2"
            color="white"
            fontSize={{
              base: '22px',
              md: '30px',
              lg: '36px',
            }}
            fontWeight="500"
            lineHeight="1.3"
          >
            Your Favorite Song.
            Your Moment at the Piano.
          </Heading>


          <Text
            color="white"
            fontSize={{
              base: '14px',
              md: '17px',
              lg: '19px',
            }}
            maxW="700px"
            lineHeight="1.7"
          >
            Learn to play your favorite song in just
            30 minutes alongside a professional pianist.
            No experience necessary. Perform together
            on a grand piano and take home a video
            of your performance to share with friends,
            family, and on social media.
          </Text>


          <Flex
            gap={4}
            mt={4}
            wrap="wrap"
            justify="center"
          >
            <Button
              variant="outline"
              color="white"
              borderColor="white"
              borderRadius="xl"
              px={6}
              py={6}
              fontWeight="bold"
              fontSize={{
                base: 'sm',
                md: 'md',
              }}
              _hover={{
                bg: 'white',
                color: '#05c7d0',
              }}
              onClick={scrollToVideo}
            >
              Watch the Experience
            </Button>

            <Button
              bg="#06e4ed"
              color="white"
              borderRadius="xl"
              px={6}
              py={6}
              fontWeight="bold"
              fontSize={{
                base: 'sm',
                md: 'md',
              }}
              _hover={{
                bg: '#05c7d0',
              }}
              onClick={scrollToExperience}
            >
              How It Works
            </Button>
          </Flex>
        </Flex>
      </Box>

      {/* THE EXPERIENCE */}
      <VStack
        id="puremusic-experience"
        bg="black"
        color="white"
        p={{
          base: 6,
          md: 12,
        }}
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
          mt={5}
        >
          The PureMusic Experience
        </Heading>

        <Text
          fontSize={{
            base: '14px',
            md: '16px',
          }}
          lineHeight="1.8"
          maxW="750px"
          textAlign="center"
        >
          Imagine arriving with no piano experience
          and, within just 30 minutes, performing
          your favorite song alongside a professional
          pianist on a beautiful grand piano.

          PureMusic makes that possible through a
          beginner-friendly experience, complete
          with a video of your performance to
          take home and share.
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            md: 3,
          }}
          spacing={8}
          width="100%"
          maxW="1100px"
          mt={4}
        >
          {features.map((feature) => (
            <VStack
              key={feature.title}
              align="center"
              spacing={4}
              p={6}
              textAlign="center"
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
                size="md"
                color="white"
              >
                {feature.title}
              </Heading>

              <Text
                color="gray.200"
                fontSize="sm"
                lineHeight="1.7"
              >
                {feature.description}
              </Text>
            </VStack>
          ))}
        </SimpleGrid>
      </VStack>

      {/* HOW IT WORKS */}
      <VStack
        bg="white"
        color="black"
        p={{
          base: 6,
          md: 12,
        }}
        spacing={7}
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
          How It Works
        </Heading>

        <VStack
          align="start"
          spacing={6}
          maxW="750px"
          width="100%"
        >
          <Box>
            <Heading as="h3" size="sm" mb={2}>
              1. Arrange Your Experience
            </Heading>

            <Text fontSize="sm" lineHeight="1.8">
              Reserve your PureMusic experience through a
              participating hotel or resort, or contact us
              directly to inquire about a private one-on-one
              piano collaboration.
            </Text>
          </Box>

          <Box>
            <Heading as="h3" size="sm" mb={2}>
              2. Choose Your Favorite Song
            </Heading>

            <Text fontSize="sm" lineHeight="1.8">
              Select a favorite song to learn and
              perform. Our pianist will guide you
              through a simple part suited to your
              experience level.
            </Text>
          </Box>

          <Box>
            <Heading as="h3" size="sm" mb={2}>
              3. Make Music Together
            </Heading>

            <Text fontSize="sm" lineHeight="1.8">
              Sit alongside a professional pianist
              at a grand piano and bring your
              favorite song to life together.
            </Text>
          </Box>

          <Box>
            <Heading as="h3" size="sm" mb={2}>
              4. Take Home Your Performance
            </Heading>

            <Text fontSize="sm" lineHeight="1.8">
              Your performance is recorded, giving
              you a personal video to enjoy,
              remember, and share with friends,
              family, and on social media.
            </Text>
          </Box>
        </VStack>
      </VStack>

      {/* WHY PEOPLE LOVE THE EXPERIENCE */}
      <VStack
        bg="gray.50"
        p={{
          base: 6,
          md: 12,
        }}
        spacing={6}
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
          More Than a Musical Performance
        </Heading>

        <Text
          fontSize="sm"
          maxW="750px"
          lineHeight="1.9"
          textAlign="center"
        >
          PureMusic is about creating a memory
          that lasts beyond the moment.

          Whether you're celebrating a birthday,
          anniversary, special occasion, or simply
          trying something new, the experience
          gives you the opportunity to become
          part of the music yourself.
        </Text>

        <Text
          fontSize="sm"
          maxW="750px"
          lineHeight="1.9"
          textAlign="center"
        >
          And when the experience is over,
          your performance video becomes
          something you can revisit and
          share with the people in your life.
        </Text>
      </VStack>

      {/* HOTEL & RESORT PARTNERSHIPS */}
      <VStack
        bg="white"
        p={{
          base: 6,
          md: 12,
        }}
        spacing={6}
        width="100%"
        align="center"
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
          textAlign="center"
        >
          For Hotels & Resorts
        </Heading>

        <Text
          fontSize="sm"
          maxW="750px"
          lineHeight="1.9"
          textAlign="center"
        >
          PureMusic partners with hotels and
          resorts to offer guests a distinctive,
          beginner-friendly grand piano experience.
        </Text>

        <Text
          fontSize="sm"
          maxW="750px"
          lineHeight="1.9"
          textAlign="center"
        >
          Our reservation-based program brings
          professional pianists and personalized
          musical experiences to participating
          properties, giving guests something
          memorable to enjoy during their stay.
        </Text>

        <Text
          fontSize="sm"
          maxW="750px"
          lineHeight="1.9"
          textAlign="center"
        >
          Guests receive a video of their
          performance, which they can share
          with friends, family, and on social
          media, creating opportunities for
          additional visibility for participating
          properties.
        </Text>


        <Button
          bg="#06e4ed"
          color="white"
          borderRadius="xl"
          px={7}
          py={6}
          fontWeight="bold"
          _hover={{
            bg: '#05c7d0',
          }}
          onClick={goToContactUs}
        >
          Inquire About a Partnership
        </Button>

      </VStack>



      {/* RESERVATIONS & COLLABORATIONS */}
      <VStack
        bg="gray.50"
        p={{ base: 6, md: 12 }}
        spacing={6}
        width="100%"
        align="center"
      >
        <Heading
          as="h2"
          fontSize={{ base: '26px', md: '36px' }}
          textAlign="center"
        >
          Reservations & Collaborations
        </Heading>

        <Text
          fontSize="sm"
          maxW="750px"
          lineHeight="1.9"
          textAlign="center"
        >
          Interested in experiencing PureMusic?
          Guests can arrange their experience through
          participating hotels and resorts.
        </Text>

        <Text
          fontSize="sm"
          maxW="750px"
          lineHeight="1.9"
          textAlign="center"
        >
          We also welcome inquiries for private
          one-on-one piano collaborations. Whether
          you're a beginner or an experienced musician,
          you can contact us directly to discuss
          an experience together.
        </Text>

        <Button
          bg="#06e4ed"
          color="white"
          borderRadius="xl"
          px={7}
          py={6}
          fontWeight="bold"
          _hover={{
            bg: '#05c7d0',
          }}
          onClick={goToContactUs}
        >
          Contact PureMusic
        </Button>
      </VStack>


      {/* ORIGINAL BOTTOM VIDEO */}
      <VStack
        id="puremusic-video"
        bg="black"
        color="white"
        p={{
          base: 6,
          md: 12,
        }}
        spacing={6}
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
          Watch the PureMusic Experience
        </Heading>

        <Image
          src="/Artists1.jpg"
          alt="PureMusic pianist"
          borderRadius="full"
          boxSize="80px"
        />

        <Text
          color="white"
          fontWeight="500"
          fontSize="16px"
        >
          Nathanael Fra
        </Text>

        <Text
          color="gray.200"
          fontSize="sm"
          lineHeight="1.8"
          textAlign="center"
          maxW="650px"
        >
          See what happens when guests sit
          alongside a professional pianist
          and make music together.

          Watch a demonstration of the
          PureMusic experience.
        </Text>

        <Box
          ref={containerRef}
          position="relative"
          width="100%"
          maxW="600px"
          margin="auto"
        >
          <video
            ref={videoRef}
            width="100%"
            controls={isPlaying}
            controlsList="nodownload noremoteplayback"
            poster="/PureMusicTrailerThumbnail.jpg"
            playsInline
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            onClick={enterFullscreen}
            style={{
              position: 'relative',
              zIndex: 0,
              borderRadius: '10px',
              width: '100%',
            }}
          >
            <source
              src={videoUrl}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>




          {/* Play button */}
          {!isPlaying && (
            <Flex
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              bg="rgba(0, 0, 0, 0.65)"
              borderRadius="md"
              border="1px solid white"
              px={4}
              py={2}
              cursor="pointer"
              align="center"
              justify="center"
              gap={2}
              zIndex={2}
              onClick={handlePlayClick}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (
                  event.key === 'Enter' ||
                  event.key === ' '
                ) {
                  event.preventDefault();
                  handlePlayClick();
                }
              }}
            >
              <Icon
                as={FaPlay}
                color="white"
                boxSize={3}
              />

              <Text
                color="white"
                fontSize="sm"
                fontWeight="bold"
              >
                Watch Now
              </Text>
            </Flex>
          )}


        </Box>

        <Text
          color="gray.300"
          fontSize="sm"
          textAlign="center"
          maxW="650px"
        >
          No piano experience necessary.
          Just the opportunity to create
          something memorable.
        </Text>
      </VStack>

      {/* FINAL CTA */}
      <VStack
        bg="white"
        align="center"
        width="100%"
        spacing={5}
        py={10}
        px={6}
      >

        <Heading
          as="h2"
          size="md"
          textAlign="center"
        >
           Play Your Favorite Song in Just 30 Minutes
        </Heading>

        <Text
          fontSize="sm"
          textAlign="center"
          maxW="600px"
        >
          No piano experience necessary. Learn and
          perform alongside a professional pianist
          on a grand piano, and take home a video
          of your performance to share.
        </Text>


        <Button
          variant="outline"
          bg="#06e4ed"
          color="white"
          borderColor="white"
          px={['1rem', '1.5rem', '2rem']}
          py={['1.25rem', '1.5rem', '1.5rem']}
          borderRadius="xl"
          fontWeight="bold"
          fontSize={['xs', 'sm', 'md']}
          _hover={{
            bg: '#05c7d0',
            color: 'white',
            borderColor: 'white',
          }}
          onClick={goToContactUs}
        >
          Get Started
        </Button>

        <Image
          src="/PureMusicLogo.jpeg"
          borderRadius="full"
          width="50px"
          maxH="50px"
          className="profile-image-circle"
          alt="PureMusic logo"
        />
      </VStack>
    </VStack>
  );
};

export default WelcomePage;



{/*}
        <Flex direction="column" align="center" justify="center" height="100vh" width="100vw">
          <Image src="/PureMusicLogo.jpeg" alt="Pure Music Logo" maxH="70px" mb="3rem" />
          <p>Loading video...</p>
        </Flex>
    */}