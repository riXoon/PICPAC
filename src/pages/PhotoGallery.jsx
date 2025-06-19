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
import corkboard from '../assets/gallery/coarkboard.png';
import { useMotionValue } from 'framer-motion';

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
    photo5, photo6, photo7, photo8,
  ];

  return (
    <div className="bg-[#C5BAFF] min-h-screen flex flex-col items-center py-16 px-4">
      <h1 className="text-4xl font-bold text-white mb-10">
        <span className="text-indigo-500">P!CPAC</span> Captured Moments
      </h1>

      <div
        className="w-full max-w-7xl p-10 rounded-2xl border-8 border-[#8B5A2B] shadow-lg flex flex-wrap justify-center gap-8"
        style={{
          backgroundImage: `url(${corkboard})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
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
