import React, { useEffect, useState } from 'react';

interface FrameLoaderProps {
  totalFrames: number;
  onFramesLoaded: (loadedImages: HTMLImageElement[]) => void;
}

export const FrameLoader: React.FC<FrameLoaderProps> = ({ totalFrames, onFramesLoaded }) => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [statusText, setStatusText] = useState('Initializing acoustic vision engine...');

  useEffect(() => {
    let isCancelled = false;
    const images: HTMLImageElement[] = new Array(totalFrames);
    const BATCH_SIZE = 12;
    let currentIndex = 0;

    const formatFrameNumber = (num: number): string => {
      return String(num).padStart(3, '0');
    };

    const loadNextBatch = async () => {
      if (isCancelled) return;

      const batchPromises: Promise<void>[] = [];
      const endIndex = Math.min(currentIndex + BATCH_SIZE, totalFrames);

      for (let i = currentIndex; i < endIndex; i++) {
        const frameIndex = i;
        const promise = new Promise<void>((resolve) => {
          const img = new Image();
          const frameNum = formatFrameNumber(frameIndex + 1);
          const src = `/images/ezgif-frame-${frameNum}.jpg`;

          img.decoding = 'async';
          img.src = src;

          img.onload = () => {
            if (!isCancelled) {
              images[frameIndex] = img;
              setLoadedCount((prev) => {
                const next = prev + 1;
                if (next === Math.floor(totalFrames * 0.3)) {
                  setStatusText('Buffering 1080p frame sequence...');
                } else if (next === Math.floor(totalFrames * 0.7)) {
                  setStatusText('Calibrating high-precision scroll timeline...');
                }
                return next;
              });
            }
            resolve();
          };
          img.onerror = () => {
            console.warn(`Failed to load frame ${src}`);
            if (!isCancelled) {
              images[frameIndex] = img;
              setLoadedCount((prev) => prev + 1);
            }
            resolve();
          };
        });

        batchPromises.push(promise);
      }

      await Promise.all(batchPromises);
      currentIndex = endIndex;

      if (currentIndex < totalFrames && !isCancelled) {
        setTimeout(loadNextBatch, 15);
      } else if (currentIndex >= totalFrames && !isCancelled) {
        setStatusText('Ready for scroll storytelling');
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => {
            setIsLoading(false);
            onFramesLoaded(images);
          }, 600);
        }, 300);
      }
    };

    loadNextBatch();

    return () => {
      isCancelled = true;
    };
  }, [totalFrames, onFramesLoaded]);

  if (!isLoading) return null;

  const percentage = Math.min(100, Math.round((loadedCount / totalFrames) * 100));

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050507] transition-opacity duration-700 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6 text-center">
        <div className="relative mb-8 flex items-center justify-center">
          <div className="w-20 h-20 rounded-2xl bg-zinc-900/90 border border-yellow-500/30 flex items-center justify-center yellow-glow">
            <svg
              className="w-10 h-10 text-yellow-400 animate-pulse"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 12c0-2.2 1.8-4 4-4h2.5c1.4 0 2.5 1.1 2.5 2.5v3c0 1.4-1.1 2.5-2.5 2.5H6c-2.2 0-4-1.8-4-4z" />
              <path d="M22 12c0-2.2-1.8-4-4-4h-2.5c-1.4 0-2.5 1.1-2.5 2.5v3c0 1.4 1.1 2.5 2.5 2.5H18c2.2 0 4-1.8 4-4z" />
              <path d="M11 10.5h2" />
              <path d="M2 12h-1" />
              <path d="M22 12h1" />
            </svg>
          </div>
          <span className="absolute -top-2 -right-2 px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-yellow-400 text-black rounded-full shadow-md">
            Mijia
          </span>
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-white mb-1 font-heading">
          Xiaomi Smart Audio Glasses
        </h2>
        <p className="text-xs text-zinc-400 uppercase tracking-widest mb-8 font-mono">
          Scroll-Driven Frame Renderer
        </p>

        <div className="w-full bg-zinc-900/80 border border-zinc-800 rounded-full h-3 p-0.5 overflow-hidden mb-4 relative shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-yellow-500 via-yellow-400 to-amber-300 rounded-full transition-all duration-200 ease-out relative"
            style={{ width: `${percentage}%` }}
          >
            <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full" />
          </div>
        </div>

        <div className="flex items-center justify-between w-full text-xs font-mono text-zinc-400">
          <span className="text-zinc-500">{statusText}</span>
          <span className="text-yellow-400 font-bold">{percentage}%</span>
        </div>
      </div>
    </div>
  );
};
