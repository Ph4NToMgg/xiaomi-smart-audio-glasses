import React from 'react';
import { Sparkles, Radio, Layers, Wrench, ShieldCheck, Zap } from 'lucide-react';

interface OverlayContentProps {
  progress: number;
}

export const OverlayContent: React.FC<OverlayContentProps> = ({ progress }) => {
  const heroOpacity = Math.max(0, 1 - progress / 0.15);

  return (
    <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-4 sm:p-8">
      {/* Top Hero Title Banner */}
      <div className="w-full flex flex-col items-center text-center pt-8 sm:pt-12 pointer-events-none">
        <div
          style={{
            opacity: heroOpacity,
            transform: `translateY(${(1 - heroOpacity) * -16}px)`,
            transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
          }}
          className="max-w-2xl w-full pointer-events-none"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-zinc-950/80 text-amber-400 text-[11px] font-mono font-bold tracking-widest uppercase mb-3 border border-amber-500/40 backdrop-blur-md shadow-lg">
            Mijia Smart Audio Eyewear
          </span>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-heading leading-tight drop-shadow-2xl">
            Xiaomi Smart <span className="text-white">Audio Glasses</span>
          </h1>
        </div>
      </div>

      {/* Center Layout: Left & Right Feature Highlight Cards */}
      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-6 pointer-events-none my-auto">
        {/* Left Feature Card: Acoustic Component Disassembly */}
        <div className="glass-studio-gold rounded-2xl p-5 border border-amber-500/40 max-w-xs w-full hidden sm:block pointer-events-none shadow-2xl backdrop-blur-2xl bg-zinc-950/95 space-y-3">
          <div className="flex items-center gap-2 border-b border-amber-500/30 pb-2.5">
            <Wrench className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              ACOUSTIC ARCHITECTURE
            </span>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Driver Area:</span>
              <span className="text-amber-400 font-bold">128mm² Dual Drivers</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Audio Field:</span>
              <span className="text-white font-bold">Directional Sound Beam</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Noise Leakage:</span>
              <span className="text-emerald-400 font-bold">85% Cancelled</span>
            </div>
          </div>

          <p className="text-[11px] text-zinc-300 leading-relaxed pt-1 border-t border-zinc-800">
            Scroll down to view internal dual speakers, micro-wiring, and magnetic hinges disassemble in real-time.
          </p>
        </div>

        {/* Right Feature Card: Modular Style Detachment */}
        <div className="glass-studio rounded-2xl p-5 border border-zinc-800/80 max-w-xs w-full space-y-3 pointer-events-none shadow-2xl backdrop-blur-2xl bg-zinc-950/95">
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-2.5">
            <Layers className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              MODULAR DETACHMENT
            </span>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Swap Speed:</span>
              <span className="text-amber-400 font-bold">2-Second Quick Release</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Ergonomics:</span>
              <span className="text-white font-bold">Featherlight 38.1g</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Protection:</span>
              <span className="text-sky-400 font-bold">IP54 Water Resistant</span>
            </div>
          </div>

          <p className="text-[11px] text-zinc-300 leading-relaxed pt-1 border-t border-zinc-800">
            Patented magnetic latches separate temple arms from frames for instant style switching.
          </p>
        </div>
      </div>
    </div>
  );
};
