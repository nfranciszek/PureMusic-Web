import React, { useState } from 'react';
import { VStack, Input, Button, Link, Text, Box, Image, CircularProgress } from '@chakra-ui/react';
import { IoImageOutline } from 'react-icons/io5';
import { RxEyeOpen } from "react-icons/rx";
import { PiEyeClosedBold } from "react-icons/pi";
import { userLanguageCode, userLanguageName } from '../../Utilities/language';
import { countries } from 'countries-list';
import { HStack, FormControl, FormLabel, Select } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { validateAge, validateEmail, checkIfEmailRegistered, validateName, validateNameSafety, validateNameFormat, validateImage, validateUsername, validateUsernameLength, validateUsernameFormat, validateUsernameSafety, validatePassword, validateUsernameExcludesCompanyWebsites } from './CreateAccount';
import { useData } from '../../App';
import { createAccountSignUp } from './CreateAccount';



const SignupForm = ({ onSignUpSuccess }) => {

    const [birthday, setBirthday] = useState({
        month: '',
        day: '',
        year: '',
    });


    const {

        getUserProfilePageURL,
        showFirstStepSignUp, setShowFirstStepSignUp,
        showSecondStepSignUp, setShowSecondStepSignUp,
        showThirdStepSignUp, setShowThirdStepSignUp,
        profileURL,
        isNewUser, setNewUser,
        setCreatePostModal,

        eventActionTaken,
        setEventActionTaken,
        setEventsSelected,
        inviteSenderUID,

        signUpCompetitionPhoto, setSignUpCompetitionPhoto,


        userJustSignedUp,
        setUserJustSignedUp,

        creditedBrandAmbassadorUID,

    } = useData();

    const months = [
        { value: 1, label: 'January' },
        { value: 2, label: 'February' },
        { value: 3, label: 'March' },
        { value: 4, label: 'April' },
        { value: 5, label: 'May' },
        { value: 6, label: 'June' },
        { value: 7, label: 'July' },
        { value: 8, label: 'August' },
        { value: 9, label: 'September' },
        { value: 10, label: 'October' },
        { value: 11, label: 'November' },
        { value: 12, label: 'December' },
    ];

    const days = [...Array(31).keys()].map((day) => ({ value: day + 1, label: `${day + 1}` }));
    const currentYear = new Date().getFullYear();
    const years = [...Array(100).keys()].map((year) => ({ value: currentYear - year, label: `${currentYear - year}` }));


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [username, setUsername] = useState('');

    const [birthdayError, setBirthdayError] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [profilePicError, setProfilePicError] = useState('');
    const [usernameError, setUsernameError] = useState('');

    const [loading, setLoading] = useState(false); // State to track form submission loading
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false); // 

    const { pathname } = useLocation();

    const goToTermsOfService = () => {
        window.open('/terms-of-service', '_blank');
    };

    const goToPrivacyPolicy = () => {
        window.open('/privacy-policy', '_blank');
    };

    const goToCommunityGuidelines = () => {
        window.open('/community-guidelines', '_blank');

    };
    const checkEmail = async () => {
        // Check email validation
        if (!validateEmail(email)) {
            setEmailError("Invalid email address");
            return false; // Return false to indicate email validation failure
        } else {
            setEmailError(""); // Clear any previous error message
        }

        // Check if email is already registered
        const isEmailRegistered = await checkIfEmailRegistered(email);
        if (isEmailRegistered) {
            setEmailError("Email is already registered.");
            return false; // Return false to indicate email registration status
        }

        return true; // Return true if email validation and registration status checks pass
    };

    const checkBirthday = async () => {
        // Check birthday validation

        // console.log(birthday);

        if (!birthday.month && !birthday.day && !birthday.year) {
            setBirthdayError("Please provide your birthday.");
            return false;
        } else if (!validateAge(birthday)) {
            setBirthdayError("You must be at least 16 years old to have an account.");
            return false;
        } else {
            setBirthdayError(""); // Clear any previous birthday error message
        }

        return true; // Return true if birthday validation passes
    };

    const handleFirstStepContinue = async () => {

        const isBirthdayValid = await checkBirthday();

        // Check email validation and registration status
        const isEmailValid = await checkEmail();

        if (isBirthdayValid) {
            setBirthdayError("");
        }
        if (isEmailValid) {
            setEmailError("");
        }

        // Stop execution if either email or birthday validation fails
        if (!isEmailValid || !isBirthdayValid) {
            return;
        }

        // If all validations pass, proceed to the next step
        setShowFirstStepSignUp(false);
        setShowSecondStepSignUp(true);


    };


    const checkName = () => {
        // Check name validation
        if (!validateNameFormat(name)) {
            setNameError("Name can only contain letters and spaces");
            return false;
        } else if (!validateName(name)) {
            setNameError("Name must be between 2 and 20 characters");
            return false;
        } else if (!validateNameSafety(name)) {
            setNameError("Please refrain from using profane language!");
            return false

        } else {
            setNameError(""); // Clear any previous error message
        }

        return true; // Return true if name validation passes
    };

    const checkImage = () => {
        // Check image validation

        // Check profile picture validation
        if (!profilePic) {
            setProfilePicError("Please upload a profile picture");
            return false;
        } else if (!validateImage(profilePic)) {
            setProfilePicError("Please upload a valid image file (JPG, PNG, JPEG)");
            return false;
        } else {
            setProfilePicError(""); // Clear any previous error message
        }

        return true; // Return true if image validation passes
    };


    function handleInputChange(e) {


        const file = e.target.files[0];

        setProfilePic(file);

    }


    const handleSecondStepContinue = async () => {

        // Check image validation
        const isImageValid = await checkImage();

        // Check name validation
        const isNameValid = await checkName();

        if (isImageValid) {
            setProfilePicError("");
        }

        if (isNameValid) {
            setNameError("");
        }


        // Stop execution if either name or image validation fails
        if (!isNameValid || !isImageValid) {
            return;
        }

        // If all validations pass, proceed to the next step
        // Place your code here to proceed to the next step
        setShowSecondStepSignUp(false);
        setShowThirdStepSignUp(true);

    };
    const handleBirthdayChanges = (field, value) => {
        setBirthday(prevState => ({
            ...prevState,
            [field]: value,
        }));
    };



    const checkUsername = async () => {
        if (username.trim() === '') {
            setUsernameError("Username cannot be empty");
            return false;
        } else if (!validateUsernameLength(username)) {
            setUsernameError("Username must be between 2 and 20 characters");
            return false;
        } else if (!validateUsernameFormat(username)) {
            setUsernameError("Username must be valid and consist of only letters, numbers, periods, underscores, hyphens");
            return false
        } else if (!validateUsernameSafety(username)) {
            setUsernameError("Please refrain from using profane language!");
            return false
        } else if (!validateUsernameExcludesCompanyWebsites(username)) {
            setUsernameError("Username taken");
            return false
        }

        const usernameExists = await validateUsername(username);
        if (usernameExists) {
            setUsernameError("Username already taken");
            return false;
        }

        return true;

    };

    const checkPassword = () => {
        // Check image validation

        if (password.trim() === '') {
            setPasswordError("Enter a strong password");
            return false;
        } else if (!validatePassword(password)) {
            setPasswordError("Password must be at least 8 characters long");
            return false;
        }
        return true; // Return true if image validation passes
    };

    const handleThirdStepContinue = async () => {

        // Check image validation
        const isUsernameValid = await checkUsername();

        // Check name validation
        const isPasswordValid = await checkPassword();

        if (isUsernameValid) {
            setUsernameError("");
        }

        if (isPasswordValid) {
            setPasswordError("");
        }


        // Stop execution if either name or image validation fails
        if (!isPasswordValid || !isUsernameValid) {
            return;
        }




        handleSignUp();


    };

    const handleSignUp = async () => {
        setLoading(true);
        setButtonClicked(true); // Set the buttonClicked state to true when the button is clicked


        // Set Language
        const languageName = userLanguageName;

        const languageCode = userLanguageCode;



        try {
            const countryData = await fetch('https://ipinfo.io/json');
            const { country } = await countryData.json();
            const countryName = countries[country].name;

            const month = birthday.month.padStart(2, '0');
            const day = birthday.day.padStart(2, '0');
            const year = birthday.year;

            const formattedBirthday = `${month}/${day}/${year}`;


            // console.log('Creating account with the following details:');
            // console.log('Name:', name);
            // console.log('Email:', email);
            // console.log('Password:', password);
            // console.log('Profile Picture:', profilePic);
            // console.log('Username:', username);
            // console.log('Language:', languageName);
            //  console.log('language:', languageCode);
            // console.log('Country:', countryName);
            // console.log('birthday:', formattedBirthday);


            await createAccountSignUp(name, email, password, profilePic, username, languageName, languageCode, countryName, formattedBirthday, signUpCompetitionPhoto, creditedBrandAmbassadorUID);


            setUserJustSignedUp(true);

            getUserProfilePageURL(username);

            setLoading(false);

            goToStories();

            // Temporary
            if (signUpCompetitionPhoto) {

                window.location.reload();
            }



        } catch (error) {
            // Handle error if needed
            console.error('Error creating account:', error);
            // Set loading back to false in case of error
            setLoading(false);
        }

    };


    const includedPath = [
        '/stories',
        '/listen',
        `/${profileURL}`
    ];
    const isYenZekHomeOpen = includedPath.some(path => pathname.includes(path));

    const includedTalkCirclePaths = [


        '/talkcircles',
        '/talkcircles/session='

    ]

    const TalkCirclePaths = includedTalkCirclePaths.some(path => pathname.includes(path));

    const goToStories = () => {
        // if (isYenZekHomeOpen) {
        // if Popup 
        // close panel!
        setShowThirdStepSignUp(false);
        onSignUpSuccess();
        setNewUser(true);

        if (!TalkCirclePaths) {
            if (!eventActionTaken) {
                setCreatePostModal(true);
            } else {
                setEventActionTaken(false);
                setEventsSelected(true);
            }

            if (signUpCompetitionPhoto) {
                setEventsSelected(true);
            }
        }
    };



    return (
        <VStack w="290px">

            {loading && (
                <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
                    <CircularProgress isIndeterminate color="gray" />
                </Box>
            )}
    
            {showThirdStepSignUp && (
           
                <Text fontSize="12px" textAlign={'center'} pb={5}>
                    Sign up to listen to exclusive music from our Artists
                </Text>
          
            )}  
            <div style={{ display: 'flex' }}>
                {[...Array(3)].map((_, index) => (
                    <span
                        key={index}
                        className={index < (showThirdStepSignUp ? 3 : showSecondStepSignUp ? 2 : showFirstStepSignUp ? 1 : 0) ? 'active' : ''}
                        style={{
                            display: 'inline-block',
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            background: index < (showThirdStepSignUp ? 3 : showSecondStepSignUp ? 2 : showFirstStepSignUp ? 1 : 0) ? '#05c7d0' : 'gray',
                            marginRight: '5px'
                        }}
                    ></span>
                ))}
            </div>


            {showFirstStepSignUp && (
                <>
                    <VStack spacing={4}>

                        <FormControl align="flex-start" pt="5px" >
                            <Text textAlign="center" fontSize="14px">What's your birthday?</Text>
                        </FormControl>
                        <HStack spacing={4} width="20rem">
                            <FormControl>
                                <Text fontSize="10px">Month</Text>
                                <Select value={birthday.month} onChange={(e) => handleBirthdayChanges('month', e.target.value)}>
                                    <option style={{ width: "100%" }} value="">Month</option>
                                    {months.map((month) => (
                                        <option key={month.value} value={month.value}>{month.label}</option>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl>
                                <Text fontSize="10px">Day</Text>
                                <Select value={birthday.day} onChange={(e) => handleBirthdayChanges('day', e.target.value)}>
                                    <option style={{ width: "100%" }} value="">Day</option>
                                    {days.map((day) => (
                                        <option key={day.value} value={day.value}>{day.label}</option>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl>
                                <Text fontSize="10px">Year</Text>
                                <Select value={birthday.year} onChange={(e) => handleBirthdayChanges('year', e.target.value)}>
                                    <option style={{ width: "100%" }} value="">Year</option>
                                    {years.map((year) => (
                                        <option key={year.value} value={year.value}>{year.label}</option>
                                    ))}
                                </Select>

                            </FormControl>
                        </HStack>
                        {birthdayError && (
                            <Text fontSize={12} color="red.500" mt={1}>
                                {birthdayError}
                            </Text>
                        )}
                        <Box align="flex-start">
                            <Text fontSize="10px">Your birthday won't be shown publicly.</Text>
                        </Box>





                        <Input
                            w="320px"
                            type='email'
                            name="email"
                            value={email}
                            placeholder='Email'
                            fontSize={14}
                            focusBorderColor="#05c7d0"
                            onChange={(e) => setEmail(e.target.value)} />



                        <VStack spacing={4}>

                            {emailError && (
                                <Text fontSize={12} color="red.500" mt={1}>
                                    {emailError}
                                </Text>
                            )}




                            <Button w="320px" _hover={{ bg: '#05c7d0', color: 'white' }} onClick={handleFirstStepContinue} >Continue</Button>
                        </VStack>

                    </VStack>
                    <Text textAlign="center" fontSize="12px">
                        By continuing, you agree to our{' '}
                        <Link color="blue.500" fontSize="inherit" onClick={goToTermsOfService}>
                            Terms
                        </Link>
                        {', '}
                        <Link color="blue.500" fontSize="inherit" onClick={goToPrivacyPolicy}>
                            Privacy Policy
                        </Link>
                        {', and '}
                        <Link color="blue.500" fontSize="inherit" onClick={goToCommunityGuidelines}>
                            Community Guidelines
                        </Link>
                        .
                    </Text>

                </>
            )}

            {showSecondStepSignUp && (
                <>
                    <Text textAlign="center" fontSize="14px">Upload a Profile Picture</Text>
                    <label htmlFor="profilePicInput" className="profile-image" style={{ display: 'block', margin: 'auto' }}>
                        {profilePicError && (
                            <Text fontSize={12} color="red.500" mt={1}>
                                {profilePicError}
                            </Text>
                        )}
                        {profilePic ? (
                            <Image
                                src={URL.createObjectURL(profilePic)}
                                alt="Profile"
                                borderRadius="10px"
                                boxShadow="base"
                                className="profile-image"
                            />
                        ) : (
                            <Box
                                border="1px dashed #05c7d0"
                                borderRadius="10px"
                                p="80px"
                                cursor="pointer"
                                className="profile-image"
                            >

                                <IoImageOutline size="32px" />
                            </Box>
                        )}
                    </label>

                    <Input
                        w="320px"
                        type='text'
                        name="Name"
                        value={name}
                        placeholder='Name'
                        fontSize={14}
                        focusBorderColor="#05c7d0"
                        onChange={(e) => setName(e.target.value)}
                    />

                    {nameError && (
                        <Text fontSize={12} color="red.500" mt={1}>
                            {nameError}
                        </Text>
                    )}

                    <Button
                        w="320px"
                        _hover={{ bg: '#05c7d0', color: 'white' }}
                        onClick={handleSecondStepContinue}
                    >
                        Continue
                    </Button>

                    <Input
                        id="profilePicInput"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleInputChange}
        
                        name="profilePic"
                    />
                </>
            )}

            {showThirdStepSignUp && (
                <>
                    <VStack spacing={4}>

                        <FormControl align="flex-start" ml="20px">
                            <Text fontSize="12px">Create account</Text>
                        </FormControl>

                        <Input
                            w="320px"
                            type='text'
                            placeholder='Username'
                            fontSize={14} focusBorderColor="#05c7d0"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} />

                        {usernameError && <Text fontSize={12} color="red.500">{usernameError}</Text>}

                        <Input
                            w="320px"
                            type={passwordVisible ? 'text' : 'password'}
                            placeholder='Password'
                            fontSize={14}
                            focusBorderColor="#05c7d0"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <div style={{ position: 'relative', width: '330px', marginTop: '8px' }}>
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


                        <VStack spacing={4}>









                            <Button w="320px" _hover={{ bg: '#05c7d0', color: 'white' }} mt="10px" onClick={handleThirdStepContinue} disabled={buttonClicked} >Sign up</Button>
                        </VStack>

                    </VStack>
                    <Text textAlign="center" fontSize={12}>

                        By signing up, you agree to our{' '}
                        <Link color="blue.500" fontSize="inherit" onClick={goToTermsOfService}>
                            Terms
                        </Link>
                        {', '}
                        <Link color="blue.500" fontSize="inherit" onClick={goToPrivacyPolicy}>
                            Privacy Policy
                        </Link>
                        {', and '}
                        <Link color="blue.500" fontSize="inherit" onClick={goToCommunityGuidelines}>
                            Community Guidelines
                        </Link>
                        .
                    </Text>
                </>
            )}



        </VStack>
    );
}

export default SignupForm