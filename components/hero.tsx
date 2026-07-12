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

      <div className="max-w-page mx-auto w-full relative z-[3] grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-20 items-center">
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

          <h1 className="font-extrabold leading-[0.98] tracking-tightest mb-4 text-ink" style={{ fontSize: "clamp(2.2rem, 5.4vw, 4.2rem)" }}>
            <span data-reveal data-dir="left" className="block">Cole o exame.</span>
            <span data-reveal data-dir="left" className="block italic font-bold text-accent" style={{ letterSpacing: "-.05em", textShadow: "0 0 40px rgba(34,211,238,.35)" }}>
              Dez segundos depois: só o que importa.
            </span>
          </h1>

          <h2
            data-reveal
            data-dir="up"
            className="font-semibold leading-[1.25] mb-4 text-ink max-w-[560px] flex items-baseline gap-2.5 flex-wrap"
            style={{ fontSize: "clamp(1.15rem, 2.4vw, 1.65rem)", letterSpacing: "-.02em" }}
          >
            <span
              className="font-mono text-[.66rem] font-bold uppercase tracking-[.18em] py-[3px] px-2 rounded-md flex-shrink-0 self-center"
              style={{ color: "var(--accent)", background: "var(--accent-tint)", border: "1px solid var(--accent-tint-2)", lineHeight: 1.4 }}
            >
              Plantonista 5.0
            </span>
            <span>
              O copiloto de IA de quem <b className="italic text-accent font-semibold">segura o pronto-socorro.</b>
            </span>
          </h2>

          <p data-reveal data-dir="up" className="text-ink-2 leading-relaxed mb-6 max-w-[560px]" style={{ fontSize: "1.04rem" }}>
            Exame vira resumo. Voz vira prontuário. Dúvida vira resposta com fonte. Plantão vira passagem pronta. E o nome do seu paciente é apagado <em className="text-accent">antes</em> de a IA ler a primeira linha — construído por um emergencista que já esteve do seu lado da maca.
          </p>

          <div data-reveal data-dir="up" className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:items-center">
            <a
              href="#cta"
              data-magnetic
              className="btn-primary group relative overflow-hidden bg-ink text-[#06080c] py-4 px-7 rounded-[10px] font-bold text-base inline-flex items-center justify-center gap-2.5 animate-breathe transition-shadow duration-500 ease-power3"
              style={{ letterSpacing: "-.005em", willChange: "transform" }}
            >
              <span className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(120deg, transparent 30%, rgba(34,211,238,.55) 50%, transparent 70%)", transform: "translateX(-100%)" }} />
              <span className="relative z-[1]">Começar grátis — sem cartão</span>
              <Icon name="arrow_forward" size={18} className="relative z-[1] transition-transform duration-500 ease-power3 group-hover:translate-x-1" />
            </a>
            <a
              href="#demo"
              className="bg-transparent text-ink border border-[color:var(--border)] py-4 px-[22px] rounded-[10px] font-medium text-base inline-flex items-center justify-center gap-2 transition-all duration-500 ease-power3 hover:border-accent hover:text-accent-bright"
              style={{ background: "transparent" }}
            >
              Ver funcionando ↓
            </a>
          </div>

          <div data-reveal data-dir="up" className="flex flex-wrap gap-4 md:gap-[18px] mt-6 font-mono text-[.76rem] text-ink-3">
            <span className="inline-flex items-center gap-1.5"><Icon name="check" size={15} className="text-accent" />10 análises grátis por mês</span>
            <span className="inline-flex items-center gap-1.5"><Icon name="check" size={15} className="text-accent" />A IA nunca vê o nome</span>
            <span className="inline-flex items-center gap-1.5"><Icon name="check" size={15} className="text-accent" />Feito por emergencista</span>
          </div>
        </div>

        {/* teaser do produto na dobra — versão estática da 1ª cena do demo */}
        <div data-reveal data-dir="right" className="hidden lg:block relative" aria-hidden="true">
          <div
            className="hud relative rounded-2xl overflow-hidden"
            style={{
              border: "1px solid var(--border)",
              background: "linear-gradient(180deg, var(--elev) 0%, var(--surface) 100%)",
              boxShadow: "0 40px 100px rgba(0,0,0,.55), 0 0 0 1px rgba(34,211,238,.06)",
              transform: "perspective(1400px) rotateY(-6deg) rotateX(2deg)",
            }}
          >
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[color:var(--hairline)]" style={{ background: "rgba(6,8,12,.8)" }}>
              <span className="flex gap-1.5">
                <i className="w-2.5 h-2.5 rounded-full block" style={{ background: "#f87171" }} />
                <i className="w-2.5 h-2.5 rounded-full block" style={{ background: "#fbbf24" }} />
                <i className="w-2.5 h-2.5 rounded-full block" style={{ background: "#34d399" }} />
              </span>
              <span className="flex-1 text-center font-mono text-[.66rem] text-ink-4">plantonista50.ia.br</span>
            </div>
            <div className="p-5">
              <div className="font-mono text-[.64rem] tracking-[.14em] uppercase text-ink-3 mb-3">
                <b className="text-accent">SuGa</b> EXAMINATOR · resultado
              </div>
              <div className="rounded-lg p-3.5 font-mono text-[.78rem] leading-relaxed" style={{ background: "rgba(6,8,12,.6)", border: "1px solid var(--hairline)" }}>
                <p className="font-bold text-ink mb-2">15/03: <b className="text-accent">HB</b> 12.5 · <b className="text-accent">GLI</b> 178 · <b className="text-accent">CR</b> 1.4</p>
                <p className="text-ink-3 text-[.68rem]">
                  paciente: <span className="py-0.5 px-1.5 rounded" style={{ background: "var(--accent-tint)", color: "var(--accent)", border: "1px solid var(--accent-tint-2)" }}>[anonimizado]</span> · 8.4s · audit #a8f2c1
                </p>
              </div>
              <div className="mt-3 flex items-center justify-between font-mono text-[.62rem] text-ink-4 uppercase tracking-[.12em]">
                <span>ANONM 4.0 · PII firewall</span>
                <span className="text-accent">↓ role e veja ao vivo</span>
              </div>
            </div>
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
