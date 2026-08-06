import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { sound } from '../utils/sound';

interface HeartItem {
  id: number;
  x: number;
  y: number;
  size: number;
  rotateZ: number;
  rotateY: number;
}

export const useHeartBurst = () => {
  const [hearts, setHearts] = useState<HeartItem[]>([]);

  const triggerHeartBurst = (e: React.MouseEvent<HTMLDivElement>) => {
    sound.playSuccess();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Spawn 1 single, clear, recognizable 3D heart per click
    const singleHeart: HeartItem = {
      id: Date.now() + Math.random(),
      x,
      y,
      size: 54, // 54px crisp heart size
      rotateZ: Math.random() * 16 - 8,
      rotateY: Math.random() * 20 - 10,
    };

    setHearts((prev) => [...prev.slice(-8), singleHeart]);
  };

  const removeHeart = (id: number) => {
    setHearts((prev) => prev.filter((h) => h.id !== id));
  };

  const HeartOverlay: React.FC = () => (
    <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden rounded-[22px] [perspective:1000px]">
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{
              opacity: 0,
              scale: 0.3,
              x: h.x,
              y: h.y,
              rotateZ: h.rotateZ,
              rotateY: h.rotateY,
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0.3, 1.35, 1.15, 0.9],
              y: h.y - 120,
              rotateZ: h.rotateZ * 1.5,
            }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 1.1, ease: [0.215, 0.61, 0.355, 1] }}
            onAnimationComplete={() => removeHeart(h.id)}
            className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transform-gpu"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="relative flex items-center justify-center">
              <Heart
                size={h.size}
                className="text-pink-500 fill-pink-500 filter drop-shadow-[0_0_20px_#ff007f] drop-shadow-[0_0_35px_rgba(236,72,153,0.95)]"
              />
              <Heart
                size={h.size * 0.5}
                className="absolute text-white fill-white opacity-80 filter blur-[0.5px]"
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );

  return { triggerHeartBurst, HeartOverlay };
};
