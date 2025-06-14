import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import StickyNavbar from './components/StickyNavbar';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Faq from './pages/FAQs.jsx';
import LayoutSelection from './pages/LayoutSelection.jsx';
import Photobooth from './pages/Photobooth.jsx'
import CustomizationPage from './pages/CustomizationPage.jsx';

function App() {
  return (
    <Router>
      <div className="px-16 py-4">
      <StickyNavbar />
        <Routes>
          <Route 
            path="/"
            element={
              <>
                <Home />
                <About />
              </>
            }
          />
          <Route path="/faq" element={<Faq />} />
          <Route path="/select-layout" element={<LayoutSelection />} />
          <Route path="/photobooth" element={<Photobooth />} />

          <Route path="/customization" element={<CustomizationPage />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
