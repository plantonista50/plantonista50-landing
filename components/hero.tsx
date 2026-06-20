"use client";

import { Icon } from "@/lib/icon";

export function Hero() {
  return (
    <header className="hero relative min-h-screen pt-24 pb-20 px-5 flex items-center overflow-hidden">
      {/* VÍDEO DE FUNDO · degrada se ausente */}
      <div className="hero-video" aria-hidden="true">
        <video autoPlay loop muted playsInline preload="metadata" poster="/hero-poster.jpg">
          <source src="/hero-loop.webm" type="video/webm" />
          <source src="/hero-loop.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-veil" />
      </div>

      <span
        className="glow z-[1]"
        aria-hidden="true"
        style={{ top: "-300px", left: "50%", transform: "translateX(-50%)", width: 1400, height: 900, willChange: "transform, opacity" }}
      />

      <div className="max-w-page mx-auto w-full relative z-[3] grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center">
        <div>
          <div
            className="inline-flex items-center gap-3 flex-wrap py-2 px-3.5 rounded-full mb-6 font-mono text-[.72rem] text-ink-2"
            style={{ border: "1px solid var(--border)", background: "rgba(17,22,31,.7)" }}
            data-reveal
            data-dir="up"
          >
            <span className="inline-flex items-center gap-[7px] before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-ok before:shadow-[0_0_8px_rgba(52,211,153,.6)]">
              <b className="text-ink font-bold">SYS</b> · operacional
            </span>
            <span className="w-px h-3 bg-[color:var(--hairline)]" />
            <span className="inline-flex items-center gap-[7px] before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-accent" style={{ boxShadow: "0 0 8px var(--accent-glow)" }}>
              <b className="text-ink font-bold">BETA</b> · aberto
            </span>
            <span className="w-px h-3 bg-[color:var(--hairline)]" />
            <span className="inline-flex items-center gap-[7px] before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-ok before:shadow-[0_0_8px_rgba(52,211,153,.6)]">
              <b className="text-ink font-bold">SECURE</b> · LGPD
            </span>
          </div>

          <h1 className="font-extrabold leading-[0.96] tracking-tightest mb-[18px] text-ink" style={{ fontSize: "clamp(2.5rem, 8.6vw, 6rem)" }}>
            <span data-reveal data-dir="left" className="block">Cansado de viver de plantão —</span>
            <span data-reveal data-dir="left" className="block italic font-bold text-accent" style={{ letterSpacing: "-.06em", textShadow: "0 0 40px rgba(34,211,238,.35)" }}>
              mas quer continuar vivendo dele?
            </span>
          </h1>

          <h2
            data-reveal
            data-dir="up"
            className="font-semibold leading-[1.25] mb-[22px] text-ink max-w-[560px] flex items-baseline gap-2.5 flex-wrap"
            style={{ fontSize: "clamp(1.15rem, 2.4vw, 1.65rem)", letterSpacing: "-.02em" }}
          >
            <span
              className="font-mono text-[.66rem] font-bold uppercase tracking-[.18em] py-[3px] px-2 rounded-md flex-shrink-0 self-center"
              style={{ color: "var(--accent)", background: "var(--accent-tint)", border: "1px solid var(--accent-tint-2)", lineHeight: 1.4 }}
            >
              Plantonista 5.0
            </span>
            <span>
              Tudo o que o plantonista precisa, <b className="italic text-accent font-semibold">a um clique.</b>
            </span>
          </h2>

          <p data-reveal data-dir="up" className="text-ink-2 leading-relaxed mb-8 max-w-[560px]" style={{ fontSize: "1.04rem" }}>
            O seu paciente protegido, a sua cabeça mais leve — e o turno de volta às suas mãos.
          </p>

          <div data-reveal data-dir="up" className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:items-center">
            <a
              href="#cta"
              data-magnetic
              className="btn-primary group relative overflow-hidden bg-ink text-[#06080c] py-4 px-7 rounded-[10px] font-bold text-base inline-flex items-center justify-center gap-2.5 animate-breathe transition-shadow duration-500 ease-power3"
              style={{ letterSpacing: "-.005em", willChange: "transform" }}
            >
              <span className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(120deg, transparent 30%, rgba(34,211,238,.55) 50%, transparent 70%)", transform: "translateX(-100%)" }} />
              <span className="relative z-[1]">Solicitar acesso beta</span>
              <Icon name="arrow_forward" size={18} className="relative z-[1] transition-transform duration-500 ease-power3 group-hover:translate-x-1" />
            </a>
            <a
              href="#suite"
              className="bg-transparent text-ink border border-[color:var(--border)] py-4 px-[22px] rounded-[10px] font-medium text-base inline-flex items-center justify-center gap-2 transition-all duration-500 ease-power3 hover:border-accent hover:text-accent-bright"
              style={{ background: "transparent" }}
            >
              Conhecer a SuGa Suite
            </a>
          </div>

          <div data-reveal data-dir="up" className="flex flex-wrap gap-4 md:gap-[18px] mt-6 font-mono text-[.76rem] text-ink-3">
            <span className="inline-flex items-center gap-1.5"><Icon name="check" size={15} className="text-accent" />Sem cartão</span>
            <span className="inline-flex items-center gap-1.5"><Icon name="check" size={15} className="text-accent" />Validação por CRM</span>
            <span className="inline-flex items-center gap-1.5"><Icon name="check" size={15} className="text-accent" />Inteligência já inclusa</span>
          </div>
        </div>

        {/* Área reservada para a Lente Cirúrgica — o cristal 3D é renderizado
            pelo <LensStage/> (canvas WebGL fixo) e se alinha a esta coluna.
            Em telas estreitas a lente fica centralizada atrás do texto. */}
        <div className="lens-reserve relative hidden lg:flex items-center justify-center" aria-hidden="true">
          <div className="lens-reserve-frame">
            <span className="lens-reserve-tag">
              <span className="lens-reserve-dot" />
              ANONM 4.0 · PIPELINE
            </span>
            <span className="lens-reserve-hint">OCR → FIREWALL → LLM → GUARD → RENDER</span>
          </div>
        </div>
      </div>

      <div id="scrollCue" className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 font-mono text-ink-3 text-[.66rem] tracking-[.2em] uppercase z-[5]">
        <span>scroll</span>
        <span className="w-px h-9 animate-scroll-pulse" style={{ background: "linear-gradient(to bottom, var(--ink-3), transparent)" }} />
      </div>
    </header>
  );
}
