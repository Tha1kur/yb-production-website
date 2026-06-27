"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * Abstract generative 3D object for the hero — a distorted, slowly morphing
 * icosahedron in emerald/gold that drifts toward the cursor. Studio-vibe, not a
 * product render. Renders only on capable desktops; otherwise the CSS hero
 * background (glows + grid) carries the look.
 */

function Blob() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const mesh = ref.current;
    if (!mesh) return;
    mesh.rotation.x += delta * 0.12;
    mesh.rotation.y += delta * 0.16;
    // ease toward the pointer for a parallax "follow" feel
    mesh.position.x = THREE.MathUtils.lerp(mesh.position.x, state.pointer.x * 0.7, 0.04);
    mesh.position.y = THREE.MathUtils.lerp(mesh.position.y, state.pointer.y * 0.45, 0.04);
  });

  return (
    <Float speed={1.1} rotationIntensity={0.5} floatIntensity={0.9}>
      <Icosahedron ref={ref} args={[1.45, 12]}>
        <MeshDistortMaterial
          color="#0a5a40"
          emissive="#10b981"
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.65}
          distort={0.42}
          speed={1.5}
        />
      </Icosahedron>
      {/* faint gold wireframe shell for depth */}
      <Icosahedron args={[1.7, 1]}>
        <meshBasicMaterial color="#d4af37" wireframe transparent opacity={0.12} />
      </Icosahedron>
    </Float>
  );
}

export function Hero3D() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches; // desktop pointer
    // crude low-power guard: skip on very small viewports
    const bigEnough = window.innerWidth >= 768;
    setEnabled(!reduce && fine && bigEnough);
  }, []);

  if (!enabled) return null;

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.2], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 3, 4]} intensity={1.3} color="#f5e3a8" />
      <pointLight position={[-4, -2, -2]} intensity={2} color="#10b981" />
      <Blob />
    </Canvas>
  );
}
