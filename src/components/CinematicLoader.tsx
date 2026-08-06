import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/sound';

interface CinematicLoaderProps {
  onComplete: () => void;
}

export const CinematicLoader: React.FC<CinematicLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const statuses = [
    'INIT_GRAPHICS_ENGINE...',
    'LOADING_SHADERS...',
    'MOUNTING_AURORA_CANVAS...',
    'INITIALIZING_LENIS_PHYSICS...',
    'SUBHRA_PRAKASH_DHAL_READY',
  ];

  useEffect(() => {
    // Progress counter timer
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 8) + 2;
        return next > 100 ? 100 : next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Status log steps
    if (progress < 25) setStatusIndex(0);
    else if (progress < 50) setStatusIndex(1);
    else if (progress < 75) setStatusIndex(2);
    else if (progress < 95) setStatusIndex(3);
    else setStatusIndex(4);

    let timeout: ReturnType<typeof setTimeout>;
    let completeTimeout: ReturnType<typeof setTimeout>;
    if (progress === 100) {
      sound.playWarp();
      timeout = setTimeout(() => {
        setIsFinished(true);
        completeTimeout = setTimeout(onComplete, 2000);
      }, 800);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
      if (completeTimeout) clearTimeout(completeTimeout);
    };
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="loader-overlay"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-between bg-[#030712] text-white p-8 md:p-16 overflow-hidden bg-noise select-none"
        >
          {/* Top Bar */}
          <div className="w-full flex items-center justify-between font-mono text-xs text-gray-500 tracking-wider">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-cyan-400">SPD // PORTFOLIO v2026</span>
            </div>
            {/* <div>[STITCH ARCHITECTURE]</div> */}
          </div>

          {/* Center SPD Logo Monogram & Counter */}
          <div className="relative flex flex-col items-center justify-center my-auto">
            {/* Ambient Backlight Glow */}
            <div className="absolute w-72 h-72 rounded-full bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-pink-500/20 blur-3xl animate-glow" />

            {/* SPD Animated Monogram Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-28 h-28 md:w-36 md:h-36 rounded-2xl glass-card flex items-center justify-center border border-cyan-400/30 shadow-[0_0_50px_rgba(0,240,255,0.2)] mb-8"
            >
              <div className="text-4xl md:text-5xl font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-500">
                SPD
              </div>
              <motion.div
                className="absolute inset-0 rounded-2xl border border-cyan-400/50"
                animate={{
                  boxShadow: [
                    '0 0 10px rgba(0, 240, 255, 0.2)',
                    '0 0 30px rgba(0, 240, 255, 0.6)',
                    '0 0 10px rgba(0, 240, 255, 0.2)',
                  ],
                }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </motion.div>

            {/* Main Percentage Counter */}
            <div className="flex items-baseline font-mono font-black text-6xl md:text-8xl tracking-tighter text-white">
              <span>{progress.toString().padStart(3, '0')}</span>
              <span className="text-3xl md:text-4xl text-cyan-400 ml-1">%</span>
            </div>

            {/* Status log indicator */}
            <div className="mt-4 font-mono text-xs md:text-sm text-cyan-400/80 tracking-widest uppercase flex items-center space-x-2">
              <span className="inline-block w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
              <span>{statuses[statusIndex]}</span>
            </div>
          </div>

          {/* Bottom Progress Bar */}
          <div className="w-full max-w-xl flex flex-col space-y-2">
            <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 shadow-[0_0_15px_#00F0FF]"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="flex justify-between font-mono text-[10px] text-gray-500 uppercase tracking-widest">
              <span>CREATIVE FRONTEND & MERN</span>
              <span>SUBHRA PRAKASH DHAL</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
