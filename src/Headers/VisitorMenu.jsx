import React, { useState, useEffect } from 'react'
import { VStack, Box, Text, Button, Flex, Image } from '@chakra-ui/react'

import { useData } from '../App';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { IoCloseOutline } from "react-icons/io5";

const VisitorMenu = ({ onCloseComplete }) => {
    const { setVisitorUserMenu, } = useData();
    const [isClosing, setIsClosing] = useState(false);
    const [isHovered, setIsHovered] = useState(false);


    const closeMobileNav = () => {
        setIsClosing(true);
    };

    useEffect(() => {
        if (isClosing) {
            const timer = setTimeout(() => {
                setVisitorUserMenu(false);
                onCloseComplete();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [isClosing, setVisitorUserMenu, onCloseComplete]);

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

  

    const navigate = useNavigate();


    const goToLogin = () => {
        closeMobileNav();
        navigate('/account/login');

    };

    const goToSignUp = () => {
        closeMobileNav();
        navigate('/signup');

    }

    return (
        <VStack
        top="0"
        bg="white"
        width="100%"
        height="100vh" // Use 100vh to ensure it fills the viewport height
        animation={`${isClosing ? slideUp : slideDown} 1s ease forwards`}
        alignItems="center"
        justifyContent="center"
      >
        {/* Close Button - Top Left */}
        <Box
          position="fixed" // Use fixed positioning
          top="0"
          left="0"
          width="100%"
          display="flex"
          justifyContent="flex-start"
          pt="5px"
          p="10px"
          zIndex="1000" // Ensure it's above other elements
        >
          <Button
            bg="transparent"
            _hover={{ bg: 'transparent' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={closeMobileNav}
          >
            <IoCloseOutline
              size={40}
              color={isHovered ? '#05c7d0' : 'black'}
            />
          </Button>
        </Box>
      
        {/* Centered Login & Sign Up */}
        <Box display="flex" flexDirection="column" alignItems="center" gap={5} mt="8rem">
          <Button
            variant='ghost'
            fontSize="30px"
            fontWeight={300}
            color="black"
            onClick={goToLogin}
            _hover={{
              transform: 'scale(1.022)',
              color: '#06e4ed',
            }}
            style={{
              transition: 'transform 0.1s',
              cursor: 'pointer',
            }}
          >
            Login
          </Button>
      
          <Button
            variant='ghost'
            fontSize="30px"
            fontWeight={300}
            color="black"
            onClick={goToSignUp}
            _hover={{
              transform: 'scale(1.022)',
              color: '#06e4ed',
            }}
            style={{
              transition: 'transform 0.1s',
              cursor: 'pointer',
            }}
          >
            Sign Up
          </Button>
        </Box>
      
        {/* Logo - Bottom Left */}
        <Box  mt="8rem" onClick={closeMobileNav}>
          <Image
            src="/PureMusicLogoName.png"
            alt="Pure Music Logo"
            maxH="70px"
          />
        </Box>
      </VStack>
      
    );
};

export default VisitorMenu