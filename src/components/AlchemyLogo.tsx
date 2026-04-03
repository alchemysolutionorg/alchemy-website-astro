import React from "react";

export function AlchemyLogo({ className = "", width = 40, height = 40 }: { className?: string, width?: number, height?: number }) {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g transform="translate(10, 10) scale(0.8)">
        {/* Mysterious glowing background glow for dark mode */}
        <circle cx="50" cy="50" r="40" fill="url(#glow)" opacity="0.3" className="hidden dark:block"/>
        
        {/* Outer Hexagon / Tech Node */}
        <path d="M50 5 L89 27.5 L89 72.5 L50 95 L11 72.5 L11 27.5 Z" 
              stroke="currentColor" 
              strokeWidth="2" 
              fill="none" 
              strokeOpacity="0.2"/>
              
        {/* Inner Alchemical Triangle */}
        <path d="M50 15 L80 75 L20 75 Z" 
              stroke="url(#purpleGoldGradient)" 
              strokeWidth="4" 
              fill="none" 
              strokeLinejoin="round"/>
              
        {/* The "A" / Mystical Elements */}
        <path d="M40 55 L60 55" 
              stroke="url(#purpleGoldGradient)" 
              strokeWidth="4" 
              strokeLinecap="round"/>
              
        {/* Central Core / Flask Bottom */}
        <circle cx="50" cy="60" r="8" fill="currentColor" opacity="0.8"/>
        
        {/* Floating Particle Nodes */}
        <circle cx="50" cy="25" r="3" fill="var(--color-accent)"/>
        <circle cx="28" cy="65" r="2" fill="var(--color-primary)"/>
        <circle cx="72" cy="65" r="2" fill="var(--color-primary)"/>
        
      </g>

      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="purpleGoldGradient" x1="20" y1="15" x2="80" y2="75" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--color-primary)" />
          <stop offset="100%" stopColor="var(--color-accent)" />
        </linearGradient>
      </defs>
    </svg>
  );
}
