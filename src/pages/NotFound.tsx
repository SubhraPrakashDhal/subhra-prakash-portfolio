import React from 'react';
import { NavLink } from 'react-router-dom';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { useCursor } from '../context/CursorContext';
import { sound } from '../utils/sound';

export const NotFound: React.FC = () => {
  const { setCursorHover, resetCursor } = useCursor();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 pt-20">
      <div className="space-y-6 max-w-lg animate-fade-in">
        <div className="relative inline-block">
          <span className="font-mono font-black text-8xl md:text-9xl text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-violet-500 to-pink-500 tracking-tighter">
            404
          </span>
          <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-pink-500/20 border border-pink-500 flex items-center justify-center text-pink-400 animate-ping">
            <AlertTriangle size={16} />
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          DIMENSION NOT FOUND
        </h1>

        <p className="text-gray-400 text-sm font-mono leading-relaxed">
          The requested path does not exist in Subhra's matrix or has been shifted into hyper-space.
        </p>

        <div className="pt-4 flex justify-center">
          <NavLink
            to="/"
            onMouseEnter={() => setCursorHover('HOME')}
            onMouseLeave={resetCursor}
            onClick={() => sound.playClick()}
            className="px-6 py-3.5 rounded-2xl bg-linear-to-r from-cyan-400 to-violet-500 text-black font-extrabold text-xs font-mono uppercase tracking-widest shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:scale-105 transition-all flex items-center space-x-2"
          >
            <ArrowLeft size={16} />
            <span>RETURN TO REALITY</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
