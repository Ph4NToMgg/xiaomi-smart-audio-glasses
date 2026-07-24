import React, { useState } from 'react';
import { FrameStyle } from '../types';
import { Check, Sparkles, RefreshCw, Eye, Shield } from 'lucide-react';

export const FrameStyleCustomizer: React.FC = () => {
  const styles: FrameStyle[] = [
    {
      id: 'wayfarer',
      name: 'Wayfarer Classic',
      subtitle: 'Timeless Everyday Elegance',
      description: 'Iconic thick-rim silhouette crafted from high-density NCVM coated acetate with matte finish.',
      weight: '38.1g',
      tag: 'Most Popular',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop&q=80',
      accentColor: '#FFC700',
      features: ['UV400 Anti-Blue Light Lenses', 'Matte Black Finish', 'Scratch Resistant Coating'],
    },
    {
      id: 'round',
      name: 'Retro Round',
      subtitle: 'Artisanal Intellectual Aesthetics',
      description: 'Slender circular frames inspired by vintage Italian specs with refined keyhole bridge detailing.',
      weight: '36.8g',
      tag: 'New Release',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80',
      accentColor: '#e4e4e7',
      features: ['Ultra-Thin Rim Design', 'Flexible Titanium Nose Pads', 'Anti-Glare Multi-Coating'],
    },
    {
      id: 'aviator',
      name: 'Titanium Aviator',
      subtitle: 'Aerospace Grade Titanium Alloy',
      description: 'Double-bridge aviator frame sculpted from Grade 5 Japanese titanium for unparalleled lightness.',
      weight: '34.5g',
      tag: 'Ultra-Light',
      image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=800&auto=format&fit=crop&q=80',
      accentColor: '#FFD700',
      features: ['Aerospace Grade 5 Titanium', 'Gold PVD Electroplating', 'Polarized TAC Lenses'],
    },
    {
      id: 'clear',
      name: 'Clear Tech Edition',
      subtitle: 'Transparent Cyberpunk Aesthetic',
      description: 'Crystal-clear TR90 thermoplastic frame revealing internal micro-wiring and gold contact pins.',
      weight: '37.9g',
      tag: 'Limited Edition',
      image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=800&auto=format&fit=crop&q=80',
      accentColor: '#38bdf8',
      features: ['Transparent TR90 Polymer', 'Gold Contact Pin Accents', 'Photochromic Sun-Adaptive'],
    },
  ];

  const [activeStyle, setActiveStyle] = useState<FrameStyle>(styles[0]);
  const [lensType, setLensType] = useState<'blue-light' | 'sunglasses' | 'prescription'>('blue-light');

  return (
    <section id="frames" className="py-28 bg-[#050507] border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Modular Frame Detachment</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
              5 Styles. <span className="text-gradient-yellow">One Acoustic Core.</span>
            </h2>
          </div>
          <p className="text-zinc-400 text-sm max-w-md">
            Detach the acoustic smart temples with a single click and attach any frame style to match your daily outfit, business meeting, or workout routine.
          </p>
        </div>

        {/* Interactive Customizer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Selection List */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block mb-2">
              Select Frame Architecture
            </span>

            {styles.map((style) => {
              const isSelected = activeStyle.id === style.id;
              return (
                <button
                  key={style.id}
                  onClick={() => setActiveStyle(style)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all flex items-center justify-between group ${
                    isSelected
                      ? 'bg-zinc-900/90 border-yellow-500/80 shadow-[0_0_20px_rgba(255,199,0,0.15)]'
                      : 'bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs font-mono ${
                        isSelected ? 'bg-yellow-400 text-black' : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      0{styles.indexOf(style) + 1}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white font-heading group-hover:text-yellow-400 transition-colors">
                        {style.name}
                      </div>
                      <div className="text-xs text-zinc-400">{style.subtitle}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded">
                      {style.weight}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-yellow-400" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Preview Card */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-8 border border-zinc-800 flex flex-col justify-between relative overflow-hidden">
            {/* Top Tag & Switcher */}
            <div className="flex items-center justify-between mb-6 z-10">
              <span className="px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-400 text-xs font-mono font-bold border border-yellow-400/30">
                {activeStyle.tag}
              </span>

              {/* Lens Type selector */}
              <div className="flex items-center gap-1 bg-zinc-900/90 p-1 rounded-xl border border-zinc-800 text-xs font-mono">
                {(['blue-light', 'sunglasses', 'prescription'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setLensType(type)}
                    className={`px-3 py-1 rounded-lg transition-all capitalize ${
                      lensType === type
                        ? 'bg-yellow-400 text-black font-bold'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {type.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Frame Image & Glow */}
            <div className="relative h-64 sm:h-80 flex items-center justify-center my-4">
              <div
                className="absolute inset-0 rounded-full blur-[100px] opacity-20 transition-all duration-500 pointer-events-none"
                style={{ backgroundColor: activeStyle.accentColor }}
              />
              <img
                src={activeStyle.image}
                alt={activeStyle.name}
                className="relative z-10 max-h-full max-w-full object-contain rounded-2xl shadow-2xl transition-all duration-500 transform hover:scale-105"
              />
            </div>

            {/* Bottom Specs & Description */}
            <div className="pt-6 border-t border-zinc-800/80 z-10 space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-white font-heading">{activeStyle.name}</h3>
                <p className="text-xs text-zinc-300 mt-1">{activeStyle.description}</p>
              </div>

              {/* Features list */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {activeStyle.features.map((feat) => (
                  <div
                    key={feat}
                    className="flex items-center gap-2 text-[11px] font-mono text-zinc-300 bg-zinc-900/80 px-3 py-2 rounded-xl border border-zinc-800"
                  >
                    <Check className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
