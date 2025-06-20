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
import corkboard from '../assets/gallery/coarkboard.png';
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
    <div className="bg-[#C5BAFF] min-h-screen flex flex-col items-center py-16 px-4 mt-4 shadow-md rounded-md">
      <h1 className="text-4xl font-bold text-white mb-8">
        <span className="text-indigo-500">P!CPAC</span> Captured Moments
      </h1>

      <div
        className="relative w-full max-w-7xl p-10 rounded-2xl border-8 border-[#8B5A2B] shadow-xl flex flex-wrap justify-center gap-8"
        style={{
          backgroundImage: `url(${corkboard})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Sticky note pinned on corkboard */}
       {/* Top-left Sticky Note */}
        <motion.div
          initial={{ opacity: 0, rotate: -4, y: -20 }}
          animate={{ opacity: 1, rotate: -2, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute top-8 left-8 w-80 bg-yellow-100 text-[#3B3B3B] font-hand p-4 rounded-[6px] shadow-[4px_4px_10px_rgba(0,0,0,0.25)] border-[1.5px] border-yellow-300 z-30"
        >
          <div className="pin absolute -top-3 left-1/2 -translate-x-1/2 z-40" />
          <p className="text-xl font-semibold leading-tight">
            📸 Welcome to <span className="text-indigo-600 font-bold">P!CPAC</span> Gallery!
          </p>
          <p className="text-base mt-2 leading-snug">Welcome to our gallery of amazing moments captured by our photobooth!</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, rotate: 5, y: -20 }}
          animate={{ opacity: 1, rotate: 3, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="absolute bottom-8 right-8 w-60 bg-pink-100 text-[#3B3B3B] font-hand p-3 rounded-[6px] shadow-[4px_4px_10px_rgba(0,0,0,0.25)] border-[1.5px] border-pink-300 z-30"
        >
          <div className="pin absolute -top-3 left-1/2 -translate-x-1/2 z-40" />
          <p className="text-lg font-medium leading-snug">📷 Snap. Smile. Share!</p>
        </motion.div>



        {/* Photos */}
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
  );
};

export default PhotoGallery;
