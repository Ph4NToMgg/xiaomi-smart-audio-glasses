import React, { useState, useCallback } from 'react';
import { FrameLoader } from './components/FrameLoader';
import { Navbar } from './components/Navbar';
import { ScrollAnimationSection } from './components/ScrollAnimationSection';
import { AcousticTechDemo } from './components/AcousticTechDemo';
import { FrameStyleCustomizer } from './components/FrameStyleCustomizer';
import { TouchGestureDemo } from './components/TouchGestureDemo';
import { TechSpecs } from './components/TechSpecs';
import { BuySection } from './components/BuySection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [loadedImages, setLoadedImages] = useState<HTMLImageElement[]>([]);
  const TOTAL_FRAMES = 240;

  const handleFramesLoaded = useCallback((images: HTMLImageElement[]) => {
    setLoadedImages(images);
  }, []);

  return (
    <div className="min-h-screen bg-[#050507] text-white selection:bg-yellow-400 selection:text-black">
      {/* Batched Frame Preloader Overlay */}
      <FrameLoader totalFrames={TOTAL_FRAMES} onFramesLoaded={handleFramesLoaded} />

      {/* Main Header Bar */}
      <Navbar />

      {/* Hero Scroll-Driven Frame Animation Section (450vh sticky viewport timeline) */}
      <ScrollAnimationSection frames={loadedImages} />

      {/* Interactive Sound Privacy Acoustic Engine Showcase */}
      <AcousticTechDemo />

      {/* Interactive 5 Frame Styles Switcher & Customizer */}
      <FrameStyleCustomizer />

      {/* Interactive Temple Gesture Simulator */}
      <TouchGestureDemo />

      {/* Full Technical Specifications Sheet */}
      <TechSpecs />

      {/* Pre-Order & Purchase Package Options */}
      <BuySection />

      {/* Minimalist Footer */}
      <Footer />
    </div>
  );
};

export default App;
