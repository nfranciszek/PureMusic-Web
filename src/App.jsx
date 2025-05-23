import React, { createContext, useState, useContext, useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { usersArtistsRef, userPromotersRef, userAdminRef, currentUserId, get, child } from './Utilities/firebase';
import { getAuth } from 'firebase/auth';
import AboutUs from './Website Policies/AboutUs';
import ContactUs from './Website Policies/ContactUs';
import TermsOfService from './Website Policies/TermsOfService';
import PrivacyPolicy from './Website Policies/PrivacyPolicy';
import Help from './Website Policies/Help';
import MotherhoodPage from './Home/MotherhoodPage';
import GentleMusicPage from './Home/GentleMusicPage';

import PromotedMovies from './Movies/PromotedMovies';

import WelcomePage from './Home/WelcomePage';
import ArtistsPage from './pages/ArtistsPage';
import PromoterPage from './pages/PromoterPage';
import SignUpPage from './pages/AuthPages/SignUpPage';
import LoginPage from './pages/AuthPages/LoginPage';

import Dashboard from './Dashboards/Dashboard';

import Movies from './Movies/Movies';

import PageLayouts from './PageLayouts';

const DataContext = createContext();
export const useData = () => useContext(DataContext);


function App() {
  const [YenZekRootLink, setYenZekRootLink] = useState("https://yenzek.com/");
  const auth = getAuth();
  const user = auth.currentUser;

  const [TimeStopVideoForTips, setTimeStopVideoForTips] = useState(121);
  const [TimeContinueVideoAfterTips, setTimeContinueVideoAfterTips] = useState(117);

  const [userIsArtist, setUserIsArtist] = useState(false);
  const [userIsPromoter, setUserIsPromoter] = useState(false);
  const [userIsFan, setUserIsFan] = useState(false);
  const [userIsAdmin, setUserIsAdmin] = useState(false);

  const checkUserType = async (uid) => {
    try {
      const artistSnapshot = await get(child(usersArtistsRef, `${uid}`));
      const isArtist = artistSnapshot.exists();
      setUserIsArtist(artistSnapshot.exists());
    //  console.log("User is Artist:", isArtist);  // Log artist status

      const promoterSnapshot = await get(child(userPromotersRef, `${uid}`));
      const isPromoter = promoterSnapshot.exists();
      setUserIsPromoter(promoterSnapshot.exists());
    //  console.log("User is Promoter:", isPromoter);  // Log promoter status

      const adminSnapshot = await get(child(userAdminRef, `${uid}`));
      const isAdmin = adminSnapshot.exists();
      setUserIsAdmin(adminSnapshot.exists());
    //  console.log("User is A:", isAdmin);

      // You can set userIsFan based on other conditions if needed
      const isFan = !isArtist && !isPromoter && !isAdmin;
      setUserIsFan(!artistSnapshot.exists() && !promoterSnapshot.exists());
    //  console.log("User is Fan:", isFan);  // Log fan status

    } catch (error) {
      console.error("Error checking user type:", error);
    }
  };

  useEffect(() => {
    if (currentUserId && user) {
      checkUserType(currentUserId);
    }
  }, [currentUserId, user]);



  const { pathname } = useLocation();


  // when user just signs up

  const getUserUsernameUrl = (username) => {
    savedUsernameUrl(username);

  }

  const [onTransferedPage, setOnTransferedPage] = useState(false);


  const [isDashboard, setIsDashboard] = useState(true);
  const [showMenuDashboard, setMenuDashboard] = useState(false);
  const [showPayoutDetails, setShowPayoutDetails] = useState(false);


  const [homeSelected, setHomeSelected] = useState(true);
  const [shareQRSelected, setShareQRSelected] = useState(false);
  const [payoutDetailsSelected, setPayoutDetailsSelected] = useState(false);
  const [helpSelected, setHelpSelected] = useState(false);
  const [logoutPageSelected, setLogoutPageSelected] = useState(false);

  const [promoterTabSelected, setPromoterTabSelected] = useState(false);
  const [artistTabSelected, setArtistTabSelected] = useState(false);


  const [showFirstStepSignUp, setShowFirstStepSignUp] = useState(false);
  const [showSecondStepSignUp, setShowSecondStepSignUp] = useState(false);
  const [showThirdStepSignUp, setShowThirdStepSignUp] = useState(false);


  const [isLogin, setIsLogin] = useState(true);

  const [isSignUp, setSignUp] = useState(false);


  const [didUserJustLogIn, setDidUserJustLogIn] = useState(false);
  const [userJustSignedUp, setUserJustSignedUp] = useState(false);


  const [showLoginPopup, setShowLoginPopup] = useState(false);



  const [signUpAsPromoter, setSignUpAsPromoter] = useState(false);
  const [signUpAsArtist, setSignUpAsArtist] = useState(false);
  const [signUpAsFan, setSignUpAsFan] = useState(false);

  const [usernameUrl, savedUsernameUrl] = useState("");

  const [extractedUrlUsername, setExtractedUrlUsername] = useState("");
  const [savedCreditedUser, setSavedCreditedUser] = useState("");

  const [finalTipAmount, setFinalTipAmount] = useState("");

  const [visitorUserMenu, setVisitorUserMenu] = useState(false);


  useEffect(() => {
    if (extractedUrlUsername) {
      setSavedCreditedUser(extractedUrlUsername);
     // console.log("user credited : ", extractedUrlUsername); // Log extracted username directly
    }
  }, [extractedUrlUsername]);

  const getPromoterUsernameUrl = (userPageURL) => {
    setExtractedUrlUsername(userPageURL);

  }

  const navigate = useNavigate();
  useEffect(() => {
    if (didUserJustLogIn) {




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



      navigate("/dashboard"); // ✅ Navigate globally
      setDidUserJustLogIn(false); // ✅ Reset state
    }
  }, [didUserJustLogIn, navigate]);



  useEffect(() => {
    const currentUrl = window.location.href;
  
    // Check if the URL contains "/signup" or "/account/login" AND the user is logged in
    if ((currentUrl.includes("/signup") || currentUrl.includes("/account/login")) && user) {
      navigate("/dashboard");

      setHomeSelected(true);
      setShareQRSelected(false);
      setPayoutDetailsSelected(false);
      setShowPayoutDetails(false);
      setHelpSelected(false);
      setLogoutPageSelected(false);
      setPromoterTabSelected(false);
      setArtistTabSelected(false);
    }
  }, [user, navigate]);

  useEffect(() => {
    const currentUrl = window.location.href;
  
    // Check if the URL contains "/signup" or "/account/login" AND the user is logged in
    if ((currentUrl.includes("/") && user)) {
      
      navigate("/dashboard");

      if (userIsAdmin) {
  
      setHomeSelected(false);
      setShareQRSelected(false);
      setPayoutDetailsSelected(false);
      setShowPayoutDetails(false);
      setHelpSelected(false);
      setLogoutPageSelected(false);

      setPromoterTabSelected(true);
      setArtistTabSelected(false);
   
      } else {

       

          setHomeSelected(true);
          setShareQRSelected(false);
          setPayoutDetailsSelected(false);
          setShowPayoutDetails(false);
          setHelpSelected(false);
          setLogoutPageSelected(false);
          setPromoterTabSelected(false);
          setArtistTabSelected(false);


       

      }

    }
  }, [user, userIsAdmin, navigate, didUserJustLogIn, userJustSignedUp]);

  useEffect(() => {
    const currentUrl = window.location.href;

    // Check if the URL contains the specific pattern
    if (currentUrl.includes("/video/watch=hYp8Cf2kmeJwgf2dL")) {
      // Extract the username from the URL using a regular expression
      const regex = /_user=([^&]+)/;
      const match = currentUrl.match(regex);

      if (match && match[1]) {
        const usernameFromUrl = match[1]; // Extract the username part
        const username = usernameFromUrl.toLowerCase(); // Ensure username is in lowercase
       // console.log('Extracted Username:', username);

        // Call the function with the extracted username
        getPromoterUsernameUrl(username);
      } else {
        console.error("Username not found in URL.");
      }
    } else {
      console.error("URL does not contain the expected pattern.");
    }
  }, []);


  useEffect(() => {
    const currentUrl = window.location.href;

    // Check if the URL contains the specific pattern
    if (currentUrl.includes("fpx7p9k2f4m8d3c6v")) {
      const handleCreditUser = async () => {
        if (savedCreditedUser && finalTipAmount) {

          setSavedCreditedUser(null);
          setFinalTipAmount(null);
        }
      };

      handleCreditUser(); // Now we call the function inside the effect
    }
  }, [savedCreditedUser, finalTipAmount]);

  // IMPORTANT AS IT SAVES IN LOCALSTORAGE!!!
  useEffect(() => {
    // Store the data in localStorage when savedCreditedUser or finalTipAmount changes
    if (savedCreditedUser && finalTipAmount) {
      localStorage.setItem('savedCreditedUser', savedCreditedUser);
      localStorage.setItem('finalTipAmount', finalTipAmount);
      const savedUser = localStorage.getItem('savedCreditedUser');
      const savedAmount = localStorage.getItem('finalTipAmount');

      if (savedUser && savedAmount) {

      //  console.log("initial saved Credited User ", savedUser);
       // console.log("initial saved final TipAmount ", savedAmount);

      }
    }
  }, [savedCreditedUser, finalTipAmount]);






  return (
    <DataContext.Provider value={{
      YenZekRootLink,
      onTransferedPage, setOnTransferedPage,
      isDashboard, setIsDashboard,
      showMenuDashboard, setMenuDashboard,
      showPayoutDetails, setShowPayoutDetails,

      homeSelected, setHomeSelected,
      shareQRSelected, setShareQRSelected,
      payoutDetailsSelected, setPayoutDetailsSelected,
      helpSelected, setHelpSelected,
      logoutPageSelected, setLogoutPageSelected,

      promoterTabSelected, setPromoterTabSelected,
      artistTabSelected, setArtistTabSelected,



      showFirstStepSignUp, setShowFirstStepSignUp,
      showSecondStepSignUp, setShowSecondStepSignUp,
      showThirdStepSignUp, setShowThirdStepSignUp,

      isLogin, setIsLogin,
      isSignUp, setSignUp,

      showLoginPopup, setShowLoginPopup,

      didUserJustLogIn, setDidUserJustLogIn,

      userJustSignedUp, setUserJustSignedUp,


      signUpAsArtist, setSignUpAsArtist,
      signUpAsPromoter, setSignUpAsPromoter,
      signUpAsFan, setSignUpAsFan,
      extractedUrlUsername, setExtractedUrlUsername,
      getUserUsernameUrl,

      savedCreditedUser, setSavedCreditedUser,
      finalTipAmount, setFinalTipAmount,
      visitorUserMenu, setVisitorUserMenu,

      userIsArtist,
      userIsPromoter,
      userIsFan,
      userIsAdmin,

      TimeStopVideoForTips,
      TimeContinueVideoAfterTips,

    }}>
      <PageLayouts>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/artists" element={<ArtistsPage />} />
          <Route path="/promoter-program" element={<PromoterPage />} />

          <Route path="/gentle-music" element={<GentleMusicPage />} />

          <Route path="/gentle-music/motherhood" element={<MotherhoodPage />} />

          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/help" element={<Help />} />



          {user ? (
            <Route path="/dashboard" element={<Dashboard />} />
          ) : (
            // redirect to Login Page
            <Route path="/dashboard" element={<LoginPage to="/" />} />  // Redirect to the homepage if not logged in
          )}

          <Route path="/video/watch=fpx7p9k2f4m8d3c6v" element={<Movies />} />


          <Route path={`video/watch=hYp8Cf2kmeJwgf2dL_user=${extractedUrlUsername}`} element={<PromotedMovies />} />



         
          <Route path="/signup" element={<SignUpPage />} />

          <Route path="/account/login" element={<LoginPage />} />


        </Routes>
      </PageLayouts>
    </DataContext.Provider>
  )
}

export default App
