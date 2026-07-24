import React, { useState } from 'react';
import { ShoppingBag, Check, ShieldCheck, Truck, RefreshCw, Star, Sparkles } from 'lucide-react';

export const BuySection: React.FC = () => {
  const [selectedEdition, setSelectedEdition] = useState<'standard' | 'deluxe'>('standard');

  return (
    <section id="buy" className="py-28 bg-transparent border-t border-zinc-900/60 relative overflow-hidden">
      {/* Background ambient yellow radial spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-yellow-500/30 text-yellow-400 text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch Pre-Order Package</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-extrabold text-white font-heading leading-tight mb-4">
            Step Into <span className="text-gradient-gold">Acoustic Vision</span>
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base">
            Includes 1-Year Xiaomi Official Warranty, 30-Day Money-Back Guarantee, and Free Express Global Shipping.
          </p>
        </div>

        {/* Pricing Cards Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* STANDARD EDITION */}
          <div
            onClick={() => setSelectedEdition('standard')}
            className={`glass-studio rounded-3xl p-8 border cursor-pointer transition-all relative flex flex-col justify-between ${
              selectedEdition === 'standard'
                ? 'border-yellow-500/90 gold-border-glow shadow-2xl'
                : 'border-zinc-800 hover:border-zinc-700 opacity-90'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-bold">
                  ESSENTIAL PACKAGE
                </span>
                {selectedEdition === 'standard' && (
                  <span className="w-6 h-6 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold text-xs">
                    ✓
                  </span>
                )}
              </div>

              <h3 className="text-2xl font-bold text-white font-heading mb-2">Standard Edition</h3>
              <p className="text-xs text-zinc-300 mb-6">
                Complete acoustic smart temples with 1 pre-selected frame architecture and magnetic charger.
              </p>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-extrabold text-white font-heading">$199</span>
                <span className="text-xs font-mono text-zinc-500 line-through">$249</span>
                <span className="text-[10px] font-mono font-bold bg-yellow-400/20 text-yellow-400 px-2 py-0.5 rounded border border-yellow-400/30">
                  Save $50
                </span>
              </div>

              <ul className="space-y-3 mb-8 text-xs font-mono text-zinc-200">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-yellow-400 shrink-0" />
                  <span>Smart Audio Temple Arms Pair</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-yellow-400 shrink-0" />
                  <span>1 Choice of Frame (Wayfarer or Round)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-yellow-400 shrink-0" />
                  <span>Magnetic Fast Charger Cable</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-yellow-400 shrink-0" />
                  <span>Microfiber Cleaning Cloth & Hardshell Case</span>
                </li>
              </ul>
            </div>

            <button className="w-full py-3.5 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-xs uppercase font-heading tracking-wide transition-all shadow-[0_0_20px_rgba(255,199,0,0.4)] cursor-pointer">
              Pre-Order Standard — $199
            </button>
          </div>

          {/* DELUXE GIFT EDITION */}
          <div
            onClick={() => setSelectedEdition('deluxe')}
            className={`glass-studio-gold rounded-3xl p-8 border cursor-pointer transition-all relative flex flex-col justify-between ${
              selectedEdition === 'deluxe'
                ? 'border-yellow-400 gold-border-glow shadow-2xl'
                : 'border-yellow-500/30 hover:border-yellow-500/60 opacity-90'
            }`}
          >
            {/* Best Value Badge */}
            <div className="absolute -top-3.5 right-8 px-3.5 py-1 rounded-full bg-yellow-400 text-black text-[10px] font-extrabold uppercase font-mono shadow-md">
              BEST VALUE GIFT SET
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-yellow-400 uppercase tracking-widest font-bold">
                  COLLECTOR'S BUNDLE
                </span>
                {selectedEdition === 'deluxe' && (
                  <span className="w-6 h-6 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold text-xs">
                    ✓
                  </span>
                )}
              </div>

              <h3 className="text-2xl font-bold text-white font-heading mb-2">Deluxe 3-Frame Set</h3>
              <p className="text-xs text-zinc-300 mb-6">
                Includes smart acoustic temples + 3 interchangeable frames (Wayfarer + Aviator + Clear Tech).
              </p>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-extrabold text-yellow-400 font-heading">$279</span>
                <span className="text-xs font-mono text-zinc-500 line-through">$379</span>
                <span className="text-[10px] font-mono font-bold bg-yellow-400 text-black px-2 py-0.5 rounded">
                  Save $100
                </span>
              </div>

              <ul className="space-y-3 mb-8 text-xs font-mono text-zinc-200">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-yellow-400 shrink-0" />
                  <span>Smart Audio Temple Arms Pair</span>
                </li>
                <li className="flex items-center gap-2 font-bold text-white">
                  <Check className="w-4 h-4 text-yellow-400 shrink-0" />
                  <span>3 Interchangeable Frame Styles</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-yellow-400 shrink-0" />
                  <span>Polarized Sunglasses Lenses Included</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-yellow-400 shrink-0" />
                  <span>Leather Collector's Travel Charging Case</span>
                </li>
              </ul>
            </div>

            <button className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 text-black font-extrabold text-xs uppercase font-heading tracking-wide transition-all shadow-[0_0_25px_rgba(255,199,0,0.4)] hover:scale-[1.02] cursor-pointer">
              Pre-Order Deluxe Set — $279
            </button>
          </div>
        </div>

        {/* Guarantees Bar */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-center font-mono text-xs text-zinc-300">
          <div className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-zinc-950/90 backdrop-blur-xl border border-zinc-800">
            <Truck className="w-4 h-4 text-yellow-400" />
            <span>Free Worldwide Express Shipping</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-zinc-950/90 backdrop-blur-xl border border-zinc-800">
            <RefreshCw className="w-4 h-4 text-yellow-400" />
            <span>30-Day Risk-Free Returns</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-zinc-950/90 backdrop-blur-xl border border-zinc-800">
            <ShieldCheck className="w-4 h-4 text-yellow-400" />
            <span>1-Year Xiaomi Official Warranty</span>
          </div>
        </div>
      </div>
    </section>
  );
};
