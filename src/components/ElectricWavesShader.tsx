import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ElectricWavesShaderProps {
  opacity?: number;
}

export const ElectricWavesShader: React.FC<ElectricWavesShaderProps> = ({
  opacity = 0.85,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  // Exact shader parameters from 21st.dev "Colorful Wave Pattern"
  const [waveCount, setWaveCount] = useState(5.0);
  const [amplitude, setAmplitude] = useState(0.19);
  const [frequency, setFrequency] = useState(5.1);
  const [brightness, setBrightness] = useState(0.00509);
  const [colorSeparation, setColorSeparation] = useState(0.04);
  const [showControls, setShowControls] = useState(true);

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
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
    } catch (err) {
      console.error('WebGL not supported', err);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const clock = new THREE.Clock();

    // GLSL 100 Shaders from 21st.dev
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
          uv.x += sin(u_time * (1.0 + i) + uv.y * u_frequency) * u_amplitude;
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
          color[channel] += pattern(cuv);
        }
        return color;
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);
        vec3 col = scene(uv);
        gl_FragColor = vec4(col, 1.0);
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

  // Styles matching exact 21st.dev control panel
  const controlPanelStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: '30px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    padding: '16px 24px',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    color: 'white',
    fontFamily: 'sans-serif',
    width: '320px',
    zIndex: 40,
    boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
  };

  const labelStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    fontWeight: 'bold',
    marginBottom: '4px',
  };

  const sliderStyle: React.CSSProperties = {
    width: '100%',
    accentColor: '#FF2A00',
    cursor: 'pointer',
  };

  return (
    <>
      {/* Background WebGL Shader Canvas Container */}
      <div
        ref={containerRef}
        className="fixed inset-0 -z-10 pointer-events-none transition-opacity duration-700"
        style={{ opacity }}
        aria-label="Interactive electric waves background"
      />

      {/* Control Panel Toggle Button */}
      <button
        onClick={() => setShowControls(!showControls)}
        className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-full bg-zinc-900/90 border border-red-500/40 text-red-400 font-mono text-xs font-bold backdrop-blur-xl shadow-2xl hover:border-red-400 transition-all cursor-pointer"
      >
        {showControls ? 'Hide Shader Controls' : 'Show Shader Controls'}
      </button>

      {/* Exact Floating Control Panel from 21st.dev */}
      {showControls && (
        <div style={controlPanelStyle} className="pointer-events-auto">
          <div>
            <div style={labelStyle}>
              <span>Wave Count</span>
              <span>{waveCount.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              step="1"
              value={waveCount}
              onChange={(e) => setWaveCount(parseFloat(e.target.value))}
              style={sliderStyle}
            />
          </div>

          <div>
            <div style={labelStyle}>
              <span>Amplitude</span>
              <span>{amplitude.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.01"
              max="0.5"
              step="0.01"
              value={amplitude}
              onChange={(e) => setAmplitude(parseFloat(e.target.value))}
              style={sliderStyle}
            />
          </div>

          <div>
            <div style={labelStyle}>
              <span>Frequency</span>
              <span>{frequency.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="10"
              step="0.1"
              value={frequency}
              onChange={(e) => setFrequency(parseFloat(e.target.value))}
              style={sliderStyle}
            />
          </div>

          <div>
            <div style={labelStyle}>
              <span>Brightness</span>
              <span>{brightness.toFixed(5)}</span>
            </div>
            <input
              type="range"
              min="0.00001"
              max="0.01"
              step="0.00001"
              value={brightness}
              onChange={(e) => setBrightness(parseFloat(e.target.value))}
              style={sliderStyle}
            />
          </div>

          <div>
            <div style={labelStyle}>
              <span>Color Separation</span>
              <span>{colorSeparation.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.0"
              max="0.5"
              step="0.01"
              value={colorSeparation}
              onChange={(e) => setColorSeparation(parseFloat(e.target.value))}
              style={sliderStyle}
            />
          </div>
        </div>
      )}
    </>
  );
};
