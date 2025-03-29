import React, { useEffect } from 'react';
import { VStack, Text } from '@chakra-ui/react'
import AuthForm from './AuthForm'
import { useNavigate } from 'react-router-dom'
import { useData } from '../../App';

const SignUpPage = () => {
  const navigate = useNavigate();

  const goLogin = () => {
    navigate('/account/login');

  }


  const {

    setIsLogin, isLogin, showFirstStepSignUp, setShowFirstStepSignUp,
    showSecondStepSignUp, setShowSecondStepSignUp,
    showThirdStepSignUp, setShowThirdStepSignUp,


    setHomeSelected,
    setShareQRSelected,
    setPayoutDetailsSelected,
    setShowPayoutDetails,
    setMenuDashboard,
    setHelpSelected,
    setLogoutPageSelected,
    setPromoterTabSelected,
    setArtistTabSelected,
    userIsAdmin

  } = useData();

  const handleSignUpSuccess = () => {
    if (userIsAdmin) {
      setPromoterTabSelected(true);
      setArtistTabSelected(false);
      setHomeSelected(false);
    } else {
      setPromoterTabSelected(false);
      setArtistTabSelected(false);
      setHomeSelected(true);
    }
    setShareQRSelected(false);
    setPayoutDetailsSelected(false);
    setShowPayoutDetails(false);
    setMenuDashboard(false);
    setHelpSelected(false);
    setLogoutPageSelected(false);


    navigate("/dashboard");
  };




  useEffect(() => {
    setIsLogin(false);

  }, []);

  useEffect(() => {

    if (!showSecondStepSignUp && !showThirdStepSignUp) {
      setShowFirstStepSignUp(true);
    }


  }, [showFirstStepSignUp, showSecondStepSignUp, showThirdStepSignUp]);

  return (
    <VStack>
      {!isLogin && (
        <Text textAlign='center' fontSize="20px" fontWeight="bold">Sign up for PureMusic </Text>
      )}
      <AuthForm onSignUpSuccess={handleSignUpSuccess} />


    </VStack>
  )
}

export default SignUpPage