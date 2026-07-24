import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sliders, X, Sparkles } from 'lucide-react';

interface ElectricWavesShaderProps {
  opacity?: number;
  showControlsToggle?: boolean;
}

export const ElectricWavesShader: React.FC<ElectricWavesShaderProps> = ({
  opacity = 0.4,
  showControlsToggle = true,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const [showControls, setShowControls] = useState(false);

  // Shader parameter state
  const [waveCount, setWaveCount] = useState(6.0);
  const [amplitude, setAmplitude] = useState(0.08);
  const [frequency, setFrequency] = useState(2.5);
  const [brightness, setBrightness] = useState(0.004);
  const [colorSeparation, setColorSeparation] = useState(0.08);

  // Sync React state → shader uniforms
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_waveCount.value = waveCount;
      materialRef.current.uniforms.u_amplitude.value = amplitude;
      materialRef.current.uniforms.u_frequency.value = frequency;
      materialRef.current.uniforms.u_brightness.value = brightness;
      materialRef.current.uniforms.u_colorSeparation.value = colorSeparation;
    }
  }, [waveCount, amplitude, frequency, brightness, colorSeparation]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
    } catch (err) {
      console.warn('WebGL not supported', err);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const clock = new THREE.Clock();

    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision mediump float;

      uniform float u_time;
      uniform vec2 u_resolution;
      uniform float u_waveCount;
      uniform float u_amplitude;
      uniform float u_frequency;
      uniform float u_brightness;
      uniform float u_colorSeparation;

      float pattern(vec2 uv) {
        float intensity = 0.0;
        for (float i = 0.0; i < 20.0; i++) {
          if (i >= u_waveCount) break;
          uv.x += sin(u_time * (1.0 + i * 0.3) + uv.y * u_frequency) * u_amplitude;
          intensity += u_brightness / abs(uv.x);
        }
        return intensity;
      }

      vec3 scene(vec2 uv) {
        vec3 color = vec3(0.0);
        vec2 ruv = vec2(uv.y, uv.x);
        for (float i = 0.0; i < 20.0; i++) {
          if (i >= u_waveCount) break;
          int channel = int(mod(i, 3.0));
          vec2 cuv = ruv + vec2(0.0, i * u_colorSeparation);
          
          float p = pattern(cuv);
          if (channel == 0) color += vec3(p * 1.0, p * 0.75, p * 0.1); // Amber / Gold
          else if (channel == 1) color += vec3(p * 0.9, p * 0.6, p * 0.05); // Warm Gold
          else color += vec3(p * 0.2, p * 0.6, p * 1.0); // Cyan Electric Sparkle
        }
        return color;
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);
        vec3 col = scene(uv);
        gl_FragColor = vec4(col, min(1.0, length(col)));
      }
    `;

    const uniforms = {
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2() },
      u_waveCount: { value: waveCount },
      u_amplitude: { value: amplitude },
      u_frequency: { value: frequency },
      u_brightness: { value: brightness },
      u_colorSeparation: { value: colorSeparation },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });
    materialRef.current = material;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const onResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      uniforms.u_resolution.value.set(width, height);
    };

    window.addEventListener('resize', onResize);
    onResize();

    renderer.setAnimationLoop(() => {
      uniforms.u_time.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    });

    return () => {
      window.removeEventListener('resize', onResize);
      renderer.setAnimationLoop(null);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <>
      {/* Background WebGL Shader Canvas */}
      <div
        ref={containerRef}
        className="fixed inset-0 -z-10 pointer-events-none transition-opacity duration-1000"
        style={{ opacity }}
        aria-hidden="true"
      />

      {/* Optional Interactive Shader Controller Floating Button & Drawer */}
      {showControlsToggle && (
        <div className="fixed bottom-6 left-6 z-40">
          <button
            onClick={() => setShowControls(!showControls)}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-zinc-900/90 border border-amber-500/30 text-amber-400 text-xs font-mono backdrop-blur-md shadow-xl hover:border-amber-400 transition-all cursor-pointer"
            title="Configure Electric Waves Shader"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Shader FX</span>
          </button>

          {showControls && (
            <div className="absolute bottom-12 left-0 w-72 glass-studio-gold rounded-2xl p-5 border border-amber-500/40 text-xs font-mono text-white space-y-3 shadow-2xl backdrop-blur-2xl">
              <div className="flex items-center justify-between border-b border-amber-500/30 pb-2">
                <span className="font-bold text-amber-400 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5" /> WebGL Electric Waves
                </span>
                <button onClick={() => setShowControls(false)} className="text-zinc-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-zinc-400">Wave Count</span>
                  <span className="text-amber-400 font-bold">{waveCount.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  step="1"
                  value={waveCount}
                  onChange={(e) => setWaveCount(parseFloat(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-zinc-400">Amplitude</span>
                  <span className="text-amber-400 font-bold">{amplitude.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.01"
                  max="0.3"
                  step="0.01"
                  value={amplitude}
                  onChange={(e) => setAmplitude(parseFloat(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-zinc-400">Frequency</span>
                  <span className="text-amber-400 font-bold">{frequency.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="8"
                  step="0.1"
                  value={frequency}
                  onChange={(e) => setFrequency(parseFloat(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-zinc-400">Brightness</span>
                  <span className="text-amber-400 font-bold">{brightness.toFixed(4)}</span>
                </div>
                <input
                  type="range"
                  min="0.001"
                  max="0.008"
                  step="0.0005"
                  value={brightness}
                  onChange={(e) => setBrightness(parseFloat(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-zinc-400">Color Separation</span>
                  <span className="text-amber-400 font-bold">{colorSeparation.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="0.3"
                  step="0.01"
                  value={colorSeparation}
                  onChange={(e) => setColorSeparation(parseFloat(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
