import { createContext, useState, useContext, useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import AboutUs from './Website Policies/AboutUs';
import ContactUs from './Website Policies/ContactUs';
import TermsOfService from './Website Policies/TermsOfService';
import PrivacyPolicy from './Website Policies/PrivacyPolicy';
import Help from './Website Policies/Help';




import WelcomePage from './Home/WelcomePage';
import ArtistsPage from './pages/ArtistsPage';

import PageLayouts from './PageLayouts';

const DataContext = createContext();
export const useData = () => useContext(DataContext);

function App() {
  const [YenZekRootLink, setYenZekRootLink] = useState("https://yenzek.com/");

  return (
    <DataContext.Provider value={{
      YenZekRootLink, 

    }}>
    <PageLayouts>
    <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/artists" element={<ArtistsPage />} />
  
  
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/help" element={<Help />} />


  
            </Routes>
      </PageLayouts>
          </DataContext.Provider>
  )
}

export default App
