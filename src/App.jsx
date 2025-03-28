import React, { createContext, useState, useContext, useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import { getAuth } from 'firebase/auth';
import AboutUs from './Website Policies/AboutUs';
import ContactUs from './Website Policies/ContactUs';
import TermsOfService from './Website Policies/TermsOfService';
import PrivacyPolicy from './Website Policies/PrivacyPolicy';
import Help from './Website Policies/Help';



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

  const { pathname } = useLocation();
 
  
 
  const [onTransferedPage, setOnTransferedPage] = useState(false);


  const [isDashboard, setIsDashboard] = useState(true);
  const [showMenuDashboard, setMenuDashboard] = useState(false);
  const [showPayoutDetails, setShowPayoutDetails] = useState(false);


  const [homeSelected, setHomeSelected] = useState(true);
  const [shareQRSelected, setShareQRSelected] = useState(false);
  const [payoutDetailsSelected, setPayoutDetailsSelected] = useState(false);
  const [helpSelected, setHelpSelected] = useState(false);
  const [logoutPageSelected, setLogoutPageSelected] = useState(false);


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

  const [extractedUrlUsername, setExtractedUrlUsername] = useState(false);

  const getUserProfilePageURL = (userPageURL) => {
    setExtractedUrlUsername(userPageURL);

    }
  

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
      getUserProfilePageURL,
    }}>
      <PageLayouts>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/artists" element={<ArtistsPage />} />
          <Route path="/promoter-program" element={<PromoterPage />} />

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
        
        

          <Route path="/signup" element={<SignUpPage />} />
          
          <Route path="/account/login" element={<LoginPage />} />
          

        </Routes>
      </PageLayouts>
    </DataContext.Provider>
  )
}

export default App
