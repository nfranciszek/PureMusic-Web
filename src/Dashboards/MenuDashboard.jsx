import React from 'react'
import { Image, Text, VStack, Box, Button, Flex, HStack, Spacer, useBreakpointValue } from '@chakra-ui/react'
import { IoIosHelpCircleOutline, IoIosHelpCircle } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";

import { IoPeopleOutline } from "react-icons/io5";
import { IoPeople } from "react-icons/io5";

import { BsPeopleFill } from "react-icons/bs";
import { BsPeople } from "react-icons/bs";



import { currentUserId } from '../Utilities/firebase';
import { fetchUserData, fetchUserStatus } from './UserProfile';

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


        promoterTabSelected, setPromoterTabSelected,
        artistTabSelected, setArtistTabSelected,

        userIsArtist,
        userIsPromoter,
        userIsFan,
        userIsAdmin, } = useData();

    const [userType, setUserType] = useState("");

    useEffect(() => {
        if (userIsArtist) {
            setUserType("Artist");
        } else if (userIsPromoter) {
            setUserType("Promoter");
        } else {
            setUserType("Fan");  
        }

    }, [userIsArtist, userIsPromoter, userIsFan]);


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

        setPromoterTabSelected(false);
        setArtistTabSelected(false);
    };

    const goQRShareContent = () => {
        setHomeSelected(false);
        setShareQRSelected(true);
        setPayoutDetailsSelected(false);

        closeSettings();

        setHelpSelected(false);

        setLogoutPageSelected(false);

        setPromoterTabSelected(false);
        setArtistTabSelected(false);
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

        setPromoterTabSelected(false);
        setArtistTabSelected(false);
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

        setPromoterTabSelected(false);
        setArtistTabSelected(false);
    };

    const goToPromotersList = () => {
        setHomeSelected(false);
        setShareQRSelected(false);
        setPayoutDetailsSelected(false);


        // for payment links page
        setShowPayoutDetails(false);
        setMenuDashboard(false);

        closeSettings();

        setHelpSelected(false);

        setLogoutPageSelected(false);

        setPromoterTabSelected(true);
        setArtistTabSelected(false);
    };

    const goToArtistsList = () => {
        setHomeSelected(false);
        setShareQRSelected(false);
        setPayoutDetailsSelected(false);


        // for payment links page
        setShowPayoutDetails(false);
        setMenuDashboard(false);

        closeSettings();

        setHelpSelected(false);

        setLogoutPageSelected(false);

        setPromoterTabSelected(false);
        setArtistTabSelected(true);
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

        setPromoterTabSelected(false);
        setArtistTabSelected(false);
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

    const [userData, setUserData] = useState(null); // State to hold user data


    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchUserData(currentUserId); // Fetch user data using the utility function
                setUserData(data); // Set the fetched data to state
            } catch (err) {
                console.error(err);
            }
        };

        if (currentUserId) {
            getData(); // Call the function to fetch the data if the UID exists
        }
    }, [currentUserId]);


    const [status, setStatus] = useState('loading'); // Default to loading while fetching

    const [statusInfo, setStatusInfo] = useState('');
    const [statusColor, setStatusColor] = useState('');
    const [textColor, setTextColor] = useState('');
    useEffect(() => {
        const getStatus = async () => {
            const userStatus = await fetchUserStatus(currentUserId, userType);
            setStatus(userStatus); // Set the user status based on the fetch result
            renderStatusInfo(userStatus);
        };
        if (currentUserId && userType) {
            getStatus();
        }
    }, [currentUserId, userType]);

    const renderStatusInfo = (status) => {
        switch (status) {
            case 'pending':
                setStatusInfo("Awaiting Approval");
                setStatusColor("#FFA500");
                setTextColor("#FFA500");
                break;

            case 'approved':
                setStatusInfo("Active");
                setStatusColor("#4CAF50");
                setTextColor("#4CAF50");
                break;

            case 'rejected':
                setStatusInfo("Account Rejected");
                setStatusColor("#FF0000");
                setTextColor("#FF0000");
                break;

            case 'paused':
                setStatusInfo("Paused");
                setStatusColor("#FFA500");
                setTextColor("#FFA500");
                break;

            case 'suspended':
                setStatusInfo("Suspended");
                setStatusColor("gray.600");
                setTextColor("gray.600");
                break;



            case 'terminated':
                setStatusInfo("Terminated");
                setStatusColor("#FF0000");
                setTextColor("#FF0000");
                break;

            case 'non-existent':
                setStatusInfo("Pending Status...");
                setStatusColor("#FF0000");
                setTextColor("#FF0000");
                break;
            case 'error':
                setStatusInfo("Pending Status...");
                setStatusColor("#FFA500");
                setTextColor("#FFA500");
                break;
            default:
                setStatusInfo("Pending Status...");
                setStatusColor("#FFA500");
                setTextColor("#FFA500");
        }
    };

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

                        {userData && (
                            <>
                                <Image
                                    src={userData.profilePhoto}
                                    borderRadius='full'
                                    width="50px"
                                    maxH="50px"
                                />
                                <VStack gap={-20}>
                                    <Text fontSize="16px">{userData.name}</Text>
                                    <Text fontSize="14px">{userData.username}</Text>
                                </VStack>
                            </>
                        )}

                        {!userIsAdmin && (
                            <>
                                {/* Account Status Section */}
                                <Flex align="center" gap={2} ml="1rem" >
                                    {/* Yellow Circle */}
                                    <Box
                                        width="8px"
                                        height="8px"
                                        borderRadius="50%"
                                        backgroundColor={statusColor} // Amber color (darker yellow)
                                    />

                                    {/* "Awaiting Approval" Text */}
                                    <Text fontSize="12px" fontWeight="600" color={textColor} >
                                        {statusInfo}
                                    </Text>

                                </Flex>
                            </>)}

                        <Box pl="1rem" pr="1rem" rounded="md" width={{ base: "100%", sm: "320px", lg: "320px" }}>










                            <Spacer />

                            {userIsAdmin ? (
                                <>

                                    <Button
                                        width="100%"
                                        color="black"
                                        leftIcon={promoterTabSelected ? <BsPeopleFill fontSize="24px" /> : <BsPeople fontSize="24px" />}
                                        onClick={goToPromotersList}
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
                                            <Text fontSize='sm' color="black" >Promoters</Text>
                                            <MdOutlineKeyboardArrowRight />
                                        </Flex>


                                    </Button>

                                    <Button
                                        width="100%"
                                        color="black"
                                        leftIcon={artistTabSelected ? <IoPeople fontSize="24px" /> : <IoPeopleOutline fontSize="24px" />}
                                        onClick={goToArtistsList}
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
                                            <Text fontSize='sm' color="black">Artists</Text>


                                            <MdOutlineKeyboardArrowRight />
                                        </Flex>
                                    </Button>

                                </>
                            ) : (
                                <>

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
                                            <Text fontSize='sm' color="black">Promote Content</Text>


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

                                </>
                            )}




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