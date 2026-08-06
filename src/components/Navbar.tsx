import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, Sparkles } from 'lucide-react';
import { useCursor } from '../context/CursorContext';
import { sound } from '../utils/sound';
import { PERSONAL_INFO } from '../constants/portfolio';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'About', path: '/about' },
  { name: 'Skills', path: '/skills' },
  { name: 'Experience', path: '/experience' },
  { name: 'Services', path: '/services' },
  { name: 'Achievements', path: '/achievements' },
  { name: 'Contact', path: '/contact' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setCursorHover, resetCursor } = useCursor();
  const location = useLocation();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[9000] px-4 md:px-8 py-3.5 transition-all duration-500 pointer-events-none">
        <div className="max-w-7xl mx-auto pointer-events-auto">
          {/* Main Unified Floating Glass Capsule */}
          <motion.div
            animate={{
              scale: scrolled ? 0.98 : 1,
              y: scrolled ? -2 : 0,
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={`relative w-full rounded-full transition-all duration-500 px-4 md:px-6 py-2 flex items-center justify-between overflow-hidden border backdrop-blur-[32px] ${scrolled
                ? 'bg-[#0f172a]/55 border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.6),_0_0_30px_rgba(0,240,255,0.12)]'
                : 'bg-[#0f172a]/28 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5),_0_0_20px_rgba(0,240,255,0.08)]'
              }`}
          >
            {/* Soft Ambient Cyan & Blue Radial Glow Behind Glass */}
            <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-48 h-20 rounded-full bg-cyan-500/10 blur-2xl pointer-events-none" />
            <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-48 h-20 rounded-full bg-violet-500/10 blur-2xl pointer-events-none" />

            {/* Soft Glass Top Reflection Highlight */}
            <div
              className="absolute inset-x-0 top-0 h-[1px] pointer-events-none rounded-full z-20"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.15) 20%, rgba(255, 255, 255, 0.35) 50%, rgba(255, 255, 255, 0.15) 80%, transparent 100%)',
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none rounded-full z-10"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.01) 40%, transparent 100%)',
              }}
            />

            {/* Logo Section */}
            <NavLink
              to="/"
              onMouseEnter={() => {
                setCursorHover('HOME');
                sound.playHover();
              }}
              onMouseLeave={resetCursor}
              onClick={() => sound.playClick()}
              className="group flex items-center space-x-3 cursor-pointer relative z-20"
            >
              <div className="relative w-10 h-10 rounded-xl glass-card border border-cyan-400/40 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                <span className="font-mono font-black text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
                  {PERSONAL_INFO.initials}
                </span>
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="font-bold text-sm text-white tracking-wide group-hover:text-cyan-400 transition-colors">
                  {PERSONAL_INFO.name}
                </span>
                <span className="font-mono text-[10px] text-cyan-400/70 tracking-widest uppercase">
                  FULL STACK & UI
                </span>
              </div>
            </NavLink>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center space-x-1 relative z-20">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onMouseEnter={() => {
                    setCursorHover(link.name.toUpperCase(), 'nav');
                    sound.playHover();
                  }}
                  onMouseLeave={resetCursor}
                  onClick={() => sound.playClick()}
                  className={({ isActive }) =>
                    `relative px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.div
                          layoutId="activeNavPill"
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/30 to-violet-500/30 border border-cyan-400/50 shadow-[0_0_12px_rgba(0,240,255,0.3)]"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{link.name}</span>
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Right Action Controls */}
            <div className="flex items-center space-x-3 relative z-20">
              {/* Audio Synth Toggle Button */}
              {/* <button
                onClick={toggleSound}
                onMouseEnter={() => setCursorHover(isSoundOn ? 'MUTE' : 'UNMUTE')}
                onMouseLeave={resetCursor}
                aria-label={isSoundOn ? 'Mute Audio Effects' : 'Enable Audio Effects'}
                className="w-9 h-9 rounded-full glass-panel border border-white/10 flex items-center justify-center text-gray-300 hover:text-cyan-400 hover:border-cyan-400/40 transition-all duration-300 cursor-pointer"
                title={isSoundOn ? 'Mute Sound FX' : 'Enable Sound FX'}
              >
                {isSoundOn ? <Volume2 size={16} /> : <VolumeX size={16} className="text-gray-500" />}
              </button> */}

              {/* Download Resume Button */}
              <a
                href={PERSONAL_INFO.resumeUrl}
                download="Subhra_Frontend_Developer_resume"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download Resume"
                onMouseEnter={() => {
                  setCursorHover('RESUME');
                  sound.playHover();
                }}
                onMouseLeave={resetCursor}
                onClick={() => sound.playClick()}
                className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white text-xs font-bold tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] transition-all duration-300 cursor-pointer"
              >
                <Download size={14} />
                <span>RESUME</span>
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => {
                  setMobileMenuOpen(!mobileMenuOpen);
                  sound.playClick();
                }}
                onMouseEnter={() => setCursorHover('MENU')}
                onMouseLeave={resetCursor}
                aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
                className="lg:hidden w-10 h-10 rounded-full glass-panel border border-white/10 flex items-center justify-center text-white cursor-pointer"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Mobile Menu Curtain Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[8999] bg-[#030712]/95 backdrop-blur-2xl pt-24 px-6 pb-12 flex flex-col justify-between overflow-y-auto lg:hidden"
          >
            <div className="flex flex-col space-y-3 max-w-md mx-auto w-full">
              {NAV_LINKS.map((link, idx) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 + 0.1 }}
                >
                  <NavLink
                    to={link.path}
                    onClick={() => {
                      sound.playClick();
                      setMobileMenuOpen(false);
                    }}
                    className={({ isActive }) =>
                      `flex items-center justify-between p-4 rounded-2xl glass-card text-lg font-bold transition-all ${isActive
                        ? 'border-cyan-400 text-cyan-400 bg-cyan-400/10 shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                        : 'text-gray-300 hover:text-white border-white/5'
                      }`
                    }
                  >
                    <span>{link.name}</span>
                    <Sparkles size={16} className="opacity-50" />
                  </NavLink>
                </motion.div>
              ))}
            </div>

            <div className="max-w-md mx-auto w-full pt-8 flex flex-col items-center space-y-4">
              <a
                href={PERSONAL_INFO.resumeUrl}
                download="Subhra_React_Developer_resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold text-center tracking-wider shadow-lg flex items-center justify-center space-x-2"
              >
                <Download size={18} />
                <span>DOWNLOAD FULL RESUME</span>
              </a>

              <div className="font-mono text-xs text-gray-500 text-center">
                SUBHRA PRAKASH DHAL © 2026
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
