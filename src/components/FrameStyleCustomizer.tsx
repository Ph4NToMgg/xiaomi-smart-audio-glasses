import React, { useState } from 'react';
import { Check, RefreshCw, Sun, Eye, ShieldCheck, Sparkles } from 'lucide-react';

interface FrameStyleItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  weight: string;
  tag: string;
  image: string;
  accentColor: string;
  features: string[];
}

export const FrameStyleCustomizer: React.FC = () => {
  const styles: FrameStyleItem[] = [
    {
      id: 'browline',
      name: 'Browline Classic',
      subtitle: 'Composed Classic Aesthetics',
      description: 'Iconic thick-top browline frame crafted from high-density NCVM coated acetate with matte finish.',
      weight: '38.1g',
      tag: 'Official Best Seller',
      image: '/images/style-browline.png',
      accentColor: '#FFC700',
      features: ['High-Density NCVM Coating', 'Ergonomic 5-Point Balance', 'Scratch Resistant Surface'],
    },
    {
      id: 'round',
      name: 'Retro Round Acetate',
      subtitle: 'Artisanal Intellectual Elegance',
      description: 'Slender circular frames inspired by vintage Italian specs with refined keyhole bridge detailing.',
      weight: '36.8g',
      tag: 'New Release',
      image: '/images/style-round.png',
      accentColor: '#e4e4e7',
      features: ['Ultra-Thin Rim Design', 'Flexible Titanium Nose Pads', 'Anti-Glare Multi-Coating'],
    },
    {
      id: 'aviator',
      name: 'Pilot Aviator',
      subtitle: 'Classic Sunglasses Double-Bridge',
      description: 'Double-bridge aviator pilot frame sculpted from aerospace grade titanium alloy for statement style.',
      weight: '35.2g',
      tag: 'Pilot Edition',
      image: '/images/style-aviator.png',
      accentColor: '#FFD700',
      features: ['Aerospace Titanium Alloy', 'Gold PVD Electroplating', 'Double Bridge Reinforced'],
    },
    {
      id: 'titanium',
      name: 'Titanium Floating Rim',
      subtitle: 'Ultra-Light Rimless Architecture',
      description: 'Minimalist floating-frame design contouring facial lines. The lightest frame option in the lineup.',
      weight: '34.5g',
      tag: 'Ultra-Light (34.5g)',
      image: '/images/style-titanium.png',
      accentColor: '#38bdf8',
      features: ['Floating Rimless Optics', 'Grade 5 Japanese Titanium', 'Invisible Contact Pins'],
    },
  ];

  const [activeStyle, setActiveStyle] = useState<FrameStyleItem>(styles[0]);
  const [lensType, setLensType] = useState<'blue-light' | 'sunglasses' | 'prescription'>('sunglasses');

  // Lens configurations
  const lensConfigs = {
    'blue-light': {
      label: 'Blue Light Blocking',
      badge: 'UV400 Anti-Blue Filter',
      icon: <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />,
      description: 'Filters 99% of harmful 415-455nm blue light emitted from OLED screens and laptops.',
      overlayClass: 'bg-sky-500/10 mix-blend-screen border-sky-400/30',
      lensBadge: 'CLEAR UV400',
    },
    'sunglasses': {
      label: 'Dark Sunglasses TAC',
      badge: 'TAC Polarized UV400',
      icon: <Sun className="w-3.5 h-3.5 text-yellow-400" />,
      description: 'Category 3 dark polarized lenses eliminating reflections from water, snow, and windshields.',
      overlayClass: 'bg-black/60 backdrop-brightness-75 border-yellow-500/40',
      lensBadge: 'DARK POLARIZED',
    },
    'prescription': {
      label: 'Prescription / Transitions',
      badge: 'Photochromic Adaptive',
      icon: <Eye className="w-3.5 h-3.5 text-purple-400" />,
      description: 'Custom diopter optical compatibility with photochromic automatic darkening in sunlight.',
      overlayClass: 'bg-purple-900/15 backdrop-hue-rotate-30 border-purple-400/30',
      lensBadge: 'TRANSITION ADAPTIVE',
    },
  };

  const currentLens = lensConfigs[lensType];

  return (
    <section id="frames" className="py-24 bg-transparent border-t border-zinc-900/60 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-yellow-500/30 text-yellow-400 text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-md">
              <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
              <span>Modular Frame Detachment</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
              5 Styles. <span className="text-gradient-gold">One Acoustic Core.</span>
            </h2>
          </div>
          <p className="text-zinc-300 text-sm max-w-md">
            Detach the acoustic smart temples with a single click and swap between Browline, Pilot, Round, or Titanium frames instantly.
          </p>
        </div>

        {/* Interactive Customizer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Selection List (Frame Styles 01 - 04) */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block mb-2 font-bold">
              SELECT FRAME ARCHITECTURE
            </span>

            {styles.map((style, idx) => {
              const isSelected = activeStyle.id === style.id;
              return (
                <button
                  key={style.id}
                  onClick={() => setActiveStyle(style)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all flex items-center justify-between group cursor-pointer backdrop-blur-xl ${
                    isSelected
                      ? 'bg-zinc-900/95 border-yellow-500/90 shadow-[0_0_25px_rgba(255,199,0,0.25)]'
                      : 'bg-zinc-950/90 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/80'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs font-mono transition-colors ${
                        isSelected ? 'bg-yellow-400 text-black font-extrabold' : 'bg-zinc-800 text-zinc-300'
                      }`}
                    >
                      0{idx + 1}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white font-heading group-hover:text-yellow-400 transition-colors">
                        {style.name}
                      </div>
                      <div className="text-xs text-zinc-300">{style.subtitle}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-zinc-300 bg-zinc-900/90 border border-zinc-800 px-2.5 py-1 rounded-lg">
                      {style.weight}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-yellow-400" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Interactive Preview Card */}
          <div className="lg:col-span-7 glass-studio rounded-3xl p-8 border border-zinc-800 flex flex-col justify-between relative overflow-hidden">
            {/* Top Tag & Interactive Lens Selector Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 z-10">
              <span className="px-3.5 py-1.5 rounded-full bg-zinc-900/90 text-yellow-400 text-xs font-mono font-bold border border-yellow-400/40 w-fit backdrop-blur-md">
                {activeStyle.tag}
              </span>

              {/* Interactive Lens Type Switcher Buttons */}
              <div className="flex items-center gap-1 bg-zinc-950/95 backdrop-blur-xl p-1.5 rounded-xl border border-zinc-800 text-xs font-mono">
                {(['blue-light', 'sunglasses', 'prescription'] as const).map((type) => {
                  const isActive = lensType === type;
                  return (
                    <button
                      key={type}
                      onClick={() => setLensType(type)}
                      className={`px-3.5 py-1.5 rounded-lg transition-all capitalize font-bold cursor-pointer ${
                        isActive
                          ? 'bg-yellow-400 text-black shadow-[0_0_15px_rgba(255,199,0,0.5)]'
                          : 'text-zinc-300 hover:text-white hover:bg-zinc-800/80'
                      }`}
                    >
                      {type === 'blue-light' ? 'Blue Light' : type === 'sunglasses' ? 'Sunglasses' : 'Prescription'}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Frame Image Showcase Container with Real-Time Lens Filter */}
            <div className="relative h-72 sm:h-96 flex items-center justify-center my-2 rounded-2xl overflow-hidden bg-black/90 border border-zinc-800/80 shadow-2xl">
              {/* Dynamic Accent Lighting */}
              <div
                className="absolute inset-0 blur-[100px] opacity-25 pointer-events-none transition-all duration-700"
                style={{ backgroundColor: activeStyle.accentColor }}
              />

              {/* Active Product Image */}
              <img
                key={activeStyle.id}
                src={activeStyle.image}
                alt={activeStyle.name}
                className="relative z-10 w-full h-full object-contain p-4 transition-all duration-500 transform hover:scale-105"
              />

              {/* Real-time Lens Filter Overlay Layer */}
              <div
                className={`absolute inset-0 z-20 transition-all duration-500 pointer-events-none border-2 ${currentLens.overlayClass}`}
              />

              {/* Active Lens Status Badge in top corner of image */}
              <div className="absolute top-4 left-4 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-950/90 border border-zinc-800 backdrop-blur-xl text-[11px] font-mono text-zinc-300">
                {currentLens.icon}
                <span className="font-bold text-white">{currentLens.lensBadge}</span>
              </div>
            </div>

            {/* Bottom Specs, Description & Lens Info */}
            <div className="pt-6 border-t border-zinc-800/80 z-10 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-2xl font-bold text-white font-heading">{activeStyle.name}</h3>
                  <p className="text-xs text-zinc-300 mt-1">{activeStyle.description}</p>
                </div>
              </div>

              {/* Lens Explanation Banner */}
              <div className="p-3.5 rounded-xl bg-zinc-950/90 backdrop-blur-xl border border-zinc-800 text-xs font-mono text-zinc-300 flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-yellow-400 shrink-0" />
                <div>
                  <span className="text-yellow-400 font-bold">{currentLens.label}: </span>
                  <span>{currentLens.description}</span>
                </div>
              </div>

              {/* Features list */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {activeStyle.features.map((feat) => (
                  <div
                    key={feat}
                    className="flex items-center gap-2 text-[11px] font-mono text-zinc-200 bg-zinc-950/90 backdrop-blur-xl px-3 py-2 rounded-xl border border-zinc-800"
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
