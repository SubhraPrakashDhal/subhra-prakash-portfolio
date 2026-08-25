import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { sound } from '../utils/sound';

interface HeartItem {
  id: number;
  x: number;
  y: number;
  size: number;
}

export const useHeartBurst = () => {
  const [hearts, setHearts] = useState<HeartItem[]>([]);

  const triggerHeartBurst = (e: React.MouseEvent<HTMLDivElement>) => {
    sound.playSuccess();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const id = Date.now() + Math.random();
    const singleHeart: HeartItem = {
      id,
      x,
      y,
      size: 54,
    };

    setHearts((prev) => [...prev.slice(-8), singleHeart]);

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== id));
    }, 1100);
  };

  const HeartOverlay: React.FC = () => (
    <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden rounded-[22px] [perspective:1000px]">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute flex items-center justify-center transform-gpu animate-heart-float"
          style={{
            left: h.x,
            top: h.y,
            transformStyle: 'preserve-3d',
          }}
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
        </div>
      ))}
    </div>
  );

  return { triggerHeartBurst, HeartOverlay };
};
