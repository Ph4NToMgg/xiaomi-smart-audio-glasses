import React from 'react';
import { Volume2, Sparkles, Layers, Sliders, BatteryCharging } from 'lucide-react';

interface OverlayContentProps {
  progress: number;
}

export const OverlayContent: React.FC<OverlayContentProps> = ({ progress }) => {
  const getCardStyle = (start: number, end: number) => {
    const fadeIn = start + 0.03;
    const fadeOut = end - 0.03;

    if (progress < start || progress > end) {
      return { opacity: 0, transform: 'translateY(16px)', pointerEvents: 'none' as const };
    }

    let opacity = 1;
    let translateY = 0;

    if (progress < fadeIn) {
      const p = (progress - start) / (fadeIn - start);
      opacity = p;
      translateY = (1 - p) * 16;
    } else if (progress > fadeOut) {
      const p = (end - progress) / (end - fadeOut);
      opacity = p;
      translateY = (1 - p) * -16;
    }

    return {
      opacity,
      transform: `translateY(${translateY}px)`,
      pointerEvents: opacity > 0.5 ? ('auto' as const) : ('none' as const),
      transition: 'opacity 0.25s ease-out, transform 0.25s ease-out',
    };
  };

  return (
    <div className="absolute inset-0 z-20 pointer-events-none flex items-end justify-center p-6 md:pb-16 md:px-12">
      {/* PHASE 1: 0% - 18% (Title Hero at Top Center) */}
      <div
        style={getCardStyle(0, 0.18)}
        className="absolute top-24 left-1/2 -translate-x-1/2 max-w-3xl w-full text-center px-4"
      >
        <span className="inline-block px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-400 text-[11px] font-mono font-bold tracking-widest uppercase mb-3 backdrop-blur-md border border-yellow-400/30">
          Mijia Smart Audio Eyewear
        </span>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-heading leading-tight drop-shadow-2xl">
          Xiaomi Smart <span className="text-gradient-yellow">Audio Glasses</span>
        </h1>
      </div>

      {/* PHASE 2: 20% - 42% (Acoustic Engine - Bottom Card) */}
      <div
        style={getCardStyle(0.20, 0.42)}
        className="max-w-xl w-full glass-panel-gold rounded-2xl p-6 border border-yellow-500/30 backdrop-blur-xl shadow-2xl"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono font-bold tracking-widest text-yellow-400 uppercase">
            ACOUSTIC ENGINE
          </span>
          <Volume2 className="w-4 h-4 text-yellow-400" />
        </div>
        <h3 className="text-xl font-bold text-white font-heading mb-1">
          Directional Sound Field
        </h3>
        <p className="text-xs text-zinc-300 leading-relaxed">
          Dual 128mm² balance speakers focus sound into your ears while anti-phase sound waves reduce external leakage by 85%.
        </p>
      </div>

      {/* PHASE 3: 44% - 66% (Modular Frames - Bottom Card) */}
      <div
        style={getCardStyle(0.44, 0.66)}
        className="max-w-xl w-full glass-panel rounded-2xl p-6 border border-zinc-800 backdrop-blur-xl shadow-2xl"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono font-bold tracking-widest text-yellow-400 uppercase">
            MODULAR DESIGN
          </span>
          <Layers className="w-4 h-4 text-yellow-400" />
        </div>
        <h3 className="text-xl font-bold text-white font-heading mb-1">
          Quick-Release Interchangeable Frames
        </h3>
        <p className="text-xs text-zinc-300 leading-relaxed">
          Swap acoustic temple arms between 5 distinct frame architectures in under 2 seconds with patented magnetic latches.
        </p>
      </div>

      {/* PHASE 4: 68% - 88% (Touch Control - Bottom Card) */}
      <div
        style={getCardStyle(0.68, 0.88)}
        className="max-w-xl w-full glass-panel-gold rounded-2xl p-6 border border-yellow-500/30 backdrop-blur-xl shadow-2xl"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono font-bold tracking-widest text-yellow-400 uppercase">
            TEMPLE HAPTICS
          </span>
          <Sliders className="w-4 h-4 text-yellow-400" />
        </div>
        <h3 className="text-xl font-bold text-white font-heading mb-1">
          Capacitive Touch & Dual-Mic ENC
        </h3>
        <p className="text-xs text-zinc-300 leading-relaxed">
          30mm touch strip for swipe volume and double-tap gestures. Dual microphones cancel wind noise during voice calls.
        </p>
      </div>

      {/* PHASE 5: 90% - 100% (Battery & Power - Bottom Card) */}
      <div
        style={getCardStyle(0.90, 1.0)}
        className="max-w-xl w-full glass-panel rounded-2xl p-6 border border-yellow-400/40 backdrop-blur-xl shadow-2xl text-center"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-400 text-[10px] font-mono font-bold uppercase mb-2">
          <BatteryCharging className="w-3.5 h-3.5" />
          11H MUSIC PLAYBACK
        </div>
        <h3 className="text-2xl font-extrabold text-white font-heading mb-1">
          All-Day Comfort & Fast Charging
        </h3>
        <p className="text-xs text-zinc-300">
          38.1g ultra-light balance. 10 minutes magnetic charge yields 2 hours of audio listening.
        </p>
      </div>
    </div>
  );
};
