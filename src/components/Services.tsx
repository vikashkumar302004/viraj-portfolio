import React from 'react';
import { motion } from 'motion/react';
import { Monitor, Smartphone, Palette, Globe, Layers, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export default function Services() {
  const services = [
    {
      title: 'Website Development',
      subtitle: 'Business, Portfolio, E-commerce',
      icon: <Monitor className="w-8 h-8 text-electric-blue" />,
      description: 'Responsive, fast, and SEO-friendly websites. Built custom from scratch to match your unique brand identity.',
      bullets: [
        'Premium Landing Pages (SaaS & Startup)',
        'E-commerce Store Fronts with payments',
        'Custom Portfolios & Creator websites',
        'CMS & Blog websites (WordPress / Custom)',
      ],
      tag: '🔥 Most Popular',
      glowClass: 'glow-blue',
      topStripe: 'group-hover:via-electric-blue',
      borderColor: 'group-hover:border-electric-blue/40'
    },
    {
      title: 'Mobile App',
      subtitle: 'Android + iOS',
      icon: <Smartphone className="w-8 h-8 text-purple-400" />,
      description: 'Stunning cross-platform mobile apps for Android and iOS using modern hybrid development stacks.',
      bullets: [
        'React Native / Flutter architectures',
        'Offline-first and fast state databases',
        'Push notifications & Real-time storage',
        'Play Store & App Store deployments',
      ],
      tag: '⚡ Highly Requested',
      glowClass: 'glow-purple',
      topStripe: 'group-hover:via-purple-500',
      borderColor: 'group-hover:border-purple-500/40'
    },
    {
      title: 'UI/UX + Branding',
      subtitle: 'Logo se full design',
      icon: <Palette className="w-8 h-8 text-pink-400" />,
      description: 'Elegant interfaces designed for extreme ease of use and aesthetic impact. Complete visual assets.',
      bullets: [
        'Modern Figma UX Wireframes',
        'Sleek Logo and Brand Guidelines',
        'Interactive Mockups & Prototypes',
        'Custom Vector graphics & UI Assets',
      ],
      tag: '🎨 Clean Aesthetic',
      glowClass: 'glow-pink',
      topStripe: 'group-hover:via-pink-500',
      borderColor: 'group-hover:border-pink-500/40'
    }
  ];

  return (
    <div id="services-section" className="py-20 bg-slate-950/40 border-y border-slate-900 relative">
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl -z-10 animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-electric-blue bg-electric-blue/10 px-3 py-1 rounded-full border border-electric-blue/20">
            What We Offer
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-4">
            Professional Tech Services
          </h2>
          <p className="text-sm text-slate-400 mt-3">
            Pure code, high performance, clean visual layouts — structured strictly for modern business growth.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              whileHover={{ y: -6 }}
              className={`bg-[#0b1329]/30 backdrop-blur-md border border-white/5 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative group overflow-hidden cursor-default will-change-gpu glow-card ${service.glowClass} ${service.borderColor}`}
            >
              {/* Card top stripe decoration */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-800 to-transparent ${service.topStripe} transition-all duration-500`} />

              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-850 group-hover:scale-105 group-hover:rotate-6 transition-all duration-305">
                    {service.icon}
                  </div>
                  <span className="text-[10px] font-mono bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full text-slate-400 font-bold uppercase tracking-wider">
                    {service.tag}
                  </span>
                </div>

                <h3 className="text-xl font-display font-extrabold text-white group-hover:text-white transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-xs text-electric-blue font-bold tracking-wide mt-1 font-mono uppercase">
                  {service.subtitle}
                </p>

                <p className="text-slate-450 text-xs leading-relaxed mt-4">
                  {service.description}
                </p>

                {/* Bullets */}
                <ul className="mt-6 space-y-2.5">
                  {service.bullets.map((bullet, bulletIndex) => (
                    <motion.li 
                      key={bullet} 
                      initial={{ opacity: 0, x: -5 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (index * 0.1) + (bulletIndex * 0.05) }}
                      className="flex items-start gap-2.5 text-xs text-slate-350"
                    >
                      <CheckCircle2 className="w-4 h-4 text-electric-blue shrink-0 mt-0.5 group-hover:scale-110 transition-all duration-350" />
                      <span>{bullet}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Footer inside card */}
              <div className="mt-8 pt-6 border-t border-slate-900/60 flex items-center justify-between">
                <span className="text-[9px] font-mono text-slate-500">SERVICE // 0{index + 1}</span>
                <span className="text-xs font-semibold text-white group-hover:text-electric-blue flex items-center gap-1 transition-colors cursor-pointer">
                  Submit Idea
                  <Zap className="w-3.5 h-3.5 text-electric-blue animate-bounce" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quality Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-gradient-to-r from-[#0b1329] to-[#080d1e] border border-slate-850 hover:border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-center gap-6 shadow-xl transition-all duration-300"
        >
          <div className="flex gap-4 items-center text-left">
            <div className="p-3 rounded-2xl bg-electric-blue/10 border border-electric-blue/20 text-electric-blue animate-pulse">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-base font-extrabold text-white">100% Client Satisfaction Guarantee</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Har project complete code control, security auditing, and premium design system guidelines ke sath deliver hoga.
              </p>
            </div>
          </div>
          <motion.button
            type="button"
            whileHover={{ scale: 1.03, boxShadow: '0 0 15px rgba(0, 240, 255, 0.2)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              const element = document.getElementById('project-idea-form-section');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3.5 bg-slate-900 hover:bg-slate-850 text-slate-200 hover:text-white border border-slate-800 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shrink-0 cursor-pointer"
          >
            Project Detail Form Fill Karein
          </motion.button>
        </motion.div>

      </div>
    </div>
  );
}
