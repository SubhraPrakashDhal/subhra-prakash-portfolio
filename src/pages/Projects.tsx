import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ExternalLink, Sparkles, X, CheckCircle2, Layers } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { Tilt } from '../utils/components';
import { PROJECTS, type Project } from '../constants/portfolio';
import { useCursor } from '../context/CursorContext';
import { sound } from '../utils/sound';
import { SEO } from '../components/SEO';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const { setCursorHover, resetCursor } = useCursor(); 

  const categories = ['All', 'Full Stack', 'Frontend', 'Backend', 'AI & Cloud'];

  const filteredProjects = PROJECTS.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto space-y-12">
      <SEO
        title="Projects & Works — Subhra Prakash Dhal"
        description="Explore full stack web apps, React 19 interfaces, AI integrations, and high-performance software projects built by Subhra Prakash Dhal."
        path="/projects"
      />
      {/* Header Title */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="px-4 py-1.5 rounded-full glass-panel border border-cyan-400/40 font-mono text-xs font-bold text-cyan-300 uppercase tracking-widest"
        >
          PORTFOLIO SHOWCASE
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-4xl pt-6 md:text-6xl font-black text-white tracking-tight"
        >
          Crafted Digital Solutions
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-400 text-base md:text-lg"
        >
          Explore production-grade MERN applications, AI agents, high-frequency telemetry dashboards, and 3D web configurators.
        </motion.p>
      </div>

      {/* Filter & Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row items-center justify-between gap-6 glass-panel p-4 rounded-3xl border border-white/10"
      >
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                sound.playClick();
              }}
              onMouseEnter={() => {
                setCursorHover(cat.toUpperCase());
                sound.playHover();
              }}
              onMouseLeave={resetCursor}
              className={`px-4 py-2 rounded-xl font-mono text-xs font-bold tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-cyan-400 text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search tech or project..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 font-mono transition-colors"
          />
        </div>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 [perspective:1000px]">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={project.id}
                layout
                initial={{
                  opacity: 0,
                  x: isEven ? -60 : 60,
                  rotateY: isEven ? -15 : 15,
                  scale: 0.9,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  rotateY: 0,
                  scale: 1,
                }}
                viewport={{ once: false, amount: 0.15 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: (idx % 3) * 0.08, ease: [0.215, 0.61, 0.355, 1] }}
                style={{ transformStyle: 'preserve-3d' }}
              >
              <Tilt
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                perspective={1000}
                transitionSpeed={1000}
                className="h-full"
              >
                <div
                  onMouseEnter={() => setCursorHover('EXPLORE')}
                  onMouseLeave={resetCursor}
                  onClick={() => {
                    setActiveModalProject(project);
                    sound.playClick();
                  }}
                  className="group h-full glass-panel rounded-3xl p-6 border border-white/10 hover:border-cyan-400/60 hover:shadow-[0_0_40px_rgba(0,240,255,0.25)] transition-all duration-500 flex flex-col justify-between overflow-hidden relative cursor-pointer light-sweep-effect"
                >
                  <div>
                    {/* Image Box */}
                    <div className="relative rounded-2xl overflow-hidden aspect-[16/10] mb-6 border border-white/10">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-80" />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full glass-panel border border-cyan-400/40 text-[10px] font-mono font-bold text-cyan-300 uppercase">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-black text-white group-hover:text-cyan-400 transition-colors mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-xs leading-relaxed line-clamp-3 mb-4">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10 font-mono text-xs text-cyan-400 font-bold">
                      <span>VIEW DETAILS & HIGHLIGHTS</span>
                      <Sparkles size={14} />
                    </div>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          );
        })}
        </AnimatePresence>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl overflow-y-auto"
            onClick={() => setActiveModalProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full glass-panel rounded-3xl p-6 md:p-8 border border-cyan-400/50 shadow-[0_0_60px_rgba(0,240,255,0.3)] my-8"
            >
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full glass-panel border border-white/10 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="space-y-6">
                <div className="relative rounded-2xl overflow-hidden aspect-video border border-white/10">
                  <img
                    src={activeModalProject.image}
                    alt={activeModalProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-70" />
                </div>

                <div>
                  <span className="px-3 py-1 rounded-full glass-panel border border-cyan-400/40 text-xs font-mono font-bold text-cyan-300 uppercase">
                    {activeModalProject.category}
                  </span>
                  <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight mt-3">
                    {activeModalProject.title}
                  </h2>
                  <p className="text-cyan-400 font-mono text-xs font-bold mt-1">
                    {activeModalProject.subtitle}
                  </p>
                </div>

                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                  {activeModalProject.longDescription}
                </p>

                {/* Key Engineering Highlights */}
                <div className="space-y-3 pt-2">
                  <h4 className="font-mono text-xs uppercase font-bold text-cyan-400 tracking-widest flex items-center space-x-2">
                    <Layers size={14} />
                    <span>KEY ARCHITECTURAL HIGHLIGHTS</span>
                  </h4>
                  <div className="space-y-2">
                    {activeModalProject.highlights.map((h, i) => (
                      <div key={i} className="flex items-start space-x-3 text-sm text-gray-300">
                        <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack List */}
                <div>
                  <h4 className="font-mono text-xs uppercase font-bold text-cyan-400 tracking-widest mb-2">
                    TECHNOLOGY STACK
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeModalProject.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-lg glass-card border border-white/10 font-mono text-xs text-white"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-4 pt-4 border-t border-white/10">
                  <a
                    href={activeModalProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 text-black font-extrabold text-xs font-mono uppercase tracking-wider text-center shadow-lg hover:brightness-110 transition-all flex items-center justify-center space-x-2"
                  >
                    <ExternalLink size={16} />
                    <span>OPEN LIVE DEMO</span>
                  </a>
                  <a
                    href={activeModalProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 rounded-xl glass-panel border border-white/20 text-white font-mono text-xs font-bold uppercase hover:bg-white/10 transition-all flex items-center space-x-2"
                  >
                    <FaGithub size={16} />
                    <span>SOURCE CODE</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
