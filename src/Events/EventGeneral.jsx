import React, { useEffect, useState } from 'react';
    import {
      Text,
      VStack,
      Heading,
      Button,
      Image,
      Box,
      HStack,
    } from '@chakra-ui/react';
    import { MdLocationOn } from 'react-icons/md';
    
    const EventGeneral = () => {
      const [showDetails, setShowDetails] = useState(false);
    
      useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        document.body.appendChild(script);
    
        return () => {
          document.body.removeChild(script);
        };
      }, []);
    
      return (
        <VStack w="full" spacing={4} p={4}>
          <Heading fontSize="20px" textAlign="center">
            Gentle Piano: Meditation & Relaxation for All
          </Heading>
    
         
          <Text fontWeight="500">
            Nathanael Fra
          </Text>
          <Text textAlign="center" fontSize="sm" color="gray.700">
            Weekdays: Tuesdays, Wednesdays, Thursdays — 7:45 PM (45 mins)
          </Text>
    
          <HStack color="gray.600">
                  <MdLocationOn />
                  <Text fontSize="12px">Collingswood, NJ</Text>
                </HStack>
    
                <VStack align="starting">
                    <Text color="black.500" fontSize="14px">Step 1: Select a date below to reserve your spot</Text>
                    <Text color="black.500" fontSize="14px">Step 2: Check your email and follow the instructions</Text>
                </VStack>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? 'Hide Details' : 'View Details'}
          </Button>
    
          {showDetails && (
            <Box bg="gray.700" p={4} rounded="md" w="full" maxW="600px" color="white">
              <VStack spacing={3}>
                <Image
                  src="/Artists1.jpg"
                  alt="Nathanael Fra"
                  borderRadius="full"
                  boxSize="80px"
                />
                <Text fontWeight="500" fontSize="16px">
                  Nathanael Fra
                </Text>
             
                <Text fontSize="14px" lineHeight="1.6" textAlign="center" px={6}>
                Join us for a live, gentle music experience designed to soothe your nervous system and invite deep rest. You’ll hear expressive piano music—slowed down like lullabies, infused with calm and care. It’s more than ambient sound—it’s music you can feel.

You're welcome to sit in a chair or bring a blanket, mat, or pillow to lie back and fully relax. Come as you are—whether you're just getting off at work or simply seeking inner peace.
                </Text>
              </VStack>
            </Box>
          )}
    
        


                <div
                    className="calendly-inline-widget"
                    data-url="https://calendly.com/nathanaelfra/puremusic-live-sessions-gentle-piano?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=06e4ed"
                    style={{ minWidth: '100%', height: '800px' }}
                ></div>
            </VStack>
        );
    };
export default EventGeneral