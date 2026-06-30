import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smartphone, Monitor, Palette, Sparkles, ShoppingBag, ShoppingCart, Star, 
  Search, Check, DollarSign, Wallet, Settings, Home, Bell, User, CheckCircle2, 
  TrendingUp, ArrowRight, Laptop, HelpCircle, Heart, Tag, Send
} from 'lucide-react';

interface InteractivePreviewProps {
  brandColor: string;
  projectName: string;
  projectType: string;
}

type TemplateType = 'saas' | 'ecommerce' | 'portfolio' | 'mobile_app';

export default function InteractivePreview({ brandColor, projectName, projectType }: InteractivePreviewProps) {
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [activeTemplate, setActiveTemplate] = useState<TemplateType>('saas');
  
  // Clean default text if user hasn't typed anything
  const displayName = projectName.trim() || "Aapka Brand Name";
  
  // Sync layout type with form project selection
  useEffect(() => {
    if (projectType === 'mobile_app') {
      setActiveTemplate('mobile_app');
      setDevice('mobile');
    } else if (projectType === 'ui_ux_branding') {
      setActiveTemplate('portfolio');
      setDevice('desktop');
    } else if (projectType === 'website') {
      setActiveTemplate('saas');
      setDevice('desktop');
    } else {
      setActiveTemplate('saas');
      setDevice('desktop');
    }
  }, [projectType]);

  // Determine text color for contrast (black or white)
  const getContrastColor = (hex: string) => {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#0f172a' : '#ffffff';
  };

  const contrastColor = getContrastColor(brandColor);

  // --- SaaS State Variables ---
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  // --- E-Commerce State Variables ---
  const [cartCount, setCartCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCartPopping, setIsCartPopping] = useState(false);

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
    setIsCartPopping(true);
    setTimeout(() => setIsCartPopping(false), 350);
  };

  // --- Portfolio State Variables ---
  const [likedCount, setLikedCount] = useState(128);
  const [hasLiked, setHasLiked] = useState(false);
  const [portfolioInput, setPortfolioInput] = useState('');
  const [portfolioFeedback, setPortfolioFeedback] = useState(false);

  const handleLike = () => {
    if (hasLiked) {
      setLikedCount(prev => prev - 1);
    } else {
      setLikedCount(prev => prev + 1);
    }
    setHasLiked(!hasLiked);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!portfolioInput.trim()) return;
    setPortfolioFeedback(true);
    setPortfolioInput('');
    setTimeout(() => setPortfolioFeedback(false), 3000);
  };

  // --- Mobile App State Variables ---
  const [mobileTab, setMobileTab] = useState<'home' | 'wallet' | 'profile'>('home');

  return (
    <div id="interactive-preview-container" className="bg-[#0b1329]/80 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-2xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-electric-blue/5 rounded-full blur-2xl pointer-events-none" />
      
      {/* Title & Device Switcher */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-5 border-b border-slate-800/60">
        <div>
          <h4 className="text-lg font-display font-semibold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-electric-blue animate-pulse" />
            Live Website Theme Preview
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            "Aapki website is theme me lagegi"
          </p>
        </div>
        
        {/* Device toggle */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-850 self-end sm:self-auto shadow-inner">
          <button
            type="button"
            onClick={() => setDevice('desktop')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
              device === 'desktop'
                ? 'bg-electric-blue/15 text-electric-blue border border-electric-blue/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            Desktop
          </button>
          <button
            type="button"
            onClick={() => setDevice('mobile')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
              device === 'mobile'
                ? 'bg-electric-blue/15 text-electric-blue border border-electric-blue/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Mobile
          </button>
        </div>
      </div>

      {/* Template Preset Selector (Tabs) */}
      <div className="flex flex-wrap gap-2 mb-6 bg-slate-950 p-1.5 rounded-2xl border border-slate-850 justify-between items-center">
        {(['saas', 'ecommerce', 'portfolio', 'mobile_app'] as TemplateType[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => {
              setActiveTemplate(t);
              if (t === 'mobile_app') setDevice('mobile');
            }}
            className={`flex-1 min-w-[70px] px-2.5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer text-center ${
              activeTemplate === t
                ? 'bg-slate-900 text-white shadow-md border border-slate-800'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {t === 'saas' && '🚀 SaaS'}
            {t === 'ecommerce' && '🛒 Store'}
            {t === 'portfolio' && '🎨 Portfolio'}
            {t === 'mobile_app' && '📱 App'}
          </button>
        ))}
      </div>

      {/* Outer Browser/Device Frame Header */}
      <div className="w-full flex justify-between items-center py-3 bg-slate-950/90 rounded-t-2xl border-x border-t border-slate-800/80 px-4 relative">
        <div className="flex gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <div className="text-[10px] font-mono text-slate-500 bg-slate-900/50 px-6 py-0.5 rounded border border-slate-800/50 max-w-[200px] sm:max-w-xs truncate mx-auto">
          {activeTemplate === 'mobile_app' 
            ? `app.${displayName.toLowerCase().replace(/\s+/g, '')}.com`
            : `preview.${displayName.toLowerCase().replace(/\s+/g, '-')}.com`
          }
        </div>
        <div className="w-12" /> {/* spacer for center alignment */}
      </div>

      {/* Simulated Stage */}
      <div className="bg-slate-950 px-2 py-4 sm:p-4 rounded-b-2xl border-x border-b border-slate-850 min-h-[460px] flex justify-center items-center transition-all duration-300">
        <div
          style={{ width: device === 'desktop' ? '100%' : '300px' }}
          className="bg-[#070c18] rounded-xl border border-slate-850 shadow-2xl overflow-hidden text-left font-sans transition-all duration-300 flex flex-col min-h-[420px] will-change-gpu"
        >
          {/* =======================================
              1. SAAS BUSINESS TEMPLATE
              ======================================= */}
          {activeTemplate === 'saas' && (
            <div className="flex flex-col flex-grow">
              {/* SaaS Navbar */}
              <div className="border-b border-slate-900 bg-[#070c18] px-4 py-2.5 flex justify-between items-center">
                <span className="font-display font-bold text-xs text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: brandColor }} />
                  {displayName}
                </span>
                <div className="flex gap-3 text-[9px] text-slate-400 items-center font-mono">
                  <span>Features</span>
                  <span>Pricing</span>
                  <span className="px-2 py-1 rounded text-[8px] font-semibold cursor-default" style={{ backgroundColor: brandColor, color: contrastColor }}>
                    Sign Up
                  </span>
                </div>
              </div>

              {/* SaaS Hero Body */}
              <div className="px-4 py-8 text-center relative overflow-hidden bg-gradient-to-b from-slate-900/30 to-[#070c18] flex-grow flex flex-col justify-center">
                <div 
                  className="absolute inset-0 opacity-15 blur-3xl pointer-events-none rounded-full"
                  style={{ background: `radial-gradient(circle, ${brandColor} 0%, transparent 70%)` }}
                />
                
                <span 
                  className="inline-block text-[8px] uppercase tracking-widest px-2.5 py-0.5 rounded-full font-mono font-bold mb-3 border"
                  style={{ borderColor: `${brandColor}40`, color: brandColor, backgroundColor: `${brandColor}10` }}
                >
                  🚀 Next Generation SaaS Product
                </span>
                
                <h5 className="text-sm sm:text-base font-display font-black text-white leading-tight">
                  Automate Workflows With <span style={{ color: brandColor }}>{displayName}</span>
                </h5>
                <p className="text-[10px] text-slate-400 mt-2 max-w-xs mx-auto leading-relaxed">
                  The ultimate SaaS dashboard built to control your analytics, pipeline storage, and teams.
                </p>

                {/* SaaS pricing billing toggle */}
                <div className="flex items-center justify-center gap-2 mt-4">
                  <span className={`text-[9px] font-mono ${billingPeriod === 'monthly' ? 'text-white' : 'text-slate-500'}`}>Monthly</span>
                  <button
                    type="button"
                    onClick={() => setBillingPeriod(prev => prev === 'monthly' ? 'annual' : 'monthly')}
                    className="w-8 h-4 rounded-full bg-slate-900 border border-slate-800 p-0.5 relative transition-all duration-300"
                  >
                    <div 
                      className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                      style={{ 
                        backgroundColor: brandColor,
                        transform: billingPeriod === 'annual' ? 'translateX(16px)' : 'translateX(0px)'
                      }}
                    />
                  </button>
                  <span className={`text-[9px] font-mono ${billingPeriod === 'annual' ? 'text-white' : 'text-slate-500'}`}>
                    Annual <span className="text-[8px] font-semibold" style={{ color: brandColor }}>(Save 20%)</span>
                  </span>
                </div>

                {/* SaaS Pricing Cards */}
                <div className="grid grid-cols-2 gap-3 mt-5 text-left">
                  <div className="bg-[#0a1224] p-3 rounded-lg border border-slate-900 flex flex-col justify-between hover:border-slate-800 transition-colors">
                    <div>
                      <h6 className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Starter</h6>
                      <div className="mt-1 flex items-baseline gap-0.5">
                        <span className="text-sm font-extrabold text-white">
                          {billingPeriod === 'monthly' ? '$19' : '$15'}
                        </span>
                        <span className="text-[8px] text-slate-500">/mo</span>
                      </div>
                      <p className="text-[8px] text-slate-500 mt-1 leading-snug">Essential reporting and 1 pipeline channel.</p>
                    </div>
                    <button 
                      type="button"
                      className="w-full py-1 text-[8px] font-bold rounded mt-3 border transition-colors cursor-default text-center"
                      style={{ borderColor: `${brandColor}40`, color: brandColor }}
                    >
                      Get Started
                    </button>
                  </div>

                  <div 
                    className="bg-[#0a1224] p-3 rounded-lg border flex flex-col justify-between relative overflow-hidden"
                    style={{ borderColor: `${brandColor}40` }}
                  >
                    <div className="absolute top-0 right-0 px-1.5 py-0.5 text-[6px] font-bold uppercase tracking-wider text-slate-950" style={{ backgroundColor: brandColor }}>
                      POPULAR
                    </div>
                    <div>
                      <h6 className="text-[9px] font-bold uppercase tracking-wider text-white">Professional</h6>
                      <div className="mt-1 flex items-baseline gap-0.5">
                        <span className="text-sm font-extrabold text-white">
                          {billingPeriod === 'monthly' ? '$49' : '$39'}
                        </span>
                        <span className="text-[8px] text-slate-500">/mo</span>
                      </div>
                      <p className="text-[8px] text-slate-500 mt-1 leading-snug">Advanced automation, 10 team seats, API access.</p>
                    </div>
                    <button 
                      type="button"
                      className="w-full py-1 text-[8px] font-bold rounded mt-3 transition-colors cursor-default text-center"
                      style={{ backgroundColor: brandColor, color: contrastColor }}
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </div>

              {/* SaaS Metrics Footer */}
              <div className="border-t border-slate-900 bg-[#070c18] p-3 grid grid-cols-3 gap-2 text-center text-slate-400 font-mono text-[8px]">
                <div>
                  <p className="text-white font-bold text-[10px]" style={{ color: brandColor }}>10k+</p>
                  <p className="text-[7px]">Active Installs</p>
                </div>
                <div>
                  <p className="text-white font-bold text-[10px]" style={{ color: brandColor }}>99.9%</p>
                  <p className="text-[7px]">System Uptime</p>
                </div>
                <div>
                  <p className="text-white font-bold text-[10px]" style={{ color: brandColor }}>$5M+</p>
                  <p className="text-[7px]">Capital Saved</p>
                </div>
              </div>
            </div>
          )}

          {/* =======================================
              2. E-COMMERCE TEMPLATE
              ======================================= */}
          {activeTemplate === 'ecommerce' && (
            <div className="flex flex-col flex-grow">
              {/* E-comm Header */}
              <div className="border-b border-slate-900 bg-[#070c18] px-4 py-2.5 flex justify-between items-center">
                <span className="font-display font-bold text-xs text-white flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5" style={{ color: brandColor }} />
                  {displayName}
                </span>
                
                {/* Search Bar (Visual) */}
                <div className="relative hidden sm:block w-32">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-2.5 h-2.5 text-slate-600" />
                  <input
                    type="text"
                    disabled
                    placeholder="Search store..."
                    className="w-full bg-[#0a1224] border border-slate-900 text-[8px] rounded px-5 py-0.5 text-slate-400"
                  />
                </div>

                {/* Shopping Cart Icon (Interactive) */}
                <motion.div 
                  animate={isCartPopping ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative p-1.5 rounded-lg bg-slate-900 border border-slate-850 flex items-center"
                >
                  <ShoppingCart className="w-3.5 h-3.5 text-white" />
                  {cartCount > 0 && (
                    <span 
                      className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[8px] font-bold flex items-center justify-center border border-[#070c18]"
                      style={{ backgroundColor: brandColor, color: contrastColor }}
                    >
                      {cartCount}
                    </span>
                  )}
                </motion.div>
              </div>

              {/* Promo Banner */}
              <div 
                className="px-4 py-2 text-center text-[8px] font-mono font-bold tracking-wider"
                style={{ backgroundColor: `${brandColor}15`, color: brandColor }}
              >
                🎉 SUMMER FLASH SALE: USE CODE <span className="underline font-bold">VIRAJ17</span> FOR 20% OFF!
              </div>

              {/* Category Filter Badges */}
              <div className="px-3 pt-3 flex gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none">
                {['All', 'Gadgets', 'Apparel', 'Aesthetics'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2 py-0.5 rounded-md text-[8px] font-semibold border transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'border-white text-white'
                        : 'border-slate-900 text-slate-500 hover:text-slate-300'
                    }`}
                    style={selectedCategory === cat ? { backgroundColor: `${brandColor}20`, borderColor: brandColor, color: brandColor } : {}}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Products Grid */}
              <div className="p-3 grid grid-cols-2 gap-2.5 flex-grow">
                {[
                  { id: 1, name: 'Cyberpunk Headset', price: '$129', rating: 4.8, category: 'Gadgets', grad: 'from-blue-600 to-cyan-500' },
                  { id: 2, name: 'Minimalist Clock', price: '$45', rating: 4.6, category: 'Aesthetics', grad: 'from-purple-600 to-pink-500' },
                  { id: 3, name: 'Neon Studio Lamp', price: '$89', rating: 4.9, category: 'Aesthetics', grad: 'from-emerald-500 to-teal-600' },
                  { id: 4, name: 'Smart Tech Wallet', price: '$65', rating: 4.5, category: 'Gadgets', grad: 'from-orange-500 to-amber-500' },
                ]
                  .filter(p => selectedCategory === 'All' || p.category === selectedCategory)
                  .map((product) => (
                    <motion.div 
                      key={product.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="bg-[#0a1224] border border-slate-900 rounded-lg p-2 flex flex-col justify-between group hover:border-slate-800 transition-all duration-200 will-change-gpu"
                    >
                      {/* Product Image Placeholder */}
                      <div className={`w-full h-16 rounded bg-gradient-to-tr ${product.grad} relative overflow-hidden flex items-center justify-center opacity-70 group-hover:opacity-90 transition-opacity`}>
                        <div className="absolute inset-0 bg-[#070c18]/25" />
                        <Tag className="w-5 h-5 text-white/40" />
                      </div>

                      {/* Product details */}
                      <div className="mt-2 text-left">
                        <div className="flex justify-between items-center gap-1">
                          <h6 className="text-[8.5px] font-bold text-white truncate max-w-[70px]">{product.name}</h6>
                          <div className="flex items-center gap-0.5 shrink-0 text-amber-400">
                            <Star className="w-2 h-2 fill-amber-400" />
                            <span className="text-[7px] font-bold">{product.rating}</span>
                          </div>
                        </div>
                        <p className="text-[9px] font-mono font-bold text-slate-400 mt-0.5">{product.price}</p>
                      </div>

                      {/* Add to Cart Action */}
                      <button
                        type="button"
                        onClick={handleAddToCart}
                        className="w-full py-1 text-[8px] font-extrabold rounded mt-2 cursor-pointer transition-all active:scale-95 text-center"
                        style={{ backgroundColor: brandColor, color: contrastColor }}
                      >
                        Add to Cart
                      </button>
                    </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* =======================================
              3. CREATIVE PORTFOLIO TEMPLATE
              ======================================= */}
          {activeTemplate === 'portfolio' && (
            <div className="flex flex-col flex-grow">
              {/* Portfolio Header */}
              <div className="border-b border-slate-900 bg-[#070c18] px-4 py-2.5 flex justify-between items-center">
                <span className="font-display font-black text-xs text-white">
                  VB <span style={{ color: brandColor }}>Creative</span>
                </span>
                <span className="text-[8px] font-mono text-slate-500">AVAILABLE FOR HIRE</span>
              </div>

              {/* Bio block */}
              <div className="px-4 py-6 text-center bg-gradient-to-b from-[#0a1224] to-[#070c18] relative flex-grow flex flex-col justify-center">
                {/* Tech Glow Ring Avatar */}
                <div className="w-12 h-12 rounded-full mx-auto relative mb-3">
                  <div 
                    className="absolute inset-0 rounded-full animate-spin-slow p-0.5"
                    style={{ background: `linear-gradient(135deg, ${brandColor}, #a855f7, #ec4899)` }}
                  >
                    <div className="w-full h-full rounded-full bg-[#070c18]" />
                  </div>
                  <div className="absolute inset-1 rounded-full bg-slate-900 flex items-center justify-center font-display font-black text-[10px] text-white">
                    VB
                  </div>
                </div>

                <h5 className="text-xs text-slate-400 uppercase tracking-widest font-mono">Hi, I'm {displayName}</h5>
                <h4 className="text-sm font-display font-extrabold text-white mt-1.5">
                  I Build <span style={{ color: brandColor }}>High-Fidelity Apps</span> & Premium Websites
                </h4>

                {/* Skill pills with dynamic hover highlight */}
                <div className="flex flex-wrap gap-1 justify-center mt-3 max-w-xs mx-auto">
                  {['Framer', 'TypeScript', 'React Native', 'UI Design'].map((skill) => (
                    <span 
                      key={skill}
                      className="text-[7.5px] px-2 py-0.5 rounded bg-slate-900 border border-slate-850 text-slate-300 font-mono transition-colors duration-200 hover:text-white"
                      style={{ '--tg-color': brandColor } as React.CSSProperties}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = brandColor}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = '#1e293b'}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Interactive Like Counter Widget */}
                <div className="mt-4 flex justify-center">
                  <button
                    type="button"
                    onClick={handleLike}
                    className="px-3 py-1 rounded-full bg-slate-900 border border-slate-850 text-[8px] font-bold text-slate-400 flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
                  >
                    <Heart className={`w-2.5 h-2.5 ${hasLiked ? 'fill-red-500 text-red-500' : 'text-slate-500'}`} />
                    <span>Appreciations ({likedCount})</span>
                  </button>
                </div>

                {/* Simple Fast Contact Form */}
                <form onSubmit={handleContactSubmit} className="mt-5 max-w-xs mx-auto w-full relative">
                  {portfolioFeedback ? (
                    <div className="p-2 bg-green-500/10 border border-green-500/20 text-green-400 text-[8px] rounded-lg text-center flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Idea received! 24h me call karunga!</span>
                    </div>
                  ) : (
                    <div className="relative">
                      <input
                        type="text"
                        value={portfolioInput}
                        onChange={(e) => setPortfolioInput(e.target.value)}
                        placeholder="Project idea likhein..."
                        className="w-full bg-slate-950 border border-slate-900 text-[8px] rounded-lg pl-3 pr-8 py-2 text-white focus:outline-none focus:border-slate-700 placeholder-slate-700"
                        style={{ focusBorderColor: brandColor } as React.CSSProperties}
                      />
                      <button
                        type="submit"
                        className="absolute right-1 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white cursor-pointer"
                      >
                        <Send className="w-3 h-3" style={{ color: brandColor }} />
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          )}

          {/* =======================================
              4. MOBILE APPLICATION TEMPLATE
              ======================================= */}
          {activeTemplate === 'mobile_app' && (
            <div className="flex flex-col flex-grow relative bg-[#050914] min-h-[420px]">
              
              {/* Device Status Bar Notch Mockup */}
              <div className="bg-[#030712] px-3.5 py-1.5 flex justify-between items-center text-[7.5px] font-mono text-slate-400 select-none">
                <span>9:41 AM</span>
                <div className="w-14 h-3.5 bg-black rounded-b-md absolute left-1/2 -translate-x-1/2 top-0" />
                <div className="flex gap-1 items-center">
                  <span>5G</span>
                  <span className="w-3 h-1.5 bg-slate-500 rounded-sm relative">
                    <span className="absolute left-0 top-0 bottom-0 bg-green-400 rounded-sm" style={{ width: '80%' }} />
                  </span>
                </div>
              </div>

              {/* Mobile App View Frame Container */}
              <div className="flex-grow p-3 flex flex-col justify-between overflow-y-auto">
                
                <AnimatePresence mode="wait">
                  {/* APP SUB-SCREEN 1: HOME FEED */}
                  {mobileTab === 'home' && (
                    <motion.div
                      key="home"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3 text-left"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-[7px] text-slate-500 uppercase tracking-widest font-mono">Welcome back</p>
                          <h6 className="text-[11px] font-black text-white">{displayName}</h6>
                        </div>
                        <div className="relative p-1 rounded-full bg-slate-900 border border-slate-850">
                          <Bell className="w-3 h-3 text-slate-400" />
                          <span className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: brandColor }} />
                        </div>
                      </div>

                      {/* Promo Cards */}
                      <div className="p-3 rounded-xl text-left relative overflow-hidden" style={{ backgroundColor: `${brandColor}15`, border: `1px solid ${brandColor}25` }}>
                        <h6 className="text-[9px] font-bold text-white leading-tight">System Status: Clean Stack</h6>
                        <p className="text-[7.5px] text-slate-400 mt-1 leading-relaxed">
                          Your code has been audited. Zero leaks detected. Responsive templates active.
                        </p>
                      </div>

                      {/* Updates Feed */}
                      <h7 className="text-[8px] font-bold uppercase tracking-wider text-slate-500 font-mono block">Featured Feeds</h7>
                      
                      <div className="space-y-2">
                        {[
                          { title: 'Interactive Form Engine', desc: 'Realtime theme colors integration.', time: '2m ago' },
                          { title: 'Responsive Mobile UI', desc: 'Vite & Tailwind styling layout.', time: '1h ago' }
                        ].map((feed, idx) => (
                          <div key={idx} className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-850 flex justify-between items-start gap-2">
                            <div>
                              <p className="text-[8px] font-bold text-white">{feed.title}</p>
                              <p className="text-[7px] text-slate-400 mt-0.5">{feed.desc}</p>
                            </div>
                            <span className="text-[6.5px] text-slate-500 font-mono shrink-0">{feed.time}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* APP SUB-SCREEN 2: WALLET/PAYMENTS */}
                  {mobileTab === 'wallet' && (
                    <motion.div
                      key="wallet"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3 text-left"
                    >
                      <h6 className="text-[11px] font-black text-white">Interactive Wallet</h6>

                      {/* Credit Card Graphic styled with brand colors */}
                      <div 
                        className="p-3.5 rounded-2xl relative overflow-hidden shadow-lg flex flex-col justify-between min-h-[90px]"
                        style={{ 
                          background: `linear-gradient(135deg, #0b1329 0%, ${brandColor}40 100%)`,
                          border: `1px solid ${brandColor}20` 
                        }}
                      >
                        <div className="flex justify-between items-start">
                          <Wallet className="w-4 h-4 text-white" style={{ color: brandColor }} />
                          <span className="text-[7px] font-mono text-slate-400 font-bold uppercase tracking-wider">Debit Card</span>
                        </div>
                        <div className="mt-4">
                          <p className="text-[7px] text-slate-400 uppercase tracking-widest font-mono">Current Balance</p>
                          <p className="text-sm font-extrabold text-white mt-0.5">$14,285.90</p>
                        </div>
                        <div className="flex justify-between items-center text-[7px] font-mono text-slate-300 mt-1">
                          <span>**** **** **** 1717</span>
                          <span>12 / 29</span>
                        </div>
                      </div>

                      {/* Interactive Visual Graph representation using SVG */}
                      <div className="bg-[#0a1224] p-3 rounded-xl border border-slate-900">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[7.5px] font-bold text-slate-400">Weekly Analytics</span>
                          <span className="text-[7px] font-mono text-emerald-400 flex items-center gap-0.5">
                            <TrendingUp className="w-2.5 h-2.5" />
                            +12.4%
                          </span>
                        </div>
                        {/* Mini SVG Chart line */}
                        <svg className="w-full h-10 overflow-visible" viewBox="0 0 100 30">
                          <path
                            d="M0,25 Q15,10 30,22 T60,5 T90,18 T100,10"
                            fill="none"
                            stroke={brandColor}
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M0,25 Q15,10 30,22 T60,5 T90,18 T100,10 L100,30 L0,30 Z"
                            fill={`url(#grad-${brandColor.replace('#', '')})`}
                          />
                          <defs>
                            <linearGradient id={`grad-${brandColor.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={brandColor} stopOpacity="0.3"/>
                              <stop offset="100%" stopColor={brandColor} stopOpacity="0"/>
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </motion.div>
                  )}

                  {/* APP SUB-SCREEN 3: PROFILE SETTINGS */}
                  {mobileTab === 'profile' && (
                    <motion.div
                      key="profile"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3 text-left"
                    >
                      <div className="flex items-center gap-3 bg-slate-900/40 p-3 rounded-xl border border-slate-900">
                        <div className="w-8 h-8 rounded-full bg-slate-950 flex items-center justify-center border border-slate-800 text-[10px] text-slate-400 font-bold">
                          VB
                        </div>
                        <div>
                          <h6 className="text-[9.5px] font-bold text-white">Viraj Bakale</h6>
                          <p className="text-[7.5px] text-slate-500 font-mono">ID: VB_2009_KARAD</p>
                        </div>
                      </div>

                      {/* Profile list settings options */}
                      <div className="bg-slate-900/60 rounded-xl border border-slate-850 overflow-hidden divide-y divide-slate-850">
                        {[
                          { title: 'Aesthetic Settings', icon: <Palette className="w-3 h-3 text-slate-400" /> },
                          { title: 'Security Passcode', icon: <User className="w-3 h-3 text-slate-400" /> },
                          { title: 'Support & Docs', icon: <HelpCircle className="w-3 h-3 text-slate-400" /> }
                        ].map((opt, idx) => (
                          <div key={idx} className="flex justify-between items-center p-2.5 text-[8px] hover:bg-slate-900/30 transition-colors">
                            <div className="flex items-center gap-2">
                              {opt.icon}
                              <span className="text-slate-300 font-semibold">{opt.title}</span>
                            </div>
                            <ArrowRight className="w-2.5 h-2.5 text-slate-600" />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom App Navigation Tab Bar */}
                <div className="border-t border-slate-900 pt-2.5 mt-3 flex justify-between items-center bg-[#050914] px-2">
                  {[
                    { id: 'home' as const, label: 'Home', icon: <Home className="w-3.5 h-3.5" /> },
                    { id: 'wallet' as const, label: 'Wallet', icon: <Wallet className="w-3.5 h-3.5" /> },
                    { id: 'profile' as const, label: 'Profile', icon: <User className="w-3.5 h-3.5" /> }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setMobileTab(tab.id)}
                      className="flex flex-col items-center gap-1 cursor-pointer transition-all active:scale-95"
                    >
                      <div 
                        className="transition-colors duration-200"
                        style={{ color: mobileTab === tab.id ? brandColor : '#64748b' }}
                      >
                        {tab.icon}
                      </div>
                      <span 
                        className="text-[6.5px] font-mono font-bold tracking-wide uppercase transition-colors"
                        style={{ color: mobileTab === tab.id ? brandColor : '#64748b' }}
                      >
                        {tab.label}
                      </span>
                    </button>
                  ))}
                </div>

              </div>

            </div>
          )}
        </div>
      </div>

      {/* Explainer card under preview */}
      <div className="mt-4 bg-slate-950 p-3.5 rounded-xl border border-slate-850 flex gap-3 items-center">
        <div className="p-2.5 rounded-xl bg-electric-blue/10 border border-electric-blue/20 shrink-0">
          <Palette className="w-5 h-5 text-electric-blue" />
        </div>
        <div>
          <p className="text-xs font-semibold text-white">Aapki custom theme active hai!</p>
          <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
            Viraj aapki website ko bilkul isi brand color scheme (<span className="font-mono text-electric-blue font-bold" style={{ color: brandColor }}>{brandColor}</span>) me high-quality coding se deliver karega.
          </p>
        </div>
      </div>
    </div>
  );
}
