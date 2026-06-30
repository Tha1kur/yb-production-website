"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/**
 * YB's avatar — an anonymous masked professional, built in real-time 3D so it
 * needs no licensed photography. A suited bust with a glossy black ovoid head;
 * a hard key light gives the signature specular streak, gold + red rims peel it
 * off the dark. Slow turn + a little pointer parallax keep it alive.
 */

function Figure() {
  const g = useRef<THREE.Group>(null);

  useFrame((s) => {
    if (!g.current) return;
    const t = s.clock.elapsedTime;
    g.current.rotation.y = Math.sin(t * 0.22) * 0.28 + s.pointer.x * 0.3;
    g.current.rotation.x = THREE.MathUtils.lerp(
      g.current.rotation.x,
      s.pointer.y * -0.1,
      0.05,
    );
  });

  const suit = (
    <meshStandardMaterial color="#101013" roughness={0.62} metalness={0.2} />
  );

  return (
    <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.5}>
      <group ref={g} position={[0, -0.55, 0]}>
        {/* glossy black mask/head */}
        <mesh position={[0, 1.62, 0]} scale={[0.82, 1.1, 0.92]} castShadow>
          <sphereGeometry args={[0.6, 64, 64]} />
          <meshStandardMaterial
            color="#070708"
            roughness={0.12}
            metalness={0.5}
            envMapIntensity={1.2}
          />
        </mesh>
        {/* neck */}
        <mesh position={[0, 1.0, 0]}>
          <cylinderGeometry args={[0.15, 0.2, 0.45, 32]} />
          {suit}
        </mesh>
        {/* shoulders / torso (tapered, open cylinder) */}
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.98, 0.6, 1.55, 64, 1, true]} />
          <meshStandardMaterial
            color="#0f0f12"
            roughness={0.66}
            metalness={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* rounded shoulder caps */}
        <mesh position={[-0.74, 0.62, 0]} scale={[1, 0.72, 1]}>
          <sphereGeometry args={[0.33, 32, 32]} />
          {suit}
        </mesh>
        <mesh position={[0.74, 0.62, 0]} scale={[1, 0.72, 1]}>
          <sphereGeometry args={[0.33, 32, 32]} />
          {suit}
        </mesh>
        {/* lapel V */}
        <mesh position={[0, 0.5, 0.46]} rotation={[0.2, 0, 0]}>
          <coneGeometry args={[0.42, 0.9, 3, 1, true]} />
          <meshStandardMaterial color="#070709" roughness={0.4} metalness={0.3} side={THREE.DoubleSide} />
        </mesh>
        {/* tie */}
        <mesh position={[0, 0.42, 0.52]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.12, 0.95, 0.04]} />
          <meshStandardMaterial color="#050506" roughness={0.22} metalness={0.45} />
        </mesh>
      </group>
    </Float>
  );
}

export default function MaskedFigure() {
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.8]}
      camera={{ position: [0, 0.7, 4.6], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.18} />
      {/* hard key — the glossy highlight streak */}
      <spotLight
        position={[-3.5, 4.5, 4]}
        angle={0.5}
        penumbra={0.7}
        intensity={140}
        color="#ffffff"
        distance={22}
      />
      <pointLight position={[-2, 2.2, 3]} intensity={26} color="#fff7e6" />
      {/* brand rims */}
      <pointLight position={[3.2, 1.2, -1.5]} intensity={42} color="#d4af37" />
      <pointLight position={[-3, -0.5, -2]} intensity={30} color="#e23636" />
      <Figure />
    </Canvas>
  );
}
