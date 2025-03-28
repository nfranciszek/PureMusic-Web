import React, { useRef, useState, useEffect } from 'react';
import { Center, VStack, Box, Button, Image, Heading, Text, Flex, Slider, SliderMark, SliderTrack, SliderFilledTrack, SliderThumb, HStack } from "@chakra-ui/react";

import { useNavigate } from 'react-router-dom';


const PromoterPage = () => {

    const navigate = useNavigate();
    const [currentImage, setCurrentImage] = useState(0);

    const images = [
        "/TrainConductorPureMusic.jpg",
        "/FlightAttenants02PureMusic.jpg",
    ];


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage === 0 ? 1 : 0));
        }, 5000); // Switch image every 15 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    const goSignUp = () => {
        navigate("/signup");
    }

    const HowItWorks = () => {
        return (
            <Center w="100%" py={10} textAlign="center">
                <VStack spacing={8} maxW="80%" align="center">
                    <Heading fontSize="2xl"
                        color="gray.800"
                        fontWeight="extrabold"
                        mb={4}
                        border="2px solid gray.600" // Add a gray border
                        borderRadius="10px" // Rounded corners
                        p="10px" // Padding to make it more button-like
                        paddingLeft="40px" // Increase left padding
                        paddingRight="40px" // Increase right padding
                        display="inline-block" // Ensure it's not taking full width
                        bg="white" // White background
                        boxShadow="sm"
                        width="auto" // Make the width auto to fit content, but still dynamic
                        maxWidth="100%" // Optional: ensure it doesn't go beyond the screen width
                    >
                        How It Works
                    </Heading>
                    <HStack spacing={8} align="center" flexWrap="wrap">
                        <Image
                            src="/TrainConductorScanPureMusic.jpg"
                            w={["100%", "60%", "50%"]}
                            borderRadius="lg"
                            shadow="md"
                        />
                        <VStack spacing={4} align="flex-start" textAlign="left">
                            <Text fontSize="16px" color="gray.600" fontWeight="500">
                                1. Sign Up as a PureMusic Promoter
                            </Text>
                            <Text fontSize="16px" color="gray.600" fontWeight="500">
                                2. Share Artist Performances with Passengers
                            </Text>
                            <Text fontSize="16px" color="gray.600" fontWeight="500">
                                3. Earn Tips Daily!
                            </Text>
                        </VStack>
                    </HStack>

                    <Button
                        onClick={() => goSignUp()}
                        variant="outline"
                        size="md"
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
                    If your job involves meeting hundreds of people daily, you can earn an extra $3000+ per month just by introducing passengers to PureMusic.
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
                    src="/TrainConductorPureMusic.jpg"
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
                        Become a PureMusic Promoter and Earn $100+ Per Day
                    </Heading>
                    <Text
                        color="white"
                        fontSize={["16px", "18px", "20px"]}
                        maxWidth="80%"
                        mb="20px"
                    >
                        Turn your daily interactions at work into extra income
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