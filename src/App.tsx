import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Instagram, ArrowUp, Heart, Sparkles, Terminal } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import AboutMe from './components/AboutMe';
import ProjectForm from './components/ProjectForm';
import AdminPanel from './components/AdminPanel';
import Faq from './components/Faq';
import ParticleBackground from './components/ParticleBackground';
import Chatbot from './components/Chatbot';
import Testimonials from './components/Testimonials';

export default function App() {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Custom Cursor Glow Trail tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans selection:bg-electric-blue selection:text-slate-950 relative overflow-hidden">
      
      {/* Interactive Canvas Particle Background */}
      <ParticleBackground />

      {/* Dynamic Cursor Blur Light */}
      <div 
        className="pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-electric-blue/5 rounded-full blur-[100px] z-50 transition-all duration-300 ease-out hidden md:block"
        style={{ 
          left: `${mousePos.x}px`, 
          top: `${mousePos.y}px` 
        }}
      />
      
      {/* Floating Header */}
      <Navbar isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode} />

      {/* Main Container */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {isAdminMode ? (
            /* SECURE ADMIN CONTROL PANEL */
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="pt-16"
            >
              <AdminPanel />
            </motion.div>
          ) : (
            /* PUBLIC VISITOR WORKFLOW */
            <motion.div
              key="portfolio"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Hero Section */}
              <Hero />

              {/* Services Offered Section */}
              <Services />

              {/* Biography About Section */}
              <AboutMe />

              {/* Client Testimonials Carousel */}
              <Testimonials />

              {/* FAQ Section */}
              <Faq />

              {/* Interactive Submit Project Idea Form & Live Preview */}
              <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ProjectForm />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Premium Visual Footer */}
      <footer className="bg-[#02050c] border-t border-slate-900 py-12 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 text-left">
            
            {/* Logo area */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-xl bg-electric-blue/10 border border-electric-blue/20">
                  <Terminal className="w-5 h-5 text-electric-blue" />
                </div>
                <span className="font-display font-black text-sm text-white tracking-wider">
                  VIRAJ VENTURES
                </span>
              </div>
              <p className="text-slate-400 max-w-xs leading-relaxed">
                Coding and styling custom business websites, portfolios, and responsive mobile applications from Karad, Maharashtra.
              </p>
            </div>

            {/* Direct Channels */}
            <div className="space-y-3">
              <h4 className="font-semibold text-white uppercase tracking-wider text-[10px] font-mono">
                Connect Directly
              </h4>
              <ul className="space-y-2 font-mono">
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  <a href="tel:7498516086" className="hover:text-electric-blue transition-colors">
                    +91 7498516086
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <a href="mailto:virajbakale2009@gmail.com" className="hover:text-electric-blue transition-colors">
                    virajbakale2009@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Instagram className="w-3.5 h-3.5 text-slate-500" />
                  <a href="https://instagram.com/Viraj_notifyall" target="_blank" rel="noreferrer" className="hover:text-electric-blue transition-colors">
                    @Viraj_notifyall
                  </a>
                </li>
              </ul>
            </div>

            {/* Geographical Base */}
            <div className="space-y-3">
              <h4 className="font-semibold text-white uppercase tracking-wider text-[10px] font-mono">
                Location Base
              </h4>
              <div className="flex items-start gap-2 font-mono">
                <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white">Karad, Maharashtra</p>
                  <p className="text-[10px] text-slate-500 mt-1">Julewadi, India</p>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Copyright and built credit */}
          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500">
            <div>
              &copy; {new Date().getFullYear()} Viraj Ventures. All Rights Reserved.
            </div>
            
            <div className="flex items-center gap-1">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-red-500 fill-red-500" />
              <span>&amp;</span>
              <Sparkles className="w-3 h-3 text-electric-blue" />
              <span className="font-semibold text-slate-400">Proudly Built in Karad</span>
            </div>

            <div>
              <button
                type="button"
                onClick={scrollToTop}
                className="p-2 bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-white border border-slate-850 rounded-xl transition-all cursor-pointer"
                title="Scroll to Top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* Interactive Floating AI Chatbot */}
      <Chatbot />

    </div>
  );
}
