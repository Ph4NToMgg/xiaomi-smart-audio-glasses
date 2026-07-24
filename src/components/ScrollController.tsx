import React from 'react';

interface ScrollControllerProps {
  scrollProgress: number;
}

export const ScrollController: React.FC<ScrollControllerProps> = ({ scrollProgress }) => {
  const percentage = Math.min(100, Math.max(0, Math.round(scrollProgress * 100)));

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Sleek Minimal Top Scroll Indicator Bar */}
      <div className="w-full h-1 bg-black/40 backdrop-blur-sm">
        <div
          className="h-full bg-gradient-to-r from-yellow-500 via-yellow-400 to-amber-300 transition-all duration-75 ease-out shadow-[0_0_12px_rgba(255,199,0,0.8)]"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
