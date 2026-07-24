import React from 'react';
import { Volume2, Sparkles, Layers, Sliders, BatteryCharging, Compass, Radio, ShieldCheck } from 'lucide-react';

interface OverlayContentProps {
  progress: number;
}

export const OverlayContent: React.FC<OverlayContentProps> = ({ progress }) => {
  // Angle calculation for 360 degree product showcase telemetry
  const angle = Math.round(progress * 360);

  // Helper to determine current phase (1 to 5)
  const getCurrentPhase = () => {
    if (progress < 0.2) return { num: '01', name: 'OVERVIEW', icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" /> };
    if (progress < 0.4) return { num: '02', name: 'ACOUSTICS', icon: <Radio className="w-3.5 h-3.5 text-amber-400" /> };
    if (progress < 0.6) return { num: '03', name: 'MODULARITY', icon: <Layers className="w-3.5 h-3.5 text-amber-400" /> };
    if (progress < 0.8) return { num: '04', name: 'TOUCH & AI', icon: <Sliders className="w-3.5 h-3.5 text-amber-400" /> };
    return { num: '05', name: 'BATTERY POWER', icon: <BatteryCharging className="w-3.5 h-3.5 text-amber-400" /> };
  };

  const phase = getCurrentPhase();

  // Opacity of startup hero title
  const heroOpacity = Math.max(0, 1 - progress / 0.12);

  return (
    <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 md:p-10">
      {/* Top Bar: Hero Title (fades away smoothly upon scrolling) */}
      <div className="w-full flex flex-col items-center text-center pt-16">
        <div
          style={{
            opacity: heroOpacity,
            transform: `translateY(${(1 - heroOpacity) * -16}px)`,
            transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
          }}
          className="max-w-2xl w-full"
        >
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-[11px] font-mono font-bold tracking-widest uppercase mb-3 border border-amber-500/30">
            Mijia Smart Audio Eyewear
          </span>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-heading leading-tight">
            Xiaomi Smart <span className="text-gradient-gold">Audio Glasses</span>
          </h1>
        </div>
      </div>

      {/* Center Layout: Telemetry Docks flanking the framed canvas */}
      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-6 pointer-events-auto">
        {/* Left Telemetry Box */}
        <div className="glass-studio rounded-2xl p-4 md:p-5 border border-zinc-800/80 space-y-4 max-w-xs w-full hidden sm:block">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
              {phase.icon}
              <span>PHASE {phase.num}</span>
            </div>
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">{phase.name}</span>
          </div>

          <div className="space-y-2 font-mono text-xs text-zinc-300">
            <div className="flex items-center justify-between">
              <span className="text-zinc-500">Rotation Angle:</span>
              <span className="text-amber-400 font-bold">{angle}° / 360°</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-500">Total Weight:</span>
              <span className="text-white">38.1g Ultra-Light</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-500">Audio Field:</span>
              <span className="text-emerald-400 font-bold">Directional Beam</span>
            </div>
          </div>

          {/* Timeline Mini Bar */}
          <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden border border-zinc-800">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-100"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>

        {/* Right Dynamic Storytelling Card */}
        <div className="glass-studio-gold rounded-2xl p-5 border border-amber-500/30 max-w-sm w-full space-y-3">
          {progress < 0.2 && (
            <div>
              <span className="text-[10px] font-mono text-amber-400 font-bold tracking-widest uppercase block mb-1">
                01 • DESIGN PHILOSOPHY
              </span>
              <h3 className="text-lg font-bold text-white font-heading">Featherlight Ergonomics</h3>
              <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                Self-adapting skin-friendly nose pads paired with 5-point balance distribution for all-day zero fatigue.
              </p>
            </div>
          )}

          {progress >= 0.2 && progress < 0.4 && (
            <div>
              <span className="text-[10px] font-mono text-amber-400 font-bold tracking-widest uppercase block mb-1">
                02 • ACOUSTIC BEAM ENGINE
              </span>
              <h3 className="text-lg font-bold text-white font-heading">Dual 128mm² Balance Drivers</h3>
              <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                Proprietary reverse acoustic wave cancellation reduces sound leakage by 85% for total privacy.
              </p>
            </div>
          )}

          {progress >= 0.4 && progress < 0.6 && (
            <div>
              <span className="text-[10px] font-mono text-amber-400 font-bold tracking-widest uppercase block mb-1">
                03 • MODULAR ARCHITECTURE
              </span>
              <h3 className="text-lg font-bold text-white font-heading">Quick-Release Magnetic Frame</h3>
              <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                Detach acoustic temple arms in 2 seconds and switch between Wayfarer, Aviator, Round, or Titanium frames.
              </p>
            </div>
          )}

          {progress >= 0.6 && progress < 0.8 && (
            <div>
              <span className="text-[10px] font-mono text-amber-400 font-bold tracking-widest uppercase block mb-1">
                04 • HAPTICS & DUAL MIC
              </span>
              <h3 className="text-lg font-bold text-white font-heading">30mm Capacitive Touch Strip</h3>
              <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                Swipe volume control & double-tap call answer. AI algorithm cancels wind noise during calls.
              </p>
            </div>
          )}

          {progress >= 0.8 && (
            <div>
              <span className="text-[10px] font-mono text-amber-400 font-bold tracking-widest uppercase block mb-1">
                05 • POWER & ENDURANCE
              </span>
              <h3 className="text-lg font-bold text-white font-heading">11 Hours Non-Stop Playback</h3>
              <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                Fast magnetic charging gives 2 hours of music listening from a quick 10-minute charge.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Footer Telemetry */}
      <div className="w-full flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-4 border-t border-zinc-900/80">
        <span>SCROLL TO ROTATE 360° FRAME SEQUENCE</span>
        <span className="text-amber-400 font-bold">{Math.round(progress * 100)}% EXPLORED</span>
      </div>
    </div>
  );
};
