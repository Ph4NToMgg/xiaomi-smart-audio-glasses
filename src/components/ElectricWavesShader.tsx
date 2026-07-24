import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ElectricWavesShader: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x070709, 1.0);
      container.appendChild(renderer.domElement);
    } catch (err) {
      console.error('WebGL not supported', err);
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

    // High precision GLSL Shader with Division-By-Zero GPU Guard (+ 0.001)
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
          // GPU Guard: Add 0.001 to prevent division by zero in WebGL drivers
          intensity += u_brightness / (abs(uv.x) + 0.001);
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
        // Base dark background + vibrant GLSL wave color
        vec3 bg = vec3(0.02, 0.02, 0.03);
        gl_FragColor = vec4(bg + col, 1.0);
      }
    `;

    // Hardcoded exact preset values from 21st.dev
    const uniforms = {
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2() },
      u_waveCount: { value: 5.0 },
      u_amplitude: { value: 0.19 },
      u_frequency: { value: 5.1 },
      u_brightness: { value: 0.00509 },
      u_colorSeparation: { value: 0.04 },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const onResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
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
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none w-full h-full"
      style={{ zIndex: 0 }}
      aria-label="Interactive electric waves background"
    />
  );
};
