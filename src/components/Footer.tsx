import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUp, Mail, Heart, Sparkles } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Marquee } from '../utils/components';
import { useCursor } from '../context/CursorContext';
import { sound } from '../utils/sound';
import { PERSONAL_INFO } from '../constants/portfolio';

export const Footer: React.FC = () => {
  const { setCursorHover, resetCursor } = useCursor();

  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const marqueeItems = [
    'FULL STACK MERN DEVELOPER',
    'REACT 19 ARCHITECT',
    'NODE.JS MICROSERVICES',
    'AWWWARDS CREATIVE ENGINEER',
    'AI WORKFLOW ENGINE',
    'UI/UX DESIGN SYSTEM',
  ];

  return (
    <footer className="relative z-10 bg-[#030712] border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* 1. Infinite Ticker Marquee */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="mb-16 border-y border-white/5 py-4 bg-cyan-950/20 backdrop-blur-md"
      >
        <Marquee gradient={false} speed={45}>
          <div className="flex items-center space-x-12 px-6">
            {marqueeItems.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-6">
                <span className="font-mono font-black text-sm md:text-base tracking-widest text-cyan-400/80">
                  {item}
                </span>
                <Sparkles size={14} className="text-violet-400 animate-spin" />
              </div>
            ))}
          </div>
        </Marquee>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10"
        >
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl glass-card border border-cyan-400/40 flex items-center justify-center font-mono font-black text-xl text-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                {PERSONAL_INFO.initials}
              </div>
              <div>
                <h3 className="font-extrabold text-xl text-white tracking-tight">
                  {PERSONAL_INFO.name}
                </h3>
                <p className="font-mono text-xs text-cyan-400/70">
                  {PERSONAL_INFO.roles[0]}
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-sm max-w-md leading-relaxed">
              Available for full-time engineering roles, high-impact freelance projects, and AI system integrations. Let's create something iconic together.
            </p>
            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              {[
                { name: 'GitHub', icon: FaGithub, href: PERSONAL_INFO.socials.github },
                { name: 'LinkedIn', icon: FaLinkedin, href: PERSONAL_INFO.socials.linkedin },
                { name: 'Twitter', icon: FaTwitter, href: PERSONAL_INFO.socials.twitter },
                { name: 'Instagram', icon: FaInstagram, href: PERSONAL_INFO.socials.instagram },
                { name: 'Email', icon: Mail, href: `mailto:${PERSONAL_INFO.email}` },
              ].map((s) => {
                const IconComponent = s.icon;
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    onMouseEnter={() => {
                      setCursorHover(s.name.toUpperCase());
                      sound.playHover();
                    }}
                    onMouseLeave={resetCursor}
                    onClick={() => sound.playClick()}
                    className="w-10 h-10 rounded-xl glass-panel border border-white/10 flex items-center justify-center text-gray-300 hover:text-cyan-400 hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all duration-300 cursor-pointer"
                  >
                    <IconComponent size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 flex flex-col space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-cyan-400">
              NAVIGATION
            </h4>
            <div className="flex flex-col space-y-2.5 text-sm font-semibold text-gray-400">
              <NavLink to="/" className="hover:text-white transition-colors">Home</NavLink>
              <NavLink to="/projects" className="hover:text-white transition-colors">Featured Projects</NavLink>
              <NavLink to="/about" className="hover:text-white transition-colors">About & Story</NavLink>
              <NavLink to="/skills" className="hover:text-white transition-colors">Technical Skills</NavLink>
              <NavLink to="/services" className="hover:text-white transition-colors">Engineering Services</NavLink>
            </div>
          </div>

          {/* Contact Quick Note */}
          <div className="md:col-span-4 flex flex-col space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-cyan-400">
              INITIATE PROJECT
            </h4>
            <p className="text-sm text-gray-400">
              Have a visionary web application or AI product in mind? Send a direct message or view contact details.
            </p>
            <NavLink
              to="/contact"
              onMouseEnter={() => setCursorHover('TALK')}
              onMouseLeave={resetCursor}
              onClick={() => sound.playClick()}
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-400/40 text-cyan-300 font-bold text-xs tracking-widest uppercase hover:bg-cyan-400 hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.2)]"
            >
              Start Conversation →
            </NavLink>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-gray-500 space-y-4 sm:space-y-0"
        >
          <div className="flex items-center space-x-1">
            <span>DESIGNED & HANDCRAFTED WITH</span>
            <Heart size={12} className="text-pink-500 fill-pink-500 animate-pulse mx-1" />
            <span>BY SUBHRA PRAKASH DHAL</span>
          </div>

          <div className="flex items-center space-x-6">
            <span>© SPD 2026 ALL RIGHTS RESERVED</span>
            <button
              onClick={scrollToTop}
              onMouseEnter={() => {
                setCursorHover('TOP');
                sound.playHover();
              }}
              onMouseLeave={resetCursor}
              className="w-9 h-9 rounded-full glass-panel border border-white/20 flex items-center justify-center text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.2)]"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
