"use client";

import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";

export const ArchitecturalHero = ({ name, title, avatarUrl, initials }) => {
  const [displayName, setDisplayName] = useState("");
  const fullName = name.toUpperCase();

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayName(fullName.slice(0, i + 1));
      i++;
      if (i === fullName.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, [fullName]);

  return (
    <div className="min-h-screen flex items-center relative">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Typography */}
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="text-xs tracking-[0.3em] text-text-secondary">
                SOFTWARE ENGINEER
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter">
                {displayName}
                <span className="animate-pulse">_</span>
              </h1>
            </div>
            <p className="text-text-secondary text-lg max-w-lg leading-relaxed">
              {title}
            </p>
            <div className="flex gap-8 pt-4">
              <a 
                href="/resume.pdf" 
                download
                className="group flex items-center gap-2 text-sm"
              >
                <span>Download Resume</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right - Architectural Portrait */}
          <div className="relative">
            <div className="aspect-square max-w-md mx-auto lg:ml-auto">
              <div className="w-full h-full border border-border overflow-hidden">
                <img 
                  src={avatarUrl} 
                  alt={name}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
            {/* Architectural frame detail */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r border-b border-accent/30 pointer-events-none" />
            <div className="absolute -top-4 -left-4 w-24 h-24 border-l border-t border-accent/30 pointer-events-none" />
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-px h-12 bg-border animate-[bounce_2s_infinite]" />
      </div>
    </div>
  );
};