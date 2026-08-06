import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Sparkles, Cpu, Palette, Server, BarChart3, Zap, Smartphone, CheckCircle, ArrowRight } from 'lucide-react';
import { Tilt } from '../utils/components';
import { SERVICES } from '../constants/portfolio';
import { useCursor } from '../context/CursorContext';
import { SEO } from '../components/SEO';

export const Services: React.FC = () => {
  const { setCursorHover, resetCursor } = useCursor();

  const iconMap: Record<string, React.ElementType> = {
    Code2,
    Sparkles,
    Cpu,
    Palette,
    Server,
    BarChart3,
    Zap,
    Smartphone,
  };

  return (
    <div className="pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto space-y-16">
      <SEO
        title="Engineering Services & Solutions — Subhra Prakash Dhal"
        description="Full stack software engineering, React 19 UI development, API architecture, performance optimization, and AI solution services by Subhra Prakash Dhal."
        path="/services"
      />
      {/* 1. Header Section */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="px-4 py-1.5 rounded-full glass-panel border border-cyan-400/40 font-mono text-xs font-bold text-cyan-300 uppercase tracking-widest"
        >
          ENGINEERING CAPABILITIES
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-4xl pt-6 md:text-6xl font-black text-white tracking-tight"
        >
          Services & Solutions
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-400 text-base md:text-lg"
        >
          High-impact engineering services tailored for high-growth tech startups, digital agencies, and enterprise applications.
        </motion.p>
      </div>

      {/* 2. Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 [perspective:1000px]">
        {SERVICES.map((service, idx) => {
          const IconComponent = iconMap[service.icon] || Code2;
          return (
            <motion.div
              key={service.id}
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: (idx % 3) * 0.1, duration: 0.5, ease: 'easeOut' }}
              style={{ transformStyle: 'preserve-3d' }}
              className="transform-gpu h-full"
            >
              <Tilt
                tiltMaxAngleX={8}
                tiltMaxAngleY={8}
                perspective={1000}
                transitionSpeed={1000}
                className="h-full"
              >
                <div
                  onMouseEnter={() => setCursorHover('SERVICE')}
                  onMouseLeave={resetCursor}
                  className="group h-full glass-panel rounded-3xl p-6 md:p-8 border border-white/10 hover:border-cyan-400/60 hover:shadow-[0_0_40px_rgba(0,240,255,0.25)] transition-all duration-500 flex flex-col justify-between overflow-hidden relative light-sweep-effect"
                >
                  <div>
                    {/* Icon Box */}
                    <div className="w-14 h-14 rounded-2xl glass-card border border-cyan-400/40 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 group-hover:border-cyan-400 transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                      <IconComponent size={28} />
                    </div>

                    <h3 className="text-2xl font-extrabold text-white group-hover:text-cyan-400 transition-colors mb-1">
                      {service.title}
                    </h3>
                    <div className="font-mono text-xs font-bold text-cyan-400 mb-4 uppercase tracking-wider">
                      {service.subtitle}
                    </div>

                    <p className="text-gray-300 text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Features checklist */}
                    <div className="space-y-2 mb-6">
                      {service.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center space-x-2 text-xs text-gray-300">
                          <CheckCircle size={14} className="text-cyan-400 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deliverables summary */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs text-gray-400 group-hover:text-white transition-colors">
                    <span>{service.deliverables.length} Deliverables Included</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-cyan-400" />
                  </div>
                </div>
              </Tilt>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
