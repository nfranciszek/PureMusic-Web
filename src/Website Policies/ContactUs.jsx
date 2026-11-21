
import React from 'react';
import {
  VStack,
  Flex,
  ChakraProvider,
  Heading,
  Button,
  Text,
  Image,
  SimpleGrid,
  Box,
  Icon,
} from '@chakra-ui/react';
import {
  FaHotel,
  FaMusic,
  FaEnvelope,
} from 'react-icons/fa';
import { usePageTitle } from '../Utilities/pageTitles';
import { Helmet } from 'react-helmet';
import theme from '../Utilities/theme';
import BottomNav from '../Footers/BottomNav';

const ContactUs = () => {
  usePageTitle('Contact Us');

  const email = 'puremusic.us@gmail.com';

  const inquiries = [
    {
      icon: FaHotel,
      title: 'Hotels & Resorts',
      description:
        'Interested in offering PureMusic as a guest experience at your property? Contact us to discuss a potential partnership.',
      button: 'Partnership Inquiry',
      subject: 'PureMusic - Hotel & Resort Partnership',
    },
    {
      icon: FaMusic,
      title: 'Private Collaborations',
      description:
        'Interested in playing your favorite song alongside a professional pianist? We welcome individuals and content creators, regardless of piano experience.',
      button: 'Collaboration Inquiry',
      subject: 'PureMusic - Private Collaboration',
    },
    {
      icon: FaEnvelope,
      title: 'General Inquiries',
      description:
        "Have a question or something else in mind? We'd be happy to hear from you.",
      button: 'General Inquiry',
      subject: 'PureMusic - General Inquiry',
    },
  ];

  return (
    <ChakraProvider theme={theme}>
      <Helmet>
        <title>Contact PureMusic</title>
        <meta
          name="description"
          content="Contact PureMusic for hotel and resort partnerships, private piano collaborations, and general inquiries."
        />
        <meta charSet="UTF-8" />
      </Helmet>

      <VStack
        spacing={0}
        width="100%"
        minH="100vh"
        bg="white"
      >
        {/* PAGE INTRODUCTION */}
        <VStack
          pt={{ base: '5rem', md: '7rem' }}
          pb={{ base: 8, md: 12 }}
          px={6}
          spacing={5}
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
            Contact PureMusic
          </Heading>

          <Image
            src="/PureMusicLogo.jpeg"
            alt="PureMusic Logo"
            width="75px"
            height="75px"
            objectFit="cover"
            borderRadius="full"
          />

          <Text
            fontSize={{
              base: '15px',
              md: '17px',
            }}
            color="gray.600"
            maxW="720px"
            lineHeight="1.9"
          >
            Whether you're interested in bringing
            PureMusic to your property, participating
            in a private piano collaboration, or
            simply have a question, we'd love to
            hear from you.
          </Text>
        </VStack>

        {/* INQUIRY CARDS */}
        <Box
          width="100%"
          px={{ base: 5, md: 10 }}
          pb={{ base: 12, md: 20 }}
        >
          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            spacing={6}
            maxW="1200px"
            mx="auto"
          >
            {inquiries.map((inquiry) => (
              <Flex
                key={inquiry.title}
                direction="column"
                align="center"
                textAlign="center"
                bg="white"
                border="1px solid"
                borderColor="gray.200"
                borderRadius="2xl"
                p={{ base: 7, md: 8 }}
                boxShadow="sm"
                minH="320px"
                transition="all 0.2s ease"
                _hover={{
                  boxShadow: 'lg',
                  transform: 'translateY(-4px)',
                  borderColor: '#06e4ed',
                }}
              >
                {/* ICON */}
                <Flex
                  align="center"
                  justify="center"
                  bg="#e6fcfd"
                  borderRadius="full"
                  width="65px"
                  height="65px"
                  mb={5}
                >
                  <Icon
                    as={inquiry.icon}
                    boxSize={7}
                    color="#04b6c3"
                  />
                </Flex>

                {/* TITLE */}
                <Heading
                  as="h2"
                  fontSize="21px"
                  color="black"
                  mb={4}
                >
                  {inquiry.title}
                </Heading>

                {/* DESCRIPTION */}
                <Text
                  fontSize="14px"
                  color="gray.600"
                  lineHeight="1.8"
                  mb={7}
                >
                  {inquiry.description}
                </Text>

                {/* EMAIL BUTTON */}
                <Button
                  as="a"
                  href={`mailto:${email}?subject=${encodeURIComponent(
                    inquiry.subject
                  )}`}
                  bg="#06e4ed"
                  color="white"
                  borderRadius="xl"
                  fontWeight="bold"
                  fontSize="sm"
                  px={6}
                  py={6}
                  mt="auto"
                  width="100%"
                  whiteSpace="normal"
                  _hover={{
                    bg: '#04b6c3',
                    color: 'white',
                  }}
                >
                  {inquiry.button}
                </Button>
              </Flex>
            ))}
          </SimpleGrid>
        </Box>

        {/* ADDITIONAL CONTACT INFORMATION */}
        <VStack
          width="100%"
          bg="gray.50"
          py={{ base: 10, md: 14 }}
          px={6}
          spacing={4}
          textAlign="center"
        >
          <Heading
            as="h2"
            fontSize={{
              base: '22px',
              md: '28px',
            }}
          >
            We'd Love to Hear From You
          </Heading>

          <Text
            fontSize="sm"
            color="gray.600"
            maxW="550px"
            lineHeight="1.8"
          >
            You can also reach us directly
            using the email address below.
          </Text>

          <Text
            as="a"
            href={`mailto:${email}`}
            color="#04b6c3"
            fontWeight="bold"
            fontSize={{
              base: '15px',
              md: '17px',
            }}
            _hover={{
              textDecoration: 'underline',
            }}
          >
            {email}
          </Text>
        </VStack>

        {/* FOOTER */}
        <Box width="100%">
          <BottomNav />
        </Box>
      </VStack>
    </ChakraProvider>
  );
};

export default ContactUs;
