"use client";

/**
 * FluxStage — palco fixo de "O Fluxo".
 * --------------------------------------------------------------
 * Monta o canvas WebGL (client-only, dynamic ssr:false) cobrindo a
 * viewport inteira, atrás do conteúdo, e exibe um HUD que nomeia a
 * etapa atual do pipeline ANONM conforme as lâminas abrem no scroll
 * — é o que conecta a cena 3D à narrativa da página.
 *
 * Fail-safe (regra ANONM): sem WebGL → nada monta, a página segue
 * 100% funcional. HUD e opacidade são dirigidos por um único rAF
 * passivo (não re-renderiza React, não acopla a Lenis/GSAP).
 */

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const FluxCanvas = dynamic(() => import("./flux-canvas"), { ssr: false });

const STAGES = [
  "OCR",
  "PII FIREWALL",
  "LLM EXTRACTOR",
  "NUMERIC GUARD",
  "MISSING ITEMS",
  "CONSISTENCY",
  "RENDERER",
];

export function FluxStage() {
  const [supported, setSupported] = useState(true);
  const wrap = useRef<HTMLDivElement>(null);
  const hud = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const idx = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  // Detecção de WebGL → fail-safe
  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      const gl =
        c.getContext("webgl2", { failIfMajorPerformanceCaveat: true }) ||
        c.getContext("webgl", { failIfMajorPerformanceCaveat: true }) ||
        c.getContext("webgl2") ||
        c.getContext("webgl");
      if (!gl) setSupported(false);
    } catch {
      setSupported(false);
    }
  }, []);

  // rAF passivo: opacidade do palco + HUD da etapa
  useEffect(() => {
    if (!supported) return;
    let raf = 0;
    let alive = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tick = () => {
      if (!alive) return;
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const base = window.innerWidth < 1024 ? 0.42 : 0.62;

      // o selo respira no hero (mais presente) e recua como backdrop
      const heroFade = Math.max(0.5, 1 - p * 0.6);
      if (wrap.current) wrap.current.style.opacity = String(base * heroFade);

      if (hud.current) {
        const fadeIn = Math.min(1, p * 6);
        const fadeOut = 1 - Math.max(0, (p - 0.9) / 0.1);
        hud.current.style.opacity = reduce ? "0" : String(fadeIn * fadeOut);
      }

      const i = Math.min(STAGES.length - 1, Math.floor(p * STAGES.length));
      if (label.current && label.current.textContent !== STAGES[i])
        label.current.textContent = STAGES[i];
      if (idx.current) idx.current.textContent = String(i + 1).padStart(2, "0");
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
    };
  }, [supported]);

  if (!supported) return null;

  return (
    <div ref={wrap} className="scene-stage" aria-hidden="true">
      <FluxCanvas />
      <div ref={hud} className="scene-hud">
        <span className="scene-hud-idx" ref={idx}>
          01
        </span>
        <span className="scene-hud-sep" />
        <span className="scene-hud-label" ref={label}>
          OCR
        </span>
        <span className="scene-hud-track">
          <span className="scene-hud-bar" ref={bar} />
        </span>
        <span className="scene-hud-tag">ANONM 4.0</span>
      </div>
    </div>
  );
}
