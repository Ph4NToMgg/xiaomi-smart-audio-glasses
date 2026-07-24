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

      // 530 TIMELINE STEPS: 
      // - 240 steps forward (Photo 0 to 239)
      // - 50 steps HOLD on Frame 240 (photo 239 stays locked on screen)
      // - 240 steps reverse (Photo 239 down to 0)
      const TOTAL_TIMELINE_STEPS = 530;
      const timelineStep = Math.min(
        TOTAL_TIMELINE_STEPS - 1,
        Math.floor(rawProgress * (TOTAL_TIMELINE_STEPS - 1))
      );

      let photoIndex = 0;
      if (timelineStep < 240) {
        // Phase 1: Forward (0 to 239)
        photoIndex = timelineStep;
      } else if (timelineStep < 290) {
        // Phase 2: 50-step HOLD on frame 240
        photoIndex = 239;
      } else {
        // Phase 3: Reverse (239 down to 0)
        photoIndex = 239 - (timelineStep - 290);
      }

      photoIndex = Math.max(0, Math.min(frames.length - 1, photoIndex));
      setCurrentFrameIndex(photoIndex);
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
      className="relative w-full h-[650vh] bg-transparent"
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
