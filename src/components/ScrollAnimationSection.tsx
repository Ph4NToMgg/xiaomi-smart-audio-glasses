import React, { useEffect, useRef, useState } from 'react';
import { CanvasRenderer } from './CanvasRenderer';
import { OverlayContent } from './OverlayContent';
import { ScrollController } from './ScrollController';

interface ScrollAnimationSectionProps {
  frames: HTMLImageElement[];
}

export const ScrollAnimationSection: React.FC<ScrollAnimationSectionProps> = ({ frames }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);

  useEffect(() => {
    let rAFId: number | null = null;

    const updateScrollProgress = () => {
      const container = containerRef.current;
      if (!container || frames.length === 0) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollableHeight = rect.height - windowHeight;

      if (totalScrollableHeight <= 0) return;

      const scrolled = -rect.top;
      const rawProgress = Math.max(0, Math.min(1, scrolled / totalScrollableHeight));

      setScrollProgress(rawProgress);

      const targetFrame = Math.min(
        frames.length - 1,
        Math.floor(rawProgress * (frames.length - 1))
      );
      setCurrentFrameIndex(targetFrame);
    };

    const handleScroll = () => {
      if (rAFId !== null) cancelAnimationFrame(rAFId);
      rAFId = requestAnimationFrame(updateScrollProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rAFId !== null) cancelAnimationFrame(rAFId);
    };
  }, [frames.length]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[260vh] bg-[#070709] bg-mesh-glow bg-grid-pattern overflow-x-hidden"
      id="story-animation"
    >
      <ScrollController scrollProgress={scrollProgress} />

      {/* Sticky Viewport Stage */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center p-4 sm:p-10">
        {/* Background Ambient Glow Orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Framed Canvas Container */}
        <div className="relative z-10 w-full max-w-4xl h-[62vh] sm:h-[72vh] rounded-3xl glass-studio border border-zinc-800/80 p-2 sm:p-4 overflow-hidden flex items-center justify-center shadow-2xl">
          {/* Internal Corner Frame Accents */}
          <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-amber-500/60 z-20 pointer-events-none" />
          <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-amber-500/60 z-20 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-amber-500/60 z-20 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-amber-500/60 z-20 pointer-events-none" />

          {/* Ultra Crisp Canvas Renderer */}
          <CanvasRenderer
            frames={frames}
            currentFrameIndex={currentFrameIndex}
            scrollProgress={scrollProgress}
          />
        </div>

        {/* Floating Telemetry & Interactive Overlay Dock */}
        <OverlayContent progress={scrollProgress} />
      </div>
    </div>
  );
};
