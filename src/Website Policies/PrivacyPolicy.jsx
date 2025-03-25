import React, { useEffect } from 'react';
import BottomNav from '../Footers/BottomNav';
import theme from '../Utilities/theme';
import { ChakraProvider, Box, UnorderedList, ListItem, Image, Heading, VStack, Text, Flex, HStack, Spacer, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { usePageTitle } from '../Utilities/pageTitles';

const PrivacyPolicy = () => {

      
  useEffect(() => {
    // Scroll to the top of the page when the component loads
    window.scrollTo(0, 0);
  }, []);

    usePageTitle("Privacy Policy");
    return (
        <ChakraProvider theme={theme}>
            <VStack align="flex-start" pt='6rem' px={{ base: '2rem', sm: '2rem', md: '4rem', lg: '14rem' }}>
                <Heading as="h3" pb="1rem" size="lg" fontWeight="bold" mb="1rem">
                    PureMusic  Privacy Policy
                </Heading>

                <Image src='/PureMusicLogo.jpeg' h={10} alt='Pure Music Logo'></Image>
                
                <Box>
                    <Heading as="h3" size="lg" mt="1rem" mb="5px">Introduction</Heading>
                    <Text>
                        At PureMusic, we respect and value the privacy of our users. This Privacy Policy explains how we collect, use, and protect your personal information when you use our services. By accessing or using our platform, you agree to the practices described in this policy.
                        PureMusic is a music service provided by YenZek and is part of the YenZek Products. On PureMusic, users can listen to music videos created by music professionals.
                    </Text>
                </Box>

                <Box>
                    <Heading as="h3" size="lg" mt="1rem" mb="5px">Information We Collect</Heading>
                    <UnorderedList>
                        <ListItem>Personal information: such as name, email, etc.</ListItem>
                        <ListItem>Usage data: how you interact with our services.</ListItem>
                        <ListItem>Device information: IP addresses, browser data, etc.</ListItem>
                        <ListItem>Payment information for any purchases made.</ListItem>
                    </UnorderedList>
                </Box>

                <Box>
                    <Heading as="h3" size="lg" mt="1rem" mb="5px">How We Use Your Information</Heading>
                    <Text>
                        We use the information we collect to:
                    </Text>
                    <UnorderedList>
                        <ListItem>Provide and improve our services.</ListItem>
                        <ListItem>Send promotional offers or updates (with your consent).</ListItem>
                        <ListItem>Understand usage trends and improve the user experience.</ListItem>
                        <ListItem>Ensure compliance with legal obligations.</ListItem>
                    </UnorderedList>
                </Box>

                <Box>
                    <Heading as="h3" size="lg" mt="1rem" mb="5px">Children’s Privacy</Heading>
                    <Text>
                        PureMusic is committed to protecting the privacy of children. Our service is designed for individuals aged 13 and older, but we may offer educational content to children under 13 if they are accompanied by their parent or guardian.
                    </Text>

                    <Heading as="h3" size="md" mt="1rem" mb="5px">Under 13:</Heading>
                    <Text>
                        We do not collect personal information from children under 13 for marketing purposes. If we collect any personal information from children under 13, it will only be done with verifiable parental consent, and such information will not be used for marketing or shared with third parties without parental consent.
                    </Text>

                    <Heading as="h3" size="md" mt="1rem" mb="5px">Under 17:</Heading>
                    <Text>
                        For individuals under 17, we will obtain guardian consent before collecting, using, or disclosing their personal information for marketing purposes. Children under 17 will have access to our educational content, but their information will not be used for promotional activities without appropriate guardian consent.
                    </Text>

                    <Text>
                        We encourage parents and guardians to be involved in their children's online activities and monitor the types of information they share. If we learn that we have inadvertently collected information from a child without the proper consent, we will take immediate steps to delete that information.
                    </Text>
                </Box>

                <Box>
                    <Heading as="h3" size="lg" mt="1rem" mb="5px">Data Security</Heading>
                    <Text>
                        We implement a variety of security measures to maintain the safety of your personal information. However, please remember that no method of electronic storage or transmission over the internet is 100% secure.
                    </Text>
                </Box>

                <Box>
                    <Heading as="h3" size="lg" mt="1rem" mb="5px">Your Rights</Heading>
                    <Text>
                        You have the right to:
                    </Text>
                    <UnorderedList>
                        <ListItem>Access the personal information we hold about you.</ListItem>
                        <ListItem>Request corrections to your personal data.</ListItem>
                        <ListItem>Request the deletion of your personal data (subject to certain conditions).</ListItem>
                        <ListItem>Opt out of marketing communications.</ListItem>
                    </UnorderedList>
                </Box>

                <Box>
                    <Heading as="h3" size="lg" mt="1rem" mb="5px">Changes to This Policy</Heading>
                    <Text>
                        We may update this Privacy Policy from time to time. When we do, we will post the updated policy on our platform with a new effective date. Please check this page periodically to stay informed about our privacy practices.
                    </Text>
                </Box>

                <Box>
                    <Heading as="h3" size="lg" mt="1rem" mb="5px">Contact Us</Heading>
                    <Text>
                        If you have any questions or concerns about this Privacy Policy or your personal information, please contact us at:
                    </Text>
                    <Text>
                        Email:
                        <span onClick={() => window.location = 'mailto:puremusic.us@gmail.com'}>
                            puremusic.us [a] gmail .com
                        </span>
                    </Text>
                </Box>


                <Text pl="1rem" pt="2rem">Last Updated: March 24, 2025</Text>

                <Spacer mb="10rem" />
                <BottomNav />
            </VStack>
        </ChakraProvider>

    )
}
  

export default PrivacyPolicy