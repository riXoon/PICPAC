import { Link } from 'react-router-dom';
import Logo from '../assets/images/P!CPAC.png';

const StickyNavbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-amber-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/">
              <img src={Logo} alt="Logo" className="h-6 w-auto" />
            </Link>
          </div>

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
        </div>
      </div>
    </nav>
  );
};

export default StickyNavbar;
