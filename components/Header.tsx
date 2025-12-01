
import React, { useState, useEffect } from 'react';
import { content } from '../content';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-900/80 backdrop-blur-md py-3 shadow-lg border-b border-white/5'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          {/* Abstract Pixel Logo */}
          <div className="w-8 h-8 relative">
            <div className="absolute inset-0 bg-cyan-500 rounded-sm transform rotate-0 group-hover:rotate-12 transition-transform duration-300 opacity-80"></div>
            <div className="absolute inset-0 bg-fuchsia-500 rounded-sm transform rotate-45 group-hover:rotate-90 mix-blend-screen transition-transform duration-300 opacity-80"></div>
          </div>
          
          <span className="font-black text-xl tracking-tighter text-white select-none">
            {content.brand.name.toUpperCase()} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">{content.brand.highlight.toUpperCase()}</span>
          </span>
        </div>

        <button
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="px-6 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-bold text-slate-200 hover:text-white hover:bg-white/10 hover:border-cyan-500/50 transition-all hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
        >
          {content.hero.buttonText}
        </button>
      </div>
    </header>
  );
};
