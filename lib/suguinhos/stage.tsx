"use client";

/**
 * SealStage — palco fixo de "O Selo Plantonista".
 * --------------------------------------------------------------
 * Monta o canvas WebGL (client-only) cobrindo a viewport inteira,
 * atrás do conteúdo. A opacidade do palco respira sutilmente com
 * o scroll. Sem legendas coloridas, sem labels — o objeto fala por si.
 *
 * Fail-safe (regra ANONM): sem WebGL → nada é montado, página
 * segue funcional.
 */

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const SealCanvas = dynamic(() => import("./canvas"), { ssr: false });

export function SuguinhosStage() {
  const [supported, setSupported] = useState(true);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      const gl = c.getContext("webgl2") || c.getContext("webgl");
      if (!gl) setSupported(false);
    } catch {
      setSupported(false);
    }
  }, []);

  useEffect(() => {
    if (!supported) return;
    let raf = 0;
    let alive = true;
    const tick = () => {
      if (!alive) return;
      if (wrap.current) {
        const sy = window.scrollY;
        const vh = window.innerHeight;
        // hero: opacidade plena · resto da página: backdrop sutil
        const op = Math.max(0.32, 1 - Math.min(0.68, sy / (vh * 0.9)));
        wrap.current.style.opacity = String(op);
      }
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
    <div ref={wrap} className="suguinhos-stage" aria-hidden="true">
      <SealCanvas />
    </div>
  );
}
