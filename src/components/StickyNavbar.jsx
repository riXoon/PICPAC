import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../assets/images/P!CPAC.png';
import '../styles/StickyNavbar.css';

const StickyNavbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle hiding/showing navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNavbar(currentScrollY < lastScrollY || currentScrollY < 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Smooth scroll to section
  const handleScrollNav = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/', { replace: false });
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) section.scrollIntoView({ behavior: 'smooth' });
      }, 100); // give React time to render
    } else {
      const section = document.getElementById(sectionId);
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };


  return (
    <nav
      className={`sticky top-0 z-50 bg-amber-50 shadow-md transition-transform duration-300 ${
        showNavbar ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16" onClick={handleLogoClick}>
          {/* Logo (Left) */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img src={Logo} alt="Logo" className="h-6 w-auto cursor-pointer" />
            </Link>
          </div>

          {/* Center Nav Links */}
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="hidden md:flex space-x-24 text-lg">
              <button
                onClick={() => handleScrollNav('home')}
                className="text-gray-700 hover:text-indigo-600 hover:underline underline-offset-2 cursor-pointer"
              >
                Home
              </button>
              <button
                onClick={() => handleScrollNav('about')}
                className="text-gray-700 hover:text-indigo-600 hover:underline underline-offset-2 cursor-pointer"
              >
                About
              </button>
              <Link
                to="/faq"
                className="text-gray-700 hover:text-indigo-600 hover:underline underline-offset-2 cursor-pointer"
              >
                FAQs
              </Link>
              <button
                onClick={() => handleScrollNav('contact')}
                className="text-gray-700 hover:text-indigo-600 hover:underline underline-offset-2 cursor-pointer"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default StickyNavbar;
