
import React, { useState, useEffect } from 'react';
import {
  VStack,
  Box,
  Button,
  Image,
} from '@chakra-ui/react';
import { useData } from '../App';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { IoCloseOutline } from 'react-icons/io5';

const VisitorMenu = ({ onCloseComplete }) => {
  const { setVisitorUserMenu } = useData();

  const [isClosing, setIsClosing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();

  const slideDown = keyframes`
    from {
      transform: translateY(-100%);
      opacity: 0;
      background-color: #05c7d0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
      background-color: white;
    }
  `;

  const slideUp = keyframes`
    from {
      transform: translateY(0);
      opacity: 1;
      background-color: white;
    }
    to {
      transform: translateY(-100%);
      opacity: 0;
      background-color: #05c7d0;
    }
  `;

  const closeMobileNav = () => {
    setIsClosing(true);
  };

  useEffect(() => {
    if (!isClosing) return;

    const timer = setTimeout(() => {
      setVisitorUserMenu(false);
      onCloseComplete?.();
    }, 1000);

    return () => clearTimeout(timer);
  }, [
    isClosing,
    setVisitorUserMenu,
    onCloseComplete,
  ]);

  const goToPage = (path) => {
    closeMobileNav();
    navigate(path);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  const menuItems = [
    {
      label: 'The PureMusic Experience',
      path: '/',
    },
    {
      label: 'Artists',
      path: '/artists/',
    },
    {
      label: 'Contact',
      path: '/contact',
    },
    {
      label: 'About',
      path: '/about',
    },
    {
      label: 'Help',
      path: '/help',
    },
  ];

  return (
    <VStack
      position="relative"
      top="0"
      bg="white"
      width="100%"
      height="100dvh"
      minH="100vh"
      overflowY="auto"
      animation={`${
        isClosing ? slideUp : slideDown
      } 1s ease forwards`}
      alignItems="center"
      justifyContent="center"
      spacing={0}
      px={5}
      py={8}
    >
      {/* CLOSE BUTTON */}
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        display="flex"
        justifyContent="flex-start"
        p="10px"
        zIndex="1000"
      >
        <Button
          aria-label="Close navigation menu"
          bg="transparent"
          _hover={{ bg: 'transparent' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={closeMobileNav}
        >
          <IoCloseOutline
            size={40}
            color={
              isHovered ? '#05c7d0' : 'black'
            }
          />
        </Button>
      </Box>

      {/* NAVIGATION LINKS */}
      <VStack
        spacing={{ base: 5, md: 7 }}
        width="100%"
        align="center"
        justify="center"
        flex="1"
        pt="3rem"
      >
        {menuItems.map((item) => (
          <Button
            key={item.path}
            variant="ghost"
            height="auto"
            maxW="100%"
            px={3}
            py={2}
            fontSize={{
              base: '23px',
              sm: '27px',
              md: '30px',
            }}
            fontWeight={300}
            color="black"
            whiteSpace="normal"
            textAlign="center"
            lineHeight="1.4"
            onClick={() => goToPage(item.path)}
            _hover={{
              transform: 'scale(1.022)',
              color: '#06e4ed',
              bg: 'transparent',
            }}
            transition="transform 0.1s, color 0.1s"
          >
            {item.label}
          </Button>
        ))}
      </VStack>

      {/* PUREMUSIC LOGO */}
      <Box
        mt={6}
        mb={4}
        cursor="pointer"
        onClick={() => goToPage('/')}
      >
        <Image
          src="/PureMusicLogoName.png"
          alt="PureMusic - Return to homepage"
          maxH="70px"
          maxW="220px"
          objectFit="contain"
        />
      </Box>
    </VStack>
  );
};

export default VisitorMenu;
