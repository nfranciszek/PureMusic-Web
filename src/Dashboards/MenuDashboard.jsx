import React from 'react'
import { Image, Text, VStack, Box, Button, Flex, HStack, Spacer, useBreakpointValue } from '@chakra-ui/react'
import { IoIosHelpCircleOutline, IoIosHelpCircle } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";


import { IoCloseOutline } from "react-icons/io5";
import { useState, useEffect } from 'react';

import { GoHomeFill } from "react-icons/go";
import { GoHome } from "react-icons/go";

import { BsQrCodeScan } from "react-icons/bs";

import { IoWallet } from "react-icons/io5";
import { IoWalletOutline } from "react-icons/io5";


import { SlSupport } from "react-icons/sl";

import { IoPersonCircleOutline } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";

import { TbLogout2 } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

import { useLocation } from 'react-router-dom';

import { MdOutlineKeyboardArrowRight } from "react-icons/md";

import { CiBookmarkPlus } from "react-icons/ci";

import { IoLanguageOutline } from "react-icons/io5";

import { GiGearStickPattern } from "react-icons/gi";

import { useData } from '../App';

const MenuDashboard = () => {


    const isBaseScreen = useBreakpointValue({ base: true, sm: false, md: false });

    const isLargeScreen = useBreakpointValue({ base: false, sm: false, md: false, lg: true });

    const [isVisible, setIsVisible] = useState(false);

    const { pathname } = useLocation()

    const navigate = useNavigate()

    const { showMenuDashboard, setMenuDashboard,
        showPayoutDetails, setShowPayoutDetails,

        homeSelected, setHomeSelected,
        shareQRSelected, setShareQRSelected,
        payoutDetailsSelected, setPayoutDetailsSelected,
        helpSelected, setHelpSelected,
        logoutPageSelected, setLogoutPageSelected,
    } = useData();

    const [isSubscriptionClicked, setIsSubscriptionClicked] = useState(false);
    const [isLanguageClicked, setIsLanguageClicked] = useState(false);
    const [isAdvancedClicked, setIsAdvancedClicked] = useState(false);

    const [isDeleteProfileClicked, setDeleteProfileClicked] = useState(false);

    const [title, setTitle] = useState("Settings");


    const closeSettings = () => {

        //setSettingsSelected(false);

        setMenuDashboard(false);
    };




    const goHome = () => {
        setHomeSelected(true);
        setShareQRSelected(false);
        setPayoutDetailsSelected(false);
        setShowPayoutDetails(false);
        closeSettings();

        setHelpSelected(false);

        navigate("/dashboard");

    
        setLogoutPageSelected(false);
    };

    const goQRShareContent = () => {
        setHomeSelected(false);
        setShareQRSelected(true);
        setPayoutDetailsSelected(false);

        closeSettings();

        setHelpSelected(false);

        setLogoutPageSelected(false);
    };

    const goPaymentDetails = () => {
        setHomeSelected(false);
        setShareQRSelected(false);
        setPayoutDetailsSelected(true);


        // for payment links page
        setShowPayoutDetails(true);
        setMenuDashboard(false);

        setHelpSelected(false);

        setLogoutPageSelected(false);
    };

    const goHelp = () => {
        setHomeSelected(false);
        setShareQRSelected(false);
        setPayoutDetailsSelected(false);


        // for payment links page
        setShowPayoutDetails(false);
        setMenuDashboard(false);

        closeSettings();

        setHelpSelected(true);

        setLogoutPageSelected(false);
    };


    const goLogOut = () => {
        setHomeSelected(false);
        setShareQRSelected(false);
        setPayoutDetailsSelected(false);


        // for payment links page
        setShowPayoutDetails(false);
        setMenuDashboard(false);

        closeSettings();

        setHelpSelected(false);

        setLogoutPageSelected(true);
    };

    const goDeleteAccount = () => {


    }

    const goToHelp = () => {

    }



    const openLogoutPopup = () => {

        setSettingsSelected(false);
        // setLogOutClicked(true);

    };


    const isSmallScreen = useBreakpointValue({ base: true, md: false });

    return (


        <Box
            pl={isSmallScreen ? null : "5px"}
            position="fixed"
            top="0"
            left="0"
            height="100%"
            bg="white"
            borderRight={isSmallScreen ? null : "1px solid #e4e4e4"}
            transition="left 0.6s ease" // Slower transition
            zIndex={4}
            pb="8px"
            width="320px"
        >




            {/* <VStack paddingInlineStart="6px" paddingInlineEnd="8px" pl={isBaseScreen ? "1rem" : "5rem"}> */}

            <VStack>



                <Flex direction="column" >

                    <HStack pt="1rem" pb="1rem" ml="1rem">

                        {isSmallScreen && (
                            <IoCloseOutline onClick={closeSettings} size='30px' />
                        )}


                    </HStack>



                    <VStack>


                        <Image
                            src="/PureMusicLogo.jpeg"
                            borderRadius='full'
                            width="50px"
                            maxH="40px"
                            className="profile-image-circle"
                            alt='puremusic logo'
                        />

                        <Text>Nathanael</Text>






                        <Box pl="1rem" pr="1rem" rounded="md" width={{ base: "100%", sm: "320px", lg: "320px" }}>










                            <Spacer />


                            <Button
                                width="100%"
                                color="black"
                                leftIcon={homeSelected ? <GoHomeFill fontSize="24px" /> : <GoHome fontSize="24px" />}
                                onClick={goHome}
                                bg="white"
                                rounded="none"
                                justifyContent="flex-start"
                                textAlign="left"
                                _hover={{
                                    bg: 'rgba(220, 220, 220, 0.1)',
                                    transform: "scale(1.022)",
                                }}
                            >
                                <Flex justifyContent="space-between" alignItems="center" width={{ base: "100%", sm: "440px", lg: "440px" }}>
                                    <Text fontSize='sm' color="black" >Home</Text>
                                    <MdOutlineKeyboardArrowRight />
                                </Flex>


                            </Button>

                            <Button
                                width="100%"
                                color="black"
                                leftIcon={<BsQrCodeScan fontSize="24px" />}
                                onClick={goQRShareContent}
                                bg="white"
                                rounded="none"
                                justifyContent="flex-start"
                                textAlign="left"
                                _hover={{
                                    bg: 'rgba(220, 220, 220, 0.1)',
                                    transform: "scale(1.022)",
                                }}
                            >
                                <Flex justifyContent="space-between" alignItems="center" width={{ base: "100%", sm: "440px", lg: "440px" }}>
                                    <Text fontSize='sm' color="black">Share Content</Text>


                                    <MdOutlineKeyboardArrowRight />
                                </Flex>


                            </Button>

                            <Button
                                width="100%"
                                color="black"
                                leftIcon={payoutDetailsSelected ? <IoWallet fontSize="24px" /> : <IoWalletOutline fontSize="24px" />}
                                onClick={goPaymentDetails}
                                bg="white"
                                rounded="none"
                                justifyContent="flex-start"
                                textAlign="left"
                                _hover={{
                                    bg: 'rgba(220, 220, 220, 0.1)',
                                    transform: "scale(1.022)",
                                }}
                            >
                                <Flex justifyContent="space-between" alignItems="center" width={{ base: "100%", sm: "440px", lg: "440px" }}>
                                    <Text fontSize='sm' color="black">Payment Links</Text>

                                    <MdOutlineKeyboardArrowRight />
                                </Flex>


                            </Button>

                            <Button 
                                width="100%"
                                color="black"
                                leftIcon={helpSelected ? <IoIosHelpCircle fontSize="24px" /> : <IoIosHelpCircleOutline fontSize="24px" />}
                                onClick={goHelp}
                                bg="white"
                                rounded="none"
                                justifyContent="flex-start"
                                textAlign="left"
                                _hover={{
                                    bg: 'rgba(220, 220, 220, 0.1)',
                                    transform: "scale(1.022)",
                                }}
                            >
                                <Flex justifyContent="space-between" alignItems="center" width={{ base: "100%", sm: "440px", lg: "440px" }}>
                                    <Text fontSize='sm' color="black">Help</Text>

                                    <MdOutlineKeyboardArrowRight />
                                </Flex>


                            </Button>


                            <Text ml="1rem" fontSize="12px" textColor="gray.500" 
                                pt="3rem">Settings</Text>
                            <Button

                                width="100%"
                                color="black"
                                onClick={goLogOut}
                                leftIcon={logoutPageSelected ? <IoLogOut fontSize="24px" /> : <IoLogOutOutline fontSize="24px" />}
                                bg="white"
                                rounded="none" // Remove rounded corners
                                justifyContent="flex-start" // Align content to the start (left)
                                textAlign="left" _hover={{
                                    bg: 'rgba(220, 220, 220, 0.1)',
                                    transform: "scale(1.022)",
                                }}>


                                <Flex justifyContent="space-between" alignItems="center" width={{ base: "100%", sm: "440px", lg: "440px" }}>
                                    <Text fontSize='sm'>Log out</Text>
                                    <MdOutlineKeyboardArrowRight />
                                </Flex>



                            </Button>







                        </Box>

                    </VStack>


                </Flex>
            </VStack>


        </Box>
    )
}

export default MenuDashboard