import React, { useState, useEffect } from 'react';
import { Box, Heading, Image, Button, Flex, VStack, Text, HStack, List, ListItem } from '@chakra-ui/react';
import { useData } from '../App';
import { fetchUserDataPromotersList } from './DashboardConfig';
import { fetchUserDataArtistsList } from './DashboardConfig';
import { updateUserStatus } from './DashboardConfig';

const AdminDashboard = () => {
  const { 
    promoterTabSelected, setPromoterTabSelected,
    artistTabSelected, setArtistTabSelected,
  } = useData();

  const [usersByStatus, setUsersByStatus] = useState({
    pending: [],
    approved: [],
    rejected: [],
    paused: [],
    suspended: [],
    terminated: []
  });

  // Function to get status info and colors
  const getStatusInfo = (status) => {
    switch (status) {
      case 'pending':
        return { info: "Awaiting Approval", color: "#FFA500", textColor: "#FFA500" };
      case 'approved':
        return { info: "Active", color: "#4CAF50", textColor: "#4CAF50" };
      case 'rejected':
        return { info: "Account Rejected", color: "#FF0000", textColor: "#FF0000" };
      case 'paused':
        return { info: "Paused", color: "#FFA500", textColor: "#FFA500" };
      case 'suspended':
        return { info: "Suspended", color: "gray.600", textColor: "gray.600" };
      case 'terminated':
        return { info: "Terminated", color: "#FF0000", textColor: "#FF0000" };
      case 'non-existent':
        return { info: "Pending Status...", color: "#FF0000", textColor: "#FF0000" };
      case 'error':
        return { info: "Pending Status...", color: "#FFA500", textColor: "#FFA500" };
      default:
        return { info: "Pending Status...", color: "#FFA500", textColor: "#FFA500" };
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      let categorizedUsers = {}; // Declare categorizedUsers outside of conditionals

      if (promoterTabSelected) {
        categorizedUsers = await fetchUserDataPromotersList(); // Fetch and categorize promoters
      } else if (artistTabSelected) {
        categorizedUsers = await fetchUserDataArtistsList(); // Fetch and categorize artists
      }

      setUsersByStatus(categorizedUsers); // Set categorized users to state
    };

    getUserData();
  }, [promoterTabSelected, artistTabSelected]); // Dependencies to re-run effect when tab changes

  const handleStatusChange = (uid, status) => {
    // Determine the user type based on the active tab
    const userType = promoterTabSelected ? 'Promoter' : 'Artist';
    updateUserStatus(uid, status, userType);
  };

  return (
    <Box
      bg="white"
      border="1px solid black"
      borderRadius="md"
      p="1rem"
      boxShadow="sm" // Minimum width of 300px
      minW="300px" // Minimum width of 300px
      w="100%"    // This allows the box to grow and take up available space
    >
      <VStack align="start" spacing={4} mt={6}>

      {promoterTabSelected ? (
      <Heading mt="2rem">Promoters</Heading>
        ) : artistTabSelected ? (
      <Heading mt="2rem">Artists</Heading>
        ) : ( null)}

        {Object.keys(usersByStatus).map((status) => (
          <Box key={status} w="100%" borderBottom="1px solid #eee" pb={4}>
            <Text fontSize="xl" fontWeight="bold" color="gray.700">
              {status.charAt(0).toUpperCase() + status.slice(1)} Users
            </Text>
            {usersByStatus[status].length > 0 ? (
              <List spacing={4}>
                {usersByStatus[status].map((user) => {
                  const { info, color, textColor } = getStatusInfo(user.status); // Get status info directly
                  return (
                    <ListItem key={user.uid} display="flex" flexDirection="column" p={4} border="1px solid #ddd" borderRadius="md" boxShadow="sm">
                      <Flex align="center" mb={2}>
                        <Image src={user.profilePhoto} alt={user.name} borderRadius="full" boxSize="50px" mr={4} />
                        <Text fontWeight="bold">{user.name}</Text>
                      </Flex>
                      <Text>@{user.username}</Text>
                      <Flex align="center" gap={2} ml="1rem">
                        {/* Status Dot and Text */}
                        <Box
                          width="8px"
                          height="8px"
                          borderRadius="50%"
                          backgroundColor={color} // Set the status color
                        />
                        <Text fontSize="12px" fontWeight="600" color={textColor}>
                          {info} {/* Display the status info */}
                        </Text>
                      </Flex>
                            <HStack wrap="wrap" spacing={2} mt={2}>
                        <Button size="sm" minW="120px" onClick={() => handleStatusChange(user.uid, 'approved')}>
                          <Text>Approve</Text>
                        </Button>
                        <Button size="sm" minW="120px" onClick={() => handleStatusChange(user.uid, 'paused')}>
                          <Text>Pause</Text>
                        </Button>
                        <Button size="sm" minW="120px" onClick={() => handleStatusChange(user.uid, 'rejected')}>
                          <Text>Reject</Text>
                        </Button>
                        <Button size="sm" minW="120px" onClick={() => handleStatusChange(user.uid, 'suspended')}>
                          <Text>Suspend</Text>
                        </Button>
                        <Button size="sm" minW="120px" onClick={() => handleStatusChange(user.uid, 'terminated')}>
                          <Text>Terminate</Text>
                        </Button>
                      </HStack>
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <Text>No {status} users found.</Text>
            )}
          </Box>
        ))}
      </VStack>
    </Box>
  );
}

export default AdminDashboard;

