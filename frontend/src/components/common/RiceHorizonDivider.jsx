import React from 'react';

export default function RiceHorizonDivider({ invert = false, className = '', topBg = 'transparent' }) {
  return (
    <div
      className={`horizon-wave-divider ${className}`}
      style={{
        transform: invert ? 'rotate(180deg)' : 'none',
        lineHeight: 0,
        margin: 0,
        padding: 0,
        display: 'block',
        backgroundColor: topBg
      }}
    >
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: '60px', margin: 0, padding: 0 }}
      >
        {/* Layer 1: Golden Harvest Sun Wave */}
        <path
          d="M0,30 C320,70 420,-10 720,35 C1020,80 1200,10 1440,40 L1440,80 L0,80 Z"
          fill="var(--golden-light)"
          fillOpacity="0.4"
        />
        {/* Layer 2: Warm Earth Brown Wave */}
        <path
          d="M0,45 C280,10 520,75 800,30 C1080,-15 1260,60 1440,35 L1440,80 L0,80 Z"
          fill="var(--golden)"
          fillOpacity="0.7"
        />
        {/* Layer 3: Lush Rice Field Green Wave */}
        <path
          d="M0,55 C360,25 640,80 1000,45 C1240,20 1360,65 1440,55 L1440,80 L0,80 Z"
          fill="var(--bg-dark)"
        />
      </svg>
    </div>
  );
}
