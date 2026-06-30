"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, ContactShadows, Center } from "@react-three/drei";
import * as THREE from "three";

/**
 * Real rigged robot (CC0 "RobotExpressive" by Tomás Laulhé / Don McCurdy),
 * loaded from a GLB. Plays its idle animation; the head turns to follow the
 * cursor. Auto-centered so the whole robot — head included — stays framed.
 * Re-tinted to a brushed-graphite finish so it reads on the dark theme.
 */

function Robot() {
  const group = useRef<THREE.Group>(null);
  const head = useRef<THREE.Object3D | null>(null);
  const { scene, animations } = useGLTF("/models/robot.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    const idle = actions?.["Idle"];
    idle?.reset().fadeIn(0.4).play();
    scene.traverse((o) => {
      if (o.name === "Head") head.current = o;
      const m = o as THREE.Mesh;
      if (m.isMesh && m.material) {
        const mat = (m.material as THREE.MeshStandardMaterial).clone();
        mat.color = new THREE.Color("#3c3d44"); // brushed graphite, visible on black
        mat.metalness = 0.7;
        mat.roughness = 0.3;
        if (mat.emissive) mat.emissive = new THREE.Color("#0a0a0c");
        m.material = mat;
      }
    });
    return () => {
      idle?.fadeOut(0.2);
    };
  }, [actions, scene]);

  useFrame((s) => {
    if (!head.current) return;
    const ty = THREE.MathUtils.clamp(s.pointer.x * 0.7, -0.7, 0.7);
    const tx = THREE.MathUtils.clamp(-s.pointer.y * 0.45, -0.4, 0.4);
    head.current.rotation.y = THREE.MathUtils.lerp(head.current.rotation.y, ty, 0.1);
    head.current.rotation.x = THREE.MathUtils.lerp(head.current.rotation.x, tx, 0.1);
  });

  return (
    <group ref={group}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

useGLTF.preload("/models/robot.glb");

export default function RobotScene() {
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.8]}
      shadows
      camera={{ position: [0, 0.1, 6.4], fov: 34 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <hemisphereLight intensity={0.5} color="#ffffff" groundColor="#1a1208" />
      {/* key + fill so the robot reads clearly */}
      <spotLight position={[-4, 6, 6]} angle={0.6} penumbra={0.7} intensity={260} color="#ffffff" castShadow />
      <directionalLight position={[2, 2, 5]} intensity={2.2} color="#fff3da" />
      {/* brand rims */}
      <pointLight position={[4, 1.5, -2]} intensity={70} color="#d4af37" />
      <pointLight position={[-3.5, 0, -2]} intensity={45} color="#e23636" />
      <Robot />
      <ContactShadows position={[0, -1.9, 0]} opacity={0.45} scale={9} blur={2.8} far={4} color="#000000" />
    </Canvas>
  );
}
