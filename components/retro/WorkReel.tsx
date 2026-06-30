"use client";

import { useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { projects, type Project } from "./projects";

const N = projects.length;
const STEP = (Math.PI * 2) / N;
const RADIUS = 6.4;
const FW = 3.3; // frame width
const FH = 2.1; // frame height

/** Self-contained filmstrip frame: optional photo + accent tint + sprocket
 *  holes + label, all baked into one CanvasTexture. The photo loads async and
 *  re-draws when ready. */
function frameTexture(p: Project): THREE.CanvasTexture {
  const cv = document.createElement("canvas");
  cv.width = 512;
  cv.height = 330;
  const ctx = cv.getContext("2d")!;
  const w = cv.width;
  const h = cv.height;
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;

  const drawOverlay = () => {
    // light accent tint for cohesion (keeps the photo clearly visible)
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "rgba(8,8,18,0.18)");
    g.addColorStop(1, p.accent + "26");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    // bottom darken only, for label legibility
    const dg = ctx.createLinearGradient(0, h * 0.55, 0, h);
    dg.addColorStop(0, "rgba(0,0,0,0)");
    dg.addColorStop(1, "rgba(0,0,0,0.72)");
    ctx.fillStyle = dg;
    ctx.fillRect(0, 0, w, h);

    // sprocket bands top + bottom
    const band = 30;
    ctx.fillStyle = "#0a0a0c";
    ctx.fillRect(0, 0, w, band);
    ctx.fillRect(0, h - band, w, band);
    ctx.fillStyle = "#d9d9e0";
    for (let x = 14; x < w - 14; x += 38) {
      ctx.fillRect(x, 9, 16, band - 18);
      ctx.fillRect(x, h - band + 9, 16, band - 18);
    }

    // label
    ctx.textAlign = "left";
    ctx.fillStyle = p.accent;
    ctx.font = "20px monospace";
    ctx.fillText(`${p.no} · ${p.tag}`, 26, h - 78);
    ctx.fillStyle = "#f2efe2";
    ctx.font = "italic 600 36px Georgia, serif";
    ctx.fillText(p.title, 26, h - 38);
    tex.needsUpdate = true;
  };

  // immediate placeholder fill (accent gradient) so nothing is blank
  ctx.fillStyle = "#0c0c14";
  ctx.fillRect(0, 0, w, h);
  drawOverlay();

  // load photo, then redraw photo (cover-fit) + overlay on top
  if (p.image) {
    const img = new Image();
    img.onload = () => {
      const ir = img.width / img.height;
      const cr = w / h;
      let dw = w, dh = h, dx = 0, dy = 0;
      if (ir > cr) { dh = h; dw = h * ir; dx = (w - dw) / 2; }
      else { dw = w; dh = w / ir; dy = (h - dh) / 2; }
      ctx.filter = "saturate(0.7) contrast(1.05)";
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.filter = "none";
      drawOverlay();
    };
    img.src = p.image;
  }

  return tex;
}

function Frame({
  index,
  textures,
  hoveredRef,
  onSelect,
}: {
  index: number;
  textures: THREE.CanvasTexture[];
  hoveredRef: MutableRefObject<number>;
  onSelect: (i: number) => void;
}) {
  const ref = useRef<THREE.Group>(null);
  const a = index * STEP;
  const pos: [number, number, number] = [
    RADIUS * Math.sin(a),
    0,
    RADIUS * Math.cos(a),
  ];

  useFrame(() => {
    const grp = ref.current;
    if (!grp) return;
    const hot = hoveredRef.current === index;
    const target = hot ? 1.06 : 1;
    grp.scale.x += (target - grp.scale.x) * 0.15;
    grp.scale.y += (target - grp.scale.y) * 0.15;
  });

  return (
    <group ref={ref} position={pos} rotation={[0, a, 0]}>
      {/* frame face */}
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          hoveredRef.current = index;
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          if (hoveredRef.current === index) hoveredRef.current = -1;
          document.body.style.cursor = "";
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(index);
        }}
      >
        <planeGeometry args={[FW, FH]} />
        <meshBasicMaterial map={textures[index]} toneMapped={false} />
      </mesh>
      {/* celluloid border */}
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[FW + 0.12, FH + 0.12]} />
        <meshBasicMaterial color="#0a0a0c" />
      </mesh>
    </group>
  );
}

function Reel({
  activeRef,
  hoveredRef,
  onSelect,
}: {
  activeRef: MutableRefObject<number>;
  hoveredRef: MutableRefObject<number>;
  onSelect: (i: number) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const textures = useMemo(() => projects.map(frameTexture), []);

  useFrame((state) => {
    const grp = group.current;
    if (!grp) return;
    // shortest-path lerp toward the active frame at the front
    const target = -activeRef.current * STEP;
    let cur = grp.rotation.y;
    let diff = target - cur;
    diff = ((diff + Math.PI) % (Math.PI * 2)) - Math.PI;
    grp.rotation.y = cur + diff * 0.08;
    // gentle breathing tilt
    grp.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.015;
  });

  return (
    <group ref={group}>
      {projects.map((_, i) => (
        <Frame
          key={i}
          index={i}
          textures={textures}
          hoveredRef={hoveredRef}
          onSelect={onSelect}
        />
      ))}
    </group>
  );
}

export default function WorkReel({
  activeRef,
  onSelect,
}: {
  activeRef: MutableRefObject<number>;
  onSelect: (i: number) => void;
}) {
  const hoveredRef = useRef(-1);
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.2, RADIUS + 4.2], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.8} />
      <Reel activeRef={activeRef} hoveredRef={hoveredRef} onSelect={onSelect} />
    </Canvas>
  );
}
