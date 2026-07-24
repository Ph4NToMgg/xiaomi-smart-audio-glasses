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

  // Morphing progress (0.0 at top of page -> 1.0 at 22% scroll)
  const t = Math.min(1, Math.max(0, scrollProgress / 0.22));
  const easeT = 1 - Math.pow(1 - t, 3); // Cubic ease-out curve for butter-smooth motion

  // Dynamic interpolated styles for 100% Fullscreen -> Studio Stage Frame morphing
  const frameContainerStyle: React.CSSProperties = {
    width: t === 0 ? '100vw' : `calc(100vw - ${easeT * 42}vw)`, // Starts 100vw, shrinks to ~58vw (max-w-4xl)
    maxWidth: t === 0 ? '100vw' : '56rem',
    height: `${100 - easeT * 28}vh`,                            // Starts 100vh, shrinks to 72vh
    borderRadius: `${easeT * 24}px`,                            // Starts 0px, curves to 24px (rounded-3xl)
    padding: `${easeT * 12}px`,                                // Starts 0px, padding to 12px
    borderWidth: `${easeT * 1}px`,                              // Starts 0px, border to 1px
    borderColor: `rgba(255, 255, 255, ${easeT * 0.12})`,
    backgroundColor: `rgba(6, 6, 9, ${easeT * 0.92})`,
    backdropFilter: `blur(${easeT * 32}px)`,
    WebkitBackdropFilter: `blur(${easeT * 32}px)`,
    boxShadow: `0 ${easeT * 20}px ${easeT * 60}px rgba(0, 0, 0, ${easeT * 0.85})`,
    transition: 'all 0.05s ease-out',
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[320vh] bg-transparent"
      id="story-animation"
    >
      <ScrollController scrollProgress={scrollProgress} />

      {/* Sticky Viewport Stage */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center p-0 pointer-events-none">
        {/* Dynamic Morphing Studio Canvas Container */}
        <div
          style={frameContainerStyle}
          className="relative z-10 overflow-hidden flex items-center justify-center pointer-events-none"
        >
          {/* Tactical Corner Frame Brackets (Fade in as frame morphs) */}
          <div
            style={{ opacity: easeT }}
            className="absolute top-3 left-3 w-3.5 h-3.5 border-t-2 border-l-2 border-amber-400 z-20 pointer-events-none transition-opacity duration-150"
          />
          <div
            style={{ opacity: easeT }}
            className="absolute top-3 right-3 w-3.5 h-3.5 border-t-2 border-r-2 border-amber-400 z-20 pointer-events-none transition-opacity duration-150"
          />
          <div
            style={{ opacity: easeT }}
            className="absolute bottom-3 left-3 w-3.5 h-3.5 border-b-2 border-l-2 border-amber-400 z-20 pointer-events-none transition-opacity duration-150"
          />
          <div
            style={{ opacity: easeT }}
            className="absolute bottom-3 right-3 w-3.5 h-3.5 border-b-2 border-r-2 border-amber-400 z-20 pointer-events-none transition-opacity duration-150"
          />

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
