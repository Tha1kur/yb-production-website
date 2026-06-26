"use client";

import { useEffect, useRef } from "react";

// A lightweight animated WebGL gradient/flow field — emerald + gold on near-black.
// Inspired by the shader-driven aesthetic of creative dev studios. Falls back
// gracefully to a static CSS gradient if WebGL is unavailable or motion is reduced.

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;

// cheap hash + value noise
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(hash(i+vec2(0.0,0.0)), hash(i+vec2(1.0,0.0)), u.x),
             mix(hash(i+vec2(0.0,1.0)), hash(i+vec2(1.0,1.0)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for(int i=0;i<5;i++){ v += a*noise(p); p *= 2.0; a *= 0.5; }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p = uv;
  p.x *= u_res.x / u_res.y;

  float t = u_time * 0.03;
  // flowing domain-warped noise
  vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t));
  float n = fbm(p + 1.6*q + t*0.5);

  vec3 ink     = vec3(0.020, 0.031, 0.039);
  vec3 emerald = vec3(0.039, 0.353, 0.255);
  vec3 glow    = vec3(0.063, 0.725, 0.506);
  vec3 gold    = vec3(0.835, 0.686, 0.216);

  vec3 col = ink;
  col = mix(col, emerald, smoothstep(0.35, 0.85, n) * 0.55);
  col = mix(col, glow,    smoothstep(0.62, 0.95, n) * 0.30);
  // sparse gold filaments
  float g = smoothstep(0.80, 0.97, fbm(p*1.8 + q*2.0 - t));
  col = mix(col, gold, g * 0.18);

  // radial vignette so edges stay deep and text reads
  float vig = smoothstep(1.15, 0.25, length(uv - 0.5));
  col *= mix(0.45, 1.0, vig);

  gl_FragColor = vec4(col, 1.0);
}
`;

const VERT = `
attribute vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

export function ShaderBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) {
      canvas.style.display = "none"; // CSS fallback (parent has a gradient) takes over
      return;
    }

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      const w = Math.floor(window.innerWidth * dpr);
      const h = Math.floor(window.innerHeight * dpr);
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    const start = performance.now();
    const render = (now: number) => {
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(render);
    };

    if (prefersReduced) {
      gl.uniform1f(uTime, 12.0); // single static frame
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    } else {
      raf = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(ellipse_at_top,#0a2a1f_0%,#05080a_60%)]"
    >
      <canvas ref={ref} className="h-full w-full opacity-60" />
      {/* readability veil — keeps text crisp over the animated field */}
      <div className="absolute inset-0 bg-ink/55" />
    </div>
  );
}
