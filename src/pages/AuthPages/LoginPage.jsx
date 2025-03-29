import React, { useEffect } from 'react'
import { VStack, Text } from '@chakra-ui/react'
import AuthForm from './AuthForm'
import { useNavigate } from 'react-router-dom'
import { useData } from '../../App'
const LoginPage = () => {
  const navigate = useNavigate();

 
const {

  setIsLogin,


  showMenuDashboard, setMenuDashboard,
        showPayoutDetails, setShowPayoutDetails,
        homeSelected, setHomeSelected,
        shareQRSelected, setShareQRSelected,
        payoutDetailsSelected, setPayoutDetailsSelected,
        helpSelected, setHelpSelected,
        logoutPageSelected, setLogoutPageSelected,

} = useData();

  const handleLoginSuccess = () => {



    setHomeSelected(true);
    setShareQRSelected(false);
    setPayoutDetailsSelected(false);
    setShowPayoutDetails(false);
    setMenuDashboard(false);

    setHelpSelected(false);

    navigate('/dashboard');

    setLogoutPageSelected(false);
};


  const goSignUp = () => {
  navigate('/signup');

}









useEffect(() => {
  setIsLogin(true);

}, []); 

  return (
    <VStack>

<AuthForm onLoginSuccess={handleLoginSuccess} />


    </VStack>
  )
}

export default LoginPage