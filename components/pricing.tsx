"use client";

import { useState } from "react";
import { Icon } from "@/lib/icon";
import { Kicker } from "@/lib/kicker";

type Plan = {
  name: string;
  priceMonthly: string;
  priceAnnual?: string;
  unit?: string;
  tagline: string;
  features: string[];
  cta: string;
  href: string;
  featured?: boolean;
};

const PLANS: Plan[] = [
  { name: "Grátis", priceMonthly: "R$ 0", unit: "/mês", tagline: "Conheça no seu próximo plantão.", features: ["10 análises por mês", "ANONM 4.0 em toda análise", "EXAMINATOR e PRONTUÁRIO", "Sem cartão de crédito"], cta: "Começar grátis", href: "#cta" },
  { name: "Plantonista", priceMonthly: "R$ 49,90", priceAnnual: "R$ 39,90", unit: "/mês", tagline: "O plantão inteiro, sem limite.", features: ["Análises ilimitadas", "As 6 SuGas completas", "Busca científica no BRAINSTORM", "Sincronização entre dispositivos"], cta: "Assinar Plantonista", href: "#cta", featured: true },
  { name: "Pro", priceMonthly: "R$ 89,90", priceAnnual: "R$ 71,90", unit: "/mês", tagline: "Para quem vive de plantão.", features: ["Tudo do Plantonista", "Templates de prontuário próprios", "Prioridade de processamento", "Suporte clínico direto"], cta: "Assinar Pro", href: "#cta" },
  { name: "Institucional", priceMonthly: "Sob consulta", tagline: "Hospitais e redes, com conformidade LGPD.", features: ["Implantação por plantão/setor", "Trilha de auditoria e RLS", "DPA e conformidade LGPD", "Faturamento por instituição"], cta: "Falar com o time", href: "#cta" },
];

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section className="py-24 md:py-36" id="planos">
      <div className="max-w-page mx-auto px-5 relative z-[3]">
        <div data-reveal data-dir="up" className="mb-10 max-w-[640px]">
          <Kicker code="PLANOS">Preço de plantonista</Kicker>
          <h2 className="font-bold text-ink leading-[1.04] mb-4.5" style={{ fontSize: "clamp(2rem, 7vw, 4rem)", letterSpacing: "-.035em" }}>
            Comece grátis. <em className="italic text-accent font-semibold">Assine quando fizer sentido.</em>
          </h2>
          <p className="text-ink-2 leading-relaxed" style={{ fontSize: "1.04rem" }}>
            Menos que um lanche do plantão. A anonimização LGPD e o motor ANONM 4.0 entram em todos os planos — inclusive no grátis.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 mb-10">
          <span className={`font-mono text-[.82rem] transition-colors duration-200 ${!annual ? "text-ink" : "text-ink-3"}`}>Mensal</span>
          <button
            role="switch"
            aria-checked={annual}
            onClick={() => setAnnual((a) => !a)}
            className="relative w-11 h-6 rounded-full transition-colors duration-250 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            style={{ background: annual ? "var(--accent)" : "var(--border)", boxShadow: annual ? "0 0 12px var(--accent-glow)" : "none" }}
          >
            <span className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-250" style={{ transform: annual ? "translateX(20px)" : "translateX(0)" }} />
          </button>
          <span className={`font-mono text-[.82rem] transition-colors duration-200 ${annual ? "text-ink" : "text-ink-3"}`}>
            Anual
            <span className="ml-1.5 inline-flex items-center gap-1 text-[.66rem] font-bold py-[2px] px-1.5 rounded uppercase tracking-[.06em]" style={{ background: "var(--ok-soft)", color: "var(--ok)", border: "1px solid rgba(76,175,107,.25)" }}>
              <Icon name="savings" size={10} />20% off
            </span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 lg:gap-4 items-stretch">
          {PLANS.map((p) => {
            const displayPrice = annual && p.priceAnnual ? p.priceAnnual : p.priceMonthly;
            return (
              <div key={p.name} data-reveal data-dir="up" className="relative flex flex-col p-7 rounded-2xl transition-all duration-500 ease-power3"
                style={{ border: p.featured ? "1px solid var(--accent-tint-2)" : "1px solid var(--border)", background: p.featured ? "linear-gradient(180deg, rgba(168,199,250,.08) 0%, var(--bg-2) 60%)" : "linear-gradient(180deg, var(--surface) 0%, var(--bg-2) 100%)", boxShadow: p.featured ? "0 30px 70px rgba(0,0,0,.5), 0 0 0 1px var(--accent-tint)" : "none" }}
              >
                {p.featured && (
                  <span className="absolute -top-2.5 left-7 font-mono text-[.6rem] font-bold uppercase tracking-[.14em] text-[#101114] py-1 px-2.5 rounded" style={{ background: "var(--accent)" }}>Recomendado</span>
                )}
                <div className="font-mono text-[.72rem] text-ink-3 tracking-[.14em] uppercase mb-2">{p.name}</div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="font-extrabold text-ink transition-all duration-250" style={{ fontSize: "clamp(1.7rem, 4vw, 2.3rem)", letterSpacing: "-.03em" }}>{displayPrice}</span>
                  {p.unit && <span className="font-mono text-[.8rem] text-ink-3">{p.unit}</span>}
                </div>
                {annual && p.priceAnnual && (
                  <div className="font-mono text-[.68rem] text-ok mb-0.5 flex items-center gap-1">
                    <Icon name="check_circle" size={11} />Cobrado anualmente · 2 meses grátis
                  </div>
                )}
                <p className="text-ink-3 text-[.9rem] leading-snug mb-5 min-h-[40px] mt-1">{p.tagline}</p>
                <ul className="flex flex-col gap-2.5 mb-7">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-ink-2 text-[.9rem] leading-snug">
                      <Icon name="check" size={16} className="text-accent flex-shrink-0 mt-0.5" />{f}
                    </li>
                  ))}
                </ul>
                <a href={p.href} className={"mt-auto py-3 px-4 rounded-[10px] font-bold text-[.92rem] text-center transition-all duration-500 ease-power3 " + (p.featured ? "bg-ink text-[#101114] hover:bg-accent hover:shadow-[0_10px_30px_var(--accent-glow)]" : "border border-[color:var(--border)] text-ink hover:border-accent hover:text-accent-bright")}>{p.cta}</a>
              </div>
            );
          })}
        </div>

        <p data-reveal data-dir="up" className="mt-6 font-mono text-[.72rem] text-ink-4 text-center tracking-[.04em]">
          Suporte à decisão clínica · o médico é sempre o validador final · enquadramento CFM / ANVISA (DSS)
        </p>
      </div>
    </section>
  );
}
