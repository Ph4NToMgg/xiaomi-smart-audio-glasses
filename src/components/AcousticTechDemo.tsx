import React, { useState } from 'react';
import { Volume2, ShieldCheck, Waves, Radio, Activity, Sparkles, Lock, Unlock } from 'lucide-react';

export const AcousticTechDemo: React.FC = () => {
  const [privacyMode, setPrivacyMode] = useState(true);
  const [activeFrequency, setActiveFrequency] = useState(1000);

  return (
    <section id="acoustics" className="relative py-28 bg-transparent border-t border-zinc-900/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase tracking-widest mb-4 backdrop-blur-md">
            <Radio className="w-4 h-4" />
            <span>Directional Sound Architecture</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-extrabold text-white font-heading leading-tight mb-4 drop-shadow-lg">
            Private Sound Field. <br />
            <span className="text-gradient-gold">Zero Ear Fatigue.</span>
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Xiaomi's proprietary reverse sound wave cancellation projects focused audio directly into your ear canal while outputting anti-phase waves to neutralize external leakage.
          </p>
        </div>

        {/* Interactive Sound Simulation Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Interactive Control Card */}
          <div className="lg:col-span-5 glass-studio-gold rounded-3xl p-8 border border-amber-500/30 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest flex items-center gap-2">
                <Activity className="w-4 h-4" />
                ACOUSTIC ENGINE TELEMETRY
              </span>
              <span className="px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-mono font-bold border border-amber-400/30">
                ACTIVE SIMULATION
              </span>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white font-heading">
                Toggle Reverse Sound Field
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Test how anti-phase wave cancellation preserves privacy when sitting in quiet meeting rooms or coffee shops.
              </p>

              {/* Mode Toggle Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => setPrivacyMode(true)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    privacyMode
                      ? 'bg-amber-500/20 border-amber-400 text-white gold-border-glow'
                      : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Lock className={`w-5 h-5 ${privacyMode ? 'text-amber-400' : 'text-zinc-500'}`} />
                    <span className="text-[10px] font-mono uppercase bg-amber-400/20 text-amber-400 px-2 py-0.5 rounded font-bold">
                      PRIVACY ON
                    </span>
                  </div>
                  <div className="font-bold text-sm font-heading text-white">Private Beam</div>
                  <div className="text-[11px] text-amber-400/90 font-mono mt-1">85% Leak Cancelled</div>
                </button>

                <button
                  onClick={() => setPrivacyMode(false)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    !privacyMode
                      ? 'bg-red-500/20 border-red-500 text-white'
                      : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Unlock className="w-5 h-5 text-zinc-500" />
                    <span className="text-[10px] font-mono uppercase bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded">
                      OPEN MODE
                    </span>
                  </div>
                  <div className="font-bold text-sm font-heading text-white">Standard Open</div>
                  <div className="text-[11px] text-zinc-400 font-mono mt-1">Wide Dispersion</div>
                </button>
              </div>
            </div>

            {/* Frequency Slider */}
            <div className="space-y-2 pt-2 border-t border-zinc-800">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400">Audio Frequency Test:</span>
                <span className="text-amber-400 font-bold">{activeFrequency} Hz</span>
              </div>
              <input
                type="range"
                min="60"
                max="12000"
                step="100"
                value={activeFrequency}
                onChange={(e) => setActiveFrequency(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
              />
            </div>

            {/* Metrics Grid */}
            <div className="pt-4 border-t border-zinc-800/80 grid grid-cols-3 gap-3 text-center font-mono">
              <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <div className="text-xl font-bold text-amber-400 font-heading">128mm²</div>
                <div className="text-[10px] text-zinc-400">Driver Area</div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <div className="text-xl font-bold text-white font-heading">60Hz-20k</div>
                <div className="text-[10px] text-zinc-400">Freq Range</div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <div className="text-xl font-bold text-amber-400 font-heading">&lt; 0.5s</div>
                <div className="text-[10px] text-zinc-400">Latency</div>
              </div>
            </div>
          </div>

          {/* Right Equalizer & Beam Wave Visualizer */}
          <div className="lg:col-span-7 glass-studio rounded-3xl p-8 border border-zinc-800 relative overflow-hidden flex flex-col items-center justify-center min-h-[420px]">
            {/* Visual Ear Diagram & Beam Lines */}
            <div className="relative w-full max-w-md h-72 flex items-center justify-center">
              {/* Central Ear Silhouette Icon */}
              <div className="relative z-10 w-28 h-28 rounded-full bg-zinc-950/90 border-2 border-amber-500/50 flex flex-col items-center justify-center gold-glow">
                <Waves className="w-10 h-10 text-amber-400 animate-pulse" />
                <span className="text-[10px] font-mono text-zinc-400 mt-1 font-bold">EAR CANAL</span>
              </div>

              {/* Sound Rays */}
              {privacyMode ? (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-56 h-56 rounded-full border border-amber-400/40 animate-ping opacity-30" />
                  <div className="w-72 h-72 rounded-full border border-dashed border-amber-400/20" />
                  <div className="absolute top-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 text-[11px] font-mono font-bold flex items-center gap-1.5 backdrop-blur-md">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>✓ Anti-Phase Sound Beam Active</span>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-72 h-72 rounded-full border-2 border-red-500/40 animate-pulse opacity-50" />
                  <div className="absolute top-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 text-[11px] font-mono font-bold backdrop-blur-md">
                    ⚠ Ambient Sound Leakage Detected
                  </div>
                </div>
              )}

              {/* Equalizer Frequency Bars */}
              <div className="absolute bottom-2 flex items-end gap-1.5 h-20">
                {[45, 70, 35, 90, 100, 60, 80, 50, 95, 65, 85, 40, 75, 55, 92].map((h, i) => (
                  <div
                    key={i}
                    className={`w-2 rounded-t transition-all duration-300 ${
                      privacyMode ? 'bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'bg-red-500'
                    }`}
                    style={{
                      height: `${privacyMode ? (h * activeFrequency) / 4000 + 20 : h * 0.4}%`,
                      opacity: 0.5 + (i % 3) * 0.25,
                    }}
                  />
                ))}
              </div>
            </div>

            <p className="text-xs font-mono text-zinc-300 text-center mt-6 max-w-sm">
              {privacyMode
                ? 'Sound energy is tightly focused into ear canal. Ambient sound leak minimized.'
                : 'Wide sound wave dispersion. People nearby may hear audio output.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
