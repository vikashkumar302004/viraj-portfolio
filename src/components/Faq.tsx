import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, MessageCircleQuestion } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FaqItem[] = [
    {
      q: "Standard delivery timeline kya hai?",
      a: "Landing pages aur simple portfolios 1-2 weeks me deliver ho jati hain. Complex mobile applications aur multi-page e-commerce systems me standard 3-5 weeks lagte hain. Main pure visual craft ke sath, daily status updates WhatsApp par share karta hu."
    },
    {
      q: "Dynamic colors and live preview box kaise kaam karta hai?",
      a: "Aap niche project form me apna custom brand color select kijiye, and dynamic CSS overrides instantly side visual screen me reflect ho jayengi. Aap live verify kar sakte hain ki aapka landing layout kis theme scheme me load hoga!"
    },
    {
      q: "Hosting, domains aur deployment setup me assistance milegi?",
      a: "Haan, bilkul! Custom domain configure karna, hosting setups, firebase triggers integrate karna, aur Android Play Store / iOS App Store ke credentials optimize karke product ko live launch main khud deliver karke hand-over karta hu."
    },
    {
      q: "Coding and styling stack kya use karte ho?",
      a: "Main core web layouts ke liye React, NextJS, TypeScript aur Tailwind CSS v4 use karta hu. Mobile app hybrid architectures React Native aur Expo se scale karta hu. Solid code standards compile karta hu, zero boilerplate templates."
    }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(prev => prev === index ? null : index);
  };

  return (
    <div id="faq-section" className="py-20 relative overflow-hidden">
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-electric-blue/5 rounded-full blur-3xl -z-10 animate-pulse-glow" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-electric-blue bg-electric-blue/10 px-3 py-1 rounded-full border border-electric-blue/20 flex items-center gap-1.5 w-fit mx-auto">
            <MessageCircleQuestion className="w-3.5 h-3.5" />
            Apke Sawaal, Mere Jawaab
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-4">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-400 mt-3">
            Standard workflow, code integrations, aur payments guidelines ke clear detail answers.
          </p>
        </motion.div>

        {/* FAQ Accordion Grid */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-[#0b1329]/30 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/10 will-change-gpu"
              >
                <button
                  type="button"
                  onClick={() => handleToggle(index)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3 text-slate-200">
                    <HelpCircle className={`w-4 h-4 shrink-0 transition-colors duration-250 ${isOpen ? 'text-electric-blue' : 'text-slate-500'}`} />
                    <span className="text-sm sm:text-base font-semibold leading-relaxed">{faq.q}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-electric-blue' : ''}`} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 pb-6 pt-1 border-t border-white/5">
                        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-sans">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
