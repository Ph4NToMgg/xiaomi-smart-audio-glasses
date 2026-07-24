import React, { useState, useEffect } from 'react';
import { Glasses, ShoppingBag, Sparkles, Menu, X, Volume2, VolumeX } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Story', href: '#story-animation' },
    { name: 'Acoustics', href: '#acoustics' },
    { name: 'Frame Styles', href: '#frames' },
    { name: 'Touch Controls', href: '#gestures' },
    { name: 'Specs', href: '#specs' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#060609]/90 backdrop-blur-2xl border-b border-zinc-800/80 py-3 shadow-2xl'
          : 'bg-[#060609]/75 backdrop-blur-xl border-b border-zinc-900/60 py-4.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-yellow-400 flex items-center justify-center text-black font-extrabold font-heading text-lg group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,199,0,0.4)]">
            mi
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-white font-heading group-hover:text-yellow-400 transition-colors">
              Smart Audio Glasses
            </span>
            <span className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase">
              Mijia Edition
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-zinc-300 hover:text-yellow-400 transition-colors py-1 relative group font-bold"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            onClick={() => setIsAudioMuted(!isAudioMuted)}
            className="p-2 rounded-xl bg-zinc-950/90 border border-zinc-800 text-zinc-300 hover:text-yellow-400 hover:border-yellow-500/40 transition-all backdrop-blur-md"
            title={isAudioMuted ? 'Unmute preview sound' : 'Mute sound'}
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-yellow-400" />}
          </button>

          <a
            href="#buy"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-xs tracking-wide uppercase transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,199,0,0.4)] font-heading"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Pre-Order</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-zinc-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-950/95 backdrop-blur-2xl border-b border-zinc-800 px-6 py-6 space-y-4 shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-mono text-zinc-300 hover:text-yellow-400 font-bold"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 border-t border-zinc-900 flex items-center justify-between">
            <a
              href="#buy"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center px-4 py-3 rounded-xl bg-yellow-400 text-black font-extrabold text-xs uppercase font-heading shadow-lg"
            >
              Pre-Order Now ($199)
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
