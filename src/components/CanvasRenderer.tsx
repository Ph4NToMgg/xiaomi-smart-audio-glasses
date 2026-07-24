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

    const ctx = canvas.getContext('2d', { alpha: false, willReadFrequently: false });
    if (!ctx) return;

    const validIndex = Math.max(0, Math.min(frames.length - 1, Math.floor(currentFrameIndex)));
    const img = frames[validIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Detect exact device pixel ratio (up to 2x for Retina sharpness)
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    const targetBufferWidth = Math.floor(displayWidth * dpr);
    const targetBufferHeight = Math.floor(displayHeight * dpr);

    // Sync buffer resolution and explicit style dimensions to prevent subpixel blur
    if (canvas.width !== targetBufferWidth || canvas.height !== targetBufferHeight) {
      canvas.width = targetBufferWidth;
      canvas.height = targetBufferHeight;
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;
    }

    // Direct buffer pixel drawing (1:1 precision, zero double-interpolation)
    const bufferW = canvas.width;
    const bufferH = canvas.height;

    // Clear background
    ctx.fillStyle = '#050507';
    ctx.fillRect(0, 0, bufferW, bufferH);

    // Calculate Aspect Ratio Cover
    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;
    const imgAspect = imgW / imgH;
    const canvasAspect = bufferW / bufferH;

    let drawW: number;
    let drawH: number;

    if (canvasAspect > imgAspect) {
      drawW = bufferW;
      drawH = bufferW / imgAspect;
    } else {
      drawH = bufferH;
      drawW = bufferH * imgAspect;
    }

    const drawX = Math.floor((bufferW - drawW) / 2);
    const drawY = Math.floor((bufferH - drawH) / 2);

    // High quality bicubic smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(img, drawX, drawY, drawW, drawH);

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
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#050507] flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="block touch-none select-none"
      />
    </div>
  );
};
