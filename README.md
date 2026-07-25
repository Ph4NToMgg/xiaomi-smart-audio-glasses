# Xiaomi Smart Audio Glasses — Interactive 3D Scroll Showcase 👓✨

[![Deploy with Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel)](https://xiaomi-smart-audio-glasses.vercel.app/)
[![React 18](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.js)](https://threejs.org/)

An interactive, high-performance product landing page and technical experiment showcasing the **Xiaomi Smart Audio Glasses (Mijia Edition)**. 

🔗 **Live Demo / Web Application**: [https://xiaomi-smart-audio-glasses.vercel.app/](https://xiaomi-smart-audio-glasses.vercel.app/)

---

## 🎯 About The Project & Main Concept

This repository was created as a high-end experimental project to test and implement an **Apple-grade 240-frame scroll-driven image sequence carousel**. 

The core feature is a **60 FPS HTML5 Canvas engine** that decodes, pre-caches, and renders a 240-frame exploded disassembly of the smart glasses as the user scrolls down the page.

### 🌟 Key Animation Features:
- **240-Frame Exploded Disassembly**: Real-time rendering of internal micro-drivers, titanium hinges, and acoustic wiring separating as you scroll.
- **Boomerang Reverse Scroll Loop**: 
  - **Scroll Down (0% ➔ 50%)**: Plays forward from Frame 1 ➔ Frame 240.
  - **Scroll Hold (50% ➔ 60%)**: Holds Frame 240 fixed on screen for 50 scroll steps to admire the internal components.
  - **Scroll Down (60% ➔ 100%)**: Plays in reverse from Frame 240 ➔ Frame 1, seamlessly reassembling the glasses.
- **Butter-Smooth Canvas Interpolation**: High-quality 2D canvas context scaling with dynamic device pixel ratio (DPR) hardware acceleration.

---

## 🔥 Features & Interactive Showcase

1. **WebGL GLSL Neon Wave Shader**:
   - Built with Three.js. Runs a custom GLSL fragment shader (`ElectricWavesShader`) as a GPU-accelerated background layer across the website.
2. **Interactive Acoustic Engine Telemetry (`AcousticTechDemo`)**:
   - Live toggle between **Private Beam** (85% sound leak cancellation) and **Standard Open Mode**.
   - Real-time animated frequency spectrum bar chart responding to a 60Hz–12kHz frequency slider.
   - Macro photography showcase of the open-ear speaker grill.
3. **4-Frame Style Customizer (`FrameStyleCustomizer`)**:
   - Interactive style switcher for 4 interchangeable magnetic frames: **Wayfarer**, **Browline Classic**, **Round Retro**, and **Titanium Pilot**.
4. **Macro Product Photo Gallery (`ProductGallery`)**:
   - Detailed macro photography grid with interactive modal previews highlighting titanium hinges, speaker grills, and leather travel charging cases.
5. **Capacitive Touch Haptic Simulator (`TouchGestureDemo`)**:
   - Macro photo hotspot visualizer simulating Swipe (volume/track), Double Tap (call/pause), Triple Tap (memo), and Long Press (AI Assistant).
6. **High-Contrast Dark Glassmorphism Design System**:
   - Custom `#060608` obsidian dark theme with `32px` backdrop blur, crisp drop-shadow text contrast matrices, and gold accents.

---

## 🛠️ Technology Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Bundler / Dev Server**: Vite 6
- **WebGL 3D Graphics**: Three.js (`@types/three`)
- **Styling**: Tailwind CSS v4 (with Vanilla CSS tokens & Glassmorphic utilities)
- **Icons**: Lucide React
- **Deployment**: Vercel CI/CD

---

## 🚀 Quick Start & Local Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `yarn`

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Ph4NToMgg/xiaomi-smart-audio-glasses.git
   cd xiaomi-smart-audio-glasses
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000/` in your browser.

4. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 📄 License

Created for demonstration & portfolio showcase purposes. Xiaomi, Mijia, and Smart Audio Glasses trademarks belong to Xiaomi Inc.
