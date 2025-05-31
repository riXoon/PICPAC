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
              <a href="#home" className="text-gray-700 hover:text-indigo-600 hover:underline underline-offset-2">
                Home
              </a>
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

        {/* Camera Toggle for Dark Mode */}
          <div className="ml-auto relative">

            {/* Moon/cloud/star toggle */}
            <label className="switch inline-block relative w-[50px] h-[22px] border border-gray-700 rounded-full">
              <input type="checkbox" id="toggle" className="opacity-0 w-0 h-0" />
              <span className="slider absolute top-0 left-0 right-0 bottom-0 bg-black rounded-full transition-all duration-400 overflow-hidden z-10 cursor-pointer">
                <div className="moons-hole absolute opacity-100 transition-all duration-1000">
                  <div className="moon-hole absolute rounded-full bg-gray-500" style={{height: '3px', width: '3px', top: '14px', left: '11px'}}></div>
                  <div className="moon-hole absolute rounded-full bg-gray-500" style={{height: '6px', width: '6px', top: '8px', left: '4px'}}></div>
                  <div className="moon-hole absolute rounded-full bg-gray-500" style={{height: '2.5px', width: '2.5px', top: '6px', left: '12px'}}></div>
                </div>
                <div className="black-clouds absolute left-1 top-0 bottom-0 w-[12px] transition-all duration-1000 transform translate-x-[-28px] opacity-0 z-0">
                  <div className="black-cloud absolute w-[12px] h-[12px] bg-gray-600 opacity-60 rounded-full animate-cloud-move delay-[1s]" style={{top: '1px', right: '2px'}}></div>
                  <div className="black-cloud absolute w-[12px] h-[12px] bg-gray-600 opacity-60 rounded-full animate-cloud-move delay-[1s]" style={{top: '9px', left: '6px'}}></div>
                  <div className="black-cloud absolute w-[12px] h-[12px] bg-gray-600 opacity-60 rounded-full animate-cloud-move delay-[1s]" style={{top: '12px', left: '18px'}}></div>
                </div>
                <div className="clouds absolute left-1 top-0 bottom-0 w-[12px] transition-all duration-1000 transform translate-x-[-28px] opacity-0">
                  <div className="cloud absolute w-[12px] h-[12px] bg-white rounded-full animate-cloud-move" style={{top: '0', right: '9px', height: '13px', width: '13px'}}></div>
                  <div className="cloud absolute w-[12px] h-[12px] bg-white rounded-full animate-cloud-move" style={{top: '7px', right: '5px', height: '15px', width: '15px'}}></div>
                  <div className="cloud absolute w-[12px] h-[12px] bg-white rounded-full animate-cloud-move" style={{top: '14px', left: '3px', height: '14px', width: '14px'}}></div>
                  <div className="cloud absolute w-[12px] h-[12px] bg-white rounded-full animate-cloud-move" style={{top: '12px', left: '12px'}}></div>
                  <div className="cloud absolute w-[12px] h-[12px] bg-white rounded-full animate-cloud-move" style={{top: '15px', left: '18px'}}></div>
                  <div className="cloud absolute w-[12px] h-[12px] bg-white rounded-full animate-cloud-move" style={{top: '13px', left: '28px'}}></div>
                  <div className="cloud absolute w-[12px] h-[12px] bg-white rounded-full animate-cloud-move" style={{top: '16px', left: '35px'}}></div>
                </div>
                <div className="stars absolute right-[3px] top-0 bottom-0 transition-transform duration-1000 transform translate-y-0">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="star absolute fill-white animate-star-twinkle opacity-100"
                      viewBox="0 0 20 20"
                      style={{
                        top: [3, 13, 3, 19, 1][i] + 'px',
                        right: [14, 5, 8, 15, 28][i] + 'px',
                        width: [10, 8, 6, 7, 5][i] + 'px',
                        animationDelay: `${i * 0.3}s`
                      }}
                    >
                      <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
                    </svg>
                  ))}
                </div>
              </span>
            </label>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default StickyNavbar;
