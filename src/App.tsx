import React, { useState, useCallback } from 'react';
import { FrameLoader } from './components/FrameLoader';
import { Navbar } from './components/Navbar';
import { ScrollAnimationSection } from './components/ScrollAnimationSection';
import { AcousticTechDemo } from './components/AcousticTechDemo';
import { FrameStyleCustomizer } from './components/FrameStyleCustomizer';
import { ProductGallery } from './components/ProductGallery';
import { TouchGestureDemo } from './components/TouchGestureDemo';
import { TechSpecs } from './components/TechSpecs';
import { BuySection } from './components/BuySection';
import { Footer } from './components/Footer';
import { ElectricWavesShader } from './components/ElectricWavesShader';

export const App: React.FC = () => {
  const [loadedImages, setLoadedImages] = useState<HTMLImageElement[]>([]);
  const TOTAL_FRAMES = 240;

  const handleFramesLoaded = useCallback((images: HTMLImageElement[]) => {
    setLoadedImages(images);
  }, []);

  return (
    <div className="min-h-screen text-white selection:bg-amber-400 selection:text-black relative">
      {/* Layer 1: Deep Solid Obsidian Background (-z-20) */}
      <div className="fixed inset-0 -z-20 bg-[#060608] pointer-events-none" />

      {/* Layer 2: Three.js WebGL Electric Waves Ambient Shader (-z-10) */}
      <ElectricWavesShader />

      {/* Layer 3: Main Page Content & Foreground Components (z-0) */}
      <div className="relative z-0">
        {/* Batched Frame Preloader Overlay */}
        <FrameLoader totalFrames={TOTAL_FRAMES} onFramesLoaded={handleFramesLoaded} />

        {/* Main Navigation Header Bar */}
        <Navbar />

        {/* Hero Scroll-Driven Frame Animation Section */}
        <ScrollAnimationSection frames={loadedImages} />

        {/* Interactive Sound Privacy Acoustic Engine Showcase */}
        <AcousticTechDemo />

        {/* Interactive 4 Frame Styles Switcher & Customizer */}
        <FrameStyleCustomizer />

        {/* Luxury Product Photo & Macro Component Showcase */}
        <ProductGallery />

        {/* Interactive Temple Gesture Simulator */}
        <TouchGestureDemo />

        {/* Full Technical Specifications Sheet */}
        <TechSpecs />

        {/* Pre-Order & Purchase Package Options */}
        <BuySection />

        {/* Minimalist Luxury Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default App;
