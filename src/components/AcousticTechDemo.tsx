import React, { useState } from 'react';
import { ShieldCheck, Waves, Radio, Activity, Lock, Unlock, Zap, Volume2 } from 'lucide-react';

export const AcousticTechDemo: React.FC = () => {
  const [privacyMode, setPrivacyMode] = useState(true);
  const [activeFrequency, setActiveFrequency] = useState(1000);

  return (
    <section id="acoustics" className="relative py-28 bg-transparent border-t border-zinc-900/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 relative">
          {/* Ambient Dark Radial Vignette behind header */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-black/60 rounded-full blur-[80px] pointer-events-none -z-10" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-950/90 border border-amber-500/40 text-amber-400 text-xs font-mono font-bold uppercase tracking-widest mb-4 backdrop-blur-md shadow-xl">
            <Radio className="w-4 h-4" />
            <span>Directional Sound Architecture</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-extrabold text-white font-heading leading-tight mb-4 drop-shadow-2xl text-shadow-contrast">
            Private Sound Field. <br />
            <span className="text-white">Zero Ear Fatigue.</span>
          </h2>

          <p className="text-zinc-200 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto text-shadow-subtle font-medium">
            Xiaomi's proprietary reverse sound wave cancellation projects focused audio directly into your ear canal while outputting anti-phase waves to neutralize external leakage.
          </p>
        </div>

        {/* Interactive Acoustic Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Interactive Telemetry & Control Card */}
          <div className="lg:col-span-5 glass-studio-gold rounded-3xl p-6 sm:p-8 border border-amber-500/40 space-y-6 shadow-2xl">
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
                      ? 'bg-amber-500/20 border-amber-400 text-white gold-border-glow shadow-lg'
                      : 'bg-zinc-950/80 border-zinc-800 text-zinc-400 hover:border-zinc-700'
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
                      ? 'bg-red-500/20 border-red-500 text-white shadow-lg'
                      : 'bg-zinc-950/80 border-zinc-800 text-zinc-400 hover:border-zinc-700'
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
              <div className="p-3 rounded-xl bg-zinc-950/90 border border-zinc-800">
                <div className="text-xl font-bold text-amber-400 font-heading">128mm²</div>
                <div className="text-[10px] text-zinc-400">Driver Area</div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-950/90 border border-zinc-800">
                <div className="text-xl font-bold text-white font-heading">60Hz-20k</div>
                <div className="text-[10px] text-zinc-400">Freq Range</div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-950/90 border border-zinc-800">
                <div className="text-xl font-bold text-amber-400 font-heading">&lt; 0.5s</div>
                <div className="text-[10px] text-zinc-400">Latency</div>
              </div>
            </div>
          </div>

          {/* Right Column: Real Macro Product Photo with Dynamic Sound Beam Overlay */}
          <div className="lg:col-span-7 glass-studio rounded-3xl p-6 sm:p-8 border border-zinc-800/80 relative overflow-hidden flex flex-col justify-between min-h-[460px] shadow-2xl">
            {/* Top Bar Status */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-4 relative z-10 font-mono text-xs">
              <span className="text-amber-400 font-bold uppercase tracking-wider flex items-center gap-2">
                <Waves className="w-4 h-4" />
                ACOUSTIC SPEAKER GRILL & EAR CANAL BEAM
              </span>
              <span className={`px-3 py-1 rounded-full border text-[11px] font-bold ${
                privacyMode
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                  : 'bg-red-500/20 border-red-500/40 text-red-400'
              }`}>
                {privacyMode ? '✓ Anti-Phase Beam Active' : '⚠ Open Leakage'}
              </span>
            </div>

            {/* Real Product Photo with Glowing Sound Wave Overlay */}
            <div className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800/80 mb-6 group">
              <img
                src={privacyMode ? '/images/acoustic-beam.png' : '/images/anti-phase-leak.png'}
                alt="Acoustic Speaker Directional Sound Beam"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />

              {/* Gradient Shadow Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/30" />

              {/* Animated Sound Wave Beam Rays Overlay */}
              {privacyMode ? (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-48 h-48 rounded-full border-2 border-amber-400/50 animate-ping opacity-60" />
                  <div className="w-64 h-64 rounded-full border border-dashed border-amber-400/30 animate-spin-slow" />
                  <div className="absolute bottom-4 left-4 px-3.5 py-1.5 rounded-xl bg-zinc-950/90 border border-amber-500/40 text-amber-400 font-mono text-[11px] font-bold backdrop-blur-md flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>85% Reverse Anti-Phase Leak Cancelled</span>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-64 h-64 rounded-full border-2 border-red-500/50 animate-pulse opacity-70" />
                  <div className="absolute bottom-4 left-4 px-3.5 py-1.5 rounded-xl bg-zinc-950/90 border border-red-500/40 text-red-400 font-mono text-[11px] font-bold backdrop-blur-md">
                    ⚠ Standard Audio Dispersion (Sound Leaks to Surroundings)
                  </div>
                </div>
              )}
            </div>

            {/* Real-Time Live Frequency Spectrum Bar */}
            <div className="p-4 rounded-2xl bg-zinc-950/95 border border-amber-500/30 backdrop-blur-2xl shadow-xl space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400 flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-amber-400" />
                  Live Frequency Spectrum Visualization
                </span>
                <span className="text-amber-400 font-bold">{activeFrequency} Hz</span>
              </div>

              {/* Spectrum Bars */}
              <div className="flex items-end gap-1.5 h-12 pt-2">
                {[45, 75, 40, 90, 100, 65, 85, 55, 95, 70, 88, 48, 80, 60, 92, 50, 78].map((h, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-t transition-all duration-300 ${
                      privacyMode
                        ? 'bg-gradient-to-t from-amber-500 to-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.5)]'
                        : 'bg-gradient-to-t from-red-600 to-red-400'
                    }`}
                    style={{
                      height: `${privacyMode ? Math.min(100, (h * activeFrequency) / 3500 + 15) : h * 0.45}%`,
                      opacity: 0.6 + (i % 3) * 0.2,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
