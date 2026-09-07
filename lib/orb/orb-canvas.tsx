"use client";

/**
 * OrbCanvas — "a nuvem da IA pensando"
 * --------------------------------------------------------------
 * O objeto-assinatura: um Sentient Orb — esfera de ~18k partículas
 * (malha neural) deslocadas por ruído simplex em shader, com um
 * núcleo icosaédrico wireframe. Na paleta REAL do app
 * (#0b57d0 → #a8c7fa → #c8dcff sobre #101114).
 *
 * MOVIMENTO (regras fixas):
 *   - o campo de ruído avança a ritmo CONSTANTE: a fase é acumulada
 *     na CPU (phase += dt * RATE) e entregue pronta ao shader. Nunca
 *     multiplicamos tempo por velocidade no shader — isso faz o campo
 *     saltar e até andar para trás quando a velocidade muda;
 *   - a nuvem gira 360° em torno de um eixo que deriva devagar e de
 *     forma aleatória (quaternion integrado a cada frame, velocidade
 *     angular constante). Nunca inverte, nunca acelera;
 *   - o hover do cursor é uma inclinação amortecida num grupo EXTERNO,
 *     separado do giro — assim é sempre perceptível.
 *
 * O scroll muda só a FORMA e a POSIÇÃO (keyframes sobre o progresso
 * do documento): amplitude do ruído, brilho, x e escala.
 *   hero      → respiração calma (ouvindo)
 *   demo      → nuvem mais aberta (processando)
 *   resultado → colapsa em ordem (insight)
 *   meio      → migra da direita para a esquerda
 *   CTA final → volta ao centro, brilho máximo
 *
 * Render-free: progresso lido passivamente no useFrame (zero
 * re-render React). Fail-safe/reduced-motion vivem no stage.
 */

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const COLD = new THREE.Color("#0b57d0");
const MID = new THREE.Color("#a8c7fa");
const HOT = new THREE.Color("#c8dcff");

/* ritmo do campo de ruído (unidades de fase por segundo) — constante */
const NOISE_RATE = 0.4;
/* velocidade angular da nuvem (rad/s) — constante, ~1 volta a cada 50s */
const SPIN_RATE = 0.125;
/* velocidade angular do núcleo em contraponto (rad/s) */
const CORE_RATE = 0.18;

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

/* forma e posição do orb ao longo do scroll: [p, amp, bright, x, scale] */
const STOPS: [number, number, number, number, number][] = [
  [0.0, 0.2, 1.0, 1.55, 1.0],   // hero · respiração calma, atrás do teaser
  [0.1, 0.52, 1.15, 2.1, 0.92], // demo · nuvem aberta, processando
  [0.3, 0.52, 1.15, 2.3, 0.85], // ainda processando
  [0.34, 0.09, 1.4, 2.3, 0.85], // resultado · colapsa em ordem
  [0.46, 0.28, 1.0, 2.5, 0.75], // meio · presença discreta à direita
  [0.84, 0.3, 1.0, -2.5, 0.75], // migra da direita para a esquerda
  [0.96, 0.44, 1.5, 0.0, 1.05], // CTA final · volta ao centro
  [1.0, 0.44, 1.5, 0.0, 1.05],
];

function stateAt(p: number) {
  let i = 0;
  while (i < STOPS.length - 2 && p > STOPS[i + 1][0]) i++;
  const a = STOPS[i], b = STOPS[i + 1];
  const t = clamp01((p - a[0]) / Math.max(1e-5, b[0] - a[0]));
  return {
    amp: lerp(a[1], b[1], t),
    bright: lerp(a[2], b[2], t),
    x: lerp(a[3], b[3], t),
    scale: lerp(a[4], b[4], t),
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

/* uPhase já chega acumulado da CPU — o shader nunca escala tempo */
const VERT = /* glsl */ `
uniform float uPhase;
uniform float uAmp;
uniform float uPix;
attribute float aSeed;
varying float vGlow;
${NOISE}
void main() {
  vec3 p = position;
  float n = snoise(p * 1.7 + uPhase * 0.28) * 0.62
          + snoise(p * 4.2 - uPhase * 0.19 + aSeed) * 0.38;
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
  const tilt = useRef<THREE.Group>(null!); // hover: inclinação amortecida (externo)
  const spin = useRef<THREE.Group>(null!); // giro 360° em eixo errante (interno)
  const mat = useRef<THREE.ShaderMaterial>(null!);
  const core = useRef<THREE.LineSegments>(null!);
  const prog = useRef(0);
  const phase = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });
  const { size } = useThree();

  /* fases aleatórias por montagem: cada visita tem um eixo de giro próprio */
  const seed = useMemo(
    () => ({
      a: Math.random() * Math.PI * 2,
      b: Math.random() * Math.PI * 2,
      c: Math.random() * Math.PI * 2,
    }),
    []
  );
  const axis = useMemo(() => new THREE.Vector3(), []);
  const step = useMemo(() => new THREE.Quaternion(), []);

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
      uPhase: { value: 0 },
      uAmp: { value: 0.2 },
      uBright: { value: 1 },
      uPix: { value: Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 1.5) * 5 },
      uCold: { value: COLD },
      uMid: { value: MID },
      uHot: { value: HOT },
    }),
    []
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    const dt = reduce ? 0 : Math.min(delta, 0.05); // trava saltos após aba inativa
    const t = state.clock.elapsedTime;
    prog.current = lerp(prog.current, docProgress(), 0.07);
    const s = stateAt(prog.current);
    const wide = size.width >= 1024;

    /* campo de ruído: fase acumulada a ritmo constante */
    phase.current += dt * NOISE_RATE;
    if (mat.current) {
      mat.current.uniforms.uPhase.value = reduce ? 12 : phase.current;
      mat.current.uniforms.uAmp.value = s.amp;
      mat.current.uniforms.uBright.value = s.bright;
    }

    /* posição e escala vêm só do scroll */
    if (tilt.current) {
      tilt.current.position.x = wide ? s.x : 0;
      tilt.current.position.y = wide ? 0 : 0.55;
      tilt.current.scale.setScalar((wide ? 1 : 0.72) * s.scale);
      // hover: inclina na direção do cursor, amortecido — separado do giro
      tilt.current.rotation.x = lerp(tilt.current.rotation.x, mouse.current.y * 0.3, 0.06);
      tilt.current.rotation.y = lerp(tilt.current.rotation.y, mouse.current.x * 0.3, 0.06);
    }

    /* giro 360°: eixo errante, velocidade angular constante, nunca inverte */
    if (spin.current && dt > 0) {
      axis
        .set(
          Math.sin(t * 0.071 + seed.a),
          Math.sin(t * 0.053 + seed.b) + 0.6, // leve preferência pelo eixo vertical
          Math.sin(t * 0.089 + seed.c)
        )
        .normalize();
      step.setFromAxisAngle(axis, SPIN_RATE * dt);
      spin.current.quaternion.premultiply(step);
    }

    /* núcleo em contraponto, monotônico */
    if (core.current) {
      core.current.rotation.y -= CORE_RATE * dt;
      core.current.rotation.z += CORE_RATE * 0.45 * dt;
      (core.current.material as THREE.LineBasicMaterial).opacity = 0.1 + s.bright * 0.1;
    }
  });

  return (
    <group ref={tilt} position={[1.55, 0, 0]}>
      <group ref={spin}>
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
      <SentientOrb reduce={reduce} count={wide ? 18000 : 8000} />
    </Canvas>
  );
}
