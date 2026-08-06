import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { HeroSection } from '../sections/HeroSection';
import { PROJECTS } from '../constants/portfolio';
import { useCursor } from '../context/CursorContext';
import { sound } from '../utils/sound';
import { CountUp, Marquee, Tilt } from '../utils/components';
import { SEO } from '../components/SEO';

export const Home: React.FC = () => {
  const { setCursorHover, resetCursor } = useCursor();
  const featuredProjects = PROJECTS.filter((p) => p.featured);

  return (
    <div className="space-y-24 pb-20">
      <SEO
        title="Subhra Prakash Dhal — Senior Full Stack & UI/UX Developer"
        description="Official portfolio of Subhra Prakash Dhal. Senior Full Stack & Creative UI Engineer specializing in React 19, Node.js, and high-performance Web Applications."
        path="/"
      />
      {/* 1. Apple-Style Hero Section */}
      <HeroSection />

      {/* 2. Impact Statistics Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-4 md:px-8"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: 'Internships', count: 10, suffix: '+' },
            { label: 'Major Projects', count: 4, suffix: '+' },
            { label: 'NPTEL Certs', count: 2, suffix: '' },
            { label: 'Professional Exp', count: 6, suffix: '+ Mon' },
            { label: 'Built Interfaces', count: 20, suffix: '+' },
            { label: 'Dev Hours', count: 1000, suffix: '+' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="glass-panel p-5 rounded-3xl border border-white/10 text-center hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] transition-all duration-300"
            >
              <div className="font-mono font-black text-3xl md:text-4xl text-gradient-aurora mb-1">
                <CountUp end={stat.count} duration={2} enableScrollSpy scrollSpyOnce />
                <span>{stat.suffix}</span>
              </div>
              <div className="font-mono text-[11px] text-gray-400 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 3. Featured Showcase Projects */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-12 overflow-x-clip">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between space-y-4 md:space-y-0">
          <div>
            <div className="font-mono text-xs font-bold text-cyan-400 tracking-widest uppercase mb-2">
              FEATURED ENGINEERING WORK
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              Selected Projects & Case Studies
            </h2>
          </div>

          <NavLink
            to="/projects"
            onMouseEnter={() => setCursorHover('ALL WORK')}
            onMouseLeave={resetCursor}
            onClick={() => sound.playClick()}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full glass-panel border border-white/20 text-cyan-300 font-bold text-xs tracking-wider uppercase hover:border-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300"
          >
            <span>VIEW ALL PROJECTS</span>
            <ArrowUpRight size={16} />
          </NavLink>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((project, idx) => {
            return (
              <motion.div
                key={project.id}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: (idx % 2) * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
              <Tilt
                tiltMaxAngleX={6}
                tiltMaxAngleY={6}
                perspective={1000}
                transitionSpeed={1000}
                className="h-full"
              >
                <div
                  onMouseEnter={() => setCursorHover('PROJECT')}
                  onMouseLeave={resetCursor}
                  className="group h-full glass-panel rounded-3xl p-6 border border-white/10 hover:border-cyan-400/60 hover:shadow-[0_0_40px_rgba(0,240,255,0.25)] transition-all duration-500 flex flex-col justify-between overflow-hidden relative light-sweep-effect"
                >
                  <div>
                    {/* Project Image */}
                    <div className="relative rounded-2xl overflow-hidden aspect-video mb-6 border border-white/10">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        width="600"
                        height="338"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-80" />

                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full glass-panel border border-cyan-400/50 text-[10px] font-mono font-bold text-cyan-300 uppercase tracking-widest">
                          {project.category}
                        </span>
                      </div>

                      {project.metrics && (
                        <div className="absolute bottom-4 left-4 right-4 glass-panel px-4 py-2 rounded-xl border border-white/20 text-xs font-mono text-cyan-300 font-bold">
                          ⚡ {project.metrics}
                        </div>
                      )}
                    </div>

                    <h3 className="text-2xl font-extrabold text-white group-hover:text-cyan-400 transition-colors mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center space-x-4 pt-4 border-t border-white/10">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => sound.playClick()}
                        className="flex items-center space-x-2 text-xs font-mono font-bold text-cyan-400 hover:text-white transition-colors"
                      >
                        <ExternalLink size={14} />
                        <span>LIVE DEMO</span>
                      </a>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => sound.playClick()}
                        className="flex items-center space-x-2 text-xs font-mono font-bold text-gray-400 hover:text-white transition-colors"
                      >
                        <FaGithub size={14} />
                        <span>GITHUB</span>
                      </a>
                    </div>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          );
        })}
        </div>
      </section>

      {/* Tech Stack Marquee */}
      <section className="relative overflow-hidden py-8 bg-transparent">
        {/* Left Fade */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-[#050816] via-[#050816]/80 to-transparent" />

        {/* Right Fade */}
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-[#050816] via-[#050816]/80 to-transparent" />

        {/* First Row */}
        <Marquee gradient={false} speed={45}>
          <div className="flex items-center gap-6 px-4">
            {[
              "REACT 19",
              "NODE.JS",
              "EXPRESS",
              "MONGODB",
              "TYPESCRIPT",
              "TAILWIND CSS",
              "GSAP",
              "LENIS",
              "REDIS",
              "OPENAI API",
            ].map((tech) => (
              <div
                key={tech}
                className="group flex items-center gap-3 rounded-full border border-white/5 bg-white/[0.03] px-6 py-3 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/5 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]"
              >
                <span className="font-mono text-sm font-semibold tracking-[0.18em] uppercase text-gray-400 transition-colors duration-300 group-hover:text-white">
                  {tech}
                </span>

                <Sparkles
                  size={15}
                  className="text-cyan-400 transition-all duration-500 group-hover:rotate-180 group-hover:scale-125"
                />
              </div>
            ))}
          </div>
        </Marquee>

        {/* Second Row */}
        <Marquee gradient={false} speed={45} direction="right">
          <div className="mt-5 flex items-center gap-6 px-4">
            {[
              "REACT 19",
              "NODE.JS",
              "EXPRESS",
              "MONGODB",
              "TYPESCRIPT",
              "TAILWIND CSS",
              "GSAP",
              "LENIS",
              "REDIS",
              "OPENAI API",
            ].map((tech) => (
              <div
                key={tech}
                className="group flex items-center gap-3 rounded-full border border-white/5 bg-white/[0.03] px-6 py-3 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/5 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]"
              >
                <span className="font-mono text-sm font-semibold tracking-[0.18em] uppercase text-gray-400 transition-colors duration-300 group-hover:text-white">
                  {tech}
                </span>

                <Sparkles
                  size={15}
                  className="text-cyan-400 transition-all duration-500 group-hover:rotate-180 group-hover:scale-125"
                />
              </div>
            ))}
          </div>
        </Marquee>
      </section>

      {/* 5. Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl glass-panel p-8 md:p-16 border border-cyan-400/40 text-center overflow-hidden shadow-[0_0_60px_rgba(0,240,255,0.2)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-pink-500/10" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6 ">
            <span className="px-4 py-2 rounded-full glass-panel border border-cyan-400/50 font-mono text-xs font-bold text-cyan-300 uppercase tracking-widest">
              LET'S BUILD SOMETHING ICONIC
            </span>
            <h2 className="text-3xl pt-6 md:text-5xl font-black text-white tracking-tight">
              Have an Ambitious Project or Engineering Role?
            </h2>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              I am available for full-stack engineering contracts, leadership roles, and creative web app developments.
            </p>
            <div className="pt-4 flex justify-center">
              <NavLink
                to="/contact"
                onMouseEnter={() => setCursorHover('CONTACT')}
                onMouseLeave={resetCursor}
                onClick={() => sound.playClick()}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 text-[white] font-extrabold text-sm tracking-wider shadow-[0_0_30px_rgba(0,240,255,0.5)] hover:shadow-[0_0_50px_rgba(0,240,255,0.8)] hover:scale-105 transition-all duration-300"
              >
                INITIATE CONTACT NOW →
              </NavLink>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
