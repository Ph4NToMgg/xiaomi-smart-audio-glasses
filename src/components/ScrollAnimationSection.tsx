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

      // PING-PONG BOOMERANG LOOP:
      // 0.0 -> 0.5: Plays forward (Frame 1 -> 240, disassembling the glasses)
      // 0.5 -> 1.0: Plays in reverse (Frame 240 -> 1, reassembling back to initial ezgif-frame-001)
      let targetFrame = 0;
      if (rawProgress <= 0.5) {
        targetFrame = Math.floor((rawProgress / 0.5) * (frames.length - 1));
      } else {
        targetFrame = Math.floor((1 - (rawProgress - 0.5) / 0.5) * (frames.length - 1));
      }

      targetFrame = Math.max(0, Math.min(frames.length - 1, targetFrame));
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
      className="relative w-full h-[400vh] bg-transparent"
      id="story-animation"
    >
      <ScrollController scrollProgress={scrollProgress} />

      {/* Sticky Viewport Stage */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center p-4 sm:p-8 pointer-events-none">
        {/* Framed Studio Canvas Container */}
        <div className="relative z-10 w-full max-w-4xl h-[65vh] sm:h-[75vh] rounded-3xl glass-studio bg-[#060609]/95 backdrop-blur-3xl border border-zinc-800/80 p-2 sm:p-4 overflow-hidden flex items-center justify-center shadow-2xl pointer-events-none">
          {/* Tactical Corner Frame Brackets */}
          <div className="absolute top-3 left-3 w-3.5 h-3.5 border-t-2 border-l-2 border-amber-400 z-20 pointer-events-none" />
          <div className="absolute top-3 right-3 w-3.5 h-3.5 border-t-2 border-r-2 border-amber-400 z-20 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-3.5 h-3.5 border-b-2 border-l-2 border-amber-400 z-20 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-3.5 h-3.5 border-b-2 border-r-2 border-amber-400 z-20 pointer-events-none" />

          {/* Canvas Renderer */}
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
