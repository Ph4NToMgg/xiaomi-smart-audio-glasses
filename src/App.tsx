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
import { ElectricWavesShader } from './components/ElectricWavesShader';

export const App: React.FC = () => {
  const [loadedImages, setLoadedImages] = useState<HTMLImageElement[]>([]);
  const TOTAL_FRAMES = 240;

  const handleFramesLoaded = useCallback((images: HTMLImageElement[]) => {
    setLoadedImages(images);
  }, []);

  return (
    <div className="min-h-screen bg-[#070709] text-white selection:bg-amber-400 selection:text-black relative">
      {/* Three.js WebGL Electric Waves Ambient Background Shader */}
      <ElectricWavesShader opacity={0.45} showControlsToggle={true} />

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

      {/* Interactive Temple Gesture Simulator */}
      <TouchGestureDemo />

      {/* Full Technical Specifications Sheet */}
      <TechSpecs />

      {/* Pre-Order & Purchase Package Options */}
      <BuySection />

      {/* Minimalist Luxury Footer */}
      <Footer />
    </div>
  );
};

export default App;
