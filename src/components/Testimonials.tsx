import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  location: string;
  feedback: string;
  rating: number;
  avatarColor: string;
  service: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Rahul Mehta',
    role: 'Founder',
    company: 'Nexus SaaS',
    location: 'Mumbai',
    feedback: 'Viraj built our SaaS landing page in just 10 days. The design is absolutely premium, and the animations are fluid. Our conversion rate increased by 40% immediately after launching. Highly professional!',
    rating: 5,
    avatarColor: 'from-blue-500 to-indigo-600',
    service: '🌐 Website Development'
  },
  {
    id: 2,
    name: 'Sanjay Deshmukh',
    role: 'Managing Director',
    company: 'Deshmukh Logistics',
    location: 'Pune',
    feedback: 'I needed a custom dispatch tracking app for my logistics fleet. Other software agencies quoted lakhs. Viraj built a responsive custom dashboard that works flawlessly on mobile. Saved us a lot of time and money!',
    rating: 5,
    avatarColor: 'from-emerald-400 to-teal-600',
    service: '💻 Custom Software'
  },
  {
    id: 3,
    name: 'Emma Watson',
    role: 'Creative Director',
    company: 'Studio Bloom',
    location: 'London, UK',
    feedback: 'Viraj is a design genius! He created our entire brand identity, logo, and a stunning website. The glassmorphism elements and dark theme get compliments from all our clients. Absolutely brilliant!',
    rating: 5,
    avatarColor: 'from-pink-500 to-purple-600',
    service: '🎨 UI/UX & Brand Identity'
  },
  {
    id: 4,
    name: 'Anjali Patil',
    role: 'Co-Founder',
    company: 'Grocely App',
    location: 'Bangalore',
    feedback: 'Super fast delivery and extremely clean code! We needed a mobile app UI mockup and landing page. Viraj delivered responsive, pixel-perfect code. Our communication on WhatsApp was smooth and quick.',
    rating: 5,
    avatarColor: 'from-amber-400 to-orange-600',
    service: '📱 App Development'
  },
  {
    id: 5,
    name: 'Amit Verma',
    role: 'Owner',
    company: 'Verma Jewellers',
    location: 'Karad',
    feedback: 'Highly impressed! Viraj set up our Google Business Profile, optimized local SEO, and built a luxury jewelry web catalog. Our local walk-ins and phone calls increased dramatically in 2 months.',
    rating: 5,
    avatarColor: 'from-cyan-400 to-blue-600',
    service: '📈 Local SEO & Catalog Setup'
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      handleNext();
    }, 8000);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const setIndex = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 }
      }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    })
  };

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-[#030712]">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-electric-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Section Header */}
        <div className="space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-electric-blue/10 border border-electric-blue/20 text-electric-blue text-xs font-mono font-bold tracking-wider uppercase">
            <Star className="w-3.5 h-3.5 fill-current" />
            Social Proof
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black text-white tracking-tight">
            Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue via-purple-400 to-pink-500">Testimonials</span>
          </h2>
          <p className="text-sm md:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            Here is what startup founders, local business owners, and creative agencies say about working with Viraj Ventures.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto min-h-[360px] flex items-center justify-center">
          
          {/* Navigation Arrows */}
          <div className="absolute -left-4 md:-left-16 z-20">
            <button
              onClick={handlePrev}
              className="p-3.5 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all shadow-lg active:scale-95 cursor-pointer"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          <div className="absolute -right-4 md:-right-16 z-20">
            <button
              onClick={handleNext}
              className="p-3.5 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all shadow-lg active:scale-95 cursor-pointer"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Testimonial Glassmorphism Card */}
          <div className="w-full relative overflow-hidden px-2">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full bg-[#0b1329]/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 md:p-12 text-left relative shadow-[0_0_30px_rgba(0,240,255,0.02)]"
              >
                {/* Large Quote Icon Watermark */}
                <Quote className="absolute right-6 top-6 w-24 h-24 text-slate-800/20 rotate-180 pointer-events-none" />

                {/* Rating & Service */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider bg-slate-950/80 border border-slate-800 text-slate-400 px-3 py-1 rounded-full">
                    {testimonials[activeIndex].service}
                  </span>
                </div>

                {/* Feedback Text */}
                <blockquote className="text-base md:text-xl text-slate-200 leading-relaxed font-medium mb-8 relative z-10 italic">
                  "{testimonials[activeIndex].feedback}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center gap-4 relative z-10">
                  {/* Styled Avatar initials */}
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${testimonials[activeIndex].avatarColor} flex items-center justify-center font-display font-black text-white shadow-lg text-sm uppercase shrink-0`}>
                    {testimonials[activeIndex].name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-display font-black text-sm text-white tracking-wide">
                      {testimonials[activeIndex].name}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {testimonials[activeIndex].role}, <span className="text-electric-blue font-bold">{testimonials[activeIndex].company}</span> — {testimonials[activeIndex].location}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Carousel Indicators / Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                index === activeIndex ? 'w-8 bg-electric-blue' : 'w-2.5 bg-slate-800 hover:bg-slate-700'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
