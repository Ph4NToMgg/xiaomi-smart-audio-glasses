import React, { useState } from 'react';
import { Volume2, ShieldCheck, Waves, Sparkles, Radio } from 'lucide-react';

export const AcousticTechDemo: React.FC = () => {
  const [privacyMode, setPrivacyMode] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <section id="acoustics" className="relative py-28 bg-[#07070a] border-t border-zinc-900 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-yellow-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Radio className="w-3.5 h-3.5" />
            <span>Directional Sound Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading leading-tight mb-4">
            Private Sound Field. <br />
            <span className="text-gradient-yellow">Zero Ear Fatigue.</span>
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Xiaomi's proprietary reverse sound field cancellation technology projects acoustic waves directly into your ear canal while sending anti-phase sound waves outwards to preserve conversation confidentiality.
          </p>
        </div>

        {/* Interactive Sound Simulation Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Control Card */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-8 border border-zinc-800 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                Interactive Acoustics Demo
              </span>
              <span className="px-2.5 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-[10px] font-mono font-bold">
                SIMULATION ACTIVE
              </span>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white font-heading">
                Toggle Acoustic Privacy Engine
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Test how reversed sound wave cancellation minimizes ambient sound bleed when sitting in a quiet office or coffee shop.
              </p>

              {/* Mode Toggle Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => setPrivacyMode(true)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    privacyMode
                      ? 'bg-yellow-500/15 border-yellow-500 text-white yellow-border-glow'
                      : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <ShieldCheck className={`w-5 h-5 ${privacyMode ? 'text-yellow-400' : 'text-zinc-500'}`} />
                    <span className="text-[10px] font-mono uppercase bg-yellow-400/20 text-yellow-400 px-2 py-0.5 rounded">
                      Recommended
                    </span>
                  </div>
                  <div className="font-bold text-sm font-heading text-white">Private Beam</div>
                  <div className="text-[11px] text-zinc-400 font-mono mt-1">85% Leak Reduction</div>
                </button>

                <button
                  onClick={() => setPrivacyMode(false)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    !privacyMode
                      ? 'bg-zinc-800 border-zinc-600 text-white'
                      : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Volume2 className="w-5 h-5 text-zinc-500" />
                  </div>
                  <div className="font-bold text-sm font-heading text-white">Standard Open</div>
                  <div className="text-[11px] text-zinc-400 font-mono mt-1">Wide Ambient Field</div>
                </button>
              </div>
            </div>

            {/* Metrics */}
            <div className="pt-4 border-t border-zinc-800/80 grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-xl bg-zinc-900/50">
                <div className="text-xl font-bold text-yellow-400 font-heading">128mm²</div>
                <div className="text-[10px] text-zinc-500 font-mono">Driver Area</div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/50">
                <div className="text-xl font-bold text-white font-heading">60Hz-20k</div>
                <div className="text-[10px] text-zinc-500 font-mono">Freq Range</div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/50">
                <div className="text-xl font-bold text-yellow-400 font-heading">0.5s</div>
                <div className="text-[10px] text-zinc-500 font-mono">Latency</div>
              </div>
            </div>
          </div>

          {/* Right Equalizer & Beam Visualizer */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-8 border border-zinc-800 relative overflow-hidden flex flex-col items-center justify-center min-h-[380px]">
            {/* Visual Ear Diagram & Beam Lines */}
            <div className="relative w-full max-w-md h-64 flex items-center justify-center">
              {/* Central Ear Silhouette Icon */}
              <div className="relative z-10 w-24 h-24 rounded-full bg-zinc-900 border-2 border-yellow-500/40 flex items-center justify-center yellow-glow">
                <Waves className="w-10 h-10 text-yellow-400 animate-pulse" />
                <span className="absolute -bottom-6 text-[11px] font-mono text-zinc-400">Ear Canal</span>
              </div>

              {/* Sound Rays */}
              {privacyMode ? (
                // Focused Privacy Rays
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-48 h-48 rounded-full border border-yellow-500/40 animate-ping opacity-30" />
                  <div className="w-64 h-64 rounded-full border border-dashed border-yellow-400/20" />
                  <div className="absolute top-4 px-3 py-1 rounded-full bg-yellow-400/20 border border-yellow-400/40 text-yellow-400 text-[11px] font-mono">
                    ✓ Anti-Phase Cancellation Active
                  </div>
                </div>
              ) : (
                // Standard Wide Dispersion
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-64 h-64 rounded-full border border-red-500/30 animate-pulse opacity-40" />
                  <div className="absolute top-4 px-3 py-1 rounded-full bg-zinc-800 text-zinc-400 text-[11px] font-mono">
                    ⚠ Standard sound dispersion
                  </div>
                </div>
              )}

              {/* Equalizer Bars */}
              <div className="absolute bottom-2 flex items-end gap-1.5 h-16">
                {[40, 65, 30, 85, 95, 50, 75, 45, 90, 60, 80, 35, 70, 55, 88].map((h, i) => (
                  <div
                    key={i}
                    className={`w-1.5 rounded-t transition-all duration-300 ${
                      privacyMode ? 'bg-yellow-400' : 'bg-zinc-600'
                    }`}
                    style={{
                      height: `${privacyMode ? h : h * 0.5}%`,
                      opacity: 0.4 + (i % 3) * 0.2,
                    }}
                  />
                ))}
              </div>
            </div>

            <p className="text-xs font-mono text-zinc-400 text-center mt-6">
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
