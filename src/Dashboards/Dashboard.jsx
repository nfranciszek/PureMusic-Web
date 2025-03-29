import React, { useState, useEffect } from 'react';
import { Box, Image, Button, Flex, VStack, Text, HStack, Spacer, Select, Input, List, ListItem, IconButton, useBreakpointValue } from '@chakra-ui/react'
import { useNavigate, useLocation } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";
import { DeleteIcon } from "@chakra-ui/icons";
import AdminDashboard from './AdminDashboard';

import ShareContentPage from '../pages/ShareContentPage';
import Help from '../Website Policies/Help';
import LogoutPage from '../pages/LogoutPage';
// import { updatePayoutDetails, checkPayoutExists, getPayoutDetails, checkForLeadAmbassador, getAmbassadorStats, getLeadAmbassadorStats, getCurrentMonthAndYear, testUpdate, fetchArchivedStats } from '../../Utilities/Ambassador';
import { getStats, removePayoutVenmo, removePayoutZelle } from './DashboardConfig';
import { updatePayoutDetails, checkPayoutExists, getPayoutDetails, getCurrentMonthAndYear } from './DashboardConfig';
import { checkTimeForArchive } from './DashboardConfig';
import { validateEmail } from '../pages/AuthPages/CreateAccount';
import MenuDashboard from './MenuDashboard';
import { useData } from '../App';
import { fetchUserStatus } from './UserProfile';
import { currentUserId } from '../Utilities/firebase';


const Dashboard = () => {
    const isBaseScreen = useBreakpointValue({ base: true, sm: true, md: false });

    const isLargeScreen = useBreakpointValue({ base: false, sm: false, md: false, lg: true });

    const isPhonecreen = useBreakpointValue({ base: true, sm: false, md: false, lg: false });



    const [chartExplaniation, setChartExplaination] = useState("");

    const [isViewPastEarnings, setViewPastEarnings] = useState(false);

    const [userType, setUserType] = useState("");

    const { pathname } = useLocation()

    const navigate = useNavigate()

    const { showMenuDashboard, setMenuDashboard,
        showPayoutDetails,

        setShowPayoutDetails,
        homeSelected, setHomeSelected,
        shareQRSelected, setShareQRSelected,
        payoutDetailsSelected, setPayoutDetailsSelected,
        helpSelected,
        logoutPageSelected,

        userIsArtist,
        userIsPromoter,
        userIsFan,
        userIsAdmin, } = useData();

    useEffect(() => {
        if (userIsArtist) {
            setUserType("Artist");
            setChartExplaination("*This chart displays your earnings in tips for being an Artist on PureMusic")
        } else if (userIsPromoter) {
            setUserType("Promoter");
            setChartExplaination("*This chart displays your earnings in tips thanks to your promotion of PureMusic.")
        } else {
            setUserType("Fan");  // Default fallback to Fan.
            setChartExplaination("");
        }

    }, [userIsArtist, userIsPromoter, userIsFan]);

    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        const checkForArchive = async () => {
            if (userType && !userType.includes("Fan") && !userType.includes("Admin")) {
                checkTimeForArchive(currentUserId, userType);

            }
        };

        if (userType) {
            checkForArchive();
        }
    }, [currentUserId, userType]);

    const [archivedStats, setArchivedStats] = useState({
        TipA: 0,
        TipB: 0,
        TipC: 0,
        TipD: 0,
        TipE: 0,
        TipF: 0,
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
        TipA: 0,
        TipB: 0,
        TipC: 0,
        TipD: 0,
        TipE: 0,
        TipF: 0
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

        "A": 3,
        "B": 4.5,
        "C": 7.5,
        "D": 9,
        "E": 15,
        "F": 30,

    };


    const calculateSingularEarnings = (count, rate) => {
        return (count * rate).toFixed(2); // Ensure the result is a string with two decimal points
    };

    // Calculate earnings by multiplying the count of live users with the respective rate
    const calculateEarnings = (stats) => {
        let totalEarnings = 0;



        totalEarnings += stats.TipA * rates["A"];
        totalEarnings += stats.TipB * rates["B"];
        totalEarnings += stats.TipC * rates["C"];
        totalEarnings += stats.TipD * rates["D"];
        totalEarnings += stats.TipE * rates["E"];
        totalEarnings += stats.TipF * rates["F"];


        return totalEarnings.toFixed(2);  // Ensure the earnings are formatted with 2 decimals
    };

    const totalEarnings = calculateEarnings(stats);


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


        updatePayoutDetails(currentUserId, type, detail, userType);

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
            await removePayoutVenmo(currentUserId, userType);
            setVenmo(null);
            setVenmoUsername(null);

        } else if (type === 'Zelle') {
            await removePayoutZelle(currentUserId, userType);
            setZelle(null);
            setZelleDetail(null);
        }
    };




    useEffect(() => {
        const fetchPayoutDetails = async () => {
            if (userType) {
                const details = await getPayoutDetails(currentUserId, userType);
                setVenmo(details.venmo);
                setZelle(details.zelle);
            }
        };

        // Ensure that the function runs after userType is set
        if (userType) {
            fetchPayoutDetails();
        }
    }, [currentUserId, userType]);


    const [payoutExists, setPayoutExists] = useState(false);




    useEffect(() => {
        const fetchPayoutStatus = async () => {
            if (userType) {
                const exists = await checkPayoutExists(currentUserId, userType);
                setPayoutExists(exists);
            }
        };
        if (userType) {
            fetchPayoutStatus();
        }
        if (!zelle & !venmo) {
            setPayoutExists(false);
        }
    }, [currentUserId, zelle, venmo, userType]);




    const [status, setStatus] = useState('loading'); // Default to loading while fetching

    const [statusMessage, setStatusMessage] = useState('');


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

    // Conditional rendering based on user status
    const renderStatusInfo = (status) => {
        switch (status) {
            case 'pending':
                setStatusMessage("* Your account is awaiting approval");
                break;

            case 'approved':
                setStatusMessage("* Your account is active.");
                break;

            case 'rejected':
                setStatusMessage("* Your account has been rejected as it does not meet our requirements.");
                break;

            case 'paused':
                setStatusMessage("* Your account has been paused");
                break;

            case 'suspended':
                setStatusMessage("* Your account has been suspended.");
                break;

            case 'terminated':
                setStatusMessage("* Your account has been terminated.");
                break;

            case 'non-existent':
                setStatusMessage("* Your account is awaiting approval");
                break;

            case 'error':
                setStatusMessage("* There was an error fetching your account status.");
                break;

            default:
                setStatusMessage("* Pending Status...");

        }
    };



    useEffect(() => {
        const fetchUserStats = async () => {
            if (userType && currentUserId) {
                try {
                    const fetchedStats = await getStats(currentUserId, userType); // Pass userType!
                    if (fetchedStats) {
                        setStats(fetchedStats);
                    }
                } catch (error) {
                    console.error("Error fetching user stats:", error);
                }
            }
        };

        fetchUserStats(); // No need for `if (userType)`, it's already checked inside

    }, [currentUserId, userType]);




    return (
        <VStack>
            <>
                {(showMenuDashboard && isBaseScreen) ? (
                    <>

                        <MenuDashboard />
                    </>

                ) : (
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


                        {userIsAdmin ? (
                            <>

                                {logoutPageSelected ? (
                                    <>
                                        <LogoutPage />
                                    </>
                                ) : (
                                    <AdminDashboard />

                                )}
                            </>

                        ) : shareQRSelected ? (
                            <>

                                <ShareContentPage />

                            </>

                        ) : helpSelected ? (
                            <>
                                <Help />
                            </>

                        ) : logoutPageSelected ? (
                            <>
                                <LogoutPage />
                            </>

                        ) : (

                            <VStack paddingInlineStart="6px" paddingInlineEnd="8px" pl={isBaseScreen ? "1rem" : "2rem"}>
                                <Flex direction="column">

                                    <HStack pt="0.5rem" pb="0.5rem">

                                        {showPayoutDetails && (
                                            <IoArrowBack onClick={() => handleBackButton()} fontSize='24px' />
                                        )}
                                        <Text as='b' fontSize='24px' pt="1rem" pb="1rem ">Dashboard</Text>

                                    </HStack>

                                    {/* Asterisk and message */}
                                    <Text fontSize="12px" color="gray.500">
                                        {statusMessage}
                                    </Text>


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

                                                            <Text fontSize="12px" color="gray.500" mr="3rem">Unpaid earnings will be moved to Payout Initiation once they reach $25.</Text>
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
                                                                <Text fontSize="12px" color="black">{stats.TipA}</Text>
                                                                <Text fontSize="12px" color="black">{stats.TipB}</Text>
                                                                <Text fontSize="12px" color="black">{stats.TipC}</Text>
                                                                <Text fontSize="12px" color="black">{stats.TipD}</Text>
                                                                <Text fontSize="12px" color="black">{stats.TipE}</Text>
                                                                <Text fontSize="12px" color="black">{stats.TipF}</Text>
                                                            </VStack>

                                                            {/* Column: Earnings */}
                                                            <VStack align="end" spacing={3}>
                                                                <Text fontWeight="bold" fontSize="14px" color="gray.600">Earnings</Text>
                                                                {/*   <Text fontSize="12px" color="green.500">${calculateSingularEarnings(stats.peopleInvited, rates["peopleInvited"])}</Text> */}
                                                                <Text fontSize="12px" color="green.500">${calculateSingularEarnings(stats.TipA, rates["A"])}</Text>
                                                                <Text fontSize="12px" color="green.500">${calculateSingularEarnings(stats.TipB, rates["B"])}</Text>
                                                                <Text fontSize="12px" color="green.500">${calculateSingularEarnings(stats.TipC, rates["C"])}</Text>
                                                                <Text fontSize="12px" color="green.500">${calculateSingularEarnings(stats.TipD, rates["D"])}</Text>
                                                                <Text fontSize="12px" color="green.500">${calculateSingularEarnings(stats.TipE, rates["E"])}</Text>
                                                                <Text fontSize="12px" color="green.500">${calculateSingularEarnings(stats.TipF, rates["F"])}</Text>
                                                            </VStack>



                                                            <Text as='i' fontSize='12px' color='gray.600' mr='3rem'>{chartExplaniation}</Text>

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

                                                                <VStack align="center" spacing={3}>
                                                                    <Text fontWeight="bold" fontSize="14px" color="gray.600">Tip Rate</Text>
                                                                    <Text fontSize="12px" color="black">$3.00</Text>
                                                                    <Text fontSize="12px" color="black">$4.50</Text>
                                                                    <Text fontSize="12px" color="black">$7.50</Text>
                                                                    <Text fontSize="12px" color="black">$9.00</Text>
                                                                    <Text fontSize="12px" color="black">$15.00</Text>
                                                                    <Text fontSize="12px" color="black">$30.00</Text>


                                                                    {/* Numbers */}
                                                                    <VStack align="center" spacing={3} w="25%">
                                                                        <Text fontWeight="bold" fontSize="14px" color="gray.600">Conversions</Text>
                                                                        {/*  <Text fontSize="12px" color="black">{stats.peopleInvited}</Text> */}
                                                                        <Text fontSize="12px" color="black">{statsABA.TipA}</Text>
                                                                        <Text fontSize="12px" color="black">{statsABA.TipB}</Text>
                                                                        <Text fontSize="12px" color="black">{statsABA.TipC}</Text>
                                                                        <Text fontSize="12px" color="black">{statsABA.TipD}</Text>
                                                                        <Text fontSize="12px" color="black">{statsABA.TipE}</Text>
                                                                        <Text fontSize="12px" color="black">{statsABA.TipF}</Text>
                                                                    </VStack>



                                                                </VStack>
                                                                {/* Earnings */}
                                                                <VStack align="end" spacing={3} w="25%">
                                                                    <Text fontWeight="bold" fontSize="14px" color="gray.600">Earnings</Text>
                                                                    <Text fontSize="12px" color="green.500">${calculateSingularEarnings(statsABA.TipA, rates["A"])}</Text>
                                                                    <Text fontSize="12px" color="green.500">${calculateSingularEarnings(statsABA.TipB, rates["B"])}</Text>
                                                                    <Text fontSize="12px" color="green.500">${calculateSingularEarnings(statsABA.TipC, rates["C"])}</Text>
                                                                    <Text fontSize="12px" color="green.500">${calculateSingularEarnings(statsABA.TipD, rates["D"])}</Text>
                                                                    <Text fontSize="12px" color="green.500">${calculateSingularEarnings(statsABA.TipE, rates["E"])}</Text>
                                                                    <Text fontSize="12px" color="green.500">${calculateSingularEarnings(statsABA.TipF, rates["F"])}</Text>
                                                                </VStack>
                                                            </HStack>
                                                        </VStack>


                                                    </>
                                                )}


                                            </Box>


                                            {/* Payment Setup */}
                                            <VStack align="start" spacing={1} mt="1rem" mb="4rem">
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
                )}
            </>
        </VStack>

    )

}

export default Dashboard