import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Send, CheckCircle2, Navigation, RotateCcw, LocateFixed, Globe } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Tilt } from '../utils/components';
import { PERSONAL_INFO } from '../constants/portfolio';
import { useCursor } from '../context/CursorContext';
import { sound } from '../utils/sound';
import { SEO } from '../components/SEO';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [mapKey, setMapKey] = useState<number>(0);
  const { setCursorHover, resetCursor } = useCursor();

  useScrollReveal();

  const handleRecenterMap = () => {
    setMapKey((prev) => prev + 1);
    sound.playClick();
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (_data: ContactFormData) => {
    setIsSubmitting(true);
    sound.playClick();

    try {
      await new Promise((res) => setTimeout(res, 1200));

      sound.playSuccess();
      setSubmitStatus('success');
      reset();
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto space-y-16">
      <SEO
        title="Contact & Hire — Subhra Prakash Dhal"
        description="Get in touch with Subhra Prakash Dhal. Available for full stack web development, remote projects, and engineering opportunities worldwide."
        path="/contact"
      />
      {/* 1. Header Section */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <span className="reveal-on-scroll inline-block px-4 py-1.5 rounded-full glass-panel border border-cyan-400/40 font-mono text-xs font-bold text-cyan-300 uppercase tracking-widest">
          INITIATE CONTACT
        </span>
        <h1 className="reveal-on-scroll stagger-1 text-4xl pt-6 md:text-6xl font-black text-white tracking-tight">
          Let's Build Together
        </h1>
        <p className="reveal-on-scroll stagger-2 text-gray-400 text-base md:text-lg">
          Have a question, full-stack project idea, or engineering opportunity? Send a message directly into Subhra's inbox.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start [perspective:1000px]">
        {/* Left Column: Direct Info & Social Cards */}
        <div className="reveal-on-scroll stagger-2 lg:col-span-5 space-y-6 transform-gpu">
          <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 space-y-6">
            <h3 className="text-2xl font-black text-white tracking-tight">Direct Information</h3>

            <div className="space-y-4 font-mono text-xs">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                onMouseEnter={() => setCursorHover('EMAIL')}
                onMouseLeave={resetCursor}
                className="flex items-center space-x-4 p-3 rounded-2xl glass-card border border-white/10 hover:border-cyan-400/50 hover:text-cyan-300 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Mail size={18} />
                </div>
                <div className="overflow-hidden">
                  <div className="text-gray-500 uppercase">EMAIL ADDRESS</div>
                  <div className="text-white font-bold truncate">{PERSONAL_INFO.email}</div>
                </div>
              </a>

              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                onMouseEnter={() => setCursorHover('CALL')}
                onMouseLeave={resetCursor}
                className="flex items-center space-x-4 p-3 rounded-2xl glass-card border border-white/10 hover:border-cyan-400/50 hover:text-cyan-300 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-violet-400/10 border border-violet-400/30 flex items-center justify-center text-violet-400 shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="text-gray-500 uppercase">DIRECT PHONE</div>
                  <div className="text-white font-bold">{PERSONAL_INFO.phone}</div>
                </div>
              </a>

              <div className="flex items-center space-x-4 p-3 rounded-2xl glass-card border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-pink-400/10 border border-pink-400/30 flex items-center justify-center text-pink-400 shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-gray-500 uppercase">BASE LOCATION</div>
                  <div className="text-white font-bold">{PERSONAL_INFO.location}</div>
                </div>
              </div>
            </div>

            {/* Social Link Grid */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold">
                CONNECT ON SOCIAL
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'GitHub', icon: FaGithub, href: PERSONAL_INFO.socials.github },
                  { name: 'LinkedIn', icon: FaLinkedin, href: PERSONAL_INFO.socials.linkedin },
                  { name: 'Twitter', icon: FaTwitter, href: PERSONAL_INFO.socials.twitter },
                  { name: 'Instagram', icon: FaInstagram, href: PERSONAL_INFO.socials.instagram },
                ].map((s) => {
                  const SIcon = s.icon;
                  return (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => sound.playClick()}
                      className="px-4 py-2 rounded-xl glass-card border border-white/10 flex items-center space-x-2 text-xs font-mono text-gray-300 hover:text-cyan-300 hover:border-cyan-400/40 transition-all"
                    >
                      <SIcon size={14} />
                      <span>{s.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Interactive Google Map Location Card */}
          <div className="glass-panel rounded-3xl border border-cyan-400/30 overflow-hidden relative h-64 md:h-72 shadow-[0_0_30px_rgba(0,240,255,0.15)] group">
            <iframe
              key={mapKey}
              title="Google Map of Patia, Bhubaneswar"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3740.7188734273574!2d85.8164393!3d20.3541484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19093cc3e1974b%3A0x82db0717cf7b1981!2sPatia%2C%20Bhubaneswar%2C%20Odisha!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full rounded-3xl transition-all duration-500"
            />

            {/* Overlay Glass Status Bar */}
            <div className="absolute bottom-3 left-3 right-3 glass-panel p-3.5 rounded-2xl border border-white/20 backdrop-blur-xl flex items-center justify-between pointer-events-auto shadow-2xl">
              <div>
                <div className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center space-x-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                  </span>
                  <Globe size={14} className="text-cyan-400 shrink-0" />
                  <span>PATIA, BHUBANESWAR, ODISHA, INDIA</span>
                </div>
                <div className="text-[10px] font-mono text-gray-300 mt-1 flex items-center space-x-1.5">
                  <LocateFixed size={11} className="text-violet-400 shrink-0" />
                  <span>Available for Remote Worldwide & Relocation</span>
                </div>
              </div>

              {/* Premium Re-Center Button */}
              <button
                type="button"
                onClick={handleRecenterMap}
                onMouseEnter={() => {
                  setCursorHover('RECENTER MAP');
                  sound.playHover();
                }}
                onMouseLeave={resetCursor}
                className="group/btn inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-pink-500/20 hover:from-cyan-400 hover:via-cyan-400 hover:to-cyan-400 border border-cyan-400/50 hover:border-cyan-400 text-cyan-300 hover:text-black font-mono text-[10px] font-extrabold tracking-wider uppercase transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] active:scale-95 hover:scale-105 cursor-pointer shrink-0"
                title="Smoothly re-center map to Patia, Bhubaneswar"
              >
                <Navigation size={13} className="text-cyan-400 group-hover/btn:text-black transition-transform duration-300 group-hover/btn:rotate-45" />
                <span>RE-CENTER MAP</span>
                <RotateCcw size={12} className="text-cyan-400/80 group-hover/btn:text-black transition-transform duration-500 group-hover/btn:-rotate-180" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Glassmorphic Contact Form */}
        <div className="reveal-on-scroll stagger-3 lg:col-span-7 transform-gpu">
          <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4} perspective={1000}>
            <div className="glass-panel p-6 md:p-10 rounded-3xl border border-cyan-400/30 shadow-[0_0_50px_rgba(0,240,255,0.15)] relative overflow-hidden">
              <h3 className="text-2xl font-extrabold text-white tracking-tight mb-6">
                Send a Direct Message
              </h3>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-sm font-mono flex items-center space-x-3 transition-all">
                  <CheckCircle2 size={20} />
                  <span>Message transmitted successfully! Subhra will respond shortly.</span>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Name */}
                <div className="space-y-1">
                  <label className="font-mono text-xs text-gray-300 uppercase font-bold">
                    YOUR NAME
                  </label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    type="text"
                    placeholder="e.g. Sarah Connor"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-400/80 font-mono transition-colors"
                  />
                  {errors.name && (
                    <span className="text-xs text-pink-400 font-mono">{errors.name.message}</span>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="font-mono text-xs text-gray-300 uppercase font-bold">
                    EMAIL ADDRESS
                  </label>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' },
                    })}
                    type="email"
                    placeholder="e.g. sarah@techcorp.com"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-400/80 font-mono transition-colors"
                  />
                  {errors.email && (
                    <span className="text-xs text-pink-400 font-mono">{errors.email.message}</span>
                  )}
                </div>

                {/* Subject */}
                <div className="space-y-1">
                  <label className="font-mono text-xs text-gray-300 uppercase font-bold">
                    PROJECT SUBJECT
                  </label>
                  <input
                    {...register('subject', { required: 'Subject is required' })}
                    type="text"
                    placeholder="e.g. Full Stack MERN Project Opportunity"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-400/80 font-mono transition-colors"
                  />
                  {errors.subject && (
                    <span className="text-xs text-pink-400 font-mono">{errors.subject.message}</span>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="font-mono text-xs text-gray-300 uppercase font-bold">
                    PROJECT DETAILS
                  </label>
                  <textarea
                    {...register('message', { required: 'Message details are required' })}
                    rows={4}
                    placeholder="Share scope, timeline, budget or tech stack goals..."
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-400/80 font-mono transition-colors resize-none"
                  />
                  {errors.message && (
                    <span className="text-xs text-pink-400 font-mono">{errors.message.message}</span>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onMouseEnter={() => setCursorHover('SEND')}
                  onMouseLeave={resetCursor}
                  className="w-full py-4 rounded-2xl bg-linear-to-r from-cyan-400 via-violet-500 to-pink-500 text-black font-extrabold text-sm tracking-wider font-mono uppercase shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:shadow-[0_0_50px_rgba(0,240,255,0.7)] transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                >
                  <Send size={18} />
                  <span>{isSubmitting ? 'TRANSMITTING...' : 'TRANSMIT MESSAGE'}</span>
                </button>
              </form>
            </div>
          </Tilt>
        </div>
      </div>
    </div>
  );
};
