
import React, { useRef, useState, useEffect } from 'react';
import { 
  CONTENT, 
  STRIPE_PAYMENT_LINK, 
  CONTACT_EMAIL,
  OFFICIAL_DOMAIN
} from './constants';
import { Check, ArrowRight, Info, ShieldCheck, FileText } from './components/Icons';
import HipaShieldLogo from './components/Logo';
import AIAdvisor, { AIAdvisorHandle } from './components/AIAdvisor';
import { Language } from './types';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const advisorRef = useRef<AIAdvisorHandle>(null);
  const [isKeyConnected, setIsKeyConnected] = useState<boolean>(true);
  const [showConnectOverlay, setShowConnectOverlay] = useState<boolean>(false);
  const [showMsa, setShowMsa] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  // Engagement state simulation
  const [isEngaged, setIsEngaged] = useState<boolean>(false);

  // Guardrail states
  const [guardrailNoPhi, setGuardrailNoPhi] = useState(false);
  const [guardrailPayment, setGuardrailPayment] = useState(false);

  const local = CONTENT[language];

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    if (window.aistudio) {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      setIsKeyConnected(hasKey);
      if (!hasKey) {
        setShowConnectOverlay(true);
      }
    }
  };

  const handleOpenSelectKey = async () => {
    if (window.aistudio) {
      try {
        await window.aistudio.openSelectKey();
        setIsKeyConnected(true);
        setShowConnectOverlay(false);
      } catch (err) {
        console.error("Failed to open select key dialog", err);
      }
    }
  };

  const simulateLogin = () => {
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggedIn(true);
      setIsLoggingIn(false);
      document.getElementById('compliance')?.scrollIntoView({ behavior: 'smooth' });
    }, 1500);
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const askAdvisor = (prompt: string) => {
    advisorRef.current?.triggerPrompt(prompt);
  };

  const onAdvisorError = (errorType: string) => {
    if (errorType === "CONNECTION_EXPIRED_OR_NOT_FOUND") {
      setIsKeyConnected(false);
      setShowConnectOverlay(true);
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-blue-500/30">
      <div className="fixed inset-0 gradient-bg -z-10" />
      
      {/* Brand Watermark for hipaa-shield.com */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.015] pointer-events-none -z-20 select-none">
        <div className="flex flex-col items-center">
          <HipaShieldLogo className="w-[600px] h-[600px]" />
          <p className="text-8xl font-black font-mono tracking-tighter mt-12">{OFFICIAL_DOMAIN.toUpperCase()}</p>
        </div>
      </div>

      {showConnectOverlay && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-6">
          <div className="glass max-w-md w-full p-10 rounded-[2.5rem] border-blue-500/30 text-center space-y-8 shadow-2xl">
            <div className="w-24 h-24 mx-auto float-animation">
              <HipaShieldLogo />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-black tracking-tight">System Initialization</h2>
              <p className="text-sm text-gray-400 font-medium">
                HIPAA Shield requires a Gemini Pro secure connection to process compliance artifacts and regulatory searches.
              </p>
            </div>
            <div className="space-y-4">
              <button 
                onClick={handleOpenSelectKey}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-blue-600/20 active:scale-95"
              >
                Connect Secure Instance
              </button>
              <a 
                href="https://ai.google.dev/gemini-api/docs/billing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-white transition-colors"
              >
                Protocol Documentation & Billing
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MSA MODAL */}
      {showMsa && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12 overflow-hidden">
          <div className="glass max-w-4xl w-full max-h-full rounded-[2.5rem] border-white/10 flex flex-col shadow-2xl bg-[#080a14]">
            <div className="p-8 border-b border-white/10 flex items-center justify-between shrink-0 bg-white/[0.02]">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-blue-600/20 text-blue-400">
                  <FileText className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-black tracking-tighter">{local.msa.title}</h2>
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-0.5">{OFFICIAL_DOMAIN} • Legal Infrastructure</p>
                </div>
              </div>
              <button 
                onClick={() => setShowMsa(false)}
                className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-3xl text-gray-500"
              >
                &times;
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 md:p-14 space-y-12 scroll-smooth custom-scrollbar bg-black/40">
              <div className="prose prose-invert max-w-none">
                {local.msa.sections.map((section, idx) => (
                  <div key={idx} className="space-y-6 pb-10 border-b border-white/5 last:border-0 last:pb-0">
                    <h3 className="text-xl font-black text-white tracking-wide uppercase font-mono flex items-center gap-4">
                      <span className="text-blue-500/50">Article</span> {section.title}
                    </h3>
                    {Array.isArray(section.content) ? (
                      <ul className="space-y-4 list-none pl-0">
                        {section.content.map((li, liIdx) => (
                          <li key={liIdx} className="flex gap-5 text-base text-gray-400 leading-relaxed font-medium group">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500/30 mt-2.5 shrink-0 group-hover:bg-blue-500 transition-colors" />
                            <span>{li}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-base text-gray-400 leading-relaxed font-medium">
                        {section.content}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="p-8 border-t border-white/10 bg-white/[0.02] flex flex-col md:flex-row items-center justify-between gap-6 shrink-0">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-green-500/50" />
                <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest italic">
                  {language === 'en' ? "Alignment Framework Version 3.1-SUD" : "Versión del Marco 3.1-SUD"}
                </p>
              </div>
              <button 
                onClick={() => setShowMsa(false)}
                className="w-full md:w-auto px-12 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all hover:bg-blue-50 hover:text-blue-600"
              >
                {language === 'en' ? "Accept Terms & Close" : "Aceptar Términos y Cerrar"}
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-50 glass border-b border-white/10 shadow-lg shadow-black/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-5 group transition-transform active:scale-95 cursor-pointer outline-none"
            aria-label="Back to top"
          >
            <HipaShieldLogo className="w-12 h-12" />
            <div className="text-left">
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl font-black tracking-[0.2em] uppercase group-hover:text-blue-400 transition-colors font-mono">HIPAA SHIELD</h1>
                <div className={`w-2 h-2 rounded-full ${isKeyConnected ? 'bg-green-500' : 'bg-red-500 animate-pulse shadow-red-500/50'}`}></div>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-2.5 h-2.5 text-blue-500/80" />
                <p className="text-[9px] text-gray-500 font-black tracking-[0.25em] whitespace-nowrap uppercase">Verified: {OFFICIAL_DOMAIN}</p>
              </div>
            </div>
          </button>
          
          <nav className="flex items-center gap-2 md:gap-5 overflow-x-auto w-full md:w-auto pb-3 md:pb-0 scrollbar-hide">
            <div className="flex bg-white/5 rounded-2xl p-1 mr-4 border border-white/10 backdrop-blur-md">
              <button 
                onClick={() => setLanguage('en')}
                className={`px-4 py-1.5 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all ${language === 'en' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-500 hover:text-white'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLanguage('es')}
                className={`px-4 py-1.5 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all ${language === 'es' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-500 hover:text-white'}`}
              >
                ES
              </button>
            </div>
            
            {local.navItems.map((item) => (
              <a 
                key={item.label} 
                href={item.href}
                className="px-4 py-2 text-[11px] text-gray-400 hover:text-white hover:bg-white/5 active:bg-white/10 rounded-xl transition-all whitespace-nowrap font-black uppercase tracking-widest"
              >
                {item.label}
              </a>
            ))}

            <button 
              onClick={simulateLogin}
              disabled={isLoggingIn}
              className={`px-6 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap shadow-xl flex items-center gap-2 ${
                isLoggedIn 
                  ? 'bg-green-500/20 text-green-400 border border-green-400/30' 
                  : 'bg-white text-black hover:bg-gray-200 active:scale-95'
              }`}
            >
              {isLoggingIn ? '...' : (isLoggedIn ? (language === 'en' ? 'DASHBOARD ACTIVE' : 'PANEL ACTIVO') : (language === 'en' ? 'PORTAL LOGIN' : 'INICIAR SESIÓN'))}
              {isLoggedIn && <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />}
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-24">
        {/* HERO SECTION */}
        <div className="grid lg:grid-cols-5 gap-16 items-start mb-32">
          <div className="lg:col-span-3 space-y-10">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm">
              <div className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.5)]"></div>
              <span className="text-[11px] font-black text-blue-400 uppercase tracking-[0.25em]">{local.hero.badge}</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tighter">
              <span className="text-gradient">42 CFR Part 2 Alignment.</span><br />
              <span className="text-white/90">Audit-Response Ready.</span>
            </h2>
            
            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl font-medium">
              {local.hero.description}
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {local.hero.benefits.map((benefit) => (
                <button 
                  key={benefit.text} 
                  onClick={() => askAdvisor(benefit.prompt)}
                  className="flex items-center gap-4 group text-left hover:bg-white/5 p-3 rounded-2xl transition-all active:scale-95 border border-transparent hover:border-white/10"
                >
                  <div className="w-6 h-6 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 transition-colors">
                    <Check className="w-3.5 h-3.5 text-green-400 group-hover:text-blue-400" />
                  </div>
                  <span className="text-sm text-gray-300 font-bold group-hover:text-white transition-colors">{benefit.text}</span>
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-5 pt-6">
              <a 
                href={STRIPE_PAYMENT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 bg-white text-black rounded-2xl text-sm font-black uppercase tracking-widest shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3"
              >
                {local.hero.ctaPrimary} <ArrowRight className="w-4 h-4" />
              </a>
              <button 
                onClick={() => askAdvisor(language === 'es' ? "¿Qué se incluye en el Paquete de Evidencia de Preparación para Auditoría de $3,000?" : "What's included in the $3,000 Alignment Evidence Package?")}
                className="px-10 py-5 glass rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-white/10 hover:scale-[1.02] active:scale-95 transition-all"
              >
                {local.hero.ctaSecondary}
              </button>
            </div>

            <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/10 max-w-xl backdrop-blur-md">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Info className="text-blue-400 w-6 h-6 flex-shrink-0" />
              </div>
              <p className="text-xs text-gray-500 leading-relaxed font-bold uppercase tracking-wide">
                {local.hero.info}
              </p>
            </div>
          </div>

          <aside id="engagement" className="lg:col-span-2 md:sticky md:top-36 scroll-mt-24">
            <div className="glass rounded-[3rem] p-10 border-white/20 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-[60px] rounded-full group-hover:bg-blue-600/20 transition-all duration-700" />
              
              <div className="relative z-10 space-y-8">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-2">{local.pricingPlan.name}</p>
                    <h3 className="text-2xl font-black mt-1 leading-tight">{local.pricingPlan.description}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <p className="text-xs text-gray-500 font-black uppercase tracking-widest">{local.pricingPlan.subtitle}</p>
                    </div>
                  </div>
                  <div className="text-4xl font-black tracking-tighter">{local.pricingPlan.price}</div>
                </div>

                <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-3">
                   <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                     <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500/80">Compliance Deadlines Imminent:</p>
                   </div>
                   <p className="text-[12px] text-gray-400 leading-relaxed font-bold italic">
                    {language === 'es' 
                      ? "Los cambios en 42 CFR Parte 2 requieren alineación inmediata para evitar riesgos legales severos. Empezamos tras el pago verificado."
                      : "42 CFR Part 2 changes require immediate alignment to mitigate severe legal risks. We begin alignment post-verified payment."}
                   </p>
                </div>

                <ul className="space-y-5 pt-2">
                  {local.pricingPlan.features.map((feature, idx) => (
                    <li key={idx} className="flex gap-4 items-start">
                      <div className="mt-1 w-6 h-6 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3.5 h-3.5 text-blue-400" />
                      </div>
                      <span className="text-sm text-gray-300 leading-snug font-bold">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-8 border-t border-white/10 space-y-4">
                  <a 
                    href={local.pricingPlan.stripeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-5 bg-blue-600 text-white rounded-2xl text-center text-xs font-black uppercase tracking-widest hover:bg-blue-500 active:scale-[0.98] transition-all block shadow-2xl shadow-blue-600/20"
                  >
                    {local.pricingPlan.ctaText}
                  </a>
                  <button 
                    onClick={() => askAdvisor(language === 'es' ? "¿Cómo sé si este compromiso es adecuado para mi centro SUD?" : "How do I know if this alignment is right for my SUD facility?")}
                    className="w-full py-5 glass rounded-2xl text-center text-xs font-black uppercase tracking-widest hover:bg-white/10 active:scale-[0.98] transition-all block border-white/10"
                  >
                    {language === 'es' ? "¿Es adecuado para mi Centro?" : "Is this right for my Clinic?"}
                  </button>
                </div>

                <div className="bg-black/40 p-5 rounded-2xl space-y-3 border border-white/10">
                  <p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.25em]">
                    {language === 'es' ? "Garantías del Dominio:" : "Domain Identity Safeguards:"}
                  </p>
                  <p className="text-[11px] text-gray-500 leading-relaxed font-bold uppercase tracking-tight">
                    {OFFICIAL_DOMAIN} • Evidence Artifacts • Zero PHI Access • Part 2 Alignment Specialist
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* COMPLIANCE DASHBOARD PORTAL SECTION */}
        <section id="compliance" className="py-24 border-t border-white/5 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 backdrop-blur-sm">
                <ShieldCheck className="w-4 h-4 text-green-400" />
                <span className="text-[11px] font-black text-green-400 uppercase tracking-[0.25em]">Portal Active • {OFFICIAL_DOMAIN}</span>
              </div>
              <h2 className="text-5xl font-black tracking-tighter leading-none">{local.compliance.title}</h2>
              <p className="text-xl text-gray-500 max-w-xl font-bold uppercase tracking-tight">
                {local.compliance.subtitle}
              </p>
            </div>
            <div className="flex items-center gap-6 bg-white/[0.03] border border-white/10 p-6 rounded-[2.5rem] backdrop-blur-xl shadow-2xl">
              <div className="text-right">
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-600 mb-1">Alignment Score</p>
                <div className="flex items-baseline gap-1">
                   <p className="text-4xl font-black text-blue-400 tracking-tighter">68</p>
                   <p className="text-sm font-black text-blue-400/50 uppercase">%</p>
                </div>
              </div>
              <div className="relative w-16 h-16">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="6" className="text-white/5" />
                  <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray="176" strokeDashoffset="56" className="text-blue-500 transition-all duration-1000" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8 space-y-10">
              <div className="glass rounded-[3rem] p-10 border-white/10 bg-black/40 shadow-2xl">
                <h3 className="text-2xl font-black mb-10 flex items-center gap-4 font-mono uppercase tracking-tight">
                  <div className="w-10 h-10 rounded-2xl bg-blue-600/20 flex items-center justify-center border border-blue-500/20">
                    <Check className="w-5 h-5 text-blue-400" />
                  </div>
                  {local.compliance.checklistTitle}
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {local.compliance.checklistItems.map((item) => (
                    <div key={item.id} className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/10 flex items-start gap-5 hover:bg-white/[0.08] transition-all hover:border-blue-500/30 group">
                      <div className={`mt-1.5 w-7 h-7 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
                        item.status === 'complete' ? 'bg-green-500/10 border-green-500/40 text-green-400' :
                        item.status === 'warning' ? 'bg-yellow-500/10 border-yellow-500/40 text-yellow-400 animate-pulse' :
                        'bg-blue-500/10 border-blue-500/20 text-blue-400/50'
                      }`}>
                        {item.status === 'complete' ? <Check className="w-4 h-4" /> : item.status === 'warning' ? '!' : '...'}
                      </div>
                      <div>
                        <p className="text-sm font-black text-gray-200 group-hover:text-white transition-colors uppercase tracking-wide">{item.title}</p>
                        <p className="text-[12px] text-gray-500 mt-2 leading-relaxed font-bold italic">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass rounded-[3rem] p-10 border-white/10 bg-black/40 shadow-2xl">
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-2xl font-black flex items-center gap-4 font-mono uppercase tracking-tight">
                    <div className="w-10 h-10 rounded-2xl bg-purple-600/20 flex items-center justify-center border border-purple-500/20">
                      <Info className="w-5 h-5 text-purple-400" />
                    </div>
                    {local.compliance.artifactsTitle}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-600 font-mono">SECURE VAULT</span>
                    <div className="w-2 h-2 rounded-full bg-purple-500/50" />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[11px] font-black uppercase tracking-[0.25em] text-gray-600 border-b border-white/10">
                        <th className="pb-5 px-4 font-mono">Evidence Artifact</th>
                        <th className="pb-5 px-4 font-mono">Classification</th>
                        <th className="pb-5 px-4 text-right font-mono">Ingest Date</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm font-medium">
                      {local.compliance.artifacts.map((artifact, i) => (
                        <tr key={i} className="group hover:bg-white/[0.03] transition-colors cursor-pointer border-b border-white/[0.02] last:border-0">
                          <td className="py-6 px-4 text-gray-300 font-mono text-xs flex items-center gap-4">
                            <FileText className="w-4 h-4 text-gray-600 group-hover:text-blue-400 transition-colors" />
                            {artifact.name}
                          </td>
                          <td className="py-6 px-4">
                            <span className="px-3 py-1 bg-white/[0.05] border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-gray-300 group-hover:border-white/20 transition-all">
                              {artifact.type}
                            </span>
                          </td>
                          <td className="py-6 px-4 text-right text-gray-600 text-[10px] font-black uppercase tracking-widest group-hover:text-gray-400 transition-colors font-mono">{artifact.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-10">
              <div className="glass rounded-[3rem] p-10 border-white/10 bg-gradient-to-br from-blue-500/10 to-transparent shadow-2xl border-l-blue-500/30 border-l-4">
                <h3 className="text-xl font-black mb-4 flex items-center gap-4 uppercase tracking-tighter font-mono">
                   <div className="w-10 h-10 rounded-2xl bg-blue-600/20 flex items-center justify-center border border-blue-500/20">
                    <ShieldCheck className="w-5 h-5 text-blue-400" />
                  </div>
                  42 CFR Part 2 Alignment Hub
                </h3>
                <p className="text-[13px] text-gray-400 leading-relaxed mb-8 font-bold italic">
                  Critical resources for Substance Use Disorder record handling and consent mapping.
                </p>
                <div className="space-y-4">
                  <button onClick={() => askAdvisor("What is the mapping between HIPAA and Part 2?")} className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest text-left hover:bg-white/10 transition-colors">HIPAA vs Part 2 Crosswalk</button>
                  <button onClick={() => askAdvisor("Help me with Part 2 consent forms.")} className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest text-left hover:bg-white/10 transition-colors">Consent Form Evidence</button>
                  <button onClick={() => askAdvisor("What should I look for in SUD vendor BAA?")} className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest text-left hover:bg-white/10 transition-colors">Vendor Oversight Mapping</button>
                </div>
              </div>

              <div className="glass rounded-[3rem] p-10 border-blue-500/20 bg-blue-500/5 relative overflow-hidden group border-t-blue-500/30 border-t-4 shadow-2xl">
                <div className="relative z-10">
                  <h3 className="text-xl font-black mb-5 uppercase tracking-tighter font-mono">{local.compliance.downloadCta}</h3>
                  <div className="p-6 rounded-2xl bg-black/60 border border-white/10 mb-8 flex items-start gap-4">
                    <Info className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
                    <p className="text-[11px] text-gray-500 font-black uppercase tracking-widest leading-relaxed">
                      {local.compliance.lockMsg}
                    </p>
                  </div>
                  
                  {!isEngaged ? (
                    <div className="space-y-6">
                      <a 
                        href={STRIPE_PAYMENT_LINK}
                        target="_blank"
                        className="w-full py-5 bg-blue-600 text-white rounded-2xl text-center text-[11px] font-black uppercase tracking-[0.3em] transition-all block shadow-2xl hover:bg-blue-500 hover:scale-[1.02] active:scale-95"
                      >
                        Secure Alignment Package
                      </a>
                    </div>
                  ) : (
                    <button className="w-full py-5 bg-white text-black rounded-2xl text-center text-[11px] font-black uppercase tracking-[0.3em] transition-all block shadow-2xl hover:bg-gray-200 active:scale-95">
                      Download Full Archive
                    </button>
                  )}
                </div>
                {!isEngaged && (
                  <div className="absolute -bottom-12 -right-12 opacity-5 group-hover:opacity-10 transition-opacity rotate-12 duration-700">
                    <ShieldCheck className="w-64 h-64 text-white" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* PHI REJECTION GUARDRAILS */}
        <section className="py-24 border-t border-white/5 scroll-mt-24">
          <div className="max-w-4xl mx-auto glass rounded-[3.5rem] p-10 md:p-16 border-blue-500/20 bg-blue-500/5 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
              <div className="w-20 h-20 rounded-[2rem] bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shadow-2xl">
                <HipaShieldLogo className="w-12 h-12" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-3xl font-black uppercase tracking-tight font-mono leading-none mb-3">Secure Ingest Protocol</h3>
                <div className="flex items-center justify-center md:justify-start gap-2">
                   <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                   <p className="text-[11px] text-blue-400 font-black uppercase tracking-[0.4em]">System Active • {OFFICIAL_DOMAIN}</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <label className="flex gap-6 p-8 rounded-[2.5rem] bg-black/60 border border-white/10 hover:border-blue-500/40 transition-all cursor-pointer group shadow-inner">
                <div className="relative shrink-0">
                  <input 
                    type="checkbox" 
                    checked={guardrailNoPhi}
                    onChange={() => setGuardrailNoPhi(!guardrailNoPhi)}
                    className="w-8 h-8 rounded-xl bg-white/[0.05] border-white/20 text-blue-600 focus:ring-blue-500 mt-1 cursor-pointer transition-all" 
                  />
                </div>
                <span className="text-[15px] text-gray-400 leading-relaxed font-bold italic group-hover:text-white transition-colors">
                  {language === 'es'
                    ? `Confirmo que NO cargaré PHI. ${OFFICIAL_DOMAIN} solo procesa metadatos y evidencia de configuración de sistemas.`
                    : `I confirm that I will NOT upload PHI. ${OFFICIAL_DOMAIN} only processes metadata and system configuration evidence.`}
                </span>
              </label>

              <label className="flex gap-6 p-8 rounded-[2.5rem] bg-black/60 border border-white/10 hover:border-blue-500/40 transition-all cursor-pointer group shadow-inner">
                <div className="relative shrink-0">
                  <input 
                    type="checkbox" 
                    checked={guardrailPayment}
                    onChange={() => setGuardrailPayment(!guardrailPayment)}
                    className="w-8 h-8 rounded-xl bg-white/[0.05] border-white/20 text-blue-600 focus:ring-blue-500 mt-1 cursor-pointer transition-all" 
                  />
                </div>
                <span className="text-[15px] text-gray-400 leading-relaxed font-bold italic group-hover:text-white transition-colors">
                  {language === 'es'
                    ? "Entiendo que el análisis de artefactos requiere un compromiso de servicio activo y verificado en este dominio."
                    : "I understand that artifact analysis requires an active, verified service engagement on this domain."}
                </span>
              </label>

              <button 
                disabled={!guardrailNoPhi || !guardrailPayment}
                className={`w-full py-6 rounded-2xl font-black uppercase tracking-[0.4em] text-sm transition-all shadow-2xl ${
                  guardrailNoPhi && guardrailPayment 
                    ? 'bg-white text-black hover:bg-blue-50 active:scale-95 shadow-white/5' 
                    : 'bg-white/5 text-gray-700 cursor-not-allowed border border-white/10'
                }`}
              >
                Access Secure Vault Node
              </button>
            </div>
          </div>
        </section>

        <AIAdvisor ref={advisorRef} language={language} onError={onAdvisorError} />

        <footer className="py-20 border-t border-white/10">
          <div className="glass rounded-[4rem] p-12 md:p-20 border-white/10 bg-black/40 space-y-16 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-20" />
            
            <div className="flex flex-col lg:flex-row justify-between gap-20">
              <div className="space-y-8 max-w-md">
                <button 
                  onClick={scrollToTop}
                  className="flex items-center gap-6 hover:opacity-80 transition-opacity outline-none"
                >
                  <HipaShieldLogo className="w-14 h-14" />
                  <div className="text-left">
                    <h1 className="text-2xl font-black tracking-[0.3em] uppercase font-mono leading-none">HIPAA SHIELD</h1>
                    <p className="text-[11px] font-black text-blue-500/70 uppercase tracking-[0.4em] mt-2">{OFFICIAL_DOMAIN}</p>
                  </div>
                </button>
                <p className="text-sm text-gray-500 leading-relaxed font-bold italic uppercase tracking-tight">
                  {local.footer.disclosure}
                </p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => setShowMsa(true)}
                    className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[11px] font-black uppercase tracking-widest text-blue-400 hover:text-white hover:bg-blue-600/20 transition-all"
                  >
                    <FileText className="w-4 h-4" />
                    Master Services Agreement (MSA)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
                <div className="space-y-6">
                  <h4 className="text-[11px] font-black text-white uppercase tracking-[0.35em] border-b border-white/10 pb-4">Protocol Nav</h4>
                  <ul className="space-y-4">
                    {local.navItems.map((item) => (
                      <li key={item.label}><a href={item.href} className="text-xs text-gray-600 hover:text-white transition-colors font-black uppercase tracking-widest">{item.label}</a></li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-6">
                  <h4 className="text-[11px] font-black text-white uppercase tracking-[0.35em] border-b border-white/10 pb-4">Direct Contact</h4>
                  <ul className="space-y-4">
                    <li className="text-xs">
                      <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-400 hover:text-white transition-colors font-black uppercase tracking-widest block">{CONTACT_EMAIL}</a>
                    </li>
                    <li className="text-[11px] text-gray-600 font-black uppercase tracking-widest">{local.footer.billing}</li>
                    <li className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                       <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">System Status: Online</span>
                    </li>
                  </ul>
                </div>
                <div className="hidden md:block space-y-6">
                  <h4 className="text-[11px] font-black text-white uppercase tracking-[0.35em] border-b border-white/10 pb-4">Verification</h4>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                    <div className="flex justify-between items-center">
                       <span className="text-[9px] font-black text-gray-700 uppercase tracking-widest">DNS Identity</span>
                       <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Verified</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-[9px] font-black text-gray-700 uppercase tracking-widest">Encryption</span>
                       <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">TLS 1.3</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] text-gray-700 font-black uppercase tracking-[0.3em]">
              <div>&copy; {new Date().getFullYear()} {local.footer.copyright} • {OFFICIAL_DOMAIN.toUpperCase()}</div>
              <div className="flex gap-8">
                <button onClick={() => setShowMsa(true)} className="hover:text-white transition-colors">{language === 'es' ? "Términos Legales" : "Legal Terms"}</button>
                <a href="#" className="hover:text-white transition-colors">{language === 'es' ? "Privacidad" : "Privacy"}</a>
                <a href="#" className="hover:text-white transition-colors">{language === 'es' ? "Cookies" : "Cookies"}</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
