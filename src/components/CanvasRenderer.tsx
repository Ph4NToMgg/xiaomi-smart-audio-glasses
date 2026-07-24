import React, { useEffect, useRef } from 'react';

interface CanvasRendererProps {
  frames: HTMLImageElement[];
  currentFrameIndex: number;
  scrollProgress: number;
}

export const CanvasRenderer: React.FC<CanvasRendererProps> = ({
  frames,
  currentFrameIndex,
  scrollProgress,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastDrawnFrameRef = useRef<number>(-1);
  const rAFRef = useRef<number | null>(null);

  const renderFrame = () => {
    const canvas = canvasRef.current;
    if (!canvas || frames.length === 0) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const validIndex = Math.max(0, Math.min(frames.length - 1, Math.floor(currentFrameIndex)));
    const img = frames[validIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Fill background black
    ctx.fillStyle = '#050507';
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    // FULL SCREEN OBJECT-COVER: Image fills entire viewport edge-to-edge
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;
    const imgAspect = imgWidth / imgHeight;
    const canvasAspect = displayWidth / displayHeight;

    let renderW: number;
    let renderH: number;

    if (canvasAspect > imgAspect) {
      renderW = displayWidth;
      renderH = displayWidth / imgAspect;
    } else {
      renderH = displayHeight;
      renderW = displayHeight * imgAspect;
    }

    const offsetX = (displayWidth - renderW) / 2;
    const offsetY = (displayHeight - renderH) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);

    ctx.restore();

    lastDrawnFrameRef.current = validIndex;
  };

  useEffect(() => {
    const loop = () => {
      if (lastDrawnFrameRef.current !== currentFrameIndex) {
        renderFrame();
      }
      rAFRef.current = requestAnimationFrame(loop);
    };

    rAFRef.current = requestAnimationFrame(loop);

    return () => {
      if (rAFRef.current !== null) {
        cancelAnimationFrame(rAFRef.current);
      }
    };
  }, [currentFrameIndex, frames, scrollProgress]);

  useEffect(() => {
    const handleResize = () => {
      lastDrawnFrameRef.current = -1;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#050507]">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
      />
    </div>
  );
};
