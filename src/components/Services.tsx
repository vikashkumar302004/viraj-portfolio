import React from 'react';
import { motion } from 'motion/react';
import { 
  Monitor, 
  Smartphone, 
  Palette, 
  Globe, 
  Code, 
  Server, 
  CreditCard, 
  PenTool, 
  Sparkles, 
  Package, 
  Video, 
  FileText, 
  MapPin, 
  TrendingUp, 
  Share2, 
  Megaphone, 
  Target, 
  ShieldCheck, 
  Zap 
} from 'lucide-react';

export default function Services() {
  const categories = [
    {
      name: 'Software & Apps',
      icon: <Code className="w-6 h-6 text-electric-blue" />,
      glowClass: 'glow-blue',
      topStripe: 'group-hover:via-electric-blue',
      borderColor: 'group-hover:border-electric-blue/40',
      items: [
        { 
          title: 'Website Development', 
          icon: <Globe className="w-5 h-5 text-electric-blue" />, 
          desc: 'Custom, fast, SEO-friendly websites & landing pages built from scratch.' 
        },
        { 
          title: 'App Development (Android/iOS)', 
          icon: <Smartphone className="w-5 h-5 text-purple-400" />, 
          desc: 'High-performance cross-platform mobile apps for Android & iOS.' 
        },
        { 
          title: 'Custom Software Development', 
          icon: <Monitor className="w-5 h-5 text-pink-400" />, 
          desc: 'Bespoke web applications, dashboards, and automated business tools.' 
        },
      ]
    },
    {
      name: 'Integration & Cloud',
      icon: <Server className="w-6 h-6 text-emerald-400" />,
      glowClass: 'glow-green',
      topStripe: 'group-hover:via-emerald-500',
      borderColor: 'group-hover:border-emerald-500/40',
      items: [
        { 
          title: 'Domain & Hosting Setup', 
          icon: <Server className="w-5 h-5 text-emerald-400" />, 
          desc: 'Secure cloud hosting, domain configuration, and SSL setups.' 
        },
        { 
          title: 'Payment Gateway Integration', 
          icon: <CreditCard className="w-5 h-5 text-yellow-400" />, 
          desc: 'Razorpay, Stripe, and custom checkout flows for smooth payments.' 
        },
        { 
          title: 'Google Business Profile Setup', 
          icon: <MapPin className="w-5 h-5 text-electric-blue" />, 
          desc: 'Local business listing optimization to rank higher on Google Maps.' 
        },
      ]
    },
    {
      name: 'UI/UX & Brand Design',
      icon: <Palette className="w-6 h-6 text-pink-400" />,
      glowClass: 'glow-pink',
      topStripe: 'group-hover:via-pink-500',
      borderColor: 'group-hover:border-pink-500/40',
      items: [
        { 
          title: 'UI/UX Design', 
          icon: <Palette className="w-5 h-5 text-pink-400" />, 
          desc: 'Modern wireframes and high-fidelity interactive user interfaces.' 
        },
        { 
          title: 'Logo Design', 
          icon: <PenTool className="w-5 h-5 text-electric-blue" />, 
          desc: 'Unique, memorable logo marks that define your brand essence.' 
        },
        { 
          title: 'Brand Identity Design', 
          icon: <Sparkles className="w-5 h-5 text-purple-400" />, 
          desc: 'Cohesive fonts, color schemes, and visual design guidelines.' 
        },
      ]
    },
    {
      name: 'Media & Print Assets',
      icon: <Package className="w-6 h-6 text-yellow-400" />,
      glowClass: 'glow-yellow',
      topStripe: 'group-hover:via-yellow-500',
      borderColor: 'group-hover:border-yellow-500/40',
      items: [
        { 
          title: 'Video Editing', 
          icon: <Video className="w-5 h-5 text-purple-400" />, 
          desc: 'High-engaging Reels, YouTube videos, and brand ads.' 
        },
        { 
          title: 'Content Creation', 
          icon: <FileText className="w-5 h-5 text-pink-400" />, 
          desc: 'Strategic copywriting, articles, and engaging visual posts.' 
        },
        { 
          title: 'Business Card Design', 
          icon: <CreditCard className="w-5 h-5 text-emerald-400" />, 
          desc: 'Professional, print-ready corporate business cards.' 
        },
        { 
          title: 'Packaging Design', 
          icon: <Package className="w-5 h-5 text-yellow-400" />, 
          desc: 'Aesthetic product box designs and custom labels.' 
        },
      ]
    },
    {
      name: 'Marketing & SEO',
      icon: <Megaphone className="w-6 h-6 text-purple-400" />,
      glowClass: 'glow-purple',
      topStripe: 'group-hover:via-purple-500',
      borderColor: 'group-hover:border-purple-500/40',
      items: [
        { 
          title: 'SEO (Search Engine Optimization)', 
          icon: <TrendingUp className="w-5 h-5 text-electric-blue" />, 
          desc: 'On-page and technical SEO to boost your organic web search ranking.' 
        },
        { 
          title: 'Social Media Management', 
          icon: <Share2 className="w-5 h-5 text-purple-400" />, 
          desc: 'Growth strategies, scheduling, and community engagement.' 
        },
        { 
          title: 'Meta Ads Management', 
          icon: <Megaphone className="w-5 h-5 text-yellow-400" />, 
          desc: 'High-converting Facebook and Instagram paid ad campaigns.' 
        },
        { 
          title: 'Google Ads Management', 
          icon: <Target className="w-5 h-5 text-pink-400" />, 
          desc: 'Optimized search and display ads to generate qualified leads.' 
        },
      ]
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
            Professional Tech & Design Services
          </h2>
          <p className="text-sm text-slate-400 mt-3">
            Pure code, high performance, clean visual layouts — structured strictly for modern business growth.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="flex flex-wrap justify-center gap-8">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: catIndex * 0.08 }}
              whileHover={{ y: -6 }}
              className={`w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-[380px] bg-[#0b1329]/30 backdrop-blur-md border border-white/5 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative group overflow-hidden cursor-default will-change-gpu glow-card ${category.glowClass} ${category.borderColor}`}
            >
              {/* Card top stripe decoration */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-800 to-transparent ${category.topStripe} transition-all duration-500`} />

              <div>
                {/* Category Header */}
                <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-900/60">
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-850 group-hover:scale-105 group-hover:rotate-6 transition-all duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-display font-extrabold text-white">
                    {category.name}
                  </h3>
                </div>

                {/* Items List */}
                <div className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -5 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (catIndex * 0.05) + (itemIndex * 0.03) }}
                      className="p-3 bg-slate-950/50 hover:bg-slate-955 border border-slate-900/50 rounded-2xl flex items-start gap-3 transition-all duration-200 text-left"
                    >
                      <div className="p-2 bg-slate-900 border border-slate-850 rounded-xl shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold text-white group-hover:text-electric-blue transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 pt-4 border-t border-slate-900/60 flex items-center justify-between">
                <span className="text-[9px] font-mono text-slate-500">CATEGORY // 0{catIndex + 1}</span>
                <span 
                  onClick={() => {
                    const element = document.getElementById('project-idea-form-section');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs font-semibold text-white group-hover:text-electric-blue flex items-center gap-1 transition-colors cursor-pointer"
                >
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
