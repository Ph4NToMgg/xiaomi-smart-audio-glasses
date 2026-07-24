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

  // Morphing progress (0.0 at top of page -> 1.0 at 16% scroll)
  const morph = Math.min(1, Math.max(0, scrollProgress / 0.16));

  // Dynamic interpolated styles for fullscreen-to-frame stage morphing
  const frameContainerStyle: React.CSSProperties = {
    maxWidth: morph === 0 ? '100vw' : `${100 - morph * 42}%`, // from 100% to ~58% (max-w-4xl)
    height: `${100 - morph * 28}vh`,                          // from 100vh to 72vh
    borderRadius: `${morph * 24}px`,                          // from 0px to 24px (rounded-3xl)
    padding: `${morph * 12}px`,                              // from 0px to 12px
    borderWidth: `${morph * 1}px`,                            // from 0px to 1px
    borderColor: `rgba(255, 255, 255, ${morph * 0.12})`,
    backgroundColor: `rgba(6, 6, 9, ${morph * 0.92})`,
    backdropFilter: `blur(${morph * 32}px)`,
    WebkitBackdropFilter: `blur(${morph * 32}px)`,
    boxShadow: `0 ${morph * 20}px ${morph * 60}px rgba(0, 0, 0, ${morph * 0.85})`,
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
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center p-0 sm:p-6 pointer-events-none">
        {/* Dynamic Morphing Studio Canvas Container */}
        <div
          style={frameContainerStyle}
          className="relative z-10 w-full overflow-hidden flex items-center justify-center pointer-events-none"
        >
          {/* Tactical Corner Frame Brackets (Fade in as frame morphs) */}
          <div
            style={{ opacity: morph }}
            className="absolute top-3 left-3 w-3.5 h-3.5 border-t-2 border-l-2 border-amber-400 z-20 pointer-events-none transition-opacity duration-150"
          />
          <div
            style={{ opacity: morph }}
            className="absolute top-3 right-3 w-3.5 h-3.5 border-t-2 border-r-2 border-amber-400 z-20 pointer-events-none transition-opacity duration-150"
          />
          <div
            style={{ opacity: morph }}
            className="absolute bottom-3 left-3 w-3.5 h-3.5 border-b-2 border-l-2 border-amber-400 z-20 pointer-events-none transition-opacity duration-150"
          />
          <div
            style={{ opacity: morph }}
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
