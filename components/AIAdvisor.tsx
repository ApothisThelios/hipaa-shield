
import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { generateComplianceAdvice } from '../services/geminiService';
import { ChatMessage, Language } from '../types';
import { Send } from './Icons';
import HipaShieldLogo from './Logo';
import { CONTENT } from '../constants';

export interface AIAdvisorHandle {
  triggerPrompt: (prompt: string) => void;
}

interface AIAdvisorProps {
  language: Language;
  onError?: (errorType: string) => void;
}

const AIAdvisor = forwardRef<AIAdvisorHandle, AIAdvisorProps>(({ language, onError }, ref) => {
  const local = CONTENT[language].advisor;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize messages on language change if empty or just language reset
  useEffect(() => {
    setMessages([{ role: 'model', text: local.initial }]);
  }, [language]);

  useImperativeHandle(ref, () => ({
    triggerPrompt: (prompt: string) => {
      handleSend(prompt);
      document.getElementById('ai-advisor')?.scrollIntoView({ behavior: 'smooth' });
    }
  }));

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (forcedPrompt?: string) => {
    const userMsg = forcedPrompt || input.trim();
    if (!userMsg || isLoading) return;

    if (!forcedPrompt) setInput('');
    
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const aiResponse = await generateComplianceAdvice(userMsg, messages, language);
    
    if (aiResponse === "CONNECTION_EXPIRED_OR_NOT_FOUND") {
      setIsLoading(false);
      onError?.("CONNECTION_EXPIRED_OR_NOT_FOUND");
      return;
    }

    setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    setIsLoading(false);
  };

  return (
    <section id="ai-advisor" className="py-16 scroll-mt-24">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="px-4 py-1.5 text-[10px] font-black tracking-[0.2em] text-blue-400 uppercase bg-blue-400/10 border border-blue-400/20 rounded-full">
            {local.badge}
          </span>
          <h2 className="text-3xl font-bold mt-4 font-mono tracking-tight">{local.title}</h2>
          <p className="text-gray-400 mt-2 font-medium">{local.subtitle}</p>
        </div>

        <div className="glass rounded-[2rem] overflow-hidden shadow-2xl flex flex-col h-[500px] md:h-[650px] border-blue-500/10">
          <div className="p-5 border-b border-white/10 bg-white/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <HipaShieldLogo className="w-9 h-9" />
              <div>
                <p className="text-sm font-black uppercase tracking-[0.15em] font-mono">SHIELD ADVISOR</p>
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${isLoading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></div>
                  <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest">
                    {isLoading ? local.status.loading : local.status.active}
                  </p>
                </div>
              </div>
            </div>
            <div className="hidden md:flex gap-2">
              <button 
                onClick={() => setMessages([{ role: 'model', text: local.initial }])}
                className="text-[10px] font-bold text-gray-500 hover:text-white uppercase tracking-widest transition-colors"
              >
                {local.reset}
              </button>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`group relative max-w-[90%] md:max-w-[80%] p-5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none shadow-xl' 
                    : 'bg-white/5 text-gray-200 rounded-tl-none border border-white/10 backdrop-blur-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/10 flex gap-1.5">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-duration:0.6s]"></div>
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-5 bg-black/40 border-t border-white/10">
            <div className="relative flex gap-3">
              <input
                type="text"
                value={input}
                autoComplete="off"
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={local.placeholder}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-600 font-medium"
                aria-label="Advisory input"
              />
              <button 
                type="button"
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="p-4 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-600 text-white rounded-xl transition-all active:scale-95 flex items-center justify-center shrink-0 shadow-lg"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <div className="flex justify-between items-center px-1 mt-4">
               <p className="text-[9px] text-gray-600 uppercase tracking-[0.2em] font-black">
                {local.firewallLabel}
              </p>
              <div className="flex gap-2">
                <span className="w-1 h-1 rounded-full bg-blue-500/20"></span>
                <span className="w-1 h-1 rounded-full bg-blue-500/20"></span>
                <span className="w-1 h-1 rounded-full bg-blue-500/20"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default AIAdvisor;
