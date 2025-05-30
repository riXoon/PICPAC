import React from 'react'
import StickyNavbar from '../components/StickyNavbar.jsx'
import HeroPhoto from '../assets/images/hero-photo.png'
import Logo from '../assets/images/P!CPAC.png'

import { CiCamera } from "react-icons/ci";



function Home() {
  return (
    <section className='bg-zinc-50 mt-4 min-h-screen shadow-md flex flex-row justify-center items-center'>
      {/* left container */}
      <div>
          <img src={HeroPhoto} alt="Hero Photo" className='h-140 w-auto relative bottom-20' />
      </div>

      {/* right continaer */}
      <div className='flex flex-col items-center justify-center gap-10'>
        <h1 className = "text-8xl font-bold text-indigo-600">P!CPAC</h1>
        <p className='text-xl w-100 text-center'>turn your browser into a photobooth and get ready to put on your best smile!</p>
        <button className='text-xl uppercase text-indigo-500 font-bold tracking-wide border-4 border-indigo-500 px-20 py-4 rounded-xl flex items-center gap-4 cursor-pointer transition-transform duration-300 transform hover:scale-105 hover:bg-indigo-50 active:scale-95'>
          Start Booth 
          <CiCamera 
          size={30} 
          className='text-indigo-500 text-bold' 
          style={{ strokeWidth: 1.4 }}/>
        </button>
        <p className='mt-30 text-gray-400'>© 2025 P!CPAC. All rights reserved. </p>
      </div>
    </section>
  )
}

export default Home