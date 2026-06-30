import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, CheckCircle, Smartphone, Globe, Palette, Mail, User, Shield, AlertCircle, Link, Calendar, MessageSquare, IndianRupee } from 'lucide-react';
import { ProjectType } from '../types';
import InteractivePreview from './InteractivePreview';

export default function ProjectForm() {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    email: '',
    projectType: 'website' as ProjectType,
    description: '',
    brandColor: '#00f0ff', // default electric blue
    referenceLink: '',
    budget: '₹15k - ₹35k',
    deadline: '2-4 weeks',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Determine text color for contrast (black or white)
  const getContrastColor = (hex: string) => {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#0f172a' : '#ffffff';
  };
  const contrastColor = getContrastColor(formData.brandColor);

  // Preset startup colors
  const colorPresets = [
    { name: 'Electric Blue', hex: '#00f0ff', shadow: 'rgba(0, 240, 255, 0.4)' },
    { name: 'Cyber Purple', hex: '#a855f7', shadow: 'rgba(168, 85, 247, 0.4)' },
    { name: 'Emerald Green', hex: '#10b981', shadow: 'rgba(16, 185, 129, 0.4)' },
    { name: 'Sunset Orange', hex: '#f97316', shadow: 'rgba(249, 115, 22, 0.4)' },
    { name: 'Hot Pink', hex: '#ec4899', shadow: 'rgba(236, 72, 153, 0.4)' },
    { name: 'Liquid Gold', hex: '#eab308', shadow: 'rgba(234, 179, 8, 0.4)' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleColorPreset = (hex: string) => {
    setFormData(prev => ({ ...prev, brandColor: hex }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name.trim()) return setErrorMessage('Please enter your name!');
    if (!formData.whatsapp.trim()) return setErrorMessage('WhatsApp number is required so I can contact you!');
    if (!formData.description.trim()) return setErrorMessage('Please describe your project idea!');

    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          whatsapp: formData.whatsapp.trim(),
          email: formData.email.trim(),
          projectType: formData.projectType,
          description: formData.description.trim(),
          brandColor: formData.brandColor,
          referenceLink: formData.referenceLink.trim(),
          budget: formData.budget,
          deadline: formData.deadline
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || `HTTP error ${response.status}`);
      }
      
      setIsSuccess(true);

      // Auto-redirect to Viraj's WhatsApp with prefilled project details!
      const projectLabels = {
        website: '💻 Website Development',
        mobile_app: '📱 Mobile App (Android/iOS)',
        ui_ux_branding: '🎨 UI/UX Design + Branding',
        custom: '⚙️ Custom Idea'
      };
      
      const pTypeLabel = projectLabels[formData.projectType] || formData.projectType;

      const messageText = `Hi Viraj! I have submitted a project request on your website. Here are the details:
- *Name:* ${formData.name.trim()}
- *WhatsApp:* ${formData.whatsapp.trim()}
- *Email:* ${formData.email.trim() || 'N/A'}
- *Project Type:* ${pTypeLabel}
- *Budget:* ${formData.budget}
- *Deadline:* ${formData.deadline}
- *Brand Color:* ${formData.brandColor}

*Project Idea:*
${formData.description.trim()}`;

      const whatsappUrl = `https://wa.me/917498516086?text=${encodeURIComponent(messageText)}`;
      
      // Open in a new tab
      window.open(whatsappUrl, '_blank');
      
      // Reset form but keep brandColor for visual sanity
      setFormData({
        name: '',
        whatsapp: '',
        email: '',
        projectType: 'website' as ProjectType,
        description: '',
        brandColor: formData.brandColor,
        referenceLink: '',
        budget: '₹15k - ₹35k',
        deadline: '2-4 weeks',
      });
    } catch (err: any) {
      console.error('Error submitting idea:', err);
      setErrorMessage(`Database Error: ${err.message || 'Connection failed'}. Please verify connection or contact on WhatsApp.`);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper helper to generate input style dynamically
  const getInputStyle = (fieldName: string) => {
    const isFocused = focusedField === fieldName;
    return {
      borderColor: isFocused ? formData.brandColor : '#1e293b',
      boxShadow: isFocused ? `0 0 16px -2px ${formData.brandColor}30` : 'none',
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
    };
  };

  return (
    <div id="project-idea-form-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Form Card */}
      <div className="lg:col-span-7 bg-[#0b1329]/80 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden transition-all duration-300">
        <div className="absolute top-0 left-0 w-full h-1.5 transition-all duration-300" style={{ backgroundColor: formData.brandColor }} />
        
        <div className="mb-6">
          <span 
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-300"
            style={{ 
              borderColor: `${formData.brandColor}30`, 
              color: formData.brandColor,
              backgroundColor: `${formData.brandColor}10` 
            }}
          >
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ color: formData.brandColor }} />
            Let's Start Something Big
          </span>
          <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-3">
            Submit Your Project Idea
          </h3>
          <p className="text-sm text-slate-400 mt-2">
            Submit your idea, and we will translate it into a live working application!
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Row 1: Name & WhatsApp */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2 text-left">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                style={getInputStyle('name')}
                placeholder="E.g. John Doe"
                required
                className="w-full bg-slate-950 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none placeholder-slate-650"
              />
            </div>
            <div className="space-y-2 text-left">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-slate-400" />
                WhatsApp Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('whatsapp')}
                onBlur={() => setFocusedField(null)}
                style={getInputStyle('whatsapp')}
                placeholder="E.g. +91 98765 43210"
                required
                className="w-full bg-slate-950 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none placeholder-slate-650"
              />
            </div>
          </div>

          {/* Row 2: Email & Project Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2 text-left">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                Email ID (Optional)
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                style={getInputStyle('email')}
                placeholder="rajesh@example.com"
                className="w-full bg-slate-950 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none placeholder-slate-650"
              />
            </div>
            <div className="space-y-2 text-left">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                Project Type <span className="text-red-500">*</span>
              </label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('projectType')}
                onBlur={() => setFocusedField(null)}
                style={getInputStyle('projectType')}
                className="w-full bg-slate-950 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none cursor-pointer"
              >
                <option value="website">💻 Website Development</option>
                <option value="mobile_app">📱 Mobile App (Android/iOS)</option>
                <option value="ui_ux_branding">🎨 UI/UX Design + Branding</option>
                <option value="custom">⚙️ Custom Idea</option>
              </select>
            </div>
          </div>

          {/* Brand Color Picker Section */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-900 space-y-3 text-left">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-slate-400" />
                Your Brand Color Choice (Updates Live Preview)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-450 font-mono font-bold" style={{ color: formData.brandColor }}>{formData.brandColor}</span>
                <input
                  type="color"
                  name="brandColor"
                  value={formData.brandColor}
                  onChange={handleInputChange}
                  className="w-8 h-8 rounded-lg border border-slate-800 cursor-pointer overflow-hidden bg-transparent"
                />
              </div>
            </div>
            
            {/* Color Presets */}
            <div className="flex flex-wrap gap-2">
              {colorPresets.map((preset) => {
                const isActive = formData.brandColor.toLowerCase() === preset.hex.toLowerCase();
                return (
                  <motion.button
                    type="button"
                    key={preset.hex}
                    onClick={() => handleColorPreset(preset.hex)}
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 border cursor-pointer ${
                      isActive
                        ? 'bg-slate-900 text-white border-white/20'
                        : 'bg-slate-950 hover:bg-slate-900 border-slate-900 text-slate-400'
                    }`}
                    style={{ 
                      boxShadow: isActive ? `0 0 20px -3px ${preset.hex}60` : 'none',
                      borderColor: isActive ? preset.hex : undefined
                    }}
                  >
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: preset.hex }} />
                    {preset.name}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Describe Idea */}
          <div className="space-y-2 text-left">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
              Describe Your Idea <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              onFocus={() => setFocusedField('description')}
              onBlur={() => setFocusedField(null)}
              style={getInputStyle('description')}
              rows={4}
              placeholder="What is your website or app about? What features do you need? Explain in detail..."
              required
              className="w-full bg-slate-950 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none placeholder-slate-650 resize-none"
            />
          </div>

          {/* Reference Link */}
          <div className="space-y-2 text-left">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Link className="w-3.5 h-3.5 text-slate-400" />
              Reference Link (Optional)
            </label>
            <input
              type="url"
              name="referenceLink"
              value={formData.referenceLink}
              onChange={handleInputChange}
              onFocus={() => setFocusedField('referenceLink')}
              onBlur={() => setFocusedField(null)}
              style={getInputStyle('referenceLink')}
              placeholder="https://example.com/inspiration"
              className="w-full bg-slate-950 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none placeholder-slate-650"
            />
          </div>

          {/* Row 4: Budget & Deadline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2 text-left">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <IndianRupee className="w-3.5 h-3.5 text-slate-400" />
                Budget Estimate
              </label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('budget')}
                onBlur={() => setFocusedField(null)}
                style={getInputStyle('budget')}
                className="w-full bg-slate-950 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none cursor-pointer"
              >
                <option value="₹5k - ₹15k">₹5k - ₹15k (Mini Website / Logo)</option>
                <option value="₹15k - ₹35k">₹15k - ₹35k (Startup Landing Page / Portal)</option>
                <option value="₹35k - ₹75k">₹35k - ₹75k (Full Stack Website / E-commerce)</option>
                <option value="₹75k+">₹75k+ (Custom App / Enterprise Portal)</option>
                <option value="Flexible">Flexible (We will discuss later)</option>
              </select>
            </div>
            <div className="space-y-2 text-left">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Deadline Required
              </label>
              <select
                name="deadline"
                value={formData.deadline}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('deadline')}
                onBlur={() => setFocusedField(null)}
                style={getInputStyle('deadline')}
                className="w-full bg-slate-950 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none cursor-pointer"
              >
                <option value="< 1 week">🔴 Urgent (&lt; 1 Week)</option>
                <option value="2-4 weeks">⚡ Standard (2-4 Weeks)</option>
                <option value="1 month">📅 Relaxed (1 Month)</option>
                <option value="No Rush">🍀 No Rush (We will discuss later)</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02, boxShadow: `0 10px 25px -5px ${formData.brandColor}50` }}
            whileTap={{ scale: 0.98 }}
            className="w-full text-sm font-semibold py-4 rounded-xl cursor-pointer flex justify-center items-center gap-2 text-slate-950 disabled:opacity-50 font-display font-bold shadow-lg transition-all duration-300"
            style={{ backgroundColor: formData.brandColor, color: contrastColor }}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24" style={{ color: contrastColor }}>
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Submitting Idea...
              </span>
            ) : (
              <>
                Submit Your Project Idea
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </form>

        {/* Dynamic Success Modal / Area */}
        <AnimatePresence>
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 bg-[#070c18] backdrop-blur-md flex flex-col justify-center items-center text-center p-6 z-10"
            >
              <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h4 className="text-2xl font-display font-extrabold text-white">
                Thank You, Lead Saved!
              </h4>
              <p className="text-sm text-slate-350 mt-3 max-w-sm font-medium">
                "Thank you! I will get in touch within 24 hours."
              </p>
              <p className="text-xs text-slate-450 mt-2 max-w-xs leading-relaxed">
                Your project idea has been submitted to Viraj Ventures' secure admin panel. Viraj will contact you directly on WhatsApp.
              </p>
              
              <div className="mt-8 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="px-5 py-3 rounded-xl border border-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-900 transition-all duration-205 cursor-pointer"
                >
                  Submit Another Idea
                </button>
                <a
                  href="https://wa.me/917498516086"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all duration-205 hover:opacity-90 shadow-md"
                  style={{ backgroundColor: formData.brandColor, color: contrastColor }}
                >
                  Direct WhatsApp Chat
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Live Preview Box Card */}
      <div className="lg:col-span-5 h-full lg:sticky lg:top-24">
        <InteractivePreview
          brandColor={formData.brandColor}
          projectName={formData.name || "Aapka Brand Name"}
          projectType={formData.projectType}
        />
      </div>
    </div>
  );
}
