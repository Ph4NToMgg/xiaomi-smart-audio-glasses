import React from 'react';
import { Sparkles, Radio, Layers, Wrench } from 'lucide-react';

interface OverlayContentProps {
  progress: number;
}

export const OverlayContent: React.FC<OverlayContentProps> = ({ progress }) => {
  const getCurrentPhase = () => {
    if (progress < 0.25) return { num: '01', name: '360° DESIGN', icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" /> };
    if (progress < 0.50) return { num: '02', name: 'ACOUSTICS', icon: <Radio className="w-3.5 h-3.5 text-amber-400" /> };
    if (progress < 0.75) return { num: '03', name: 'EXPLODED VIEW', icon: <Wrench className="w-3.5 h-3.5 text-amber-400" /> };
    return { num: '04', name: 'MODULAR DISASSEMBLY', icon: <Layers className="w-3.5 h-3.5 text-amber-400" /> };
  };

  const phase = getCurrentPhase();
  const heroOpacity = Math.max(0, 1 - progress / 0.15);

  return (
    <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-4 sm:p-8">
      {/* Top Hero Title */}
      <div className="w-full flex flex-col items-center text-center pt-12 sm:pt-16 pointer-events-none">
        <div
          style={{
            opacity: heroOpacity,
            transform: `translateY(${(1 - heroOpacity) * -16}px)`,
            transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
          }}
          className="max-w-2xl w-full pointer-events-none"
        >
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-[11px] font-mono font-bold tracking-widest uppercase mb-3 border border-amber-500/30">
            Mijia Smart Audio Eyewear
          </span>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-heading leading-tight">
            Xiaomi Smart <span className="text-gradient-gold">Audio Glasses</span>
          </h1>
        </div>
      </div>

      {/* Center Layout: Sidebar Telemetry Docks */}
      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-6 pointer-events-none">
        {/* Left Telemetry Box */}
        <div className="glass-studio rounded-2xl p-4 sm:p-5 border border-zinc-800/80 space-y-4 max-w-xs w-full hidden sm:block pointer-events-none">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
              {phase.icon}
              <span>PHASE {phase.num}</span>
            </div>
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">{phase.name}</span>
          </div>

          <div className="space-y-2 font-mono text-xs text-zinc-300">
            <div className="flex items-center justify-between">
              <span className="text-zinc-500">View Mode:</span>
              <span className="text-amber-400 font-bold">
                {progress < 0.5 ? '360° Rotation' : 'Exploded Disassembly'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-500">Component State:</span>
              <span className={progress < 0.5 ? 'text-emerald-400 font-bold' : 'text-sky-400 font-bold'}>
                {progress < 0.5 ? 'Assembled' : 'Detached / Exploded'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-500">Audio Field:</span>
              <span className="text-white font-bold">Directional Beam</span>
            </div>
          </div>

          {/* Timeline Mini Bar */}
          <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden border border-zinc-800">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-75"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>

        {/* Right Dynamic Storytelling Card */}
        <div className="glass-studio-gold rounded-2xl p-5 border border-amber-500/30 max-w-sm w-full space-y-3 pointer-events-none">
          {progress < 0.25 && (
            <div>
              <span className="text-[10px] font-mono text-amber-400 font-bold tracking-widest uppercase block mb-1">
                01 • DESIGN PHILOSOPHY
              </span>
              <h3 className="text-lg font-bold text-white font-heading">Featherlight 38.1g Balance</h3>
              <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                Self-adapting skin-friendly nose pads paired with 5-point balance distribution for all-day zero fatigue.
              </p>
            </div>
          )}

          {progress >= 0.25 && progress < 0.50 && (
            <div>
              <span className="text-[10px] font-mono text-amber-400 font-bold tracking-widest uppercase block mb-1">
                02 • ACOUSTIC BEAM ENGINE
              </span>
              <h3 className="text-lg font-bold text-white font-heading">Dual 128mm² Drivers</h3>
              <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                Proprietary reverse acoustic wave cancellation reduces sound leakage by 85% for complete privacy.
              </p>
            </div>
          )}

          {progress >= 0.50 && progress < 0.75 && (
            <div>
              <span className="text-[10px] font-mono text-amber-400 font-bold tracking-widest uppercase block mb-1">
                03 • EXPLODED DISASSEMBLY
              </span>
              <h3 className="text-lg font-bold text-white font-heading">Internal Acoustic Architecture</h3>
              <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                Witness internal dual speakers, titanium hinge assemblies, and micro-wiring separate in real-time scroll.
              </p>
            </div>
          )}

          {progress >= 0.75 && (
            <div>
              <span className="text-[10px] font-mono text-amber-400 font-bold tracking-widest uppercase block mb-1">
                04 • MODULAR LATCH SYSTEM
              </span>
              <h3 className="text-lg font-bold text-white font-heading">2-Second Quick-Release</h3>
              <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                Patented magnetic latches separate temple arms from frames for instant style switching.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
