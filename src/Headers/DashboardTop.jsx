import React, { useEffect, useState } from 'react';
import { Text, Image, Flex, Button, HStack, Box, Spacer, useBreakpointValue, VStack } from '@chakra-ui/react';
import { RxHamburgerMenu } from "react-icons/rx";

import { useNavigate } from 'react-router-dom';
import { useData } from '../App';

import { currentUserId } from '../Utilities/firebase';
import { fetchUserData, fetchUserStatus } from '../Dashboards/UserProfile';

import { getAuth } from 'firebase/auth';

const DashboardTop = () => {
  const navigate = useNavigate();

  const auth = getAuth();
  const user = auth.currentUser;

  const { showMenuDashboard, setMenuDashboard,  userIsArtist,
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
        setUserType("Fan");  // Default fallback to Fan.
    }

}, [userIsArtist, userIsPromoter, userIsFan]);
  const resetAudioPosting = () => {

  }



  const showMenu = () => {

    setMenuDashboard(true);

  };

  const goToArtists = () => {
    navigate('/artists');


  };


  const goToAboutUs = () => {
    resetAudioPosting();

    navigate('/about');


  };

  const goToContactUs = () => {

    resetAudioPosting();
    navigate('/contact');


  };

  const isBaseOrSm = useBreakpointValue({ base: true, sm: true, md: false, lg: false, xl: false });


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
if (user && userType) {
    getStatus();
}
  }, [currentUserId, user, userType]);

  // Conditional rendering based on user status
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
      position="fixed"
      top="0"
      left="0"

      width="100%"
      bg="white"
      transition="transform 0.3s ease"
      // transform={isOpen ? 'translateY(0)' : 'translateY(100%)'}
      zIndex="1"
      pt="1rem"
      pb="1rem"
    >




      <HStack
        // Responsive padding left
        pr={['12px', '12px', '12px', '3rem']} // Responsive padding right
      >
        <Flex flexDirection="row" alignItems="center">




          <HStack ml="1rem" onClick={() => showMenu()} gap={3}>
            <RxHamburgerMenu size='20px' />

            {userData && (
              <>
                <Flex flexDirection="row" gap={2}>
                  <Image
                    src={userData.profilePhoto}
                    borderRadius='full'
                    width="30px"
                    maxH="30px"
                  />
                  <Text fontSize="16px">{userData.name}</Text>
                </Flex>
              </>
            )}
          </HStack>

          {!userIsAdmin && (
            <>
          {/*  RIGHT HERE:: ACOUNT STATUS   */}
          {/* Account Status Section */}
          <Flex align="center" gap={2} ml="1rem" >

            <Box
              width="8px"
              height="8px"
              borderRadius="50%"
              backgroundColor={statusColor}
            />

            {status && (
              <>
                {/* "Awaiting Approval" Text */}
                <Text fontSize="12px" fontWeight="600" color={textColor}>
                  {statusInfo}
                </Text>
              </>
            )}
          

          </Flex>
          </>
            )}
        </Flex>

        <Spacer />

        <HStack >


          <Flex gap={5}>






          </Flex>





        </HStack>

      </HStack>


    </Box>

  )

}

export default DashboardTop