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
    <section id="gestures" className="py-28 bg-[#07070a] border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Capacitive Touch Haptics</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
            Control Everything <br />
            <span className="text-gradient-yellow">With a Single Touch.</span>
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
                  className={`w-full text-left p-5 rounded-2xl border transition-all ${
                    isSelected
                      ? 'bg-yellow-500/15 border-yellow-500 text-white yellow-border-glow'
                      : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 shrink-0">
                      {g.icon}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white font-heading">{g.name}</div>
                      <div className="text-xs text-yellow-400/90 font-mono mt-0.5">{g.action}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Simulated Glasses Temple Arm Interactive Box */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-8 border border-zinc-800 flex flex-col items-center justify-center min-h-[380px] relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-yellow-500/5 rounded-3xl pointer-events-none" />

            <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-8">
              TEMPLE ARM HAPTIC SIMULATION
            </div>

            {/* Temple Arm Graphic representation */}
            <div className="relative w-full max-w-md h-32 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 rounded-full border border-zinc-700 flex items-center justify-between px-8 shadow-2xl">
              {/* Haptic Touch Strip Zone */}
              <div className="relative w-48 h-10 bg-yellow-500/20 border-2 border-yellow-400 rounded-full flex items-center justify-center cursor-pointer yellow-glow transition-all">
                <span className="text-[10px] font-mono font-bold text-yellow-400 uppercase tracking-wider">
                  30mm Touch Strip
                </span>
                {/* Touch ripples animation */}
                <div className="absolute inset-0 rounded-full border border-yellow-400 animate-ping opacity-75" />
              </div>

              {/* Speaker Grill Indicator */}
              <div className="flex gap-1">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-1 h-4 bg-zinc-600 rounded-full" />
                ))}
              </div>
            </div>

            {/* Gesture Feedback Status Box */}
            <div className="mt-10 max-w-md w-full p-4 rounded-2xl bg-zinc-900/90 border border-yellow-500/30 text-center">
              <div className="text-xs font-mono text-zinc-400 mb-1">Simulated Feedback Output</div>
              <div className="text-sm font-bold text-yellow-400 font-mono">{current.feedback}</div>
            </div>

            <p className="text-xs text-zinc-400 text-center max-w-sm mt-4">{current.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
