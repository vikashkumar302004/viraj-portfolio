import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal, Code, Sparkles, Send, MapPin, ArrowDown, ChevronRight, Laptop, Smartphone, Rocket, Play, RefreshCw } from 'lucide-react';
import virajImg from '../viraj.jpeg';

export default function Hero() {
  const scrollToForm = () => {
    const element = document.getElementById('project-idea-form-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // --- Tagline Typewriter Loops ---
  const taglines = [
    "Your Idea, My Code",
    "Fast Delivery, Pure Craft",
    "Stunning Mobile Apps",
    "Premium Websites"
  ];
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: any;
    const fullText = taglines[taglineIndex];
    const typingSpeed = isDeleting ? 35 : 70;

    if (!isDeleting && currentText === fullText) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    } else {
      timer = setTimeout(() => {
        setCurrentText(
          isDeleting
            ? fullText.substring(0, currentText.length - 1)
            : fullText.substring(0, currentText.length + 1)
        );
      }, typingSpeed);
    }
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, taglineIndex]);

  // --- Terminal Simulation States ---
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [terminalStep, setTerminalStep] = useState(0);
  const [isCompiling, setIsCompiling] = useState(false);

  const terminalSteps = [
    { text: "initializing viraj-ventures-system...", delay: 400 },
    { text: "✔ tsconfig loaded (target: ESNext)", delay: 300 },
    { text: "✔ connected to firestore database", delay: 400 },
    { text: "✔ active templates: SaaS, Store, Portfolio, App", delay: 300 },
    { text: "✔ profile check: age: 17 | origin: Karad", delay: 500 },
    { text: "founder.readyToCode = true;", delay: 200 },
    { text: "system initialized. ready for ideas! 🚀", delay: 200 }
  ];

  useEffect(() => {
    if (terminalStep < terminalSteps.length) {
      const timer = setTimeout(() => {
        setTerminalOutput(prev => [...prev, terminalSteps[terminalStep].text]);
        setTerminalStep(prev => prev + 1);
      }, terminalSteps[terminalStep].delay);
      return () => clearTimeout(timer);
    }
  }, [terminalStep]);

  const handleRunBuild = () => {
    if (isCompiling) return;
    setIsCompiling(true);
    setTerminalOutput(prev => [...prev, ">> npm run build --prod"]);
    
    setTimeout(() => {
      setTerminalOutput(prev => [
        ...prev, 
        "vite v6.2.3 building assets...",
        "✔ dist/index.html (4.1 kB)",
        "✔ dist/assets/index.js (192.4 kB)",
        "✔ build success! [Ready to Deploy] ⚡"
      ]);
      setIsCompiling(false);
    }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
      },
    },
  };

  return (
    <div id="hero-section" className="relative min-h-[95vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Absolute futuristic decoration items */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 bg-electric-blue/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow [animation-duration:6s]" />
      
      {/* Floating Micro tech particles in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <motion.div 
          animate={{ y: [0, -15, 0], x: [0, 5, 0], rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute top-[20%] right-[15%] text-slate-700/20 font-mono text-[10px]"
        >
          &lt;div&gt;
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-[30%] left-[12%] text-slate-700/20 font-mono text-[11px]"
        >
          const app = initializeApp();
        </motion.div>
        <motion.div 
          animate={{ y: [0, -10, 0], rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute top-[45%] left-[20%] text-slate-800/15"
        >
          <Code className="w-5 h-5" />
        </motion.div>
      </div>

      {/* Grid pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text information */}
          <motion.div 
            className="lg:col-span-7 text-left space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-slate-900/80 border border-slate-800 rounded-full px-4 py-1.5 text-xs text-slate-300">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-electric-blue"></span>
              </span>
              <span>Available for Freelance & Custom Builds</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white leading-[1.1] tracking-tight">
              VIRAJ <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-purple-400">Ventures</span>
            </motion.h1>

            <motion.div variants={itemVariants} className="text-lg sm:text-xl font-bold text-slate-200 font-display flex flex-wrap items-center gap-1.5 min-h-[36px]">
              <span>17 y/o Founder from Karad —</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-purple-400 font-extrabold select-none">
                {currentText}
              </span>
              <span className="w-1.5 h-5 bg-electric-blue animate-pulse shrink-0" />
            </motion.div>

            <motion.p variants={itemVariants} className="text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed">
              We compile premium custom business portfolios, ecommerce store fronts, landing pages, and responsive mobile interfaces from scratch. Send me your design assets and view your software loading instantly in our real-time templates preview.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <motion.button
                type="button"
                onClick={scrollToForm}
                whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 240, 255, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-gradient-to-r from-electric-blue to-blue-500 text-slate-950 text-xs font-black uppercase tracking-wider rounded-xl shadow-lg transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
              >
                <Rocket className="w-4 h-4 text-slate-950" />
                Submit Your Project Idea
              </motion.button>
              
              <motion.a
                href="#about-section"
                whileHover={{ scale: 1.02, backgroundColor: "rgba(30, 41, 59, 0.8)", borderColor: "rgba(100, 116, 139, 0.5)" }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-slate-900 border border-slate-800 text-slate-350 text-xs font-bold uppercase tracking-wider rounded-xl transition-all text-center flex items-center justify-center gap-2"
              >
                About Me
                <ArrowDown className="w-4 h-4 text-slate-400 animate-bounce" />
              </motion.a>
            </motion.div>

            {/* Micro Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6 pt-10 border-t border-slate-900 max-w-md">
              <div className="group">
                <p className="text-2xl sm:text-3xl font-black text-white font-display group-hover:text-electric-blue transition-colors duration-300">17</p>
                <p className="text-[10px] text-slate-500 mt-1 font-bold uppercase tracking-wider font-mono">Years Old Founder</p>
              </div>
              <div className="group">
                <p className="text-2xl sm:text-3xl font-black text-electric-blue font-display group-hover:text-purple-400 transition-colors duration-300">Karad</p>
                <p className="text-[10px] text-slate-500 mt-1 font-bold uppercase tracking-wider font-mono">Maharashtra</p>
              </div>
              <div className="group">
                <p className="text-2xl sm:text-3xl font-black text-purple-400 font-display group-hover:text-pink-400 transition-colors duration-300">100%</p>
                <p className="text-[10px] text-slate-500 mt-1 font-bold uppercase tracking-wider font-mono">My Custom Code</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Interactive Profile / Code Panel Card */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-electric-blue/15 to-transparent rounded-3xl blur-2xl -z-10 animate-pulse [animation-duration:4s]" />
            
            {/* Main Founder Card Wrapper */}
            <motion.div 
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="border-beam-container shadow-2xl relative will-change-gpu"
            >
              <div className="border-beam-content bg-[#0b1329]/95 p-6 sm:p-8 border border-slate-900/50">
                <div className="absolute top-4 right-4 text-[9px] font-mono text-slate-400 bg-slate-950/80 px-3 py-1 rounded-full border border-slate-850 z-20">
                  🚀 VIRAJ_VB
                </div>

              {/* Founder Avatar with styled tech ring */}
              <div className="flex flex-col items-center text-center">
                <div className="relative w-28 h-28 mb-5 group select-none">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-electric-blue via-purple-500 to-pink-500 animate-spin-slow p-0.5">
                    <div className="w-full h-full rounded-full bg-slate-950" />
                  </div>
                  
                  {/* Avatar Image */}
                  <div className="absolute inset-1.5 rounded-full bg-slate-900 flex items-center justify-center overflow-hidden border-2 border-slate-950 transition-colors duration-300">
                    <img 
                      src={virajImg} 
                      alt="Viraj Bakale" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-550"
                    />
                  </div>
                </div>

                <h3 className="text-xl font-display font-extrabold text-white">
                  Viraj Bakale
                </h3>
                <p className="text-xs text-electric-blue font-bold tracking-wide mt-1 font-mono uppercase">
                  Founder & Tech Craftsman
                </p>

                <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-full border border-slate-850 mt-4 text-[10px] text-slate-350 font-mono hover:text-white transition-colors">
                  <MapPin className="w-3.5 h-3.5 text-red-400" />
                  Karad, Maharashtra
                </div>

                {/* Simulated IDE Terminal Console Playground */}
                <div className="w-full bg-slate-950/90 rounded-xl border border-slate-850/60 p-4 mt-6 text-left font-mono text-xs">
                  <div className="flex items-center justify-between mb-3 border-b border-slate-900 pb-2.5">
                    <span className="text-slate-500 text-[10px] flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5" />
                      console.sh
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleRunBuild}
                        disabled={isCompiling}
                        className="px-2 py-0.5 bg-slate-900 hover:bg-slate-850 text-[9px] border border-slate-800 rounded font-semibold text-electric-blue hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        {isCompiling ? (
                          <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                        ) : (
                          <Play className="w-2.5 h-2.5" />
                        )}
                        {isCompiling ? "Compiling" : "Run Build"}
                      </button>
                      <div className="flex gap-1 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                      </div>
                    </div>
                  </div>

                  {/* Terminal log messages */}
                  <div className="space-y-1.5 text-[10px] text-slate-300 max-h-36 overflow-y-auto pr-1 leading-relaxed">
                    {terminalOutput.map((line, index) => {
                      const isError = line.includes("error");
                      const isSuccessLine = line.includes("success") || line.includes("✔");
                      return (
                        <p 
                          key={index}
                          className={
                            isError ? "text-red-400" : isSuccessLine ? "text-green-400" : line.startsWith(">>") ? "text-electric-blue font-semibold" : "text-slate-400"
                          }
                        >
                          {line}
                        </p>
                      );
                    })}
                    {/* Blinking cursor */}
                    <span className="inline-block w-1.5 h-3.5 bg-electric-blue animate-pulse ml-0.5" />
                  </div>
                </div>

                {/* Interactive Action Badges */}
                <div className="grid grid-cols-3 gap-3 mt-6 w-full">
                  <motion.div 
                    whileHover={{ scale: 1.03, y: -2 }}
                    className="bg-slate-950 p-2.5 rounded-xl border border-slate-850 text-center transition-all duration-200 will-change-gpu"
                  >
                    <Laptop className="w-4 h-4 text-electric-blue mx-auto mb-1" />
                    <span className="text-[9px] font-mono text-slate-400 block font-bold">Web Apps</span>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.03, y: -2 }}
                    className="bg-slate-950 p-2.5 rounded-xl border border-slate-850 text-center transition-all duration-200 will-change-gpu"
                  >
                    <Smartphone className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                    <span className="text-[9px] font-mono text-slate-400 block font-bold">Android+iOS</span>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.03, y: -2 }}
                    className="bg-slate-950 p-2.5 rounded-xl border border-slate-850 text-center transition-all duration-200 will-change-gpu"
                  >
                    <Code className="w-4 h-4 text-pink-400 mx-auto mb-1" />
                    <span className="text-[9px] font-mono text-slate-400 block font-bold">UI Design</span>
                  </motion.div>
                </div>

              </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
