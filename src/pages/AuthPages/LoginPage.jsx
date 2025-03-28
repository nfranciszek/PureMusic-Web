import React, { useEffect } from 'react'
import { VStack, Text } from '@chakra-ui/react'
import AuthForm from './AuthForm'
import { useNavigate } from 'react-router-dom'
import BottomLoginSignUp from '../../Footers/ButtonLoginSignup'
import { useData } from '../../App'
const LoginPage = () => {
  const navigate = useNavigate();


  const handleLoginSuccess = () => {
    // Navigate to MainPage

    navigate('/stories');
};


  const goSignUp = () => {
  navigate('/signup');

}



const {

  setIsLogin

} = useData();






useEffect(() => {
  setIsLogin(true);

}, []); 

  return (
    <VStack>

<AuthForm onLoginSuccess={handleLoginSuccess} />

<BottomLoginSignUp onSignUp={goSignUp}/>

    </VStack>
  )
}

export default LoginPage