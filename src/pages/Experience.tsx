import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, CheckCircle2, Building2 } from 'lucide-react';
import { EXPERIENCES } from '../constants/portfolio';
import { useCursor } from '../context/CursorContext';
import { SEO } from '../components/SEO';

export const Experience: React.FC = () => {
  const { setCursorHover, resetCursor } = useCursor();

  return (
    <div className="pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto space-y-16">
      <SEO
        title="Professional Experience — Subhra Prakash Dhal"
        description="Career trajectory and professional experience of Subhra Prakash Dhal as a Senior Full Stack & Creative UI Engineer."
        path="/experience"
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
          CAREER TRAJECTORY
        </span>
        <h1 className="text-4xl pt-6 md:text-6xl font-black text-white tracking-tight">
          Professional Experience
        </h1>
        <p className="text-gray-400 text-base md:text-lg">
          Over 4 years of shipping production code, leading full-stack MERN initiatives, and optimizing user experiences.
        </p>
      </motion.div>

      {/* 2. Vertical Glowing Timeline */}
      <div className="relative max-w-4xl mx-auto">
        {/* Glowing Central Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-violet-500 to-pink-500 shadow-[0_0_15px_#00F0FF] -translate-x-1/2" />

        <div className="space-y-12">
          {EXPERIENCES.map((exp, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={exp.id}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: (idx % 2) * 0.08 }}
                className={`relative flex flex-col md:flex-row items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Center Node */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#030712] border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_20px_#00F0FF] z-10">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                </div>

                {/* Card Container */}
                <div className="w-full md:w-[calc(50%-2.5rem)] pl-12 md:pl-0">
                  <div
                    onMouseEnter={() => setCursorHover('CAREER')}
                    onMouseLeave={resetCursor}
                    className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_40px_rgba(0,240,255,0.2)] transition-all duration-300 space-y-4"
                  >
                    {/* Header Info */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
                      <div>
                        <span className="px-2.5 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-[10px] font-mono font-bold text-cyan-300 uppercase">
                          {exp.type}
                        </span>
                        <h3 className="text-xl font-extrabold text-white mt-1">{exp.role}</h3>
                        <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs mt-0.5">
                          <Building2 size={14} />
                          <span>{exp.company}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center space-x-1.5 text-gray-400 font-mono text-xs">
                          <Calendar size={12} />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center space-x-1.5 text-gray-500 font-mono text-[10px] mt-0.5">
                          <MapPin size={10} />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 text-sm leading-relaxed">{exp.description}</p>

                    {/* Key Achievements */}
                    <div className="space-y-2 pt-2">
                      {exp.achievements.map((ach, aIdx) => (
                        <div key={aIdx} className="flex items-start space-x-2.5 text-xs text-gray-300">
                          <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                      {exp.technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-cyan-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
