import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/images/P!CPAC.png';
import '../styles/StickyNavbar.css';


const StickyNavbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`sticky top-0 z-50 bg-amber-50 shadow-md transition-transform duration-300 ${
        showNavbar ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Logo (Left) */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img src={Logo} alt="Logo" className="h-6 w-auto" />
            </Link>
          </div>

          {/* Center Nav Links */}
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="hidden md:flex space-x-24 text-lg">
              <Link to='/' href="#home" className="text-gray-700 hover:text-indigo-600 hover:underline underline-offset-2">
                Home
              </Link>
              <a href="#about" className="text-gray-700 hover:text-indigo-600 hover:underline underline-offset-2">
                About
              </a>
              <Link to="/faq" className="text-gray-700 hover:text-indigo-600 hover:underline underline-offset-2">
                FAQs
              </Link>
              <a href="#contact" className="text-gray-700 hover:text-indigo-600 hover:underline underline-offset-2">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default StickyNavbar;
