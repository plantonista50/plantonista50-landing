"use client";

/**
 * OrbStage — palco fixo do Sentient Orb ("a nuvem da IA pensando").
 * ----------------------------------------------------------------
 * Camada fixed em z-index 1 (atrás de todo conteúdo, à frente do
 * world-bg), pointer-events none. Toda a coreografia de forma vive
 * no OrbCanvas; aqui ficam só as responsabilidades de palco:
 *
 *  - fail-safe: detecção de WebGL com failIfMajorPerformanceCaveat —
 *    sem GPU decente, a página vive perfeitamente sem o orb;
 *  - dynamic import ssr:false (three.js nunca entra no bundle SSR);
 *  - opacidade do palco por rAF passivo (zero re-render React):
 *    forte no hero, recuada no meio do funil (leitura em 1º lugar),
 *    subindo de novo no CTA final;
 *  - prefers-reduced-motion: estado estático visível (o canvas roda
 *    em frameloop "demand"), opacidade fixa discreta.
 */

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const OrbCanvas = dynamic(() => import("./orb-canvas"), { ssr: false });

function webglOk(): boolean {
  try {
    const c = document.createElement("canvas");
    const gl =
      c.getContext("webgl2", { failIfMajorPerformanceCaveat: true }) ||
      c.getContext("webgl", { failIfMajorPerformanceCaveat: true });
    return !!gl;
  } catch {
    return false;
  }
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* opacidade do palco ao longo do documento: [p, opacidade] */
const FADE: [number, number][] = [
  [0.0, 0.9],  // hero · o orb é protagonista
  [0.08, 0.75], // demo · divide o palco com o produto real
  [0.34, 0.55],
  [0.46, 0.4], // meio do funil · leitura em primeiro lugar
  [0.84, 0.4],
  [0.96, 0.85], // CTA final · volta a pulsar
  [1.0, 0.85],
];

function fadeAt(p: number): number {
  let i = 0;
  while (i < FADE.length - 2 && p > FADE[i + 1][0]) i++;
  const a = FADE[i], b = FADE[i + 1];
  const t = clamp01((p - a[0]) / Math.max(1e-5, b[0] - a[0]));
  return lerp(a[1], b[1], t);
}

export function OrbStage() {
  const [ready, setReady] = useState(false);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!webglOk()) return; // fail-safe: sem WebGL, sem orb — página intacta
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const el = stage.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.opacity = "0.5";
      return;
    }

    let raf = 0;
    let cur = 0.9;
    const tick = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? clamp01(window.scrollY / max) : 0;
      cur = lerp(cur, fadeAt(p), 0.08);
      el.style.opacity = cur.toFixed(3);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ready]);

  if (!ready) return null;

  return (
    <div ref={stage} className="orb-stage" aria-hidden="true">
      <OrbCanvas />
    </div>
  );
}
