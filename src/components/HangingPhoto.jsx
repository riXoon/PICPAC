import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';

const HangingPhoto = ({ src, alt, index = 0, sharedX, sharedY }) => {
  const localX = useMotionValue(0);
  const localY = useMotionValue(0);

  const springX = useSpring(localX, { stiffness: 40, damping: 6, mass: 0.5 });
  const springY = useSpring(localY, { stiffness: 120, damping: 10, mass: 0.4 });

  // Broadcast motion values to the parent
  useEffect(() => {
    const unsubX = springX.on("change", val => sharedX.set(index, val));
    const unsubY = springY.on("change", val => sharedY.set(index, val));
    return () => {
      unsubX(); unsubY();
    };
  }, [index, springX, springY, sharedX, sharedY]);

  const rotate = useTransform([springX, springY], ([x, y]) => (x / 100) * 8 + (y / 100) * 3);
  const ropeLength = useTransform(springY, y => 60 + y * 0.4);

  // Idle sway effect
  useEffect(() => {
    const controls = animate(localX, [-5, 5, -3, 3, 0], {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: index * 0.4,
    });
    return controls.stop;
  }, [localX, index]);

  return (
    <motion.div
      className="hanging-photo"
      drag
      dragConstraints={{ top: -30, bottom: 80, left: -40, right: 40 }}
      dragElastic={0.4}
      dragSnapToOrigin
      whileTap={{ scale: 0.97 }}
      style={{
        x: springX,
        y: springY,
        rotate,
      }}
    >
      {/* Rope and clip */}
      <motion.div className="rope" style={{ height: ropeLength }}>
        <div className="clip" />
        <div className="rubber-band" />
      </motion.div>

      {/* Photo */}
      <div className="photo-frame">
        <img src={src} alt={alt} />
      </div>
    </motion.div>
  );
};

export default HangingPhoto;
