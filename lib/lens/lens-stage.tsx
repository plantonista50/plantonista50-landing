"use client";

/**
 * LensStage — palco fixo da Lente Cirúrgica.
 * --------------------------------------------------------------
 * Monta o canvas WebGL (client-only) ocupando a viewport inteira,
 * atrás do conteúdo, e exibe uma legenda que nomeia a etapa atual
 * do pipeline ANONM conforme o scroll decompõe a lente.
 *
 * Fail-safe (regra ANONM): se o navegador não tiver WebGL, nada é
 * montado e a página segue 100% funcional sem o 3D. A legenda e a
 * opacidade são dirigidas por um único rAF passivo — não re-renderiza
 * React e não acopla a Lenis/GSAP.
 */

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const LensCanvas = dynamic(() => import("./lens-canvas"), { ssr: false });

const STAGES = [
  "FILE · OCR",
  "PII FIREWALL",
  "LLM EXTRACTOR",
  "NUMERIC GUARD",
  "MISSING ITEMS",
  "CONSISTENCY",
  "RENDERER",
];

export function LensStage() {
  const [supported, setSupported] = useState(true);
  const wrap = useRef<HTMLDivElement>(null);
  const caption = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const idx = useRef<HTMLSpanElement>(null);

  // Detecção de WebGL → fail-safe
  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      const gl = c.getContext("webgl2") || c.getContext("webgl");
      if (!gl) setSupported(false);
    } catch {
      setSupported(false);
    }
  }, []);

  // rAF passivo: opacidade do palco + legenda da etapa
  useEffect(() => {
    if (!supported) return;
    let raf = 0;
    let alive = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tick = () => {
      if (!alive) return;
      const vh = window.innerHeight;
      const hp = Math.min(1, Math.max(0, window.scrollY / (vh * 1.15)));
      const base = window.innerWidth < 1024 ? 0.5 : 1;

      if (wrap.current) wrap.current.style.opacity = String(base * (1 - hp * 0.78));

      if (caption.current) {
        const fadeIn = Math.min(1, hp * 2.4);
        const fadeOut = 1 - Math.max(0, (hp - 0.82) / 0.18);
        caption.current.style.opacity = reduce ? "0" : String(fadeIn * fadeOut);
      }

      const i = Math.min(STAGES.length - 1, Math.floor(hp * STAGES.length));
      if (label.current && label.current.textContent !== STAGES[i])
        label.current.textContent = STAGES[i];
      if (idx.current) idx.current.textContent = String(i + 1).padStart(2, "0");

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
    <div ref={wrap} className="lens-stage" aria-hidden="true">
      <LensCanvas />
      <div ref={caption} className="lens-caption">
        <span className="lens-caption-idx" ref={idx}>
          01
        </span>
        <span className="lens-caption-rule" />
        <span className="lens-caption-label" ref={label}>
          FILE · OCR
        </span>
        <span className="lens-caption-tag">ANONM 4.0</span>
      </div>
    </div>
  );
}
