import React, { useState } from 'react';
import { VStack, Input, Button, Link, Text, Box } from '@chakra-ui/react';
import { validateEmail, validatePassword, authenticateUser } from './Login';
import { RxEyeOpen } from "react-icons/rx";
import { PiEyeClosedBold } from "react-icons/pi";
import { useData } from '../../App';
import { checkUserExists } from './Login';

  const LoginForm = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError ] = useState('');
    const [passwordError, setPasswordError ] = useState('');
    const [error, setError ] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const {
        showLoginPopup, setShowLoginPopup,
        didUserJustLogIn, setDidUserJustLogIn
    
    } = useData();

  
/*
    const closeLoginPopup = () => {
        setShowLoginPopup(false);
      };
*/
    const handleLogin = async () => {

            setError('');
            setEmailError('');
            setPasswordError('');

   // Check if email is empty
        if (!email.trim()) {
            setEmailError('Email cannot be empty');
            return;
        } else {
            setEmailError('');
        }

           // Validate email format
           if (!validateEmail(email)) {
            setEmailError('Invalid email address');
            return;
        }
    
        // Check if password is empty
        if (!password.trim()) {
            setPasswordError('Password cannot be empty');
            return;
        } else {
            setPasswordError('');
        }

           // Validate password length
           if (!validatePassword(password)) {
            setPasswordError('Password does not match with credentials of email');
            return;
        }


        /*
        const loginEmail = email.value
        const loginPassword = password.value
            try {
                const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
                console.log(userCredential.user)
            
            } catch (error) {
                // Handle authentication errors
                setError('Sorry, your email or password was incorrect. Please double-check your credentials.');
                console.error('Authentication error:', error);
            }
       
   */
     
        try {

            await authenticateUser(email, password); // Corrected here

            // SECOND DETERMINATION
          const userExists = await checkUserExists();

      

        if (userExists) {


        
             // onLoginSuccess();
              setDidUserJustLogIn(true);
              

            setEmail('');
            setPassword('');
      

            } else {
              setError('Your account was terminated or removed!');

            }

        } catch (error) {


                setError('Sorry, your email or password was incorrect. Please double-check your credentials.');
                console.error('Authentication error:', error);
            }
         
       
    };
    return (
        <VStack w="260px">
           <Input w="260px" type='email'
                placeholder='Email'
                fontSize={14} focusBorderColor="#05c7d0"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />

              {emailError && <Text fontSize={12} color="red.500">{emailError}</Text>}
           
              <Input w="260px"     type={passwordVisible ? 'text' : 'password'}
                placeholder='Password'
                fontSize={14} focusBorderColor="#05c7d0"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />


<div style={{ position: 'relative', width: '270px', marginTop: '20px' }}>
  <div style={{ position: 'absolute', top: '30%', transform: 'translateY(-150%)', left: '0' }}>
    <Box
      onClick={() => setPasswordVisible(!passwordVisible)}
      cursor="pointer"
      style={{ marginRight: '0px' }} // Adjust the spacing as needed
    >
      {passwordVisible ? <RxEyeOpen color="#05c7d0" /> : <PiEyeClosedBold color="#05c7d0" />}
    </Box>
  </div>
  <div style={{ position: 'absolute', top: '30%', transform: 'translateY(-150%)', right: '0' }}>
    <Box
      onClick={() => setPasswordVisible(!passwordVisible)}
      cursor="pointer"
      style={{ marginLeft: '0px' }} // Adjust the spacing as needed
    >
      {passwordVisible ? <RxEyeOpen color="#05c7d0" /> : <PiEyeClosedBold color="#05c7d0" />}
    </Box>
  </div>
</div>

{passwordError && <Text fontSize={12} color="red.500">{passwordError}</Text>}
            <Button
                width="full"
                mt="10px" 
                onClick={handleLogin}
                _hover={{
                    bg: '#05c7d0',
                    color: 'white'
                }}>Log in</Button>


              {error && <Text fontSize={12} color="red.500">{error}</Text>}

       



        </VStack>
    );
}

  
  export default LoginForm