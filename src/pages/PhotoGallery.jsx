import React from 'react';
import HangingPhoto from '../components/HangingPhoto';
import photo1 from '../assets/gallery/gallery1.png';
import photo2 from '../assets/gallery/gallery2.png';
import photo3 from '../assets/gallery/gallery3.png';
import photo4 from '../assets/gallery/gallery4.png';
import photo5 from '../assets/gallery/gallery5.png';
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

  return (
    <div className='bg-[#C5BAFF] min-h-screen flex flex-col items-center justify-center mt-4 rounded-md shadow-md'>
        <h1 className='relative top-16 text-4xl font-semibold text-white'><span className='text-indigo-500'>P!CPAC</span> Captured Moments</h1>
        <div className="gallery-container overflow- min-h-screen flex items-center justify-center p-4">
        <HangingPhoto src={photo1} alt="Beach Trip" index={0} sharedX={sharedX} sharedY={sharedY} />
        <HangingPhoto src={photo2} alt="Mountain Hike" index={1} sharedX={sharedX} sharedY={sharedY} />
        <HangingPhoto src={photo3} alt="City Lights" index={2} sharedX={sharedX} sharedY={sharedY} />
        <HangingPhoto src={photo4} alt="City Lights" index={3} sharedX={sharedX} sharedY={sharedY} />
        <HangingPhoto src={photo5} alt="City Lights" index={4} sharedX={sharedX} sharedY={sharedY} />
        </div>
    </div>
  );
};

export default PhotoGallery;
