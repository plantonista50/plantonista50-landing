"use client";

/**
 * OrbCanvas — "a nuvem da IA pensando"
 * --------------------------------------------------------------
 * O objeto-assinatura: um Sentient Orb — esfera de ~5k partículas
 * (malha neural) deslocadas por ruído simplex em shader, com um
 * núcleo icosaédrico wireframe. Na paleta REAL do app
 * (#0b57d0 → #a8c7fa → #c8dcff sobre #101114).
 *
 * O scroll é o estado mental da IA (keyframes sobre o progresso
 * do documento inteiro):
 *   hero      → respiração calma (ouvindo)
 *   demo      → agitação (processando a censura/análise)
 *   resultado → colapsa em ordem (insight)
 *   meio      → presença discreta ao lado do conteúdo
 *   CTA final → pulso quente (pronto para o plantão)
 *
 * Render-free: progresso lido passivamente no useFrame (zero
 * re-render React). Fail-safe/reduced-motion vivem no stage.
 */

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const COLD = new THREE.Color("#0b57d0");
const MID = new THREE.Color("#a8c7fa");
const HOT = new THREE.Color("#c8dcff");

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function docProgress() {
  if (typeof window === "undefined") return 0;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max > 0 ? clamp01(window.scrollY / max) : 0;
}

/* estados mentais do orb ao longo do scroll: [p, amp, speed, bright, x, scale] */
const STOPS: [number, number, number, number, number, number][] = [
  [0.0, 0.2, 0.55, 1.0, 1.55, 1.0],   // hero · calmo, atrás do teaser
  [0.1, 0.52, 1.6, 1.15, 2.1, 0.92],  // demo · pensando forte
  [0.3, 0.52, 1.6, 1.15, 2.3, 0.85],  // ainda processando
  [0.34, 0.09, 0.35, 1.4, 2.3, 0.85], // resultado · colapsa em ordem
  [0.46, 0.28, 0.7, 1.0, 2.5, 0.75],  // meio · presença discreta
  [0.84, 0.3, 0.7, 1.0, 2.5, 0.75],
  [0.96, 0.44, 1.15, 1.5, 0.0, 1.05], // CTA final · pulso central
  [1.0, 0.44, 1.15, 1.5, 0.0, 1.05],
];

function stateAt(p: number) {
  let i = 0;
  while (i < STOPS.length - 2 && p > STOPS[i + 1][0]) i++;
  const a = STOPS[i], b = STOPS[i + 1];
  const t = clamp01((p - a[0]) / Math.max(1e-5, b[0] - a[0]));
  return {
    amp: lerp(a[1], b[1], t),
    speed: lerp(a[2], b[2], t),
    bright: lerp(a[3], b[3], t),
    x: lerp(a[4], b[4], t),
    scale: lerp(a[5], b[5], t),
  };
}

/* simplex noise 3D (Ashima / IQ, domínio público) */
const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x - floor(x * (1.0/289.0)) * 289.0;}
vec4 mod289(vec4 x){return x - floor(x * (1.0/289.0)) * 289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`;

const VERT = /* glsl */ `
uniform float uTime;
uniform float uAmp;
uniform float uSpeed;
uniform float uPix;
attribute float aSeed;
varying float vGlow;
${NOISE}
void main() {
  vec3 p = position;
  float t = uTime * uSpeed;
  float n = snoise(p * 1.7 + t * 0.28) * 0.62
          + snoise(p * 4.2 - t * 0.19 + aSeed) * 0.38;
  float disp = n * uAmp;
  vec3 pos = p * (1.0 + disp);
  vGlow = clamp(abs(n) * 1.35, 0.0, 1.0);
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uPix * (0.9 + aSeed * 0.8 + vGlow * 1.3) * (2.6 / -mv.z);
}
`;

const FRAG = /* glsl */ `
uniform float uBright;
uniform vec3 uCold;
uniform vec3 uMid;
uniform vec3 uHot;
varying float vGlow;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.06, d);
  vec3 col = mix(mix(uCold, uMid, vGlow), uHot, vGlow * vGlow) * uBright;
  gl_FragColor = vec4(col, a * (0.2 + vGlow * 0.5));
}
`;

function SentientOrb({ reduce, count }: { reduce: boolean; count: number }) {
  const rig = useRef<THREE.Group>(null!);
  const mat = useRef<THREE.ShaderMaterial>(null!);
  const core = useRef<THREE.LineSegments>(null!);
  const prog = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });
  const { size } = useThree();

  const { positions, seeds } = useMemo(() => {
    // esfera de Fibonacci: distribuição uniforme, sem polos aglomerados
    const pos = new Float32Array(count * 3);
    const sd = new Float32Array(count);
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = phi * i;
      pos[i * 3] = Math.cos(th) * r * 1.55;
      pos[i * 3 + 1] = y * 1.55;
      pos[i * 3 + 2] = Math.sin(th) * r * 1.55;
      sd[i] = Math.random();
    }
    return { positions: pos, seeds: sd };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: 0.2 },
      uSpeed: { value: 0.55 },
      uBright: { value: 1 },
      uPix: { value: Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 1.5) * 14 },
      uCold: { value: COLD },
      uMid: { value: MID },
      uHot: { value: HOT },
    }),
    []
  );

  useMemo(() => {
    if (typeof window === "undefined") return;
    window.addEventListener("pointermove", (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    }, { passive: true });
  }, []);

  useFrame((state) => {
    const t = reduce ? 12 : state.clock.elapsedTime;
    prog.current = lerp(prog.current, docProgress(), 0.07);
    const s = stateAt(prog.current);
    const wide = size.width >= 1024;

    if (mat.current) {
      mat.current.uniforms.uTime.value = t;
      mat.current.uniforms.uAmp.value = s.amp + (reduce ? 0 : Math.sin(t * 0.9) * 0.025);
      mat.current.uniforms.uSpeed.value = reduce ? 0 : s.speed;
      mat.current.uniforms.uBright.value = s.bright;
    }
    if (rig.current) {
      rig.current.position.x = wide ? s.x : 0;
      rig.current.position.y = wide ? 0 : 0.55;
      rig.current.scale.setScalar((wide ? 1 : 0.72) * s.scale);
      // sentiente: gira devagar e inclina levemente na direção do cursor
      rig.current.rotation.y = (reduce ? 0 : t * 0.1) + prog.current * 2.2 + mouse.current.x * 0.14;
      rig.current.rotation.x = (reduce ? 0 : Math.sin(t * 0.23) * 0.05) + mouse.current.y * 0.1;
    }
    if (core.current) {
      core.current.rotation.y = reduce ? 0 : -t * 0.16;
      core.current.rotation.z = reduce ? 0 : t * 0.07;
      (core.current.material as THREE.LineBasicMaterial).opacity = 0.1 + s.bright * 0.1;
    }
  });

  return (
    <group ref={rig} position={[1.55, 0, 0]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={mat}
          vertexShader={VERT}
          fragmentShader={FRAG}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      {/* núcleo neural: icosaedro wireframe girando em contraponto */}
      <lineSegments ref={core}>
        <edgesGeometry args={[new THREE.IcosahedronGeometry(0.92, 1)]} />
        <lineBasicMaterial color={COLD} transparent opacity={0.16} />
      </lineSegments>
      {/* brilho central difuso */}
      <mesh>
        <sphereGeometry args={[0.5, 24, 16]} />
        <meshBasicMaterial color={MID} transparent opacity={0.05} />
      </mesh>
    </group>
  );
}

export default function OrbCanvas() {
  const reduce = prefersReduced();
  const wide = typeof window !== "undefined" ? window.innerWidth >= 1024 : true;
  return (
    <Canvas
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6.4], fov: 38 }}
      frameloop={reduce ? "demand" : "always"}
      style={{ width: "100%", height: "100%" }}
    >
      <SentientOrb reduce={reduce} count={wide ? 5200 : 2400} />
    </Canvas>
  );
}
