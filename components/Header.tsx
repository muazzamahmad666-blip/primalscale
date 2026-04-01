"use client";
import { useState } from "react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <svg width="40" height="24" viewBox="0 0 48 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
            <path d="M8 28L14 18L20 28H8Z" fill="currentColor" />
            <path d="M18 28L28 12L38 28H18Z" fill="currentColor" />
            <path d="M30 28L42 4L54 28H30Z" fill="currentColor" />
          </svg>
          <span className="font-semibold tracking-tight text-lg text-white">Prime Scale</span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-base font-medium text-zinc-400">
          <a href="#home" className="hover:text-white transition-colors">Home</a>
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#process" className="hover:text-white transition-colors">Process</a>
        </nav>

        <a href="#book" className="hidden md:block text-base font-medium text-white hover:text-purple-400 transition-colors">
          Get free quote →
        </a>

        <button
          className="md:hidden text-zinc-400"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="absolute top-20 left-0 w-full bg-zinc-900 border-b border-zinc-800 p-6 flex flex-col gap-6 md:hidden">
          <a href="#home" onClick={() => setMobileOpen(false)} className="text-lg text-zinc-400 hover:text-white">Home</a>
          <a href="#services" onClick={() => setMobileOpen(false)} className="text-lg text-zinc-400 hover:text-white">Services</a>
          <a href="#process" onClick={() => setMobileOpen(false)} className="text-lg text-zinc-400 hover:text-white">Process</a>
          <a href="#book" onClick={() => setMobileOpen(false)} className="text-lg text-purple-400">Get free quote</a>
        </div>
      )}
    </header>
  );
}
