import React from 'react';

interface OverlayContentProps {
  progress: number;
}

export const OverlayContent: React.FC<OverlayContentProps> = ({ progress }) => {
  // Title appears ONLY at the very start (0% to 15%), then smoothly fades away completely
  const titleOpacity = Math.max(0, 1 - progress / 0.15);
  const titleTranslateY = (1 - titleOpacity) * -20;

  return (
    <div className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-start pt-28 px-6 text-center">
      {/* Hero Title - visible strictly at startup and disappears upon scrolling */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleTranslateY}px)`,
          transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
        }}
        className="max-w-4xl w-full"
      >
        <div className="inline-block px-4 py-1.5 rounded-full bg-yellow-400/20 text-yellow-400 text-xs font-mono font-bold tracking-widest uppercase mb-4 backdrop-blur-md border border-yellow-400/30">
          Mijia Smart Audio Eyewear
        </div>

        <h1 className="text-4xl sm:text-7xl font-extrabold tracking-tight text-white font-heading leading-tight drop-shadow-2xl mb-4">
          Xiaomi Smart <span className="text-gradient-yellow">Audio Glasses</span>
        </h1>

        <p className="text-sm sm:text-lg text-zinc-300 max-w-xl mx-auto font-sans leading-relaxed">
          Open-Ear Acoustics • Featherlight 38.1g • 11 Hours Battery
        </p>
      </div>
    </div>
  );
};
