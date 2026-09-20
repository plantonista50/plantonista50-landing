"use client";

import { Icon } from "@/lib/icon";
import { Kicker } from "@/lib/kicker";

type Plan = {
  name: string;
  price: string;
  unit?: string;
  note?: string;
  tagline: string;
  features: string[];
  cta: string;
  href: string;
  featured?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Mensal",
    price: "R$ 149,90",
    unit: "/mês",
    note: "7 dias grátis para testar",
    tagline: "O plantão inteiro, sem limite.",
    features: [
      "Todos os 6 suguinhas, sem limites de uso",
      "ANONM 4.0 em toda análise",
      "Sincronização em tempo real celular ↔ PC",
      "Lembretes e alertas no Telegram",
    ],
    cta: "Começar 7 dias grátis",
    href: "#cta",
  },
  {
    name: "Anual",
    price: "R$ 1.499",
    unit: "/ano",
    note: "2 meses grátis · sai por R$ 124,92/mês",
    tagline: "Para quem vive de plantão.",
    features: [
      "Tudo do plano Mensal",
      "Todos os 6 suguinhas, sem limites de uso",
      "ANONM 4.0 em toda análise",
      "Dois meses de presente a cada ano",
    ],
    cta: "Assinar o anual",
    href: "#cta",
    featured: true,
  },
  {
    name: "Institucional",
    price: "Sob consulta",
    tagline: "Hospitais e redes, com conformidade LGPD.",
    features: [
      "Implantação por plantão/setor",
      "Trilha de auditoria e RLS",
      "DPA e conformidade LGPD",
      "Faturamento por instituição",
    ],
    cta: "Entrar em contato",
    href: "#cta",
  },
];

export function Pricing() {
  return (
    <section className="py-24 md:py-36" id="planos">
      <div className="max-w-page mx-auto px-5 relative z-[3]">
        <div data-reveal data-dir="up" className="mb-10 max-w-[640px]">
          <Kicker code="PLANOS">Preço de plantonista</Kicker>
          <h2 className="font-bold text-ink leading-[1.04] mb-4.5" style={{ fontSize: "clamp(2rem, 7vw, 4rem)", letterSpacing: "-.035em" }}>
            Comece grátis. <em className="italic text-accent font-semibold">Assine quando fizer sentido.</em>
          </h2>
          <p className="text-ink-2 leading-relaxed" style={{ fontSize: "1.04rem" }}>
            Menos que uma coca-cola por dia. Todos os suguinhas à disposição, sem limites.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 lg:gap-4 items-stretch max-w-[1100px]">
          {PLANS.map((p) => (
            <div
              key={p.name}
              data-reveal
              data-dir="up"
              className="relative flex flex-col p-7 rounded-2xl transition-all duration-500 ease-power3"
              style={{
                border: p.featured ? "1px solid var(--accent-tint-2)" : "1px solid var(--border)",
                background: p.featured
                  ? "linear-gradient(180deg, rgba(168,199,250,.08) 0%, var(--bg-2) 60%)"
                  : "linear-gradient(180deg, var(--surface) 0%, var(--bg-2) 100%)",
                boxShadow: p.featured ? "0 30px 70px rgba(0,0,0,.5), 0 0 0 1px var(--accent-tint)" : "none",
              }}
            >
              {p.featured && (
                <span className="absolute -top-2.5 left-7 font-mono text-[.6rem] font-bold uppercase tracking-[.14em] text-[#101114] py-1 px-2.5 rounded" style={{ background: "var(--accent)" }}>
                  Recomendado
                </span>
              )}
              <div className="font-mono text-[.72rem] text-ink-3 tracking-[.14em] uppercase mb-2">{p.name}</div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="font-extrabold text-ink" style={{ fontSize: "clamp(1.7rem, 4vw, 2.3rem)", letterSpacing: "-.03em" }}>{p.price}</span>
                {p.unit && <span className="font-mono text-[.8rem] text-ink-3">{p.unit}</span>}
              </div>
              <div className="font-mono text-[.7rem] text-accent tracking-[.04em] mb-2 min-h-[18px]">{p.note ?? ""}</div>
              <p className="text-ink-3 text-[.9rem] leading-snug mb-5 min-h-[40px]">{p.tagline}</p>
              <ul className="flex flex-col gap-2.5 mb-7">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-ink-2 text-[.9rem] leading-snug">
                    <Icon name="check" size={16} className="text-accent flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={p.href}
                className={
                  "mt-auto py-3 px-4 rounded-[10px] font-bold text-[.92rem] text-center transition-all duration-500 ease-power3 " +
                  (p.featured
                    ? "bg-ink text-[#101114] hover:bg-accent hover:shadow-[0_10px_30px_var(--accent-glow)]"
                    : "border border-[color:var(--border)] text-ink hover:border-accent hover:text-accent-bright")
                }
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>

        <p data-reveal data-dir="up" className="mt-6 font-mono text-[.72rem] text-ink-4 tracking-[.04em]">
          Suporte à decisão clínica · o médico é sempre o validador final · enquadramento CFM / ANVISA (DSS)
        </p>
      </div>
    </section>
  );
}
