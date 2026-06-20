"use client";

import { Icon } from "@/lib/icon";

export function MidCta() {
  return (
    <section
      className="py-24 md:py-32 px-7 text-center relative overflow-hidden border-y border-[color:var(--hairline)]"
      data-reveal
      data-dir="up"
    >
      <span className="glow" aria-hidden="true" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 900, height: 400 }} />
      <div className="max-w-[820px] mx-auto relative z-[3]">
        <h3 className="font-bold text-ink leading-[1.16] mb-4" style={{ fontSize: "clamp(1.6rem, 4.4vw, 2.4rem)", letterSpacing: "-.025em" }}>
          Quer isso tudo no <em className="italic text-accent font-semibold">seu próximo plantão?</em>
        </h3>
        <p className="text-ink-2 mb-7" style={{ fontSize: "1.02rem" }}>
          Cadastro em trinta segundos. Validação por CRM. E o próximo turno já entra mais leve.
        </p>
        <a
          href="#cta"
          data-magnetic
          className="btn-primary group relative overflow-hidden bg-ink text-[#06080c] py-4 px-7 rounded-[10px] font-bold text-base inline-flex items-center justify-center gap-2.5 animate-breathe transition-shadow duration-500 ease-power3"
          style={{ letterSpacing: "-.005em", willChange: "transform" }}
        >
          <span className="relative z-[1]">Solicitar acesso beta</span>
          <Icon name="arrow_forward" size={18} className="relative z-[1] transition-transform duration-500 ease-power3 group-hover:translate-x-1" />
        </a>
        <div className="mt-5 flex gap-4 md:gap-[18px] flex-wrap justify-center font-mono text-[.76rem] text-ink-3">
          {["Sem cartão", "Cancela em um clique", "Vagas limitadas"].map((t) => (
            <span key={t} className="inline-flex items-center gap-1.5">
              <Icon name="check" size={14} className="text-accent" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
