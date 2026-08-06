import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Marquee } from '../utils/components';
import { SKILL_CATEGORIES } from '../constants/portfolio';
import { useCursor } from '../context/CursorContext';
import { sound } from '../utils/sound';
import { SEO } from '../components/SEO';

export const Skills: React.FC = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);
  const { setCursorHover, resetCursor } = useCursor();

  return (
    <div className="pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto space-y-16">
      <SEO
        title="Skills & Technical Ecosystem — Subhra Prakash Dhal"
        description="Comprehensive technical skills of Subhra Prakash Dhal: React 19, Node.js, TypeScript, MongoDB, Express, Next.js, Redis, Tailwind CSS, and Cloud Architecture."
        path="/skills"
      />
      {/* 1. Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-4 text-center max-w-3xl mx-auto"
      >
        <span className="px-4 py-1.5 rounded-full glass-panel border border-cyan-400/40 font-mono text-xs font-bold text-cyan-300 uppercase tracking-widest inline-block">
          TECHNICAL PROFICIENCY
        </span>
        <h1 className="text-4xl pt-6 md:text-6xl font-black text-white tracking-tight">
          Skills & Tech Ecosystem
        </h1>
        <p className="text-gray-400 text-base md:text-lg">
          Deep mastery across full-stack MERN engineering, frontend animations, cloud server infrastructure, and AI workflow integration.
        </p>
      </motion.div>

      {/* 2. Infinite Technology Logo Ticker Marquee */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="border-y border-white/10 py-4 bg-cyan-950/20 backdrop-blur-md"
      >
        <Marquee gradient={false} speed={40}>
          <div className="flex items-center space-x-12 px-6 font-mono text-sm font-bold text-cyan-300 uppercase">
            {[
              'React 19',
              'Node.js',
              'Express.js',
              'MongoDB Atlas',
              'TypeScript',
              'Tailwind CSS',
              'GSAP Kinetics',
              'Lenis Physics',
              'Framer Motion',
              'Redis Caching',
              'Docker',
              'AWS Cloud',
              'OpenAI API',
            ].map((skill, i) => (
              <div key={i} className="flex items-center space-x-3">
                <span>{skill}</span>
                <Sparkles size={12} className="text-violet-400" />
              </div>
            ))}
          </div>
        </Marquee>
      </motion.div>

      {/* 3. Category Selectors */}
      <div className="flex flex-wrap justify-center gap-3">
        {SKILL_CATEGORIES.map((cat, idx) => (
          <button
            key={cat.title}
            onClick={() => {
              setActiveCategoryIndex(idx);
              sound.playClick();
            }}
            onMouseEnter={() => {
              setCursorHover(cat.title.toUpperCase());
              sound.playHover();
            }}
            onMouseLeave={resetCursor}
            className={`px-5 py-2.5 rounded-2xl font-mono text-xs font-bold tracking-wider transition-all cursor-pointer ${
              activeCategoryIndex === idx
                ? 'bg-gradient-to-r from-cyan-400 to-violet-500 text-black shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                : 'glass-panel text-gray-300 hover:text-white hover:border-cyan-400/40'
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* 4. Active Category Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SKILL_CATEGORIES[activeCategoryIndex].skills.map((skill, idx) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: idx * 0.05, duration: 0.4 }}
            className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] transition-all duration-300 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-lg text-white">{skill.name}</h3>
                {skill.desc && (
                  <p className="font-mono text-xs text-gray-400 mt-0.5">{skill.desc}</p>
                )}
              </div>
              <span className="font-mono font-black text-lg text-cyan-400">{skill.level}%</span>
            </div>

            {/* Skill Bar */}
            <div className="w-full h-2.5 bg-gray-800 rounded-full overflow-hidden relative border border-white/5">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: idx * 0.04 }}
                className="h-full bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 shadow-[0_0_15px_#00F0FF]"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
