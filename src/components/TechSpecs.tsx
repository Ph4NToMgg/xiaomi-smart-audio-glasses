import React, { useState } from 'react';
import { ShieldCheck, Cpu, Battery, Bluetooth, Sparkles, Feather } from 'lucide-react';

export const TechSpecs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'audio' | 'battery' | 'design' | 'connectivity'>('audio');

  const specCategories = [
    { id: 'audio', name: 'Audio & Microphones', icon: <Cpu className="w-4 h-4" /> },
    { id: 'battery', name: 'Battery & Power', icon: <Battery className="w-4 h-4" /> },
    { id: 'design', name: 'Design & Build', icon: <Feather className="w-4 h-4" /> },
    { id: 'connectivity', name: 'Connectivity & Sensors', icon: <Bluetooth className="w-4 h-4" /> },
  ];

  const specsData = {
    audio: [
      { label: 'Speaker Driver', value: '128mm² Ultra-Thin Balance Speaker' },
      { label: 'Sound Field', value: 'Open-Ear Directional Sound Beam' },
      { label: 'Frequency Response', value: '60 Hz – 20,000 Hz' },
      { label: 'Microphone System', value: 'Dual-mic Beamforming with AI ENC Wind Noise Cancellation' },
      { label: 'Privacy Mode', value: 'Reversed Anti-Phase Acoustic Wave Cancellation' },
      { label: 'Codec Support', value: 'SBC, AAC, LDAC HD Audio' },
    ],
    battery: [
      { label: 'Continuous Music Playback', value: '11 Hours (at 60% volume)' },
      { label: 'Voice Call Time', value: '9 Hours continuous talk' },
      { label: 'Standby Battery Life', value: '24 Hours connected' },
      { label: 'Charging Method', value: 'Magnetic Contact Fast Charging' },
      { label: 'Fast Charge Speed', value: '10 Mins Charge = 2 Hours Playback' },
      { label: 'Full Charge Time', value: 'Approx. 50 Minutes' },
    ],
    design: [
      { label: 'Total Weight', value: '38.1 grams (Wayfarer Frame variant)' },
      { label: 'Frame Detachment', value: 'Patented Quick-Release Magnetic Latch' },
      { label: 'Water & Dust Resistance', value: 'IP54 Certified Sweat & Rainproof' },
      { label: 'Hinge Mechanism', value: 'Flexible Ergonomic Titanium Alloy Hinge' },
      { label: 'Nose Pads', value: 'Self-Adapting Skin-Friendly Silicone' },
      { label: 'Lens Options', value: 'Anti-Blue Light, Sunglasses TAC Polarized, Prescription Ready' },
    ],
    connectivity: [
      { label: 'Bluetooth Version', value: 'Bluetooth 5.3 Low Energy' },
      { label: 'Multipoint Connection', value: 'Simultaneous Dual-Device Auto Switch' },
      { label: 'Wireless Range', value: 'Up to 15 meters (49 feet)' },
      { label: 'Sensors', value: 'Optical Wearing Detection, Dual Capacitive Touch Strips' },
      { label: 'App Integration', value: 'Xiaomi Earbuds App (iOS / Android / HyperOS)' },
      { label: 'Voice Assistant', value: 'XiaoAI, Siri, Google Assistant' },
    ],
  };

  return (
    <section id="specs" className="py-28 bg-transparent border-t border-zinc-900/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 relative">
          {/* Ambient Dark Radial Vignette behind header */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[650px] h-[250px] bg-black/60 rounded-full blur-[80px] pointer-events-none -z-10" />

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading mb-4 text-shadow-contrast">
            Technical <span className="text-gradient-gold">Specifications</span>
          </h2>
          <p className="text-zinc-200 text-sm text-shadow-subtle font-medium">
            Engineered down to the millimeter for peak acoustic output, ergonomic balance, and all-day comfort.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {specCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id as any)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-mono font-bold transition-all backdrop-blur-xl cursor-pointer ${
                activeTab === cat.id
                  ? 'bg-yellow-400 text-black shadow-[0_0_20px_rgba(255,199,0,0.4)]'
                  : 'bg-zinc-950/90 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700'
              }`}
            >
              {cat.icon}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Specs Table Grid */}
        <div className="glass-studio rounded-3xl p-8 border border-zinc-800 max-w-4xl mx-auto shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specsData[activeTab].map((spec, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-zinc-950/90 backdrop-blur-xl border border-zinc-800/80 flex flex-col justify-between"
              >
                <span className="text-xs font-mono text-zinc-400 mb-1">{spec.label}</span>
                <span className="text-sm font-bold text-white font-heading">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
