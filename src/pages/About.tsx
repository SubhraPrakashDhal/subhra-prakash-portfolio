import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, CheckCircle } from 'lucide-react';
import { CountUp, Tilt } from '../utils/components';
import { PERSONAL_INFO } from '../constants/portfolio';
import { useCursor } from '../context/CursorContext';
import { useHeartBurst } from '../hooks/useHeartBurst';
import { SEO } from '../components/SEO';
import subhraPicImg from '../assets/subhrapic.webp';

export const About: React.FC = () => {
  const { setCursorHover, resetCursor } = useCursor();
  const { triggerHeartBurst, HeartOverlay } = useHeartBurst();

  return (
    <div className="pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto space-y-20">
      <SEO
        title="About Subhra Prakash Dhal — Full Stack & UI Engineer"
        description="Learn about Subhra Prakash Dhal, Senior Full Stack Developer & Creative UI Engineer. Educational background, engineering story, and core strengths."
        path="/about"
      />
      {/* 1. Header Section */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="px-4 py-1.5 rounded-full glass-panel border border-cyan-400/40 font-mono text-xs font-bold text-cyan-300 uppercase tracking-widest"
        >
          ENGINEERING STORY
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-4xl pt-6 md:text-6xl font-black text-white tracking-tight"
        >
          About Subhra Prakash Dhal
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-400 text-base md:text-lg"
        >
          Frontend Developer, UI/UX Developer, and MERN Stack Developer passionate about building high-performance, user-centric web applications.
        </motion.p>
      </div>

      {/* 2. Premium Split Layout (Bio + Interactive Portrait Card) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center [perspective:1000px]">
        {/* Left Column: Portrait & Stats Cards */}
        <motion.div
          initial={{ opacity: 0, x: -80, rotateY: -15, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
          className="lg:col-span-5 flex flex-col items-center"
        >
          <Tilt
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            perspective={1000}
            className="w-full max-w-md"
          >
            <div
              onMouseEnter={() => setCursorHover('Click Me!')}
              onMouseLeave={resetCursor}
              className="relative rounded-3xl p-1 bg-gradient-to-tr from-cyan-400/40 via-violet-500/20 to-pink-500/40 glass-panel border border-cyan-400/30 overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.2)]"
            >
              <div
                onClick={triggerHeartBurst}
                className="relative rounded-[22px] overflow-hidden aspect-[4/5] bg-[#090d1a] cursor-pointer select-none"
              >
                <HeartOverlay />
                <img
                  src={subhraPicImg}
                  alt="Subhra Prakash Dhal"
                  className="w-full h-full object-cover object-top filter contrast-105 saturate-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-90" />

                <div className="absolute bottom-6 left-6 right-6 glass-panel p-4 rounded-2xl border border-white/20">
                  <div className="font-mono text-xs font-bold text-cyan-400">
                    BADAMBA, CUTTACK, ODISHA, INDIA
                  </div>
                  <div className="text-white font-extrabold text-lg">
                    Frontend & UI/UX Developer
                  </div>
                </div>
              </div>
            </div>
          </Tilt>

          {/* Quick Floating Cards */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-md mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="glass-panel p-4 rounded-2xl border border-white/10 text-center"
            >
              <div className="font-mono font-black text-3xl text-cyan-400">
                <CountUp end={10} duration={2} />+
              </div>
              <div className="font-mono text-[10px] text-gray-400 uppercase">Internships Completed</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="glass-panel p-4 rounded-2xl border border-white/10 text-center"
            >
              <div className="font-mono font-black text-3xl text-violet-400">
                <CountUp end={4} duration={2} />+
              </div>
              <div className="font-mono text-[10px] text-gray-400 uppercase">Major Projects</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Column: Detailed Narrative */}
        <motion.div
          initial={{ opacity: 0, x: 80, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
          className="lg:col-span-7 space-y-6"
        >
          <div className="space-y-4">
            <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
              Engineering Scalable, User-Centric Digital Experiences
            </h2>
            <p className="text-gray-300 text-base leading-relaxed whitespace-pre-line">
              {PERSONAL_INFO.bio}
            </p>
          </div>

          {/* Core Strengths Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            {[
              { title: 'Frontend Mastery', desc: 'React.js, TypeScript, Tailwind CSS, Redux Toolkit, Axios' },
              { title: 'Full Stack MERN', desc: 'Node.js, Express.js, MongoDB, Mongoose, REST APIs, JWT' },
              { title: 'UI/UX & Dashboards', desc: 'Enterprise admin panels, lab asset tracking, analytics' },
              { title: 'Clean Architecture', desc: 'Component-based architecture, modern UI design, performance' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="glass-card p-4 border border-white/10 space-y-1"
              >
                <div className="flex items-center space-x-2 font-bold text-white text-sm">
                  <CheckCircle size={16} className="text-cyan-400" />
                  <span>{item.title}</span>
                </div>
                <p className="text-gray-400 text-xs pl-6">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Education & Academic Foundation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="pt-6 border-t border-white/10 space-y-4"
          >
            <h3 className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center space-x-2">
              <GraduationCap size={16} />
              <span>EDUCATION & ACADEMIC FOUNDATION</span>
            </h3>
            <div className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h4 className="text-white font-extrabold text-base">
                  Bachelor of Technology (B.Tech) in Computer Science & Engineering
                </h4>
                <p className="text-cyan-400 font-mono text-xs mt-0.5">
                  Computer Science & Engineering • Odisha, India
                </p>
              </div>
              <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-cyan-400/30 bg-white/5 px-4 py-2 text-xs font-semibold tracking-wide text-cyan-300 backdrop-blur-md shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all duration-300 hover:border-cyan-300/60 hover:bg-cyan-500/10 hover:shadow-[0_0_30px_rgba(34,211,238,0.35)]">
                <GraduationCap size={15} className="text-cyan-400 shrink-0" />
                <span>B.Tech Degree</span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
