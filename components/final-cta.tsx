"use client";

import { Icon } from "@/lib/icon";
import { Kicker } from "@/lib/kicker";

export function FinalCta() {
  return (
    <section className="final relative overflow-hidden py-32 md:py-44 px-5 text-center" id="cta">
      <span
        className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
        aria-hidden="true"
        style={{ width: 1400, height: 700, background: "radial-gradient(ellipse at center, var(--accent-glow), transparent 65%)", opacity: 0.4 }}
      />
      <span
        className="absolute -bottom-24 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
        aria-hidden="true"
        style={{ width: 1000, height: 400, background: "radial-gradient(ellipse at center, var(--accent-tint), transparent 65%)" }}
      />
      <div className="relative max-w-[900px] mx-auto" data-reveal data-dir="up">
        <Kicker code="REQUEST · ACCESS" className="justify-center">Beta clínico · 2026</Kicker>
        <h2 className="font-extrabold leading-none mb-6" style={{ fontSize: "clamp(2.4rem, 7.5vw, 4.8rem)", letterSpacing: "-.05em" }}>
          Entre no próximo plantão
          <br />
          com um <em className="italic font-bold text-accent" style={{ textShadow: "0 0 40px var(--accent-glow)" }}>copiloto.</em>
        </h2>
        <p className="text-ink-2 max-w-[560px] mx-auto mb-9 leading-relaxed" style={{ fontSize: "1.1rem" }}>
          Metade da sua vida acontece lá dentro. O Plantonista 5.0 devolve a parte que a burocracia tomou — a partir do próximo turno, de graça.
        </p>
        <a
          href="/"
          data-magnetic
          className="btn-primary group relative overflow-hidden bg-ink text-[#06080c] py-4 md:py-[18px] px-7 md:px-8 rounded-[10px] font-bold inline-flex items-center justify-center gap-2.5 animate-breathe transition-shadow duration-500 ease-power3"
          style={{ fontSize: "1.04rem", letterSpacing: "-.005em", willChange: "transform" }}
        >
          <span className="relative z-[1]">Entrar no beta — grátis</span>
          <Icon name="arrow_forward" size={18} className="relative z-[1] transition-transform duration-500 ease-power3 group-hover:translate-x-1" />
        </a>
        <div className="flex justify-center gap-5 flex-wrap mt-7 font-mono">
          {["Sem cartão", "10 análises grátis/mês", "Exclusivo para médicos", "A IA nunca vê o nome"].map((t) => (
            <span key={t} className="inline-flex items-center gap-2 text-[.84rem] text-ink-2">
              <Icon name="check_circle" size={16} className="text-accent" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
