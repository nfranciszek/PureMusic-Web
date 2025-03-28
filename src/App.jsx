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

import Movies from './Movies/Movies';

import PageLayouts from './PageLayouts';

const DataContext = createContext();
export const useData = () => useContext(DataContext);


function App() {
  const [YenZekRootLink, setYenZekRootLink] = useState("https://yenzek.com/");


  const [onTransferedPage, setOnTransferedPage] = useState(false);



  return (
    <DataContext.Provider value={{
      YenZekRootLink,
      onTransferedPage, setOnTransferedPage,

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

          <Route path="/video/watch=fpx7p9k2f4m8d3c6v" element={<Movies />} />


        </Routes>
      </PageLayouts>
    </DataContext.Provider>
  )
}

export default App
