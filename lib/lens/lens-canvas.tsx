"use client";

/**
 * LensCanvas — "Lente Cirúrgica"
 * --------------------------------------------------------------
 * O objeto-assinatura do Plantonista 5.0: um cristal de vidro que,
 * ao rolar, se decompõe nas 7 camadas do pipeline ANONM 4.0
 *   OCR → PIIFirewall → LLMExtractor → NumericGuard
 *       → MissingItemDetector → ConsistencyChecker → Renderer
 * e volta a se recompor. Reflexos vêm de Lightformers (env map
 * procedural) — zero HDR externo, funciona offline.
 *
 * Responsabilidade única: renderizar a cena. O scroll é lido de
 * forma passiva (window.scrollY) dentro do useFrame — sem acoplar
 * a Lenis/GSAP, sem re-render React. Fail-safe: se WebGL faltar, o
 * wrapper (lens-stage) nem monta este componente.
 */

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

const ACCENT = "#22d3ee";
const BRIGHT = "#67e8f9";
const DEEP = "#0891b2";
const GLASS = "#bfeaf2";
const BG = "#06080c";

const LAYERS = 7;

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Progresso 0→1 do hero: 0 = lente inteira · 1 = totalmente decomposta. */
function heroProgress() {
  if (typeof window === "undefined") return 0;
  return clamp01(window.scrollY / (window.innerHeight * 1.15));
}

function LensStack({ reduce }: { reduce: boolean }) {
  const group = useRef<THREE.Group>(null!);
  const lenses = useRef<THREE.Mesh[]>([]);
  const rings = useRef<THREE.Mesh[]>([]);
  const core = useRef<THREE.Mesh>(null!);
  const firewall = useRef<THREE.Mesh>(null!);
  const { size } = useThree();

  // z compacto (nesta, vira "uma" lente) vs z explodido (leque das 7 camadas)
  const zs = useMemo(
    () =>
      Array.from({ length: LAYERS }, (_, i) => {
        const c = i - (LAYERS - 1) / 2; // -3 .. 3
        return { compact: c * 0.16, exploded: c * 1.05 };
      }),
    []
  );

  useFrame((state) => {
    const t = reduce ? 0 : state.clock.elapsedTime;
    const e = easeInOut(heroProgress());
    const sy = typeof window !== "undefined" ? window.scrollY : 0;
    const wide = size.width >= 1024;
    const targetX = wide ? 1.7 : 0;

    if (group.current) {
      group.current.position.x = lerp(group.current.position.x, targetX, 0.08);
      group.current.position.y = wide ? 0 : 0.6;
      group.current.rotation.y = 0.4 + t * 0.12 + sy * 0.0005;
      group.current.rotation.x = 0.1 + (reduce ? 0 : Math.sin(t * 0.25) * 0.06) + e * 0.12;
      const breathe = reduce ? 1 : 1 + Math.sin(t * 0.6) * 0.012;
      group.current.scale.setScalar((wide ? 1 : 0.82) * breathe * (1 - e * 0.05));
    }

    lenses.current.forEach((m, i) => {
      if (!m) return;
      m.position.z = lerp(zs[i].compact, zs[i].exploded, e);
      m.rotation.z = e * (i - (LAYERS - 1) / 2) * 0.04;
    });

    rings.current.forEach((m, i) => {
      if (!m) return;
      m.position.z = lerp(zs[i].compact, zs[i].exploded, e);
      const mat = m.material as THREE.MeshStandardMaterial;
      mat.opacity = 0.12 + e * 0.72;
      mat.emissiveIntensity = 0.5 + e * 2.2 + (reduce ? 0 : Math.sin(t * 1.5 + i) * 0.18);
    });

    if (core.current) {
      const mat = core.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.5 + e * 3.6 + (reduce ? 0 : Math.sin(t * 2) * 0.3);
      core.current.scale.setScalar(0.18 + e * 0.12);
    }

    if (firewall.current) {
      firewall.current.rotation.z = t * 0.2;
      firewall.current.rotation.x = Math.PI / 2 + (reduce ? 0 : Math.sin(t * 0.3) * 0.1);
      (firewall.current.material as THREE.MeshStandardMaterial).opacity = 0.08 + e * 0.26;
    }
  });

  return (
    <group ref={group} rotation={[0.1, 0.4, 0]}>
      {Array.from({ length: LAYERS }).map((_, i) => (
        <group key={i}>
          {/* camada de vidro */}
          <mesh
            ref={(el) => {
              if (el) lenses.current[i] = el;
            }}
            scale={[1.15, 1.15, 0.16]}
          >
            <sphereGeometry args={[1, 48, 32]} />
            <meshPhysicalMaterial
              color={GLASS}
              transmission={1}
              thickness={1.4}
              roughness={0.06}
              ior={1.46}
              clearcoat={1}
              clearcoatRoughness={0.08}
              attenuationColor={ACCENT}
              attenuationDistance={3.2}
              envMapIntensity={1.15}
              transparent
            />
          </mesh>
          {/* anel-borda gravado (ANONM): acende quando a camada se separa */}
          <mesh
            ref={(el) => {
              if (el) rings.current[i] = el;
            }}
          >
            <torusGeometry args={[1.17, 0.012, 16, 90]} />
            <meshStandardMaterial
              color={ACCENT}
              emissive={ACCENT}
              emissiveIntensity={1}
              transparent
              opacity={0.2}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}

      {/* núcleo · AnalysisResult */}
      <mesh ref={core}>
        <sphereGeometry args={[1, 32, 24]} />
        <meshStandardMaterial
          color={BRIGHT}
          emissive={BRIGHT}
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>

      {/* anel firewall externo */}
      <mesh ref={firewall} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.15, 0.01, 12, 140]} />
        <meshStandardMaterial
          color={DEEP}
          emissive={ACCENT}
          emissiveIntensity={1.2}
          transparent
          opacity={0.18}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function Dust({ reduce }: { reduce: boolean }) {
  const ref = useRef<THREE.Points>(null!);
  const count = 360;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

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
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  );
}

function Scene() {
  const reduce = prefersReduced();
  return (
    <>
      <fogExp2 attach="fog" args={[BG, 0.055]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 6, 5]} intensity={1.2} color={BRIGHT} />
      <pointLight position={[-4, -2, 3]} intensity={30} color={ACCENT} distance={22} />

      <LensStack reduce={reduce} />
      <Dust reduce={reduce} />

      {/* env map procedural (sem HDR externo) — alimenta os reflexos do vidro */}
      <Environment resolution={256} frames={1}>
        <Lightformer intensity={2.2} color={BRIGHT} position={[0, 2, 4]} scale={[7, 7, 1]} />
        <Lightformer intensity={1.3} color={ACCENT} position={[-5, 0, 2]} scale={[3, 7, 1]} />
        <Lightformer intensity={1.5} color="#ffffff" position={[5, 1, 2]} scale={[3, 7, 1]} />
        <Lightformer intensity={0.9} color={DEEP} position={[0, -4, 2]} scale={[9, 3, 1]} />
      </Environment>
    </>
  );
}

export default function LensCanvas() {
  const reduce = prefersReduced();
  return (
    <Canvas
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 8.5], fov: 36 }}
      frameloop={reduce ? "demand" : "always"}
      style={{ width: "100%", height: "100%" }}
    >
      <Scene />
    </Canvas>
  );
}
