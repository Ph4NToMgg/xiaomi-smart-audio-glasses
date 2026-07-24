import React, { useState } from 'react';
import { Sliders, Play, Volume2, Mic, Phone, SkipForward, Sparkles } from 'lucide-react';

export const TouchGestureDemo: React.FC = () => {
  const [activeGesture, setActiveGesture] = useState<'swipe' | 'double' | 'triple' | 'long'>('swipe');

  const gestures = [
    {
      id: 'swipe',
      name: 'Swipe Forward / Back',
      icon: <Sliders className="w-5 h-5 text-yellow-400" />,
      action: 'Volume Control & Track Switch',
      description: 'Slide your finger along the 30mm touch strip on either temple to adjust volume smoothly or skip tracks.',
      feedback: '🔊 Volume 75% • Next Track: "Midnight Echoes"',
    },
    {
      id: 'double',
      name: 'Double Tap',
      icon: <Play className="w-5 h-5 text-yellow-400" />,
      action: 'Play / Pause & Answer Calls',
      description: 'Tap twice quickly on the temple to toggle audio playback or answer/end incoming voice calls.',
      feedback: '▶ Audio Playing • Call Answered (HD ENC)',
    },
    {
      id: 'triple',
      name: 'Triple Tap',
      icon: <SkipForward className="w-5 h-5 text-yellow-400" />,
      action: 'Previous Track / Record Voice Note',
      description: 'Tap three times to jump to the previous song or activate quick voice note recording.',
      feedback: '⏮ Previous Track • Voice Memo Saved',
    },
    {
      id: 'long',
      name: 'Long Press (2s)',
      icon: <Mic className="w-5 h-5 text-yellow-400" />,
      action: 'Voice Assistant / AI Translation',
      description: 'Press and hold for 2 seconds to summon XiaoAI, Siri, or Google Assistant, or initiate real-time AI live translation.',
      feedback: '🎙 Voice Assistant Ready: "How can I help you?"',
    },
  ];

  const current = gestures.find((g) => g.id === activeGesture)!;

  return (
    <section id="gestures" className="py-28 bg-transparent border-t border-zinc-900/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 relative">
          {/* Ambient Dark Radial Vignette behind header */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[650px] h-[250px] bg-black/60 rounded-full blur-[80px] pointer-events-none -z-10" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-950/90 border border-yellow-500/30 text-yellow-400 text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-md shadow-xl">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Capacitive Touch Haptics</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading leading-tight text-shadow-contrast">
            Control Everything <br />
            <span className="text-gradient-gold">With a Single Touch.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Gestures Selector */}
          <div className="lg:col-span-5 space-y-3">
            {gestures.map((g) => {
              const isSelected = g.id === activeGesture;
              return (
                <button
                  key={g.id}
                  onClick={() => setActiveGesture(g.id as any)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all backdrop-blur-xl ${
                    isSelected
                      ? 'bg-zinc-900/95 border-yellow-500/90 text-white gold-border-glow shadow-xl'
                      : 'bg-zinc-950/90 border-zinc-800/80 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900/80'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 shrink-0">
                      {g.icon}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white font-heading">{g.name}</div>
                      <div className="text-xs text-yellow-400/90 font-mono mt-0.5 font-bold">{g.action}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Simulated Glasses Temple Arm Interactive Box */}
          <div className="lg:col-span-7 glass-studio rounded-3xl p-8 border border-zinc-800 flex flex-col items-center justify-center min-h-[380px] relative overflow-hidden">
            <div className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-8 font-bold">
              TEMPLE ARM HAPTIC SIMULATION
            </div>

            {/* Temple Arm Graphic representation */}
            <div className="relative w-full max-w-md h-32 bg-zinc-950/90 rounded-full border border-zinc-700 flex items-center justify-between px-8 shadow-2xl backdrop-blur-xl">
              {/* Haptic Touch Strip Zone */}
              <div className="relative w-48 h-10 bg-amber-500/20 border-2 border-amber-400 rounded-full flex items-center justify-center cursor-pointer gold-glow transition-all">
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                  30mm Touch Strip
                </span>
                {/* Touch ripples animation */}
                <div className="absolute inset-0 rounded-full border border-amber-400 animate-ping opacity-75" />
              </div>

              {/* Speaker Grill Indicator */}
              <div className="flex gap-1">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-1 h-4 bg-zinc-600 rounded-full" />
                ))}
              </div>
            </div>

            {/* Gesture Feedback Status Box */}
            <div className="mt-10 max-w-md w-full p-4 rounded-2xl bg-zinc-950/95 backdrop-blur-xl border border-yellow-500/40 text-center shadow-xl">
              <div className="text-xs font-mono text-zinc-400 mb-1">Simulated Feedback Output</div>
              <div className="text-sm font-bold text-yellow-400 font-mono">{current.feedback}</div>
            </div>

            <p className="text-xs text-zinc-300 text-center max-w-sm mt-4">{current.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
