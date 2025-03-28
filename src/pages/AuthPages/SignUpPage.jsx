import React, {  useEffect } from 'react';
import { VStack, Text } from '@chakra-ui/react'
import AuthForm from './AuthForm'
import { useNavigate } from 'react-router-dom'
import BottomLoginSignUp from '../../Footers/ButtonLoginSignup';
import { useData } from '../../App';
import { currentUserId } from '../../Utilities/firebase';

const SignUpPage = () => {
  const navigate = useNavigate();

  const goLogin = () => {
  navigate('/account/login');

}


const {

   setIsLogin,   showFirstStepSignUp, setShowFirstStepSignUp,
   showSecondStepSignUp, setShowSecondStepSignUp,
   showThirdStepSignUp, setShowThirdStepSignUp,
  

} = useData();

const handleSignUpSuccess = () => {

  navigate('/stories');
};




  useEffect(() => {
    setIsLogin(false);
  
  }, []); 

  useEffect(() => {

if (!showSecondStepSignUp && !showThirdStepSignUp ) {
  setShowFirstStepSignUp(true);
}


  }, [showFirstStepSignUp, showSecondStepSignUp, showThirdStepSignUp ]); 
  
  return (
   <VStack>

<Text textAlign='center' fontSize="20px" fontWeight="bold">Sign up for PureMusic </Text>

   <AuthForm onSignUpSuccess={handleSignUpSuccess}/>



<BottomLoginSignUp onLogin={goLogin} />


    </VStack>
  )
}

export default SignUpPage