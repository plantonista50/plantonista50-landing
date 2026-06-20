"use client";

/**
 * SealCanvas — "O Selo Plantonista"
 * --------------------------------------------------------------
 * Um único objeto centrado, monocromático na cor da marca. A
 * referência é objeto de luxo (relógio Patek, portal de MRI, lente
 * cirúrgica) — não data viz colorida. Vencedores Awwwards de B2B
 * sério (Apple, Stripe, Linear, Vercel, Loom) seguem este padrão:
 * UM objeto bem executado, material caro, luz cinematográfica.
 *
 * Composição:
 *   1. Aro de metal escovado (torus fino) — o "casco".
 *   2. Disco de vidro físico — transmission real, leve tom ciano.
 *   3. Núcleo cristalino emissivo no centro (respiração contínua).
 *   4. 7 marcas finíssimas no perímetro (suguinhos, gravadas).
 *
 * O scroll dirige a inclinação do selo (frente → vertical → edge-on),
 * fazendo-o "olhar pra você" no hero e "girar pra horizonte" no fim.
 * Rotação Y constante e sutil sustenta a vida no objeto.
 *
 * Responsabilidade única: renderizar a cena. Fail-safe é do stage —
 * sem WebGL este arquivo nem é importado.
 */

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

const ACCENT = "#22d3ee";
const BRIGHT = "#67e8f9";
const DEEP = "#0e7490";
const METAL = "#1a1f2a";
const BG = "#06080c";

const TICKS = 7;
const RING_R = 1.7;
const RING_TUBE = 0.018;
const PLATE_R = 1.55;

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Progresso 0→1 do documento inteiro. */
function pageProgress() {
  if (typeof window === "undefined") return 0;
  const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  return clamp01(window.scrollY / max);
}

function Seal({ reduce }: { reduce: boolean }) {
  const root = useRef<THREE.Group>(null!);
  const ring = useRef<THREE.Mesh>(null!);
  const plate = useRef<THREE.Mesh>(null!);
  const core = useRef<THREE.Mesh>(null!);
  const tickRefs = useRef<THREE.Mesh[]>([]);
  const { size } = useThree();

  // posições angulares dos 7 ticks (em radianos), no XY do selo
  const tickAngles = useMemo(
    () => Array.from({ length: TICKS }, (_, i) => (i / TICKS) * Math.PI * 2 - Math.PI / 2),
    []
  );

  useFrame((state) => {
    const t = reduce ? 0 : state.clock.elapsedTime;
    const p = pageProgress();
    const wide = size.width >= 1024;

    if (root.current) {
      // posicionamento
      const targetX = wide ? 1.9 : 0;
      root.current.position.x = lerp(root.current.position.x, targetX, 0.08);
      root.current.position.y = wide ? 0 : -1.6 + Math.min(1.6, (typeof window !== "undefined" ? window.scrollY / window.innerHeight : 0) * 1.8);

      // tombamento dirigido pelo scroll: 0 = frente / 1 = edge-on
      // efeito "olhar pra você" no hero, "girar pra horizonte" no fim
      const tiltX = lerp(-0.18, 1.05, p);
      root.current.rotation.x = tiltX + (reduce ? 0 : Math.sin(t * 0.28) * 0.025);

      // rotação Y contínua (vida do objeto, decoupled do scroll)
      root.current.rotation.y = (reduce ? 0 : t * 0.16) + p * 0.6;

      // respiração de escala mínima
      const breathe = reduce ? 1 : 1 + Math.sin(t * 0.5) * 0.008;
      root.current.scale.setScalar((wide ? 1 : 0.74) * breathe);
    }

    // núcleo pulsa muito sutilmente
    if (core.current) {
      const k = 0.18 + (reduce ? 0 : (Math.sin(t * 1.4) * 0.5 + 0.5) * 0.06);
      core.current.scale.setScalar(k);
      const mat = core.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 2.6 + (reduce ? 0 : Math.sin(t * 1.4) * 0.7);
    }

    // ticks ficam dim, exceto o que está "no topo" (relógio): acende suave
    tickRefs.current.forEach((m, i) => {
      if (!m) return;
      const parentRotY = root.current?.rotation.y || 0;
      const ang = tickAngles[i] + parentRotY;
      // distância angular do "topo" da câmera (y do mundo)
      const d = Math.abs(((ang + Math.PI / 2) % (Math.PI * 2)) - Math.PI) - Math.PI;
      const top = 1 - Math.min(1, Math.abs(d) / 0.6); // 1 perto do topo, 0 longe
      const mat = m.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.12 + top * 1.8;
    });
  });

  return (
    <group ref={root} rotation={[-0.18, 0, 0]}>
      {/* placa de vidro (transmission real) */}
      <mesh ref={plate}>
        <cylinderGeometry args={[PLATE_R, PLATE_R, 0.06, 96, 1, false]} />
        <meshPhysicalMaterial
          color={ACCENT}
          transmission={1}
          thickness={0.5}
          roughness={0.12}
          ior={1.5}
          clearcoat={1}
          clearcoatRoughness={0.06}
          attenuationColor={ACCENT}
          attenuationDistance={5}
          envMapIntensity={1.1}
          transparent
          opacity={0.86}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* aro de metal escovado */}
      <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[RING_R, RING_TUBE, 24, 160]} />
        <meshPhysicalMaterial
          color={METAL}
          metalness={0.95}
          roughness={0.32}
          envMapIntensity={1.4}
        />
      </mesh>

      {/* aro interno tênue (acabamento) */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[PLATE_R + 0.02, 0.004, 12, 140]} />
        <meshStandardMaterial
          color={ACCENT}
          emissive={ACCENT}
          emissiveIntensity={0.6}
          metalness={0.4}
          roughness={0.4}
          toneMapped={false}
        />
      </mesh>

      {/* núcleo cristalino */}
      <mesh ref={core}>
        <icosahedronGeometry args={[1, 3]} />
        <meshStandardMaterial
          color={BRIGHT}
          emissive={BRIGHT}
          emissiveIntensity={2.6}
          toneMapped={false}
        />
      </mesh>

      {/* 7 marcas finíssimas no perímetro (suguinhos, gravadas) */}
      {tickAngles.map((ang, i) => {
        const x = Math.cos(ang) * (RING_R - 0.04);
        const y = Math.sin(ang) * (RING_R - 0.04);
        return (
          <mesh
            key={i}
            ref={(el) => {
              if (el) tickRefs.current[i] = el;
            }}
            position={[x, y, 0]}
            rotation={[0, 0, ang + Math.PI / 2]}
          >
            <boxGeometry args={[0.012, 0.07, 0.018]} />
            <meshStandardMaterial
              color={ACCENT}
              emissive={ACCENT}
              emissiveIntensity={0.12}
              metalness={0.3}
              roughness={0.45}
              toneMapped={false}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function Scene() {
  const reduce = prefersReduced();
  return (
    <>
      <fogExp2 attach="fog" args={[BG, 0.04]} />
      <ambientLight intensity={0.28} />
      {/* key: branca-fria, em cima e à direita */}
      <directionalLight position={[5, 7, 6]} intensity={1.7} color={"#f0f4ff"} />
      {/* fill: leve cyan abaixo, dá glow no metal */}
      <pointLight position={[-3, -3, 4]} intensity={14} color={ACCENT} distance={14} />
      {/* rim: trás, para destacar a silhueta */}
      <pointLight position={[0, 0, -4]} intensity={10} color={DEEP} distance={10} />

      <Seal reduce={reduce} />

      {/* env map procedural (Lightformers — sem HDR externo) */}
      <Environment resolution={256} frames={1}>
        <Lightformer intensity={2.4} color={"#ffffff"} position={[0, 3, 4]} scale={[7, 7, 1]} />
        <Lightformer intensity={1.3} color={ACCENT} position={[-5, 1, 2]} scale={[3, 7, 1]} />
        <Lightformer intensity={1.4} color={"#ffffff"} position={[5, 1, 2]} scale={[3, 7, 1]} />
        <Lightformer intensity={0.8} color={DEEP} position={[0, -4, 2]} scale={[9, 3, 1]} />
      </Environment>
    </>
  );
}

export default function SealCanvas() {
  const reduce = prefersReduced();
  return (
    <Canvas
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.6]}
      camera={{ position: [0, 0.4, 6.8], fov: 36 }}
      frameloop={reduce ? "demand" : "always"}
      style={{ width: "100%", height: "100%" }}
    >
      <Scene />
    </Canvas>
  );
}
