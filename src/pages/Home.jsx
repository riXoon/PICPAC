import React from 'react'
import { useNavigate } from 'react-router-dom';

import StickyNavbar from '../components/StickyNavbar.jsx'
import HeroPhoto from '../assets/images/hero-photo.png'
import Logo from '../assets/images/P!CPAC.png'

import { CiCamera } from "react-icons/ci";

function Home() {
  const navigate = useNavigate();

  const startBooth = () => {
    navigate('/select-layout');
  }

  return (
    <section className='bg-zinc-50 mt-4 min-h-screen shadow-md flex flex-col md:flex-row justify-center items-center rounded-md px-4 md:px-10 lg:px-20 py-8 gap-8 md:gap-20'>
      
      {/* Left container (Image) */}
      <div className='w-full md:w-1/2 flex justify-center'>
        <img 
          src={HeroPhoto} 
          alt="Hero Photo" 
          className='max-h-[28rem] w-auto object-contain -mb-8 md:mb-0' 
        />
      </div>

      {/* Right container (Text + Button) */}
      <div className='w-full md:w-1/2 flex flex-col items-center justify-center gap-6 text-center'>
        <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold text-indigo-600">P!CPAC</h1>
        <p className='text-base md:text-lg lg:text-xl text-gray-700'>
          Turn your browser into a photobooth and get ready to put on your best smile!
        </p>

        <button 
          onClick={startBooth} 
          className='text-sm md:text-base lg:text-xl uppercase text-indigo-500 font-bold tracking-wide border-4 border-indigo-500 px-8 md:px-12 lg:px-20 py-3 md:py-4 rounded-xl flex items-center gap-3 transition-transform duration-300 transform hover:scale-105 hover:bg-indigo-50 active:scale-95'
        >
          Start Booth 
          <CiCamera 
            size={24} 
            className='text-indigo-500 font-bold' 
            style={{ strokeWidth: 1.4 }} 
          />
        </button>

        <p className='text-xs md:text-sm text-gray-400 mt-6'>© 2025 P!CPAC. All rights reserved.</p>
      </div>
    </section>
  );
}

export default Home;
