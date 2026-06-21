"use client";

/**
 * FluxCanvas — "O Fluxo" · a assinatura 3D do Plantonista 5.0
 * --------------------------------------------------------------
 * UM objeto-herói contínuo: uma abertura de 7 lâminas de vidro que
 * desabrocham EM SEQUÊNCIA conforme o scroll, revelando um núcleo
 * radiante no centro. As 7 lâminas são as 7 etapas do ANONM 4.0
 *   OCR → PIIFirewall → LLMExtractor → NumericGuard
 *       → MissingItemDetector → ConsistencyChecker → Renderer
 * e o núcleo é o AnalysisResult. Cada lâmina que abre = uma etapa
 * concluída — a copy (HUD no stage) nomeia a etapa atual.
 *
 * Princípios (playbook B2B/Awwwards):
 *  - Cena ÚNICA e contínua, câmera dirigida pelo scroll (sem cena/seção).
 *  - Variação por "beat": lâminas abrem em stagger, núcleo acende.
 *  - Vidro físico premium (transmission/ior) + reflexos de Lightformer.
 *  - Bloom barato via emissivo HDR (toneMapped=false), sem postprocessing.
 *  - Render-free: scroll lido por rAF passivo dentro do useFrame (zero
 *    re-render React). Fail-safe e reduced-motion vivem no stage.
 */

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const ACCENT = "#22d3ee";
const BRIGHT = "#67e8f9";
const DEEP = "#0891b2";
const GLASS = "#bfeaf2";
const BG = "#06080c";

const BLADES = 7;

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Progresso 0→1 ao longo do documento INTEIRO (scroll = espinha narrativa). */
function docProgress() {
  if (typeof window === "undefined") return 0;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max > 0 ? clamp01(window.scrollY / max) : 0;
}

/* ------------------------------------------------------------------ */
/* Abertura de 7 lâminas + núcleo                                      */
/* ------------------------------------------------------------------ */
function Aperture({ reduce }: { reduce: boolean }) {
  const rig = useRef<THREE.Group>(null!);
  const pivots = useRef<THREE.Group[]>([]);
  const edges = useRef<THREE.Mesh[]>([]);
  const core = useRef<THREE.Mesh>(null!);
  const halo = useRef<THREE.Mesh>(null!);
  const seal = useRef<THREE.Mesh>(null!);
  const { size } = useThree();
  const prog = useRef(0);

  useFrame((state) => {
    const t = reduce ? 0 : state.clock.elapsedTime;
    // damp do progresso (catch-up cinematográfico, estilo scrub:1)
    prog.current = lerp(prog.current, docProgress(), 0.08);
    const p = prog.current;
    const wide = size.width >= 1024;

    if (rig.current) {
      // câmera "empurra" via leve push-in + arco; rotação lenta dá vida
      rig.current.rotation.y = (reduce ? 0 : t * 0.07) + Math.sin(p * Math.PI) * 0.25;
      rig.current.rotation.x = 0.16 + p * 0.06 + (reduce ? 0 : Math.sin(t * 0.3) * 0.02);
      rig.current.position.z = lerp(-0.4, 1.7, easeInOut(p)); // dolly-in
      rig.current.position.x = wide ? lerp(1.5, 0.0, easeInOut(p)) : 0;
      rig.current.position.y = wide ? 0 : 0.4;
      const breathe = reduce ? 1 : 1 + Math.sin(t * 0.6) * 0.012;
      rig.current.scale.setScalar((wide ? 1 : 0.82) * breathe);
    }

    // cada lâmina abre em sequência (stagger) — "vidros que se abrem"
    pivots.current.forEach((g, i) => {
      if (!g) return;
      const lp = clamp01((p - i * 0.085) / 0.46);
      const e = easeInOut(lp);
      // fechado: lâmina recolhida sobre o núcleo (raio baixo, inclinada p/ dentro)
      // aberto: pétala espraiada, plana, revelando o núcleo
      g.children[0].position.y = lerp(0.46, 1.46, e);
      g.children[0].rotation.x = lerp(-1.18, 0.02, e);
      const edge = edges.current[i];
      if (edge) {
        const m = edge.material as THREE.MeshStandardMaterial;
        m.emissiveIntensity =
          0.25 + e * 2.6 + (reduce ? 0 : Math.sin(t * 1.6 + i) * 0.16 * e);
        m.opacity = 0.18 + e * 0.7;
      }
    });

    if (core.current) {
      const m = core.current.material as THREE.MeshStandardMaterial;
      m.emissiveIntensity = 0.5 + p * 3.4 + (reduce ? 0 : Math.sin(t * 2) * 0.25);
      core.current.scale.setScalar(0.34 + p * 0.16);
    }
    if (halo.current) {
      halo.current.rotation.z = (reduce ? 0 : t * 0.25) + p * 1.2;
      (halo.current.material as THREE.MeshStandardMaterial).opacity = 0.05 + p * 0.22;
    }
    if (seal.current) {
      seal.current.rotation.z = reduce ? 0 : -t * 0.12;
      (seal.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.6 + p * 1.4;
    }
  });

  return (
    <group ref={rig} rotation={[0.16, 0, 0]}>
      {/* aro-base gravado (o "casco" do selo) */}
      <mesh ref={seal} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.62, 0.018, 18, 160]} />
        <meshStandardMaterial
          color={DEEP}
          emissive={ACCENT}
          emissiveIntensity={1}
          transparent
          opacity={0.5}
          toneMapped={false}
        />
      </mesh>

      {/* 7 lâminas de vidro (pétalas que abrem em sequência) */}
      {Array.from({ length: BLADES }).map((_, i) => (
        <group
          key={i}
          ref={(el) => {
            if (el) pivots.current[i] = el;
          }}
          rotation={[0, 0, (i / BLADES) * Math.PI * 2]}
        >
          <group>
            {/* a lâmina de vidro físico */}
            <RoundedBox args={[0.62, 1.5, 0.07]} radius={0.05} smoothness={4}>
              <meshPhysicalMaterial
                color={GLASS}
                transmission={1}
                thickness={1.1}
                roughness={0.07}
                ior={1.46}
                clearcoat={1}
                clearcoatRoughness={0.08}
                attenuationColor={ACCENT}
                attenuationDistance={2.6}
                envMapIntensity={1.15}
                transparent
              />
            </RoundedBox>
            {/* borda emissiva (ANONM): acende quando a lâmina abre */}
            <mesh
              ref={(el) => {
                if (el) edges.current[i] = el as THREE.Mesh;
              }}
              position={[0, 0, 0.04]}
            >
              <torusGeometry args={[0.34, 0.008, 10, 48]} />
              <meshStandardMaterial
                color={BRIGHT}
                emissive={BRIGHT}
                emissiveIntensity={0.3}
                transparent
                opacity={0.2}
                toneMapped={false}
              />
            </mesh>
          </group>
        </group>
      ))}

      {/* halo fino girando — tensão/vida */}
      <mesh ref={halo}>
        <torusGeometry args={[2.05, 0.006, 10, 180]} />
        <meshStandardMaterial
          color={ACCENT}
          emissive={ACCENT}
          emissiveIntensity={1.4}
          transparent
          opacity={0.1}
          toneMapped={false}
        />
      </mesh>

      {/* núcleo · AnalysisResult (acende com o scroll) */}
      <mesh ref={core}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial
          color={BRIGHT}
          emissive={BRIGHT}
          emissiveIntensity={0.8}
          toneMapped={false}
        />
      </mesh>
      {/* casca de vidro do núcleo */}
      <mesh scale={0.62}>
        <icosahedronGeometry args={[1, 3]} />
        <meshPhysicalMaterial
          color={GLASS}
          transmission={1}
          thickness={1.6}
          roughness={0.05}
          ior={1.5}
          clearcoat={1}
          attenuationColor={BRIGHT}
          attenuationDistance={3}
          envMapIntensity={1.2}
          transparent
        />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Poeira volumétrica (profundidade)                                  */
/* ------------------------------------------------------------------ */
function Dust({ count, reduce }: { count: number; reduce: boolean }) {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current || reduce) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += 0.004;
      if (arr[i * 3 + 1] > 5) arr[i * 3 + 1] = -5;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.026}
        color={ACCENT}
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  );
}

function Scene({ wide }: { wide: boolean }) {
  const reduce = prefersReduced();
  return (
    <>
      <fogExp2 attach="fog" args={[BG, 0.05]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 6, 5]} intensity={1.2} color={BRIGHT} />
      <pointLight position={[-4, -2, 3]} intensity={30} color={ACCENT} distance={22} />

      <Aperture reduce={reduce} />
      <Dust count={wide ? 340 : 140} reduce={reduce} />

      {/* env map procedural (sem HDR externo) — alimenta os reflexos do vidro */}
      <Environment resolution={wide ? 256 : 128} frames={1}>
        <Lightformer intensity={2.2} color={BRIGHT} position={[0, 2, 4]} scale={[7, 7, 1]} />
        <Lightformer intensity={1.3} color={ACCENT} position={[-5, 0, 2]} scale={[3, 7, 1]} />
        <Lightformer intensity={1.5} color="#ffffff" position={[5, 1, 2]} scale={[3, 7, 1]} />
        <Lightformer intensity={0.9} color={DEEP} position={[0, -4, 2]} scale={[9, 3, 1]} />
      </Environment>
    </>
  );
}

export default function FluxCanvas() {
  const reduce = prefersReduced();
  const wide =
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true;
  return (
    <Canvas
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 9], fov: 33 }}
      frameloop={reduce ? "demand" : "always"}
      style={{ width: "100%", height: "100%" }}
    >
      <Scene wide={wide} />
    </Canvas>
  );
}
