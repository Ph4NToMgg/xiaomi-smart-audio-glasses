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

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const validIndex = Math.max(0, Math.min(frames.length - 1, Math.floor(currentFrameIndex)));
    const img = frames[validIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const containerWidth = canvas.parentElement?.clientWidth || window.innerWidth;
    const containerHeight = canvas.parentElement?.clientHeight || window.innerHeight;

    const targetBufferW = Math.floor(containerWidth * dpr);
    const targetBufferH = Math.floor(containerHeight * dpr);

    if (canvas.width !== targetBufferW || canvas.height !== targetBufferH) {
      canvas.width = targetBufferW;
      canvas.height = targetBufferH;
      canvas.style.width = `${containerWidth}px`;
      canvas.style.height = `${containerHeight}px`;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Clear background
    ctx.clearRect(0, 0, containerWidth, containerHeight);

    // High Quality Contain Fit inside studio stage frame
    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;
    const imgAspect = imgW / imgH;
    const containerAspect = containerWidth / containerHeight;

    let drawW = containerWidth;
    let drawH = containerHeight;

    if (containerAspect > imgAspect) {
      drawH = containerHeight;
      drawW = containerHeight * imgAspect;
    } else {
      drawW = containerWidth;
      drawH = containerWidth / imgAspect;
    }

    const drawX = (containerWidth - drawW) / 2;
    const drawY = (containerHeight - drawH) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, drawX, drawY, drawW, drawH);

    ctx.restore();

    lastDrawnFrameRef.current = validIndex;
  };

  useEffect(() => {
    const loop = () => {
      renderFrame();
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
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none overflow-hidden">
      <canvas
        ref={canvasRef}
        className="block pointer-events-none select-none max-w-full max-h-full rounded-2xl drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
      />
    </div>
  );
};
