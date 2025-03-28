import React, { createContext, useState, useContext, useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import AboutUs from './Website Policies/AboutUs';
import ContactUs from './Website Policies/ContactUs';
import TermsOfService from './Website Policies/TermsOfService';
import PrivacyPolicy from './Website Policies/PrivacyPolicy';
import Help from './Website Policies/Help';



import WelcomePage from './Home/WelcomePage';
import ArtistsPage from './pages/ArtistsPage';
import PromoterPage from './pages/PromoterPage';

import Dashboard from './Dashboards/Dashboard';

import Movies from './Movies/Movies';

import PageLayouts from './PageLayouts';

const DataContext = createContext();
export const useData = () => useContext(DataContext);


function App() {
  const [YenZekRootLink, setYenZekRootLink] = useState("https://yenzek.com/");

  const [videoUrlPureMusicContent, setPureMusicVideoContent] = useState("");
  

  // https://firebasestorage.googleapis.com/v0/b/puremusic-d8ee8.firebasestorage.app/o/PureMusic_Musical_Movie_01.mp4?alt=media&token=381bebdf-f683-4514-bdb3-00284d9d3d7f
  useEffect(() => {
  if (!videoUrlPureMusicContent) {
    setPureMusicVideoContent("https://firebasestorage.googleapis.com/v0/b/puremusic-d8ee8.firebasestorage.app/o/PureMusic_Musical_Movie_01.mp4?alt=media&token=381bebdf-f683-4514-bdb3-00284d9d3d7f")

  }
  }, [videoUrlPureMusicContent]);

  
 
  const [onTransferedPage, setOnTransferedPage] = useState(false);


  const [isDashboard, setIsDashboard] = useState(true);
  const [showMenuDashboard, setMenuDashboard] = useState(false);
  const [showPayoutDetails, setShowPayoutDetails] = useState(false);


  const [homeSelected, setHomeSelected] = useState(true);
  const [shareQRSelected, setShareQRSelected] = useState(false);
  const [payoutDetailsSelected, setPayoutDetailsSelected] = useState(false);
  const [helpSelected, setHelpSelected] = useState(false);
  const [logoutPageSelected, setLogoutPageSelected] = useState(false);

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
      
      videoUrlPureMusicContent,

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

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/video/watch=fpx7p9k2f4m8d3c6v" element={<Movies />} />


        </Routes>
      </PageLayouts>
    </DataContext.Provider>
  )
}

export default App
