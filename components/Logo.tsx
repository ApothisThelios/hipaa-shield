
import React from 'react';

export const HipaShieldLogo = ({ className = "w-10 h-10", primaryColor = "#79a9ff" }) => (
  <div className={`relative ${className} group`}>
    {/* Background Glow */}
    <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
    
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="relative z-10 w-full h-full drop-shadow-2xl"
    >
      <defs>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#79a9ff" />
          <stop offset="100%" stopColor="#b79cff" />
        </linearGradient>
        <filter id="innerShadow">
          <feOffset dx="0" dy="2" />
          <feGaussianBlur stdDeviation="2" result="offset-blur" />
          <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
          <feFlood floodColor="black" floodOpacity="0.4" result="color" />
          <feComposite operator="in" in="color" in2="inverse" result="shadow" />
          <feComponentAlpha in="SourceGraphic" result="alpha" />
          <feComposite operator="in" in="shadow" in2="alpha" />
        </filter>
      </defs>

      {/* Outer Vault Frame */}
      <path 
        d="M50 5 L85 20 V45 C85 70 50 95 50 95 C50 95 15 70 15 45 V20 L50 5Z" 
        stroke="url(#shieldGrad)" 
        strokeWidth="2" 
        fill="rgba(255,255,255,0.03)"
      />

      {/* Secondary Structural Shield */}
      <path 
        d="M50 12 L78 24 V45 C78 65 50 85 50 85 C50 85 22 65 22 45 V24 L50 12Z" 
        fill="url(#shieldGrad)" 
        fillOpacity="0.1"
      />

      {/* The "H" Core Monogram */}
      <path 
        d="M38 35 V65 M62 35 V65 M38 50 H62" 
        stroke="url(#shieldGrad)" 
        strokeWidth="6" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />

      {/* Decorative Guard Rails */}
      <path 
        d="M25 25 L32 28 M68 28 L75 25 M32 72 L25 75 M75 75 L68 72" 
        stroke="white" 
        strokeOpacity="0.3" 
        strokeWidth="2"
      />

      {/* Precision Node */}
      <circle cx="50" cy="50" r="3" fill="white" />
    </svg>
  </div>
);

export default HipaShieldLogo;
