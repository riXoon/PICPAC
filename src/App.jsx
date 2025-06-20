import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import StickyNavbar from './components/StickyNavbar';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Faq from './pages/FAQs.jsx';
import LayoutSelection from './pages/LayoutSelection.jsx';
import Photobooth from './pages/Photobooth.jsx';
import CustomizationPage from './pages/CustomizationPage.jsx';
import PhotoGallery from './pages/PhotoGallery.jsx';
import Contact from './pages/Contact.jsx';

function App() {
  return (
    <Router>
        <StickyNavbar />
        
        <div className="px-16 py-4">
          <Routes>
            <Route 
              path="/"
              element={
                <>
                  <Home />
                  <PhotoGallery />
                  <About />
                  <Contact />
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
