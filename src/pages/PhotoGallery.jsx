import React from 'react';
import HangingPhoto from '../components/HangingPhoto';
import photo1 from '../assets/gallery/gallery1.png';
import photo2 from '../assets/gallery/gallery2.png';
import photo3 from '../assets/gallery/gallery3.png';
import photo4 from '../assets/gallery/gallery4.png';
import photo5 from '../assets/gallery/gallery5.png';
import photo6 from '../assets/gallery/gallery6.png';
import photo7 from '../assets/gallery/gallery7.png';
import photo8 from '../assets/gallery/gallery8.png';
import photo9 from '../assets/gallery/gallery9.png';
import corkboard from '../assets/gallery/corkboard.jpg';
import woodFrame from '../assets/gallery/wood-frame.jpg'; // Add your wood texture here
import { useMotionValue, motion } from 'framer-motion';

const PhotoGallery = () => {
  const sharedX = {
    values: [useMotionValue(0), useMotionValue(0), useMotionValue(0)],
    set(index, val) {
      this.values.forEach((mv, i) => {
        if (i !== index) {
          const offset = (index - i) * 15;
          mv.set(val / 2 + offset);
        }
      });
    },
  };

  const sharedY = {
    values: [useMotionValue(0), useMotionValue(0), useMotionValue(0)],
    set(index, val) {
      this.values.forEach((mv, i) => {
        if (i !== index) {
          mv.set(val * 0.6);
        }
      });
    },
  };

  const photos = [
    photo1, photo2, photo3, photo4,
    photo5, photo6, photo7, photo8, photo9,
  ];

  return (
    <div className="bg-[#C5BAFF] min-h-screen flex flex-col items-center py-10 px-4 md:px-10 lg:px-20 mt-4 shadow-md rounded-md">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
        <span className="text-indigo-500">P!CPAC</span> Captured Moments
      </h1>

      {/* Outer frame (wood texture) */}
      <div
        className="relative w-full max-w-[95vw] md:max-w-6xl p-[12px] md:p-[16px] rounded-2xl shadow-xl"
        style={{
          backgroundImage: `url(${woodFrame})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Inner corkboard */}
        <div
          className="w-full h-full p-4 md:p-10 rounded-xl flex flex-wrap justify-center gap-6 sm:gap-8"
          style={{
            backgroundImage: `url(${corkboard})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Sticky Notes */}
          <motion.div
            initial={{ opacity: 0, rotate: -4, y: -20 }}
            animate={{ opacity: 1, rotate: -2, y: 0 }}
            transition={{ duration: 1 }}
            className="absolute top-4 left-4 sm:top-6 sm:left-6 w-64 sm:w-80 bg-yellow-100 text-[#3B3B3B] font-hand p-3 sm:p-4 rounded-[6px] shadow-[4px_4px_10px_rgba(0,0,0,0.25)] border-[1.5px] border-yellow-300 z-30 text-sm sm:text-base"
          >
            <div className="pin absolute -top-3 left-1/2 -translate-x-1/2 z-40" />
            <p className="font-semibold leading-tight">
              📸 Welcome to <span className="text-indigo-600 font-bold">P!CPAC</span> Gallery!
            </p>
            <p className="mt-1 sm:mt-2 leading-snug">Check out the amazing moments captured by our photobooth!</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, rotate: 5, y: -20 }}
            animate={{ opacity: 1, rotate: 3, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-52 sm:w-60 bg-pink-100 text-[#3B3B3B] font-hand p-2 sm:p-3 rounded-[6px] shadow-[4px_4px_10px_rgba(0,0,0,0.25)] border-[1.5px] border-pink-300 z-30 text-sm"
          >
            <div className="pin absolute -top-3 left-1/2 -translate-x-1/2 z-40" />
            <p className="font-medium leading-snug">📷 Snap. Smile. Share!</p>
          </motion.div>

          {/* Photo Grid */}
          {photos.map((src, index) => (
            <HangingPhoto
              key={index}
              src={src}
              alt={`Captured Moment ${index + 1}`}
              index={index}
              sharedX={sharedX}
              sharedY={sharedY}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;
