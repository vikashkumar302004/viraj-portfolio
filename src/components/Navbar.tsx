import React from 'react';
import { ShieldAlert, Sparkles, Terminal, LogOut, Code, Lock } from 'lucide-react';

interface NavbarProps {
  isAdminMode: boolean;
  setIsAdminMode: (mode: boolean) => void;
}

export default function Navbar({ isAdminMode, setIsAdminMode }: NavbarProps) {
  const scrollToSection = (id: string) => {
    if (isAdminMode) {
      setIsAdminMode(false);
      // Let layout state transition, then scroll
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-[#030712]/80 backdrop-blur-md border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Brand Title */}
          <button
            type="button"
            onClick={() => {
              setIsAdminMode(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 cursor-pointer text-left"
          >
            <div className="p-1.5 rounded-xl bg-electric-blue/10 border border-electric-blue/20">
              <Terminal className="w-5 h-5 text-electric-blue" />
            </div>
            <div>
              <span className="font-display font-black text-sm text-white tracking-wider block">
                VIRAJ VENTURES
              </span>
              <span className="text-[10px] text-slate-400 font-mono tracking-widest block">
                DEVELOPER PORTFOLIO
              </span>
            </div>
          </button>

          {/* System Status Pill Badge */}
          <div className="hidden lg:flex items-center gap-2 bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-900 shadow-inner font-mono text-[9px] text-slate-400 select-none">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>SYSTEM: ACTIVE</span>
            <span className="text-slate-700">|</span>
            <span>PORT: <span className="text-electric-blue font-bold">3010</span></span>
          </div>

          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center gap-6">
            <button
              type="button"
              onClick={() => {
                setIsAdminMode(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`text-xs font-semibold hover:text-white transition-colors cursor-pointer ${
                !isAdminMode ? 'text-electric-blue' : 'text-slate-400'
              }`}
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('services-section')}
              className="text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Services
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('about-section')}
              className="text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              About Me
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('project-idea-form-section')}
              className="text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Submit Idea
            </button>
          </div>

          {/* Admin Mode Toggle Button */}
          <div>
            <button
              type="button"
              onClick={() => setIsAdminMode(!isAdminMode)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-1.5 border cursor-pointer ${
                isAdminMode
                  ? 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
              }`}
            >
              {isAdminMode ? (
                <>
                  <LogOut className="w-3.5 h-3.5" />
                  Exit Admin
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  Admin Console
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}
