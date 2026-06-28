import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, Instagram, MapPin, User, Calendar, MessageSquare, Award, ArrowRight } from 'lucide-react';

export default function AboutMe() {
  const socialLinks = [
    {
      name: 'Call / WhatsApp',
      value: '7498516086',
      icon: <Phone className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />,
      href: 'https://wa.me/917498516086',
      color: 'hover:border-emerald-500/40 hover:bg-emerald-500/5 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]',
    },
    {
      name: 'Email Address',
      value: 'virajbakale2009@gmail.com',
      icon: <Mail className="w-5 h-5 text-electric-blue group-hover:scale-110 transition-transform" />,
      href: 'mailto:virajbakale2009@gmail.com',
      color: 'hover:border-electric-blue/40 hover:bg-electric-blue/5 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)]',
    },
    {
      name: 'Instagram Handle',
      value: '@Viraj_notifyall',
      icon: <Instagram className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform" />,
      href: 'https://instagram.com/Viraj_notifyall',
      color: 'hover:border-pink-500/40 hover:bg-pink-500/5 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)]',
    },
  ];

  return (
    <div id="about-section" className="py-20 relative overflow-hidden">
      {/* Dynamic light sources */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-electric-blue/5 rounded-full blur-3xl -z-10 animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-electric-blue bg-electric-blue/10 px-3 py-1 rounded-full border border-electric-blue/20">
            About The Founder
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-4">
            Meet Viraj Bakale
          </h2>
          <p className="text-sm text-slate-400 mt-3">
            Passionate developer turning raw startup visions into polished visual products.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Bio Column */}
          <motion.div 
            className="lg:col-span-6 space-y-6 text-left"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white">
              The Tech Mindset of Karad 🚀
            </h3>
            
            <p className="text-slate-300 leading-relaxed text-sm">
              My name is <strong>Viraj Bakale</strong>. I am a 17-year-old developer from <strong>Karad, Maharashtra</strong>. By combining coding with modern design aesthetics, I build high-quality websites, customized landing pages, and responsive mobile applications.
            </p>

            <p className="text-slate-450 leading-relaxed text-sm">
              My primary objective is to elevate the business workflows of startups, creators, and business owners through solid digital design guidelines. I don't copy simple templates; instead, I deliver pure craftsmanship and high-performance custom code.
            </p>

            {/* Structured bio bullet facts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <motion.div 
                whileHover={{ y: -4, borderColor: "rgba(0, 240, 255, 0.3)" }}
                className="bg-slate-950 p-4 rounded-xl border border-slate-900 flex items-start gap-3 transition-all duration-200 will-change-gpu"
              >
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-electric-blue shrink-0">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Full Name</h4>
                  <p className="text-sm font-semibold text-white mt-1">Viraj Bakale</p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -4, borderColor: "rgba(168, 85, 247, 0.3)" }}
                className="bg-slate-950 p-4 rounded-xl border border-slate-900 flex items-start gap-3 transition-all duration-200 will-change-gpu"
              >
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-purple-400 shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Age Bracket</h4>
                  <p className="text-sm font-semibold text-white mt-1">17 Years (Born 2009)</p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -4, borderColor: "rgba(239, 68, 68, 0.3)" }}
                className="bg-slate-950 p-4 rounded-xl border border-slate-900 flex items-start gap-3 transition-all duration-200 will-change-gpu"
              >
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-red-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Origins</h4>
                  <p className="text-sm font-semibold text-white mt-1">Karad, Maharashtra</p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -4, borderColor: "rgba(236, 72, 153, 0.3)" }}
                className="bg-slate-950 p-4 rounded-xl border border-slate-900 flex items-start gap-3 transition-all duration-200 will-change-gpu"
              >
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-pink-400 shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Specialization</h4>
                  <p className="text-sm font-semibold text-white mt-1">SaaS & Landing Pages</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact coordinates section */}
          <motion.div 
            className="lg:col-span-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-[#0b1329]/50 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
              <h3 className="text-lg font-display font-semibold text-white">
                Direct Connect With Viraj
              </h3>
              <p className="text-xs text-slate-400">
                You can reach out to me directly through the channels below, or submit your details in the project idea form:
              </p>

              <div className="space-y-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    className={`flex items-center justify-between p-4 bg-slate-950 border border-slate-900 rounded-2xl transition-all duration-300 group cursor-pointer ${link.color}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-850 group-hover:scale-105 transition-transform duration-300">
                        {link.icon}
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">{link.name}</p>
                        <p className="text-sm font-bold text-white mt-0.5">{link.value}</p>
                      </div>
                    </div>
                    <div className="text-slate-600 group-hover:text-white transition-colors duration-250 pr-1">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.a>
                ))}
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-900 text-left">
                <p className="text-xs text-slate-400 italic leading-relaxed">
                  "Work ethic: I guarantee replying to potential client business ideas within 24 hours of form submission. Let's build your software product from scratch!"
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
