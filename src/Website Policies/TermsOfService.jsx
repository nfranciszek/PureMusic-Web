import React, { useEffect } from 'react';
import theme from '../Utilities/theme';
import { ChakraProvider, Box, UnorderedList, ListItem, Image, Heading, VStack, Text, Spacer,  } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { usePageTitle } from '../Utilities/pageTitles';
import BottomNav from '../Footers/BottomNav';
import { useData } from '../App';
const TermsOfService = () => {
          
  useEffect(() => {
    // Scroll to the top of the page when the component loads
    window.scrollTo(0, 0);
  }, []);

        usePageTitle("Terms of Serivce");
     const { YenZekRootLink } = useData();
      
        const navigate = useNavigate();
      return (
     
    <ChakraProvider theme={theme}>
        <VStack align="flex-start" pt='6rem' px={{ base: '2rem', sm: '2rem', md: '4rem', lg: '14rem' }}>
      <Heading as="h3" pb="1rem" size="lg" fontWeight="bold" mb="1rem">
      PureMusic Terms of Use
    </Heading>
    <Image src='/PureMusicLogo.jpeg' h={10} alt='Pure Music Logo'></Image>
    <Box p={5}>
          <Text fontSize="md" mb={4}>
            Welcome to the PureMusic Service (as defined below). These PureMusic Terms of Use (the “Terms”) govern your use of the PureMusic Service. PureMusic is a service of{' '}
            <a href={YenZekRootLink + "about"}>“YenZek Products”</a> provided by YenZek, Inc. References to “us,” “we,” and “our” mean either PureMusic and YenZek, Inc. or its affiliates, as appropriate. Any capitalized terms used but not defined herein have the meaning given in the YenZek Terms. In the event of any conflict between these Terms and the <a href={YenZekRootLink + "terms-of-service"}>YenZek Terms</a>, these Terms govern solely with respect to your use of the PureMusic Service and solely to the extent of the conflict. By using the PureMusic Service, you agree to these Terms.
          </Text>
    
          <Text fontSize="md" mb={4}>
            Dispute Resolution on an Individual Basis: You and we agree to resolve all disputes arising out of or relating to these Terms or the PureMusic Service in accordance with the arbitration and/or forum-selection provisions in the <a href={YenZekRootLink + "terms-of-service"}>YenZek's Terms of Service</a>, effective at the time that you or we commence the dispute. These Terms of Use therefore constitute an agreement between you and YenZek, Inc.
          </Text>
    
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Understanding the PureMusic Service
          </Text>
          <UnorderedList mb={4}>
            <ListItem>
              The PureMusic Service allows watch musical movies create by music professionals and artists. PureMusic Service is not integrated with YenZek, content or information you share on PureMusic’s Servers are not shared with YenZek’s other products unless you agree to do so.
            </ListItem>
          </UnorderedList>
    
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Who Can Use the PureMusic Service
          </Text>
          <UnorderedList mb={4}>
            <ListItem>
              In order to use the PureMusic Service, you must be in compliance with these Terms and the rest of the <a href={YenZekRootLink + "terms-of-service"}>YenZek's Terms of Service</a>. For clarity, any provisions under the YenZek’s Terms of Service regarding who is able to use YenZek will also apply to your ability to use the PureMusic Service.
            </ListItem>
            <ListItem>
              You will sign up and login to the PureMusic Service using your YenZek account or any other account that we may choose to enable in the future. You are solely responsible for any activity on your profile and for maintaining the confidentiality and security of your password.
            </ListItem>
            <ListItem>
              In order to use the PureMusic Service, we may request that you provide additional information or documents regarding your use of the PureMusic Service, as required to provide the PureMusic Service or by applicable laws. You agree to provide such information or documents and represent and warrant that all information you provide to YenZek is accurate and up to date. You acknowledge that in the process of these identity verification procedures, we may make inquiries, including through third parties, in order to verify your identity.
            </ListItem>
          </UnorderedList>
    
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            How You Can’t Use the PureMusic Service
          </Text>
          <UnorderedList mb={4}>
            <ListItem>
              You agree that you shall not, nor shall you cause or permit any third party to do, or attempt to do any of the following in connection with your use of the PureMusic Service: 
              <ul>
                <li>Exploit the PureMusic Service for any commercial purpose;</li>
                <li>Introduce any viruses, trojan horses, worms, logic bombs or other materials that are malicious or technologically harmful into our systems;</li>
                <li>Circumvent, remove, alter, deactivate, degrade or thwart any technological measure or content protections of the PureMusic Service;</li>
                <li>Use any robot, spider, crawler, scraper or other automatic device, process, software or queries that intercept, “mine,” scrapes, extracts or otherwise accesses the PureMusic Service to monitor, extract, copy or collect information or data from the PureMusic Service, or engage in any manual process to do the same.</li>
              </ul>
            </ListItem>
          </UnorderedList>
    
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Content
          </Text>
          <UnorderedList mb={4}>
            <ListItem>
              PureMusic Service Features and Tools:
              <Text fontSize="md" ml={4}>
                If you upload or share any PureMusic Content, you hereby grant us a non-exclusive, royalty-free, transferable, sub-licensable, worldwide license to host, use, distribute, modify, run, copy, publicly perform or display, translate and create derivative works of your PureMusic Content (in accordance with the Privacy Policy and PureMusic's Privacy Policy). You also represent and warrant that (i) you have, or have obtained, all necessary rights, licenses, consents, permissions, power and/or authority (including all intellectual property rights) to grant YenZek the rights to use your PureMusic Content, and (ii) your PureMusic Content will not contain any material that infringes any third party’s rights, including any intellectual property rights, or any applicable laws, unless an exception or limitation applies under applicable law.
                This license will end when your PureMusic Content is deleted from PureMusic, subject to the deletion limitations noted below.
                When using the PureMusic Service, all content that you upload or share must comply with both{' '}
                <a href={YenZekRootLink + "community-guidelines"}>YenZek's Community Guidelines</a> as the service is part of YenZek and PureMusic’s own Community Guidelines.
              </Text>
            </ListItem>
          </UnorderedList>
    
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Content Deletion and Deactivating or Terminating Your PureMusic Profile
          </Text>
          <UnorderedList mb={4}>
            <ListItem>
              YenZek has the right to (i) remove any PureMusic Content that is stored on PureMusic Servers from being accessible from within the PureMusic Service if YenZek believes that such PureMusic Content violates these Terms or the YenZek Terms or if YenZek is permitted or required to do so by applicable law, (ii) provide notice to Third Party Servers about enforcement actions taken with respect to PureMusic Content, and (iii) take any action that YenZek believes is necessary or appropriate if YenZek reasonably believes that any such PureMusic Content infringes the rights of others and/or could create liability or adverse legal or regulatory implications for YenZek or other PureMusic Users.
            </ListItem>
            <ListItem>
              To the extent permitted by applicable law, we can refuse to provide or stop providing all or part of the PureMusic Service to you (including terminating or disabling your profile and access to the PureMusic Service) without notice (or after providing reasonable notice where required by applicable law), for any reason, including to protect our community or services, including YenZek, if you violate these Terms or the YenZek Terms, or where we are permitted or required to do so by law. We can also terminate or change the PureMusic Service or stop providing all or part of the PureMusic Service in our reasonable discretion.
            </ListItem>
            <ListItem>
              When you deactivate your PureMusic profile, your PureMusic information will be hidden from view by other users, but it will remain on the PureMusic Servers. To delete your information, you can find and delete individual content, delete your PureMusic profile, or delete your YenZek account. When you request to delete your PureMusic Profile or YenZek account, the deletion process will automatically begin no more than 30 days after your request. It may take up to 90 days to delete your PureMusic information after the deletion process begins. While the deletion process is being undertaken, deleted information is no longer visible on the PureMusic Service by PureMusic Users, but remains subject to these Terms and the PureMusic Supplemental Privacy Policy.
            </ListItem>
          </UnorderedList>
        </Box>
    
    
    
    
        <Text pl="1rem" pt="2rem">Last Updated: March 24, 2025</Text>
    
    <Spacer mb="10rem" />
    <BottomNav />
    </VStack>
    </ChakraProvider>
    
    
      )
    
}

export default TermsOfService