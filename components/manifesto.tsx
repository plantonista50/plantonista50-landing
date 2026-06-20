"use client";

import { Icon } from "@/lib/icon";
import { Kicker } from "@/lib/kicker";

export function Manifesto() {
  return (
    <section className="py-24 md:py-40 px-7 text-center relative overflow-hidden">
      <span className="glow" aria-hidden="true" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 1100, height: 500 }} />
      <div
        className="max-w-[980px] mx-auto relative z-[3] grid grid-cols-1 md:grid-cols-[auto_1fr] gap-10 md:gap-14 items-center text-left"
        data-reveal
        data-dir="up"
      >
        {/* SLOT DE FOTO DO FUNDADOR */}
        <div className="media-slot w-[200px] h-[240px] md:w-[240px] md:h-[280px] mx-auto md:mx-0">
          <Icon name="photo_camera" />
          <b>FOTO · Fundador</b>
          <span>
            Retrato do emergencista em ambiente de plantão (scrubs, PS ao fundo, luz natural). P&amp;B ou dessaturada. Olhar para a câmera = conexão.
          </span>
        </div>
        <div>
          <Kicker>Princípio fundador</Kicker>
          <p className="font-medium text-ink mb-6 leading-snug" style={{ fontSize: "clamp(1.5rem, 4.6vw, 2.4rem)", letterSpacing: "-.025em" }}>
            Feito por um emergencista <em className="italic font-semibold text-accent">atuante em campo</em>, para emergencistas que dividem as mesmas dores — e os mesmos plantões.
          </p>
          <div className="inline-flex items-center gap-3.5 font-mono text-ink-3 text-[.8rem] tracking-[.06em] pt-5 border-t border-[color:var(--hairline)] uppercase">
            <svg viewBox="0 0 80 18" fill="none" width="80" height="18">
              <path
                d="M0 9 L20 9 L24 4 L28 14 L32 1 L36 17 L40 9 L80 9"
                stroke="currentColor"
                strokeWidth="1.4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-accent opacity-70"
              />
            </svg>
            <span>Princípio fundador · Plantonista 5.0</span>
          </div>
        </div>
      </div>
    </section>
  );
}
