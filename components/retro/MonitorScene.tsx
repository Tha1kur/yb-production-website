"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { scrollState } from "./scrollState";

/**
 * Retro CRT computer (Super-PET-style) for the hero — built from primitives so
 * it needs no external model. Cream chassis, dark bezel, and a live phosphor
 * screen driven by an animated CanvasTexture (colour bars + rolling scanline +
 * "YB PRODUCTION"). Sits in volumetric fog; the camera eases toward it on
 * scroll. A polished GLB model can drop in later without touching the scene.
 */

const CREAM = "#d8cdb6";
const CREAM_DARK = "#b3a489";
const BEZEL = "#2a2620";

function useScreenTexture() {
  return useMemo(() => {
    const cv = document.createElement("canvas");
    cv.width = 512;
    cv.height = 384;
    const ctx = cv.getContext("2d")!;
    const tex = new THREE.CanvasTexture(cv);
    tex.colorSpace = THREE.SRGBColorSpace;
    const bars = [
      "#c0c0c0", "#c9c92e", "#2ec9c9", "#2ec92e",
      "#c92ec9", "#c92e2e", "#2e2ec9",
    ];
    const draw = (t: number) => {
      const w = cv.width;
      const h = cv.height;
      const bw = w / bars.length;
      for (let k = 0; k < bars.length; k++) {
        ctx.fillStyle = bars[k];
        ctx.fillRect(k * bw, 0, bw + 1, h * 0.72);
      }
      ctx.fillStyle = "#06060a";
      ctx.fillRect(0, h * 0.72, w, h * 0.28);
      ctx.fillStyle = "rgba(180,170,235,0.9)";
      ctx.font = `italic ${Math.round(h * 0.14)}px Georgia, serif`;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.fillText("YB PRODUCTION", w / 2, h * 0.86);
      // rolling bright scanline
      const y = ((t * 0.12) % 1) * h;
      const grad = ctx.createLinearGradient(0, y - 26, 0, y + 26);
      grad.addColorStop(0, "rgba(255,255,255,0)");
      grad.addColorStop(0.5, "rgba(255,255,255,0.22)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, y - 26, w, 52);
      tex.needsUpdate = true;
    };
    draw(0);
    return { tex, draw };
  }, []);
}

function Computer() {
  const group = useRef<THREE.Group>(null);
  const { tex, draw } = useScreenTexture();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    draw(t);
    if (group.current) {
      // subtle idle sway + a touch of pointer parallax
      group.current.rotation.y =
        -0.32 + Math.sin(t * 0.3) * 0.04 + state.pointer.x * 0.06;
      group.current.rotation.x = 0.04 + state.pointer.y * -0.03;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.12} floatIntensity={0.5}>
      <group ref={group} position={[0, -0.2, 0]}>
        {/* monitor chassis */}
        <mesh position={[0, 0.55, 0]} castShadow>
          <boxGeometry args={[2.5, 2, 1.7]} />
          <meshStandardMaterial color={CREAM} roughness={0.7} metalness={0.05} />
        </mesh>
        {/* dark bezel */}
        <mesh position={[0, 0.62, 0.86]}>
          <boxGeometry args={[2.1, 1.6, 0.08]} />
          <meshStandardMaterial color={BEZEL} roughness={0.6} />
        </mesh>
        {/* phosphor screen */}
        <mesh position={[0, 0.62, 0.92]}>
          <planeGeometry args={[1.84, 1.36]} />
          <meshBasicMaterial map={tex} toneMapped={false} />
        </mesh>
        {/* screen glow */}
        <pointLight position={[0, 0.62, 1.6]} intensity={2.2} distance={4} color="#9a90e8" />
        {/* base / stand */}
        <mesh position={[0, -0.62, -0.05]}>
          <boxGeometry args={[2.7, 0.5, 1.9]} />
          <meshStandardMaterial color={CREAM_DARK} roughness={0.75} />
        </mesh>
        {/* keyboard */}
        <mesh position={[0, -0.78, 1.15]} rotation={[-0.12, 0, 0]}>
          <boxGeometry args={[2.6, 0.18, 0.9]} />
          <meshStandardMaterial color={CREAM} roughness={0.8} />
        </mesh>
      </group>
    </Float>
  );
}

function Rig() {
  useFrame((state) => {
    // ease the camera toward the screen as the hero scrolls away
    const p = Math.min(1, scrollState.y / scrollState.vh);
    const targetZ = 6.2 - p * 1.8;
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.06;
    state.camera.lookAt(0, 0.4, 0);
  });
  return null;
}

export default function MonitorScene() {
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.75]}
      camera={{ position: [0.4, 0.6, 6.2], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ scene }) => {
        scene.fog = new THREE.FogExp2("#0a0716", 0.16);
      }}
    >
      <ambientLight intensity={0.4} color="#b9b2e0" />
      <directionalLight position={[4, 5, 5]} intensity={1.4} color="#ffe6c2" />
      <pointLight position={[-5, -1, 1]} intensity={1.8} color="#7856c8" />
      <Computer />
      <Rig />
    </Canvas>
  );
}
