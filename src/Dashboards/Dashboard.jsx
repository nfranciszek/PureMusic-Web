import React, { useState, useEffect } from 'react';
import { Box, Image, Button, Flex, VStack, Text, HStack, Spacer, Select, Input, List, ListItem, IconButton, useBreakpointValue } from '@chakra-ui/react'
import { useNavigate, useLocation } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";
import { DeleteIcon } from "@chakra-ui/icons";

import ShareContentPage from '../pages/ShareContentPage';
import Help from '../Website Policies/Help';
import LogoutPage from '../pages/LogoutPage';
// import { updatePayoutDetails, checkPayoutExists, getPayoutDetails, checkForLeadAmbassador, getAmbassadorStats, getLeadAmbassadorStats, getCurrentMonthAndYear, testUpdate, fetchArchivedStats } from '../../Utilities/Ambassador';
import { getCurrentMonthAndYear, removePayoutVenmo, removePayoutZelle } from './DashboardConfig';
// import { currentUserId } from '../../Utilities/firebase';
// import { validateEmail } from '../../pages/AuthPages/CreateAccount';
import MenuDashboard from './MenuDashboard';
import { useData } from '../App';


const Dashboard = () => {
    const isBaseScreen = useBreakpointValue({ base: true, sm: false, md: false });

    const isLargeScreen = useBreakpointValue({ base: false, sm: false, md: false, lg: true });

    const isPhonecreen = useBreakpointValue({ base: true, sm: false, md: false, lg: false });



    const [isLeadAmbassador, setLeadAmbassador] = useState(false);

    const [isViewPastEarnings, setViewPastEarnings] = useState(false);

    const { pathname } = useLocation()

    const navigate = useNavigate()

    const { showMenuDashboard, setMenuDashboard,
        showPayoutDetails, 
        
        setShowPayoutDetails,
      homeSelected, setHomeSelected,
      shareQRSelected, setShareQRSelected,
      payoutDetailsSelected, setPayoutDetailsSelected,
      helpSelected,
      logoutPageSelected } = useData();

    const includedTalkCirclePaths = [


        '/talkcircles',
        '/talkcircles/session='
    ];

    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());



    const TalkCirclePaths = includedTalkCirclePaths.some(path => pathname.includes(path));

    const [archivedStats, setArchivedStats] = useState({
        liveUsers12: 0,
        liveUsers25: 0,
        liveUsers50: 0,
        liveUsers100: 0,
        liveUsers300: 0,
        liveUsers500: 0,
        //  peopleInvited: 0,
        peopleMet: 0,
        storyListens: 0
    });

    const monthMap = {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December"
    };

    const [currentMonthIndex, setCurrentMonthIndex] = useState(0);

    const showPastEarnings = async () => {
        let uid = currentUserId; // Define uid properly

        continueShowPastEarnings(uid, currentYear);
    }



    const continueShowPastEarnings = async (uid, year) => {

        //  const data = await fetchArchivedStats(uid, year); // Fetch from database

        if (data) {
            // Sort the months by their numerical order
            const sortedData = Object.entries(data)
                .sort(([monthA], [monthB]) => monthA - monthB) // Sort numerically
                .reduce((acc, [month, stats]) => {
                    // Convert numeric month to name
                    const monthName = monthMap[month];
                    acc[monthName] = {
                        liveUsers12: stats["12+LiveUsers"] || 0,
                        liveUsers25: stats["25+LiveUsers"] || 0,
                        liveUsers50: stats["50+LiveUsers"] || 0,
                        liveUsers100: stats["100+LiveUsers"] || 0,
                        liveUsers300: stats["300+LiveUsers"] || 0,
                        liveUsers500: stats["500+LiveUsers"] || 0,
                    };
                    return acc;
                }, {});

            console.log("Sorted and Formatted Data:", sortedData);
            setArchivedStats(sortedData);

            // Initialize the currentMonthIndex to the most recent month
            const monthNames = Object.keys(sortedData);
            setCurrentMonthIndex(monthNames.length - 1); // St
        }

        setViewPastEarnings(true); // Set state after fetching data
    };

    const goToPreviousMonth = async () => {
        if (currentMonthIndex > 0) {
            // If we're not in January, just go to the previous month
            setCurrentMonthIndex(currentMonthIndex - 1);
        } else {
            // If we're in January, go back to the previous year and set the month to December
            const newYear = currentYear - 1; // Calculate the previous year
            setCurrentYear(newYear); // Update year in state

            await continueShowPastEarnings(currentUserId, newYear); // Fetch data for the previous year

            // After fetching data, check if the data for the previous year exists
            const previousYearData = archivedStats[newYear];
            if (!previousYearData) {
                console.log("No archived data found for the previous year.");
                setArchivedStats({});  // Fallback if no data exists for the previous year
            } else {
                setCurrentMonthIndex(11);  // Set to December (month index 11)
            }
        }
    };

    const goToNextMonth = async () => {
        const monthNames = Object.keys(archivedStats);

        if (currentMonthIndex < monthNames.length - 1) {
            // If we're not in December, just go to the next month
            setCurrentMonthIndex(currentMonthIndex + 1);
        } else {
            // If we're in December, go forward to the next year and set the month to January (index 0)
            const newYear = currentYear + 1; // Increment year
            setCurrentYear(newYear); // Update year in state

            await continueShowPastEarnings(currentUserId, newYear); // Fetch data for the next year

            // After fetching data, check if the data for the new year exists
            const nextYearData = archivedStats[newYear];
            if (!nextYearData) {
                console.log("No archived data found for the next year.");
                setArchivedStats({});  // Fallback if no data exists for the next year
            } else {
                setCurrentMonthIndex(0); // Set to January (month index 0)
            }
        }
    };

    const showCurrentEarnings = () => {

        setViewPastEarnings(false);

    }

    // Get the month data for the current month
    const monthNamesABA = Object.keys(archivedStats);
    const currentMonthABA = monthNamesABA[currentMonthIndex];
    const statsABA = archivedStats[currentMonthABA];



    const [error, setError] = useState('');

    const venmoIcon = "/Venmo_logo.png";
    const zelleIcon = "/zelle-round-logo-icon.png";


    const [payoutMethods, setPayoutMethods] = useState([]);
    const [venmoUsername, setVenmoUsername] = useState("");
    const [zelleDetail, setZelleDetail] = useState("");
    const [zelleType, setZelleType] = useState("Zelle (Email)");


    const [stats, setStats] = useState({
        liveUsers12: 0,
        liveUsers25: 0,
        liveUsers50: 0,
        liveUsers100: 0,
        liveUsers300: 0,
        liveUsers500: 0,
        //  peopleInvited: 0,
        peopleMet: 0,
        storyListens: 0
    });




    const [time, setTime] = useState({
        currentYear: 0,
        payoutMonth: "",
    });

    useEffect(() => {


        const fetchTime = async () => {
            const getTime = await getCurrentMonthAndYear();
            if (getTime) {
                setTime(getTime);
            }
        };

        fetchTime();
    }, []);

    // Define the rate values
    const rates = {
        //  "peopleInvited": 1,
        "peopleMet": 1,
        "storyListens": 0.04,
        "12+": 10,
        "25+": 20,
        "50+": 30,
        "100+": 50,
        "300+": 75,
        "500+": 100
    };


    const calculateSingularEarnings = (count, rate) => {
        return (count * rate).toFixed(2); // Ensure the result is a string with two decimal points
    };

    // Calculate earnings by multiplying the count of live users with the respective rate
    const calculateEarnings = (isLeadAmbassador, stats) => {
        let totalEarnings = 0;

        if (isLeadAmbassador) {
            // Calculate earnings based on live user stats for lead ambassador
            totalEarnings += stats.liveUsers12 * rates["12+"];
            totalEarnings += stats.liveUsers25 * rates["25+"];
            totalEarnings += stats.liveUsers50 * rates["50+"];
            totalEarnings += stats.liveUsers100 * rates["100+"];
            totalEarnings += stats.liveUsers300 * rates["300+"];
            totalEarnings += stats.liveUsers500 * rates["500+"];
        } else {
            // Calculate earnings based on other stats for non-lead ambassador
            //  totalEarnings += stats.peopleInvited * rates["peopleInvited"];
            totalEarnings += stats.peopleMet * rates["peopleMet"];
            totalEarnings += stats.storyListens * rates["storyListens"];
        }

        return totalEarnings.toFixed(2);  // Ensure the earnings are formatted with 2 decimals
    };

    const totalEarnings = calculateEarnings(isLeadAmbassador, stats);


    const handleBackButton = () => {
        if (showPayoutDetails) {
            setShowPayoutDetails(false);
            setPayoutDetailsSelected(false);
            setHomeSelected(true);
        } else if (shareQRSelected) {
            setShareQRSelected(false);
            setHomeSelected(true);
        }
        //  } else {
        //      setDashboardSelected(false);
        //   }
    }

    const addPayoutMethod = (type, detail) => {
        // Check if the input detail is empty
        if (!detail) {
            setError("Fields cannot be empty");
            return;
        }

        // Check if the type is "Zelle (Email)" and validate the email
        if (type === "Zelle (Email)") {
            if (!validateEmail(detail)) {
                setError("Invalid email address");
                return;
            }
        }
        // Check if the type is "Zelle (Phone)" and validate the phone number
        else if (type === "Zelle (Phone)") {

            if (detail.length !== 10 || !/^\d+$/.test(detail)) {
                setError("Phone number must be a valid 10-digit U.S. phone number!");
                return;
            }
        }

        setError(null);

        // Update local state first
        setPayoutMethods((prevMethods) => [
            ...prevMethods,
            { type, detail }
        ]);


        updatePayoutDetails(currentUserId, type, detail);

        if (type === "Venmo") {
            setVenmo(detail);

        } else if (type === zelleType) {
            setZelle(detail);
        }

    };

    const removePayoutMethod = (index, method) => {
        setPayoutMethods(payoutMethods.filter((_, i) => i !== index));
        handleRemovePayoutMethod(method.type, currentUserId);

    };


    const [venmo, setVenmo] = useState(null);
    const [zelle, setZelle] = useState(null);

    const handleRemovePayoutMethod = async (type, currentUserId) => {
        // Remove the method from the state
        setPayoutMethods(prevMethods => prevMethods.filter(method => method.type !== type));

        // Remove from the database
        if (type === 'Venmo') {
            await removePayoutVenmo(currentUserId);
            setVenmo(null);
            setVenmoUsername(null);

        } else if (type === 'Zelle') {
            await removePayoutZelle(currentUserId);
            setZelle(null);
            setZelleDetail(null);
        }
    };




    /*
        useEffect(() => {
            const fetchPayoutDetails = async () => {
                const details = await getPayoutDetails(currentUserId);
                setVenmo(details.venmo);
                setZelle(details.zelle);
            };
    
            fetchPayoutDetails();
        }, [currentUserId]);
        */

    const [payoutExists, setPayoutExists] = useState(false);

    /*
    useEffect(() => {
        const fetchPayoutStatus = async () => {
            const exists = await checkPayoutExists(currentUserId);
            setPayoutExists(exists);
        };

        fetchPayoutStatus();

        if (!zelle & !venmo) {
            setPayoutExists(false);
        }
    }, [currentUserId, zelle, venmo]);
*/


    /*
        useEffect(() => {
            const getAmbassadorRank = async () => {
                const exists = await checkForLeadAmbassador(currentUserId);
                setLeadAmbassador(exists);
    
                if (exists) {
                    const fetchedStats = await getLeadAmbassadorStats(currentUserId);
                    if (fetchedStats) {
                        setStats(fetchedStats);
                    }
                } else {
                    const fetchedStats = await getAmbassadorStats(currentUserId);
                    if (fetchedStats) {
                        setStats(fetchedStats);
                    }
                }
            };
    
            getAmbassadorRank();
    
    
        }, [currentUserId]);
    */

    /**/

    /*
    useEffect(() => {
        const setTest = async () => {
            await testUpdate(currentUserId);

        };

        setTest();


    }, [currentUserId]);
*/

    return (
        <Box
            position="fixed"
            top="0"
            height="100%"
            bg="white"
            transition="left 0.6s ease" // Slower transition
            zIndex="0"
            pb="8px"
            pt="3rem"
            overflowY="auto">


            {(showMenuDashboard && isBaseScreen) ? (
                <>

                    <MenuDashboard />
                </>

            ) : shareQRSelected ? (
<>

<ShareContentPage/>

</>

) : helpSelected ? (
    <>
<Help/>
    </>

) : logoutPageSelected ? (
    <>
    <LogoutPage/>
        </>
    
            ) : (

                <VStack paddingInlineStart="6px" paddingInlineEnd="8px" pl={isBaseScreen ? "1rem" : "2rem"}>
                    <Flex direction="column">

                        <HStack pt="1rem" pb="1rem">

                            {showPayoutDetails && (
                                <IoArrowBack onClick={() => handleBackButton()} fontSize='24px' />
                            )}
                            <Text as='b' fontSize='24px' pt="1rem" pb="1rem ">Dashboard</Text>

                        </HStack>

                        {showPayoutDetails ? (



                            <>
                                {/* Payout Method Input */}
                                {payoutExists || venmoUsername || zelleDetail ? (
                                    <Text fontWeight="bold" fontSize="14px" color="gray.600">Add or Remove Payout Method</Text>
                                ) : (
                                    <Text fontWeight="bold" fontSize="14px" color="gray.600">Add Payout Method</Text>
                                )}


                                {!venmo && (
                                    <>

                                        {/* Venmo Section */}
                                        <HStack w="100%">
                                            <Select isReadOnly value="Venmo" size="sm" w="80%">
                                                <option value="Venmo">Venmo</option>
                                            </Select>
                                            <Input
                                                placeholder="Enter Venmo Username"
                                                value={venmoUsername}
                                                onChange={(e) => setVenmoUsername(e.target.value)}
                                                size="sm"
                                                type="text"
                                            />
                                            <Button colorScheme="green" size="sm" onClick={() => addPayoutMethod("Venmo", venmoUsername)}>
                                                Add
                                            </Button>
                                        </HStack>
                                    </>
                                )}

                                {error && (
                                    <Text fontSize={12} color="red.500" mt={1}>
                                        {error}
                                    </Text>
                                )}
                                {!zelle && (
                                    <>

                                        {/* Zelle Section */}
                                        <HStack w="100%" mt={2}>
                                            <Select value={zelleType} onChange={(e) => setZelleType(e.target.value)} size="sm" w="80%">
                                                <option value="Zelle (Email)">Zelle (Email)</option>
                                                <option value="Zelle (Phone)">Zelle (Phone)</option>
                                            </Select>
                                            <Input
                                                placeholder={zelleType === "Zelle (Phone)" ? "Enter Phone Number" : "Enter Email Address"}
                                                value={zelleDetail}
                                                onChange={(e) => setZelleDetail(e.target.value)}
                                                size="sm"
                                                type={zelleType === "Zelle (Phone)" ? "tel" : "email"}
                                            />
                                            <Button colorScheme="green" size="sm" onClick={() => addPayoutMethod(zelleType, zelleDetail)}>
                                                Add
                                            </Button>
                                        </HStack>
                                    </>
                                )}




                                {/* Display Added Payout Methods */}





                                <List w="100%" spacing={3} mt="1rem">

                                    {venmo && (
                                        <>
                                            <ListItem
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="space-between"
                                                p={2}
                                                border="1px solid gray"
                                                borderRadius="md"
                                            >
                                                <HStack>
                                                    <Image
                                                        src={venmoIcon}
                                                        boxSize="20px"
                                                    />
                                                    <Text>{venmo}</Text>
                                                </HStack>
                                                <IconButton
                                                    icon={<DeleteIcon />}
                                                    size="xs"
                                                    colorScheme="red"
                                                    onClick={() => handleRemovePayoutMethod('Venmo', currentUserId)}
                                                />
                                            </ListItem>

                                        </>
                                    )}

                                    {zelle && (

                                        <>
                                            <ListItem
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="space-between"
                                                p={2}
                                                border="1px solid gray"
                                                borderRadius="md"
                                            >
                                                <HStack>
                                                    <Image
                                                        src={zelleIcon}
                                                        boxSize="20px"
                                                    />
                                                    <Text>{zelle}</Text>
                                                </HStack>
                                                <IconButton
                                                    icon={<DeleteIcon />}
                                                    size="xs"
                                                    colorScheme="red"
                                                    onClick={() => handleRemovePayoutMethod('Zelle', currentUserId)}
                                                />
                                            </ListItem>

                                        </>
                                    )}
                                </List>








                            </>


                        ) : (
                            <>
                                <Box
                                    bg="white"
                                    border="1px solid black"
                                    borderRadius="md"
                                    p="1rem"
                                    boxShadow="sm"
                                    w="100%"
                                >
                                    <HStack justify="space-between" w="100%" spacing={6} align="start"  >
                                        <Flex direction={isPhonecreen ? "column" : "row"}>
                                            {/* Current Month's Earnings */}
                                            <VStack align="start" spacing={1}>
                                                <Text fontWeight="bold" fontSize="14px" color="gray.600">Total Earnings (This Month)</Text>
                                                <Text fontWeight="bold" fontSize="20px" color="green.500">${totalEarnings}</Text>
                                                <Text fontSize="12px" color="gray.500" mr="3rem">Earnings under $25 will roll over to the next month's payout cycle</Text>

                                                {isViewPastEarnings && (
                                                    <Button size="xs" colorScheme="green" variant="outline" onClick={showCurrentEarnings}>
                                                        See Current Earnings
                                                    </Button>
                                                )}

                                            </VStack>

                                            {/* Last Month's Earnings */}
                                            <VStack align="start" spacing={1}>
                                                <Text fontWeight="bold" fontSize="14px" color="gray.600">Last Month's Earnings</Text>
                                                <Text fontWeight="bold" fontSize="16px" color="black">$0.00</Text>

                                                {!isViewPastEarnings && (
                                                    <Button size="xs" colorScheme="blue" variant="outline" onClick={showPastEarnings}>
                                                        See Past Earnings
                                                    </Button>
                                                )}

                                            </VStack>
                                        </Flex>
                                        <Flex direction={isPhonecreen ? "column" : "row"}>
                                            {/* Rollover Earnings (Held from Previous Months) */}
                                            <VStack align="start" spacing={1}>
                                                <Text fontWeight="bold" fontSize="14px" color="gray.600">Rollover Earnings</Text>
                                                <Text fontWeight="bold" fontSize="16px" color="black">$0.00</Text>

                                                <Text fontSize="12px" color="gray.500" mr="3rem">Previously unpaid earnings that will be moved to Payout Initiation once they reach $25.</Text>
                                            </VStack>

                                            {/* Payout Initiation Date */}
                                            <VStack align="start" spacing={1}>
                                                <Text fontWeight="bold" fontSize="14px" color="gray.600">Payout Initiation</Text>
                                                <Text fontWeight="bold" fontSize="16px" color="black">$0.00</Text>
                                                <Text fontSize="12px" color="black">Next Payout: {time.payoutMonth} 15</Text>
                                                <Text fontSize="12px" color="gray.500">Covers last month's earnings</Text>
                                            </VStack>
                                        </Flex>
                                    </HStack>
                                </Box>

                                <Box
                                    bg="white"
                                    border="1px solid black"
                                    borderRadius="md"
                                    p="1rem"
                                    boxShadow="sm"
                                    w="100%"
                                    mt="1rem"
                                >


                                    {!isViewPastEarnings ? (
                                        <HStack justify="space-between" w="100%" spacing={isPhonecreen ? 2 : 6} wrap="wrap">



                                            <>





                                                {/* Column: Numbers */}
                                                <VStack align="center" spacing={3}>
                                                    <Text fontWeight="bold" fontSize="14px" color="gray.600">Tip Rate</Text>
                                                    {/*     <Text fontSize="12px" color="black">$1.00</Text>*/}
                                                    <Text fontSize="12px" color="black">$3.00</Text>
                                                    <Text fontSize="12px" color="black">$4.50</Text>
                                                    <Text fontSize="12px" color="black">$7.50</Text>
                                                    <Text fontSize="12px" color="black">$9.00</Text>
                                                    <Text fontSize="12px" color="black">$15.00</Text>
                                                    <Text fontSize="12px" color="black">$30.00</Text>
                                                </VStack>

                                                {/* Column: Numbers */}
                                                <VStack align="center" spacing={3}>
                                                    <Text fontWeight="bold" fontSize="14px" color="gray.600">Conversions</Text>
                                                    {/*  <Text fontSize="12px" color="black">{stats.peopleInvited}</Text> */}
                                                    <Text fontSize="12px" color="black">{stats.peopleMet}</Text>
                                                    <Text fontSize="12px" color="black">{stats.storyListens}</Text>
                                                    <Text fontSize="12px" color="black">{stats.peopleMet}</Text>
                                                    <Text fontSize="12px" color="black">{stats.storyListens}</Text>
                                                    <Text fontSize="12px" color="black">{stats.peopleMet}</Text>
                                                    <Text fontSize="12px" color="black">{stats.storyListens}</Text>
                                                </VStack>

                                                {/* Column: Earnings */}
                                                <VStack align="end" spacing={3}>
                                                    <Text fontWeight="bold" fontSize="14px" color="gray.600">Earnings</Text>
                                                    {/*   <Text fontSize="12px" color="green.500">${calculateSingularEarnings(stats.peopleInvited, rates["peopleInvited"])}</Text> */}
                                                    <Text fontSize="12px" color="green.500">${calculateSingularEarnings(stats.peopleMet, rates["peopleMet"])}</Text>
                                                    <Text fontSize="12px" color="green.500">${calculateSingularEarnings(stats.storyListens, rates["storyListens"])}</Text>
                                                    <Text fontSize="12px" color="green.500">${calculateSingularEarnings(stats.peopleMet, rates["peopleMet"])}</Text>
                                                    <Text fontSize="12px" color="green.500">${calculateSingularEarnings(stats.storyListens, rates["storyListens"])}</Text>
                                                    <Text fontSize="12px" color="green.500">${calculateSingularEarnings(stats.peopleMet, rates["peopleMet"])}</Text>
                                                    <Text fontSize="12px" color="green.500">${calculateSingularEarnings(stats.storyListens, rates["storyListens"])}</Text>
                                                </VStack>

                                                <Text as='i' fontSize='12px' color='gray.600' mr='3rem'>*Conversions equals the number of people who tipped artists on PureMusic from your promotion.</Text>

                                            </>



                                        </HStack>

                                    ) : (

                                        <>

                                            {/*
                                            <HStack justify="space-between" w="100%" spacing={6} wrap="wrap">
                                                {Object.entries(archivedStats).map(([month, stats]) => (
                                                    <VStack key={month} align="stretch" w="100%" spacing={6}>

                                                
                                                        <Text fontWeight="bold" fontSize="16px" color="gray.600">{month}</Text>

                                                        <HStack justify="space-between" w="100%" spacing={6}>

                                                       
                                                            <VStack align="start" spacing={3} w="25%">
                                                                <Text fontWeight="bold" fontSize="14px" color="gray.600">Type</Text>
                                                                <Text fontSize="12px" color="gray.500">12+ Live Users</Text>
                                                                <Text fontSize="12px" color="gray.500">25+ Live Users</Text>
                                                                <Text fontSize="12px" color="gray.500">50+ Live Users</Text>
                                                                <Text fontSize="12px" color="gray.500">100+ Live Users</Text>
                                                                <Text fontSize="12px" color="gray.500">300+ Live Users</Text>
                                                                <Text fontSize="12px" color="gray.500">500+ Live Users</Text>
                                                            </VStack>

                                                      
                                                            <VStack align="center" spacing={3} w="25%">
                                                                <Text fontWeight="bold" fontSize="14px" color="gray.600">Count</Text>
                                                                <Text fontSize="12px" color="black">{stats.liveUsers12}</Text>
                                                                <Text fontSize="12px" color="black">{stats.liveUsers25}</Text>
                                                                <Text fontSize="12px" color="black">{stats.liveUsers50}</Text>
                                                                <Text fontSize="12px" color="black">{stats.liveUsers100}</Text>
                                                                <Text fontSize="12px" color="black">{stats.liveUsers300}</Text>
                                                                <Text fontSize="12px" color="black">{stats.liveUsers500}</Text>
                                                            </VStack>

                                                     
                                                            <VStack align="end" spacing={3} w="25%">
                                                                <Text fontWeight="bold" fontSize="14px" color="gray.600">Earnings</Text>
                                                                <Text fontSize="12px" color="green.500">${calculateSingularEarnings(stats.liveUsers12, rates["12+"])}</Text>
                                                                <Text fontSize="12px" color="green.500">${calculateSingularEarnings(stats.liveUsers25, rates["25+"])}</Text>
                                                                <Text fontSize="12px" color="green.500">${calculateSingularEarnings(stats.liveUsers50, rates["50+"])}</Text>
                                                                <Text fontSize="12px" color="green.500">${calculateSingularEarnings(stats.liveUsers100, rates["100+"])}</Text>
                                                                <Text fontSize="12px" color="green.500">${calculateSingularEarnings(stats.liveUsers300, rates["300+"])}</Text>
                                                                <Text fontSize="12px" color="green.500">${calculateSingularEarnings(stats.liveUsers500, rates["500+"])}</Text>
                                                            </VStack>

                                                        </HStack>


                                                    </VStack>
                                                ))}
                                            </HStack>

                                            */}


                                            <VStack align="center" w="100%" spacing={6}>
                                                {/* Navigation Arrows */}
                                                <HStack spacing={6} justify="center">
                                                    <Button onClick={goToPreviousMonth} disabled={currentMonthIndex === 0}>
                                                        &lt; {/* Left Arrow */}
                                                    </Button>

                                                    <VStack>
                                                        <Text fontSize="18px" fontWeight="bold">{currentMonthABA}</Text>
                                                        <Text fontSize="14px" fontWeight="bold">{currentYear}</Text>
                                                    </VStack>

                                                    <Button onClick={goToNextMonth} disabled={currentMonthIndex === monthNamesABA.length - 1}>
                                                        &gt; {/* Right Arrow */}
                                                    </Button>
                                                </HStack>

                                                {/* Display the Month's Stats */}
                                                <HStack justify="space-between" w="100%" spacing={6}>
                                                    {/* Category Titles */}
                                                    <VStack align="start" spacing={3} w="25%">
                                                        <Text fontWeight="bold" fontSize="14px" color="gray.600">Type</Text>
                                                        <Text fontSize="12px" color="gray.500">12+ Live Users</Text>
                                                        <Text fontSize="12px" color="gray.500">25+ Live Users</Text>
                                                        <Text fontSize="12px" color="gray.500">50+ Live Users</Text>
                                                        <Text fontSize="12px" color="gray.500">100+ Live Users</Text>
                                                        <Text fontSize="12px" color="gray.500">300+ Live Users</Text>
                                                        <Text fontSize="12px" color="gray.500">500+ Live Users</Text>
                                                    </VStack>

                                                    {/* Numbers */}
                                                    <VStack align="center" spacing={3} w="25%">
                                                        <Text fontWeight="bold" fontSize="14px" color="gray.600">Count</Text>
                                                        <Text fontSize="12px" color="black">{statsABA.liveUsers12}</Text>
                                                        <Text fontSize="12px" color="black">{statsABA.liveUsers25}</Text>
                                                        <Text fontSize="12px" color="black">{statsABA.liveUsers50}</Text>
                                                        <Text fontSize="12px" color="black">{statsABA.liveUsers100}</Text>
                                                        <Text fontSize="12px" color="black">{statsABA.liveUsers300}</Text>
                                                        <Text fontSize="12px" color="black">{statsABA.liveUsers500}</Text>
                                                    </VStack>
                                                    <VStack align="center" spacing={3}>
                                                        <Text fontWeight="bold" fontSize="14px" color="gray.600">Rate</Text>
                                                        <Text fontSize="12px" color="black">$10.00</Text>
                                                        <Text fontSize="12px" color="black">$20.00</Text>
                                                        <Text fontSize="12px" color="black">$30.00</Text>
                                                        <Text fontSize="12px" color="black">$50.00</Text>
                                                        <Text fontSize="12px" color="black">$75.00</Text>
                                                        <Text fontSize="12px" color="black">$100.00</Text>
                                                    </VStack>
                                                    {/* Earnings */}
                                                    <VStack align="end" spacing={3} w="25%">
                                                        <Text fontWeight="bold" fontSize="14px" color="gray.600">Earnings</Text>
                                                        <Text fontSize="12px" color="green.500">${calculateSingularEarnings(statsABA.liveUsers12, rates["12+"])}</Text>
                                                        <Text fontSize="12px" color="green.500">${calculateSingularEarnings(statsABA.liveUsers25, rates["25+"])}</Text>
                                                        <Text fontSize="12px" color="green.500">${calculateSingularEarnings(statsABA.liveUsers50, rates["50+"])}</Text>
                                                        <Text fontSize="12px" color="green.500">${calculateSingularEarnings(statsABA.liveUsers100, rates["100+"])}</Text>
                                                        <Text fontSize="12px" color="green.500">${calculateSingularEarnings(statsABA.liveUsers300, rates["300+"])}</Text>
                                                        <Text fontSize="12px" color="green.500">${calculateSingularEarnings(statsABA.liveUsers500, rates["500+"])}</Text>
                                                    </VStack>
                                                </HStack>
                                            </VStack>


                                        </>
                                    )}


                                </Box>


                                {/* Payment Setup */}
                                <VStack align="start" spacing={1} mt="1rem"     mb="4rem">
                                    <Text fontWeight="bold" fontSize="14px" color="gray.600">Payout Details</Text>

                                    {!payoutExists ? (

                                        // Show "Add Payout Details" if no payout exists
                                        <>
                                            <Text fontSize="12px" color="gray.500">Add your CashApp, Venmo, or Zelle to receive payouts.</Text>

                                            <Button size="xs" colorScheme="red" variant="solid" onClick={() => setShowPayoutDetails(true)}>
                                                Add Payout Details
                                            </Button>
                                        </>
                                    ) : (

                                        <>
                                            <List w="40%" spacing={3} mt="1rem">

                                                {venmo && (
                                                    <>
                                                        <ListItem
                                                            display="flex"
                                                            alignItems="center"
                                                            justifyContent="space-between"
                                                            p={2}
                                                            border="1px solid gray"
                                                            borderRadius="md"
                                                        >
                                                            <HStack>
                                                                <Image
                                                                    src={venmoIcon}
                                                                    boxSize="20px"
                                                                />
                                                                <Text>{venmo}</Text>
                                                            </HStack>

                                                        </ListItem>

                                                    </>
                                                )}

                                                {zelle && (

                                                    <>
                                                        <ListItem
                                                            display="flex"
                                                            alignItems="center"
                                                            justifyContent="space-between"
                                                            p={2}
                                                            border="1px solid gray"
                                                            borderRadius="md"
                                                        >
                                                            <HStack>
                                                                <Image
                                                                    src={zelleIcon}
                                                                    boxSize="20px"
                                                                />
                                                                <Text>{zelle}</Text>
                                                            </HStack>

                                                        </ListItem>

                                                    </>
                                                )}
                                            </List>

                                            <Button size="xs" colorScheme="gray" variant="solid" onClick={() => setShowPayoutDetails(true)} mt="5px">
                                                Update Payout Details
                                            </Button>

                                        </>
                                    )}

                                </VStack>

                            </>

                        )}

                    </Flex>
                </VStack>


            )}
        </Box>
    )

}

export default Dashboard