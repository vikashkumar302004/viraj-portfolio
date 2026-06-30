import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Sparkles, Bot, ArrowRight, User, RefreshCw, Smartphone, Phone, Mail } from 'lucide-react';
import virajImg from '../viraj.jpeg';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const SYSTEM_PROMPT = `
You are the official AI Assistant for Viraj Ventures. Your role is to help visitors understand Viraj's skills, services, age, location, and how to work with him.
Respond in a friendly, enthusiastic, professional, and slightly conversational tone.
IMPORTANT: You must understand and reply in either Hinglish (mix of Hindi and English) or English depending on how the user messages you. If they ask in Hinglish/Hindi, respond in natural Hinglish. If they ask in English, respond in English.

Knowledge base:
- Founder: Viraj Bakale.
- Age: 17 years old (born in 2009). He is a young tech prodigy and tech craftsman!
- Location: Julewadi, Karad, Maharashtra.
- Services Offered:
  - 🌐 Website Development
  - 📱 App Development (Android/iOS)
  - 💻 Custom Software Development
  - 🎨 UI/UX Design
  - 🖼️ Logo Design
  - ✨ Brand Identity Design
  - 🎬 Video Editing
  - 📝 Content Creation
  - 💳 Business Card Design
  - 📦 Packaging Design
  - 🌍 Domain & Hosting Setup
  - 💳 Payment Gateway Integration
  - 📍 Google Business Profile Setup
  - 📈 SEO (Search Engine Optimization)
  - 📱 Social Media Management
  - 📢 Meta Ads Management
  - 🎯 Google Ads Management
- Core Values: 100% custom code (no lazy template copy-pasting), premium glassmorphism/dark mode aesthetics, fast delivery, and high-performance.
- Tech Stack: React, Vite, Tailwind CSS, TypeScript, Firebase, Node.js, Express, HTML, CSS.
- Contact Details:
  - Phone & WhatsApp: +91 7498516086 (direct link: https://wa.me/917498516086)
  - Contact Message: Contact me +917498516086
  - Email: virajbakale2009@gmail.com
  - Instagram: @Viraj_notifyall (https://instagram.com/Viraj_notifyall)
- How to get started: Users can submit their project idea via the custom project form on the website (which includes selecting their project scope, budget, and brand color choices). Viraj reviews every submission and replies within 24 hours.
- Budget range: Very flexible and customized based on the scope (typically ₹5,000 to ₹50,000+).

Keep your responses concise, structured, and informative. When asked how to contact Viraj, always share the WhatsApp link and phone number (+91 7498516086). Be helpful and try to convert visitors into leads!
`;

const QUICK_QUESTIONS = [
  { text: "Who is Viraj?", prompt: "Viraj kaun hai? Uski age aur location kya hai?" },
  { text: "What services do you offer?", prompt: "Aap kya services offer karte ho?" },
  { text: "How to contact Viraj?", prompt: "Viraj se contact karne ka kya treeka hai?" },
  { text: "What is your tech stack?", prompt: "Viraj projects me kaunsi technologies use karta hai?" },
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hi! Main Viraj ka AI Assistant hu. Main aapko Viraj Ventures, hamari services, pricing aur contacts ke baare me bata sakta hu. Aap kya janna chahte hain?'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setError(null);

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      if (!apiKey) {
        throw new Error("Groq API Key (VITE_GROQ_API_KEY) is missing in environment variables.");
      }

      // Format previous messages for Groq API
      const apiMessages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.map(msg => ({ role: msg.role, content: msg.content })),
        { role: 'user', content: text }
      ];

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: apiMessages,
          temperature: 0.7,
          max_tokens: 500
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `API error: ${response.status}`);
      }

      const data = await response.json();
      const botReply = data.choices[0]?.message?.content || "Sorry, response generation me issue aaya.";

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: botReply
      }]);

    } catch (err: any) {
      console.error("Chatbot API Error:", err);
      setError(err.message || "Connection failed. Please check your API key.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestionClick = (promptText: string) => {
    handleSendMessage(promptText);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      
      {/* Expanded Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute bottom-20 right-0 w-[400px] max-w-[calc(100vw-2rem)] h-[580px] bg-[#0b1329]/95 border border-slate-800/80 rounded-3xl flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-xl"
          >
            {/* Header */}
            <div className="bg-[#0f172a] border-b border-slate-850 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 select-none">
                  {/* Neon Active Ring */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-electric-blue to-purple-500 p-0.5">
                    <div className="w-full h-full rounded-full bg-slate-950" />
                  </div>
                  {/* Mini Avatar image */}
                  <div className="absolute inset-0.5 rounded-full bg-slate-900 overflow-hidden">
                    <img 
                      src={virajImg} 
                      alt="Viraj's Assistant" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Online Status dot */}
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-950 rounded-full" />
                </div>
                
                <div className="text-left">
                  <h4 className="text-sm font-display font-extrabold text-white flex items-center gap-1">
                    Viraj's AI Bot
                    <Sparkles className="w-3.5 h-3.5 text-electric-blue animate-pulse" />
                  </h4>
                  <p className="text-[10px] text-slate-400 font-mono">
                    Powered by LLaMA 3
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-slate-800">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-2.5 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    
                    {/* Avatar Icon */}
                    {msg.role === 'assistant' ? (
                      <div className="w-7 h-7 rounded-full overflow-hidden border border-electric-blue/30 shrink-0">
                        <img 
                          src={virajImg} 
                          alt="Viraj" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-slate-950 border border-slate-800 text-electric-blue flex items-center justify-center shrink-0 text-xs">
                        <User className="w-3.5 h-3.5" />
                      </div>
                    )}

                    {/* Text Box */}
                    <div className={`p-3.5 rounded-2xl text-xs leading-relaxed text-left shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-electric-blue to-blue-600 text-slate-950 font-bold rounded-tr-none'
                        : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                    }`}>
                      {msg.content}
                    </div>

                  </div>
                </div>
              ))}

              {/* Loader */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-electric-blue/10 border border-electric-blue/20 flex items-center justify-center shrink-0">
                      <Bot className="w-3.5 h-3.5 text-electric-blue" />
                    </div>
                    <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-electric-blue rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 bg-electric-blue rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 bg-electric-blue rounded-full animate-bounce" />
                    </div>
                  </div>
                </div>
              )}

              {/* Error state */}
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] rounded-xl text-left">
                  <p className="font-semibold">Error Occurred:</p>
                  <p className="mt-1 opacity-90">{error}</p>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Quick Questions Helper list */}
            {messages.length === 1 && !isLoading && (
              <div className="px-4 py-2 border-t border-slate-900 bg-slate-950/40">
                <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider text-left mb-2">
                  Suggestions:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_QUESTIONS.map((qq, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleQuickQuestionClick(qq.prompt)}
                      className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-[10px] text-slate-350 hover:text-white rounded-lg transition-colors cursor-pointer text-left"
                    >
                      {qq.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Form Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="bg-slate-950 p-3 border-t border-slate-850 flex gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask something about Viraj..."
                disabled={isLoading}
                className="flex-1 bg-slate-900 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-electric-blue placeholder-slate-600 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="p-2.5 bg-electric-blue hover:bg-electric-blue-dark text-slate-950 rounded-xl transition-all flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4 text-slate-950" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Sparkly Toggle Button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-electric-blue hover:bg-electric-blue-dark text-slate-950 rounded-full flex items-center justify-center shadow-xl cursor-pointer select-none border border-electric-blue/30 relative"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6 text-slate-950" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="w-full h-full rounded-full overflow-hidden p-0.5 relative flex items-center justify-center"
            >
              {/* Profile Image as toggle button */}
              <img 
                src={virajImg} 
                alt="Viraj's Bot" 
                className="w-full h-full object-cover rounded-full"
              />
              {/* Animated glowing ring border */}
              <span className="absolute inset-0 rounded-full border-2 border-electric-blue/40 animate-pulse pointer-events-none" />
              {/* Little red glow notification bubble */}
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-purple-500 rounded-full border-2 border-slate-950 animate-ping" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-purple-500 rounded-full border-2 border-slate-950 flex items-center justify-center text-[8px] text-white font-bold">
                AI
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

    </div>
  );
}
