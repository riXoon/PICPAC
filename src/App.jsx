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
import ScrollToTop from './components/ScrollToTop.jsx';

function App() {
  return (
    <Router>
        <ScrollToTop />
        <div className="px-0 py-4 md:px-16">
        <StickyNavbar />
          <Routes>
            <Route 
              path="/"
              element={
                <>
                  <div id="home">
                    <Home />
                  </div>
                  <div id="gallery">
                    <PhotoGallery />
                  </div>
                  <div id="about">
                    <About />
                  </div>
                  <div id="contact">
                  <Contact />
                  </div>
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
