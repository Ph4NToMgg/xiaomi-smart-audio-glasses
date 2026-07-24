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
      className="relative w-full h-[450vh] bg-[#050507]"
      id="story-animation"
    >
      <ScrollController scrollProgress={scrollProgress} />

      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        {/* Edge-to-Edge Full Screen Canvas Renderer */}
        <CanvasRenderer
          frames={frames}
          currentFrameIndex={currentFrameIndex}
          scrollProgress={scrollProgress}
        />

        {/* Floating Storytelling Overlay Panels */}
        <OverlayContent progress={scrollProgress} />
      </div>
    </div>
  );
};
