import React, { useState, useMemo } from 'react';
import { Search, ExternalLink, CheckCircle2 } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { Tilt } from '../utils/components';
import { PROJECTS } from '../constants/portfolio';
import { useCursor } from '../context/CursorContext';
import { sound } from '../utils/sound';
import { SEO } from '../components/SEO';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { setCursorHover, resetCursor } = useCursor(); 

  const categories = ['All', 'Full Stack', 'Frontend', 'Backend', 'AI & Cloud'];

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  useScrollReveal([selectedCategory, searchQuery]);

  return (
    <div className="pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto space-y-12">
      <SEO
        title="Projects & Works — Subhra Prakash Dhal"
        description="Explore full stack web apps, React 19 interfaces, AI integrations, and high-performance software projects built by Subhra Prakash Dhal."
        path="/projects"
      />
      {/* Header Title */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <span className="reveal-on-scroll inline-block px-4 py-1.5 rounded-full glass-panel border border-cyan-400/40 font-mono text-xs font-bold text-cyan-300 uppercase tracking-widest">
          PORTFOLIO SHOWCASE
        </span>
        <h1 className="reveal-on-scroll stagger-1 text-4xl pt-6 md:text-6xl font-black text-white tracking-tight">
          Crafted Digital Solutions
        </h1>
        <p className="reveal-on-scroll stagger-2 text-gray-400 text-base md:text-lg">
          Explore production-grade MERN applications, AI agents, high-frequency telemetry dashboards, and 3D web configurators.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="reveal-on-scroll stagger-3 flex flex-col md:flex-row items-center justify-between gap-6 glass-panel p-4 rounded-3xl border border-white/10">
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
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 [perspective:1000px]">
        {filteredProjects.map((project, idx) => {
          return (
            <div
              key={project.id}
              className="reveal-on-scroll is-revealed transition-all duration-400 ease-out"
              style={{
                transitionDelay: `${(idx % 3) * 0.06}s`,
                transformStyle: 'preserve-3d',
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
                  className="group h-full glass-panel rounded-3xl p-6 border border-white/10 hover:border-cyan-400/60 hover:shadow-[0_0_40px_rgba(0,240,255,0.2)] transition-all duration-500 flex flex-col justify-between overflow-hidden relative light-sweep-effect"
                >
                  <div className="space-y-4">
                    {/* Image Box */}
                    <div className="relative rounded-2xl overflow-hidden aspect-[16/9] border border-white/10">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 transform-gpu"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-80" />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full glass-panel border border-cyan-400/40 text-[10px] font-mono font-bold text-cyan-300 uppercase">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Header Info */}
                    <div>
                      <h3 className="text-xl font-black text-white group-hover:text-cyan-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-cyan-400 font-mono text-[11px] font-bold mt-0.5">
                        {project.subtitle}
                      </p>
                    </div>

                    <p className="text-gray-300 text-xs leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-1.5 pt-1">
                      {project.highlights.slice(0, 3).map((h, i) => (
                        <div key={i} className="flex items-start space-x-2 text-[11px] text-gray-300">
                          <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons Directly on Card */}
                  <div className="flex items-center space-x-3 pt-5 mt-4 border-t border-white/10">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={() => sound.playHover()}
                      onClick={() => sound.playClick()}
                      className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 text-black font-extrabold text-[11px] font-mono uppercase tracking-wider text-center shadow-lg hover:brightness-110 transition-all flex items-center justify-center space-x-1.5"
                    >
                      <ExternalLink size={14} />
                      <span>LIVE DEMO</span>
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={() => sound.playHover()}
                      onClick={() => sound.playClick()}
                      className="px-4 py-2.5 rounded-xl glass-panel border border-white/20 text-white font-mono text-[11px] font-bold uppercase hover:bg-white/10 transition-all flex items-center space-x-1.5"
                    >
                      <FaGithub size={14} />
                      <span>CODE</span>
                    </a>
                  </div>
                </div>
              </Tilt>
            </div>
          );
        })}
      </div>
    </div>
  );
};
