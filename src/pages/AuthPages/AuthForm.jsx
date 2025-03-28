import { Box, VStack, Image, Input, Button, Link, Text } from '@chakra-ui/react';
import React from 'react';
import { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

import SignupForm from './SignUpForm';
import LoginForm from './LoginForm';
import { useData } from '../../App';

const AuthForm = ({ onLoginSuccess, onSignUp, onSignUpSuccess, onFrontPageSignUpSuccess }) => {

  const [isCreateAccountForm, setCreateAccountForm] = useState(false);




  const {


    showFirstStepSignUp, setShowFirstStepSignUp,
    showSecondStepSignUp, setShowSecondStepSignUp,
    showThirdStepSignUp, setShowThirdStepSignUp, profileURL,
    isLogin, setIsLogin,
    isYenZekHomeOpen,
    isLoginPathOpen,
    isSignUpPathOpen,

    eventActionTaken,

    storytellingCompSignUpActionTaken,

    generalCompetitionActionTaken, 

    socialCompSignUpActionTaken, 

    showHalloweenEventPopup,

  } = useData();



  const renderSignUpPage = () => {

    setIsLogin(false);
    setShowFirstStepSignUp(true);
    onSignUp();
  }






  const toggleAuthPage = () => {


    if (isLogin) {
      setIsLogin(false);
      setShowFirstStepSignUp(true);
    } else {

      setIsLogin(true);
      setShowFirstStepSignUp(false);
      setShowSecondStepSignUp(false);
      setShowThirdStepSignUp(false);
    }


  };


  return (
    <VStack>




        <>


          <VStack spacing={2} alignItems={'stretch'}>
           
  <Box maxW="md" mx="auto" p={10} borderWidth="1px" borderRadius="lg">

    {isLogin ? ( 
 <Box textAlign="center"> 
 <Image src='/PureMusicLogoName.png' h={10} alt='Pure Music Logo' display="block" mx="auto" mb="1rem" />

</Box>

    ):  (

      <Box textAlign="center"> 
      <Image src='/PureMusicLogo.jpeg' h={10} alt='Pure Music Logo' display="block" mx="auto" />
    </Box>

    )}
   


    


              {/*LOGIN FORM*/}
              <VStack spacing={4}>
      {/* Show the appropriate form based on isLogin state */}
      {isLogin ? <LoginForm onLoginSuccess={onLoginSuccess} /> : <SignupForm onSignUpSuccess={onSignUpSuccess} />}
      
      {/* This Box will only be for the question and link, not part of the input box */}
      <Box pt={2} pb={2} pl={10} pr={10}>
        <VStack spacing={2}>
          <Text textAlign="center" fontSize={14}>
            {isLogin ? "Don't have an account? " : "Have an account? "}
            <Link color="blue.500" fontSize="inherit" onClick={toggleAuthPage}>
              {isLogin ? "Sign up" : "Log in"}
            </Link>
          </Text>
        </VStack>
      </Box>
    </VStack>


            </Box>
       

           




          </VStack>
        </>
     
</VStack>

  )
};


export default AuthForm