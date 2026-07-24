import React, { useState } from 'react';
import { Camera, Sparkles, ZoomIn, Shield, Zap, Sliders, Layers } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  description: string;
  badge: string;
  specs: { label: string; value: string }[];
}

export const ProductGallery: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'speaker-temple',
      title: 'Dual 128mm² Acoustic Drivers',
      subtitle: 'Open-Ear Beamforming Technology',
      category: 'Acoustic Architecture',
      image: '/images/speaker-temple.png',
      badge: 'ACOUSTIC HARDWARE',
      description:
        'Dual micro-speakers embedded inside each temple arm direct audio waves straight into your ear canal while neutralizing external sound leakage through inverse wave cancellation.',
      specs: [
        { label: 'Sound Field', value: 'Directional Beam' },
        { label: 'Leak Reduction', value: '85% Cancelled' },
        { label: 'Frequency Response', value: '60Hz – 20kHz' },
      ],
    },
    {
      id: 'magnetic-hinge',
      title: 'Titanium Quick-Release Hinge',
      subtitle: '2-Second Snap-and-Lock Mechanism',
      category: 'Modular Engineering',
      image: '/images/magnetic-hinge.png',
      badge: 'PATENTED LATCH',
      description:
        'Custom-engineered titanium magnetic latches allow instant separation of the smart audio temples from 5 interchangeable lens frame styles without tools.',
      specs: [
        { label: 'Latch Durability', value: '15,000+ Cycles' },
        { label: 'Material', value: 'Aerospace Titanium' },
        { label: 'Swap Time', value: '< 2 Seconds' },
      ],
    },
    {
      id: 'charging-case',
      title: 'Leather Collector Travel Case',
      subtitle: 'All-Day Fast Magnetic Charging',
      category: 'Luxury Accessories',
      image: '/images/charging-case.png',
      badge: 'TRAVEL POWER',
      description:
        'Crafted from genuine Nappa leather with internal magnetic docking pins. Provides up to 24 hours of total audio playback with 10-minute rapid charging.',
      specs: [
        { label: 'Total Playback', value: '24 Hours' },
        { label: 'Fast Charge', value: '10 Min = 2.5 Hrs' },
        { label: 'Docking', value: 'Pogo Pin Magnetic' },
      ],
    },
    {
      id: 'lifestyle-wear',
      title: 'Featherlight 38.1g Balance',
      subtitle: 'Designed for All-Day Wearability',
      category: 'Ergonomic Design',
      image: '/images/lifestyle-wear.png',
      badge: '5-POINT BALANCE',
      description:
        'Self-adapting skin-friendly nose pads paired with 5-point temple mass distribution eliminate bridge pressure for comfortable all-day wear.',
      specs: [
        { label: 'Weight', value: '38.1 Grams' },
        { label: 'Water Protection', value: 'IP54 Splashproof' },
        { label: 'Nose Pads', value: 'Medical Silicone' },
      ],
    },
  ];

  return (
    <section id="gallery" className="py-28 bg-transparent border-t border-zinc-900/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 relative">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-black/60 rounded-full blur-[80px] pointer-events-none -z-10" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-950/90 border border-amber-500/40 text-amber-400 text-xs font-mono font-bold uppercase tracking-widest mb-4 backdrop-blur-md shadow-xl">
            <Camera className="w-4 h-4" />
            <span>Industrial Design & Macro Showcase</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading mb-4 text-shadow-contrast">
            Crafted in Every <span className="text-white">Single Detail</span>
          </h2>
          <p className="text-zinc-200 text-sm sm:text-base text-shadow-subtle font-medium max-w-xl mx-auto">
            Explore the high-precision aerospace components, titanium latches, and luxury accessories behind Xiaomi Smart Audio Eyewear.
          </p>
        </div>

        {/* Product Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="glass-studio rounded-3xl overflow-hidden border border-zinc-800/80 hover:border-amber-500/50 transition-all duration-300 group cursor-pointer shadow-2xl flex flex-col justify-between"
            >
              {/* Photo Container */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-zinc-950">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Gradient Shadow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/30" />

                {/* Badge Top Left */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-zinc-950/90 border border-amber-500/40 text-amber-400 font-mono text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                  {item.badge}
                </div>

                {/* Zoom Icon Top Right */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-zinc-950/80 border border-zinc-800 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
                  <ZoomIn className="w-4 h-4 text-amber-400" />
                </div>

                {/* Category Bottom Left */}
                <div className="absolute bottom-4 left-4 text-xs font-mono text-zinc-400 font-bold uppercase tracking-widest">
                  {item.category}
                </div>
              </div>

              {/* Card Footer Info */}
              <div className="p-6 space-y-3 bg-zinc-950/90 backdrop-blur-xl border-t border-zinc-800/60">
                <h3 className="text-xl font-bold text-white font-heading group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  {item.description}
                </p>

                {/* Mini Specs Pill Row */}
                <div className="pt-2 flex items-center gap-3 font-mono text-[11px] text-zinc-400 overflow-x-auto">
                  {item.specs.map((spec, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-amber-400/90 shrink-0"
                    >
                      {spec.label}: <strong className="text-white">{spec.value}</strong>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expanded Modal Preview */}
      {selectedItem && (
        <div
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 sm:p-8 animate-fade-in cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass-studio-gold rounded-3xl max-w-3xl w-full border border-amber-500/50 overflow-hidden shadow-2xl relative cursor-default"
          >
            {/* Modal Image */}
            <div className="relative h-80 sm:h-96 w-full bg-zinc-950">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/80 text-white font-bold flex items-center justify-center border border-zinc-700 hover:bg-amber-400 hover:text-black transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Info */}
            <div className="p-8 space-y-4 bg-zinc-950/95 backdrop-blur-2xl">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                {selectedItem.category} • {selectedItem.badge}
              </span>
              <h3 className="text-3xl font-bold text-white font-heading">{selectedItem.title}</h3>
              <p className="text-sm text-zinc-300 leading-relaxed font-sans">{selectedItem.description}</p>

              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-zinc-800 font-mono">
                {selectedItem.specs.map((spec, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-center">
                    <div className="text-xs text-zinc-400">{spec.label}</div>
                    <div className="text-sm font-bold text-amber-400 mt-1">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
