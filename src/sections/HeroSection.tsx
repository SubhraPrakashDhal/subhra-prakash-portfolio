import React, { useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Download, Mail, Sparkles, Code, Cpu, Layers } from 'lucide-react';
import { Tilt } from '../utils/components';
import { useCursor } from '../context/CursorContext';
import { sound } from '../utils/sound';
import { PERSONAL_INFO } from '../constants/portfolio';
import { useHeartBurst } from '../hooks/useHeartBurst';
import { initMagneticElement } from '../utils/animations';
import subhraProfImg from '../assets/Subhra_Prof.webp';

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const btn1Ref = useRef<HTMLAnchorElement>(null);
  const btn2Ref = useRef<HTMLAnchorElement>(null);
  const btn3Ref = useRef<HTMLAnchorElement>(null);

  const { setCursorHover, resetCursor } = useCursor();
  const { triggerHeartBurst, HeartOverlay } = useHeartBurst();

  // Smooth Scroll Interpolation (Pure vertical Y translation & scale to avoid 3D matrix shaking)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const portraitScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.9]);
  const portraitY = useTransform(scrollYProgress, [0, 0.8], [0, -50]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.2]);
  const textScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.95]);

  // Magnetic Hover Physics for CTAs
  useEffect(() => {
    const cleanups: Array<() => void> = [];
    if (btn1Ref.current) cleanups.push(initMagneticElement(btn1Ref.current, 0.25));
    if (btn2Ref.current) cleanups.push(initMagneticElement(btn2Ref.current, 0.25));
    if (btn3Ref.current) cleanups.push(initMagneticElement(btn3Ref.current, 0.25));
    return () => cleanups.forEach((c) => c());
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center pt-28 pb-16 px-4 md:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Typography & CTAs */}
        <motion.div
          style={{ opacity: textOpacity, scale: textScale }}
          className="lg:col-span-7 flex flex-col justify-center space-y-6 z-10 transform-gpu"
        >
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-400/40 w-max shadow-[0_0_15px_rgba(0,240,255,0.2)] transform-gpu"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono text-xs font-bold text-cyan-300 tracking-widest uppercase">
              AVAILABLE FOR NEW OPPORTUNITIES
            </span>
          </motion.div>

          {/* Heading with Letter-by-Letter Stagger Reveal */}
          <div className="space-y-2">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-400 text-lg md:text-2xl font-mono tracking-wider"
            >
              HI, I'M
            </motion.h2>

            <motion.h1
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-tight"
            >
              {/* Line 1 on mobile: Subhra Prakash */}
              <span className="inline-flex flex-wrap items-center mr-3">
                {Array.from('Subhra Prakash').map((char, index) => (
                  <motion.span
                    key={`first-${index}`}
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.15 + index * 0.025,
                      ease: [0.215, 0.61, 0.355, 1],
                    }}
                    className={
                      char === ' '
                        ? 'mr-2.5 sm:mr-4'
                        : 'inline-block hover:text-cyan-400 transition-colors duration-200 transform-gpu'
                    }
                  >
                    {char}
                  </motion.span>
                ))}
              </span>

              {/* Line 2 on mobile: Dhal */}
              <span className="block sm:inline-block">
                {Array.from('Dhal').map((char, index) => (
                  <motion.span
                    key={`last-${index}`}
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.15 + (index + 15) * 0.025,
                      ease: [0.215, 0.61, 0.355, 1],
                    }}
                    className="inline-block hover:text-cyan-400 transition-colors duration-200 transform-gpu"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            {/* Dynamic Animated Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gradient-aurora pt-2 transform-gpu"
            >
              Frontend Developer | UI/UX Developer | MERN Stack Developer
            </motion.div>
          </div>

          {/* Bio Snippet */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-gray-300 text-base md:text-lg max-w-2xl leading-relaxed"
          >
            Passionate Frontend & UI/UX Developer specializing in React.js, TypeScript, Tailwind CSS, and the MERN stack. Building scalable enterprise dashboards, AI-powered e-commerce platforms, and user-centric web applications.
          </motion.p>

          {/* Quick Technology Chips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap gap-2 pt-2 transform-gpu"
          >
            {[
              { icon: Code, text: 'MERN Stack' },
              { icon: Sparkles, text: 'React 19' },
              { icon: Layers, text: 'GSAP Kinetics' },
              { icon: Cpu, text: 'AI Integrations' },
            ].map((tech, i) => {
              const TechIcon = tech.icon;
              return (
                <span
                  key={i}
                  className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg glass-card border border-white/10 text-xs font-mono text-cyan-300"
                >
                  <TechIcon size={12} />
                  <span>{tech.text}</span>
                </span>
              );
            })}
          </motion.div>

          {/* GSAP Magnetic CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap items-center gap-4 pt-4 transform-gpu"
          >
            {/* View Projects Button */}
            <NavLink
              ref={btn1Ref}
              to="/projects"
              onMouseEnter={() => {
                setCursorHover('PROJECTS');
                sound.playHover();
              }}
              onMouseLeave={resetCursor}
              onClick={() => sound.playClick()}
              className="group relative px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-violet-600 to-pink-600 font-extrabold text-sm text-white tracking-wider shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:shadow-[0_0_50px_rgba(0,240,255,0.7)] transition-all duration-300 flex items-center space-x-2 overflow-hidden cursor-pointer transform-gpu"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
              <span>VIEW PROJECTS</span>
              <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </NavLink>

            {/* Download Resume Button */}
            <a
              ref={btn2Ref}
              href={PERSONAL_INFO.resumeUrl}
              download="Subhra_React_Developer_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => {
                setCursorHover('DOWNLOAD');
                sound.playHover();
              }}
              onMouseLeave={resetCursor}
              onClick={() => sound.playClick()}
              className="px-6 py-3.5 rounded-2xl glass-panel border border-white/20 hover:border-cyan-400/60 text-white font-bold text-sm tracking-wider hover:bg-white/10 transition-all duration-300 flex items-center space-x-2 cursor-pointer shadow-lg transform-gpu"
            >
              <Download size={16} className="text-cyan-400" />
              <span>RESUME</span>
            </a>

            {/* Contact Me Button */}
            <NavLink
              ref={btn3Ref}
              to="/contact"
              onMouseEnter={() => {
                setCursorHover('GET IN TOUCH');
                sound.playHover();
              }}
              onMouseLeave={resetCursor}
              onClick={() => sound.playClick()}
              className="px-6 py-3.5 rounded-2xl glass-panel border border-white/10 hover:border-violet-400/60 text-gray-300 hover:text-white font-bold text-sm tracking-wider transition-all duration-300 flex items-center space-x-2 cursor-pointer transform-gpu"
            >
              <Mail size={16} className="text-violet-400" />
              <span>CONTACT ME</span>
            </NavLink>
          </motion.div>
        </motion.div>

        {/* Right Column: Interactive 3D/Tilt Portrait Card (Smoothed & Shake-Free) */}
        <motion.div
          style={{
            scale: portraitScale,
            y: portraitY,
          }}
          className="lg:col-span-5 flex justify-center items-center z-20 transform-gpu"
        >
          <Tilt
            tiltMaxAngleX={6}
            tiltMaxAngleY={6}
            perspective={1000}
            transitionSpeed={1500}
            scale={1.01}
            className="w-full max-w-md"
          >
            <div
              onMouseEnter={() => setCursorHover('EXPLORE')}
              onMouseLeave={resetCursor}
              className="group relative rounded-3xl p-1 bg-gradient-to-br from-cyan-400/40 via-violet-500/20 to-pink-500/40 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,240,255,0.25)] border border-cyan-400/30 overflow-hidden light-sweep-effect transform-gpu"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              {/* Glowing Background Halo inside card */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-violet-500/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Portrait Container */}
              <div
                onClick={triggerHeartBurst}
                className="relative rounded-[22px] bg-[#090d1a] overflow-hidden aspect-[4/5] flex flex-col justify-end p-6 cursor-pointer select-none"
              >
                <HeartOverlay />
                {/* Modern Futuristic Abstract Developer Portrait Graphic */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent z-10" />

                <img
                  src={subhraProfImg}
                  alt="Subhra Prakash Dhal Portrait"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 transform-gpu"
                />

                {/* Floating Overlay Card (Interactive Glass Widget) */}
                <div className="relative z-20 glass-panel p-4 rounded-2xl border border-white/20 shadow-2xl flex items-center justify-between transform-gpu">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-400/20 border border-cyan-400/50 flex items-center justify-center font-mono font-bold text-cyan-400">
                      SPD
                    </div>
                    <div>
                      <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                        Subhra Prakash Dhal
                      </div>
                      <div className="text-[10px] font-mono text-cyan-400">
                        Senior MERN & UI Developer
                      </div>
                    </div>
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-[10px] font-mono text-cyan-300 font-bold">
                    ONLINE
                  </div>
                </div>
              </div>
            </div>
          </Tilt>
        </motion.div>
      </div>

      {/* Hero Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 pointer-events-none opacity-60 transform-gpu"
      >
        <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest">
          SCROLL TO EXPLORE
        </span>
        <div className="w-5 h-9 rounded-full border-2 border-cyan-400/40 flex justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-cyan-400 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
};
