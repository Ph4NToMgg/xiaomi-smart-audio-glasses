import React, { useState } from 'react';
import { Volume2, Play, Mic, Sparkles, Sliders, ChevronRight, CheckCircle2, Radio } from 'lucide-react';

interface Gesture {
  id: string;
  title: string;
  action: string;
  icon: React.ElementType;
  description: string;
  feedbackText: string;
  feedbackDetail: string;
  badge: string;
  sensorOffset: string; // positioning for touch hotspot animation
}

export const TouchGestureDemo: React.FC = () => {
  const gestures: Gesture[] = [
    {
      id: 'swipe',
      title: 'Swipe Forward / Back',
      action: 'Volume & Track Control',
      icon: Volume2,
      description: 'Slide your finger along the 30mm temple touch strip to adjust volume seamlessly or skip tracks.',
      feedbackText: 'Volume 80% • Next Track: "Midnight Echoes"',
      feedbackDetail: 'Continuous Analog Swipe Detection',
      badge: 'VOLUME / TRACKS',
      sensorOffset: 'left-[45%]',
    },
    {
      id: 'double-tap',
      title: 'Double Tap',
      action: 'Play / Pause & Answer Calls',
      icon: Play,
      description: 'Tap twice on either temple arm to instantly pause music or accept incoming calls hands-free.',
      feedbackText: 'Audio Paused • Call Answered (Mic Active)',
      feedbackDetail: 'Dual MEMS Noise-Cancelling Mics Engaged',
      badge: 'CALLS & PLAYBACK',
      sensorOffset: 'left-[50%]',
    },
    {
      id: 'triple-tap',
      title: 'Triple Tap',
      action: 'Record Voice Note / Prev Track',
      icon: Sliders,
      description: 'Tap three times to trigger quick voice recording or jump to the previous song.',
      feedbackText: 'Recording Voice Note... (Saved to Mi Cloud)',
      feedbackDetail: 'Instant Audio Memo Timestamped',
      badge: 'VOICE MEMO',
      sensorOffset: 'left-[55%]',
    },
    {
      id: 'long-press',
      title: 'Long Press (2s)',
      action: 'Voice Assistant / AI Translation',
      icon: Mic,
      description: 'Hold for 2 seconds to summon Xiaomi AI assistant or enable real-time voice translation.',
      feedbackText: 'Xiaomi AI Assistant Active • "How can I help?"',
      feedbackDetail: 'Real-Time Multi-Language Interpreter Active',
      badge: 'AI ASSISTANT',
      sensorOffset: 'left-[60%]',
    },
  ];

  const [activeGesture, setActiveGesture] = useState<Gesture>(gestures[0]);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSelectGesture = (gesture: Gesture) => {
    setActiveGesture(gesture);
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 600);
  };

  return (
    <section id="gestures" className="py-28 bg-transparent border-t border-zinc-900/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 relative">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[650px] h-[250px] bg-black/60 rounded-full blur-[80px] pointer-events-none -z-10" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-950/90 border border-yellow-500/30 text-yellow-400 text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-md shadow-xl">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Capacitive Touch Haptics</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading leading-tight text-shadow-contrast">
            Control Everything <br />
            <span className="text-white">With a Single Touch.</span>
          </h2>
        </div>

        {/* Real Product Photo & Interactive Gesture Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive Gesture Buttons */}
          <div className="lg:col-span-5 space-y-4">
            {gestures.map((gesture) => {
              const Icon = gesture.icon;
              const isActive = activeGesture.id === gesture.id;

              return (
                <div
                  key={gesture.id}
                  onClick={() => handleSelectGesture(gesture)}
                  className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-start gap-4 ${
                    isActive
                      ? 'glass-studio-gold border-amber-400/80 shadow-2xl gold-border-glow translate-x-1'
                      : 'glass-studio border-zinc-800/80 hover:border-zinc-700 opacity-80 hover:opacity-100'
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                      isActive
                        ? 'bg-amber-400 text-black shadow-[0_0_15px_rgba(255,199,0,0.5)] font-bold'
                        : 'bg-zinc-900 border border-zinc-800 text-amber-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-base font-bold text-white font-heading truncate">
                        {gesture.title}
                      </h3>
                      {isActive && (
                        <span className="text-[10px] font-mono font-bold bg-amber-400 text-black px-2 py-0.5 rounded-full uppercase">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-mono text-amber-400 font-bold mb-1">
                      {gesture.action}
                    </p>
                    <p className="text-xs text-zinc-300 leading-relaxed line-clamp-2">
                      {gesture.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Real Macro Product Photo Showcase with Animated Hotspot */}
          <div className="lg:col-span-7 glass-studio rounded-3xl p-6 sm:p-8 border border-zinc-800/80 relative overflow-hidden flex flex-col justify-between min-h-[460px] shadow-2xl">
            {/* Top Photo Frame Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-4 relative z-10 font-mono text-xs">
              <span className="text-amber-400 font-bold uppercase tracking-wider flex items-center gap-2">
                <Radio className="w-4 h-4" />
                SMART TEMPLE TOUCH SENSOR (30MM STRIP)
              </span>
              <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300">
                {activeGesture.badge}
              </span>
            </div>

            {/* Real Macro Product Photo with Animated Touch Indicator */}
            <div className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800/80 mb-6 group">
              <img
                src="/images/touch-gesture-finger.png"
                alt="Touch Gesture Smart Temple Arm"
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  isSimulating ? 'scale-105' : 'scale-100'
                }`}
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/20" />

              {/* Animated Touch Hotspot Pulse Indicator */}
              <div className={`absolute top-[48%] ${activeGesture.sensorOffset} -translate-x-1/2 -translate-y-1/2 pointer-events-none`}>
                <div className="w-12 h-12 rounded-full border-2 border-amber-400 bg-amber-400/20 animate-ping opacity-75" />
                <div className="w-6 h-6 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold text-xs absolute top-3 left-3 shadow-[0_0_20px_rgba(255,199,0,0.8)]">
                  ✓
                </div>
              </div>

              {/* Sensor Location Label Tag */}
              <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-xl bg-zinc-950/90 border border-amber-500/40 text-amber-400 font-mono text-[11px] font-bold backdrop-blur-md">
                Capacitive Sensor Active • 30mm Touch Zone
              </div>
            </div>

            {/* Simulated Live Feedback Output Card */}
            <div className="p-4 rounded-2xl bg-zinc-950/95 border border-amber-500/40 backdrop-blur-2xl shadow-xl flex items-center justify-between gap-4 font-mono">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-amber-400 animate-ping shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">
                    {activeGesture.feedbackText}
                  </div>
                  <div className="text-[10px] text-zinc-400 mt-0.5">
                    {activeGesture.feedbackDetail}
                  </div>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 text-xs text-amber-400 font-bold shrink-0">
                <span>Test Action</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
