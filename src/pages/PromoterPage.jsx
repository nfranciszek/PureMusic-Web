import React, { useRef, useState, useEffect } from 'react';
import { Center, VStack, Box, Button, Image, Heading, Text, Flex, Slider, SliderMark, SliderTrack, SliderFilledTrack, SliderThumb, HStack } from "@chakra-ui/react";

import { useNavigate } from 'react-router-dom';

import { useData } from '../App';

const PromoterPage = () => {

    const navigate = useNavigate();
    const [currentImage, setCurrentImage] = useState(0);

    const images = [
        "/TrainConductorPureMusic.jpg",
        "/FlightAttenants02PureMusic.jpg",
    ];

   const { signUpAsArtist, setSignUpAsArtist,
    signUpAsPromoter, setSignUpAsPromoter,
    signUpAsFan, setSignUpAsFan } = useData();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage === 0 ? 1 : 0));
        }, 5000); // Switch image every 15 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    const goSignUp = () => {
        navigate("/signup");

        setSignUpAsArtist(false);
        setSignUpAsFan(false);
        setSignUpAsPromoter(true);
    }

    const HowItWorks = () => {
        return (
            <Center w="100%" py={10} textAlign="center">
                <VStack spacing={8} maxW="80%" align="center">
                    <Heading fontSize="2xl"
                        color="gray.800"
                        fontWeight="extrabold"
                        mb={4}
                        border="2px solid gray.600"
                        borderRadius="10px"
                        p="10px"
                        paddingLeft="40px"
                        paddingRight="40px"
                        display="inline-block"
                        bg="white"
                        boxShadow="sm"
                        width="auto"
                        maxWidth="100%"
                    >
                        How It Works
                    </Heading>
    
                    {/* Use Flex for responsive layout */}
                    <Flex 
                        direction={["column", "column", "row"]} 
                        align="center" 
                        justify="space-between" 
                        w="100%" 
                        px={4}
                    >
                        {/* Image */}
                        <Image
                            src="/socialmediabloggerPM01.jpeg"
                            w={["100%", "80%", "50%"]} // Adjust width for responsiveness
                            borderRadius="lg"
                            shadow="md"
                            mb={[4, 4, 0]} // Add margin-bottom on small screens to separate from text
                        />
    
                        {/* Text Content */}
                        <VStack 
                            spacing={4} 
                            align={["center", "center", "flex-start"]} // Align left on desktop
                            textAlign={["center", "center", "left"]} // Center on mobile, left on desktop
                            maxW={["100%", "100%", "45%"]} // Adjust width to prevent stretching
                        >
                            <Text fontSize="16px" fontWeight="bold">1. Sign Up on PureMusic</Text>
                            <Text fontSize="14px">Join as a PureMusic Promoter and choose which artists to promote.</Text>
    
                            <Text fontSize="16px" fontWeight="bold">2. Share Content from our Artists</Text>
                            <Text fontSize="14px">Post short highlights of their performances on social media with your unique link to their exclusive content.</Text>
    
                            <Text fontSize="16px" fontWeight="bold">3. Earn Revenue Daily</Text>
                            <Text fontSize="14px">When an artist earns revenue from tips, you get a share of their earnings.</Text>
                        </VStack>
                    </Flex>
    
                    <Button
                        onClick={() => goSignUp()}
                        variant="outline"
                        size="md"
                        bg="white"
                        color="#05c7d0"
                        border="2px solid #05c7d0"
                        px={{ base: "1rem", sm: "1.5rem", md: "2rem" }}
                        _hover={{
                            bg: "#05c7d0",
                            color: "white",
                            borderColor: "#06e4ed",
                            transform: "scale(1.05)",
                            transition: "0.3s ease",
                        }}
                        _active={{
                            transform: "scale(1.02)",
                            boxShadow: "none",
                        }}
                        _focus={{
                            outline: "none",
                        }}
                    >
                        Sign Up Now
                    </Button>
                </VStack>
            </Center>
        );
    };
    



    const IncomeSlider = () => {
        const [conversions, setConversions] = useState(24); // Default at 24

        const avgTip = 15;
        const conductorCut = 0.3;
        const earningsPerConversion = avgTip * conductorCut;

        const calculateEarnings = (convs) => ({
            daily: (convs * earningsPerConversion).toFixed(2),
            monthly: (convs * earningsPerConversion * 30).toFixed(2),
        });

        const earnings = calculateEarnings(conversions);

        return (
            <VStack w="80%" spacing={6} py={10} textAlign="center">
                <Text>
                Earn $3,000+ per month by promoting exclusive content from top emerging artists!
                </Text>
                <Text
                    fontSize="xl"
                    fontWeight="bold"
                    color="gray.700"
                    border="2px solid gray.600"
                    borderRadius="10px"
                    p="10px"
                    paddingLeft="40px"
                    paddingRight="40px"
                    display="inline-block"
                    bg="white"
                    boxShadow="sm"
                    width="auto"
                    maxWidth="100%"
                >
                    Projected Earnings for Promoters
                </Text>

                <Text
                    as="b"
                    fontSize="20px"
                    color="green.500"
                    fontWeight="bold"
                    border="2px solid gray.600"
                    borderRadius="10px"
                    p="10px"
                    display="inline-block"
                    bg="white"
                    boxShadow="md"
                >
                    Monthly Earnings: <b>${parseFloat(earnings.monthly).toLocaleString()}</b>
                </Text>

                <Slider
                    defaultValue={24}
                    min={0}
                    max={100}
                    step={1}
                    onChange={(val) => setConversions(val)}
                    aria-label="Earnings Slider"
                    size="lg"
                >
                    <SliderTrack bg="gray.200">
                        <SliderFilledTrack bg="#05c7d0" />
                    </SliderTrack>

                    <SliderThumb
                        boxSize={6}
                        bg="white"
                        borderRadius="full"
                        border="2px solid #06e4ed"
                    />

                    <SliderMark value={0} mt={2} ml={-1} fontSize="sm" color="gray.600">
                        0
                    </SliderMark>
                    <SliderMark value={100} mt={2} ml={-1} fontSize="sm" color="gray.600">
                        100
                    </SliderMark>
                </Slider>

                <HStack>
                    <Text fontSize="md">Conversions: <b>{conversions}</b> = </Text>
                    <Text
                        fontSize="16px"
                        color="green.500"
                        fontWeight="bold"
                        border="2px solid gray.600"
                        borderRadius="10px"
                        p="10px"
                        display="inline-block"
                        bg="white"
                        boxShadow="sm"
                    >
                        Daily Earnings: <b>${earnings.daily}</b>
                    </Text>
                </HStack>

                {/* Disclaimer */}
                <Text
                    fontSize="10px"
                    color="gray.500"
                    mt={4}
                    textAlign="center"
                >
                    *Subject to terms and conditions, which may vary based on region. Eligibility requirements and territory restrictions apply.
                </Text>
            </VStack>
        );
    };


    return (
        <VStack h="100%" w="100vw" spacing={0}>
            <Box position="relative" w="100%" h="40%">
                <Image
                    //src={images[currentImage]}
                    src="/socialMediaBloggerPM02.jpg"
                    alt="Promoters of MureMusic"
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    opacity="0.8"
                    transition="opacity 1s ease-in-out" // Smooth transition effect
                />


                <Flex
                    flexDirection="column"
                    position="absolute"
                    top="0"
                    left="0"
                    w="100%"
                    h="100%"
                    bg="rgba(0, 0, 0, 0.4)"
                    justifyContent="center"
                    alignItems="center"
                    textAlign="center"
                    px="20px"
                >
                    <Heading
                        color="white"
                        fontSize={["24px", "28px", "32px"]}
                        fontWeight="bold"
                        mb="10px"
                    >
                        Monetize Your Social Media with PureMusic
                    </Heading>
                    <Text
                        color="white"
                        fontSize={["16px", "18px", "20px"]}
                        maxWidth="80%"
                        mb="20px" 
                    >
Turn your social media into steady passive income by promoting exclusive content from our Artists
                    </Text>
                    <Button
                        onClick={() => goSignUp()}
                        variant="outline"
                        size="md"
                        bg="white"
                        color="primary.600"
                        px={{ base: "1rem", sm: "1.5rem", md: "2rem" }}
                        _hover={{
                            color: '#06e4ed', // White text color
                            borderColor: 'white', // White border color
                            outline: "none",
                        }}
                    >
                        Get Started
                    </Button>
                </Flex>
            </Box>

            <IncomeSlider />
            <HowItWorks />

        </VStack>
    )
}
export default PromoterPage