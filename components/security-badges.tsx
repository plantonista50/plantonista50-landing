"use client";

import { Icon } from "@/lib/icon";

const INFRA = [
  { name: "Microsoft Azure", icon: "cloud", desc: "Infraestrutura de nuvem para armazenamento e processamento", badge: "ISO 27001 · SOC 2", color: "var(--accent)" },
  { name: "OpenAI", icon: "psychology", desc: "Motor de IA para análise clínica com temperatura zero", badge: "Zero Data Retention", color: "var(--accent)" },
  { name: "Supabase", icon: "lock", desc: "Autenticação e RLS com Row Level Security por usuário", badge: "SOC 2 Type II", color: "var(--ok)" },
  { name: "CFM 2.454/2026", icon: "health_and_safety", desc: "Resolução para IA de suporte à decisão clínica", badge: "Enquadrado", color: "var(--ok)" },
];

export function SecurityBadges() {
  return (
    <div className="max-w-page mx-auto px-5 pb-16 relative z-[3]">
      <div
        className="rounded-2xl p-6 md:p-8"
        style={{
          border: "1px solid var(--border)",
          background: "linear-gradient(180deg, var(--surface) 0%, var(--bg-2) 100%)",
          boxShadow: "0 30px 80px rgba(0,0,0,.4), 0 0 0 1px rgba(168,199,250,.04)",
        }}
      >
        <div className="flex items-center gap-2 mb-6">
          <Icon name="verified_user" size={18} className="text-accent" />
          <span className="font-mono text-[.72rem] font-bold tracking-[.14em] uppercase text-ink-3">Infraestrutura & Conformidade</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {INFRA.map((p) => (
            <div key={p.name} className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "var(--elev)", border: "1px solid var(--border)", color: p.color }}>
                  <Icon name={p.icon} size={16} />
                </span>
                <span className="font-bold text-ink text-[.88rem] leading-tight">{p.name}</span>
              </div>
              <p className="text-ink-3 text-[.8rem] leading-snug">{p.desc}</p>
              <span className="inline-flex items-center gap-1 self-start font-mono text-[.62rem] font-bold uppercase tracking-[.06em] py-[3px] px-2 rounded" style={{ background: "var(--ok-soft)", color: "var(--ok)", border: "1px solid rgba(76,175,107,.25)" }}>
                <Icon name="check" size={10} />
                {p.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
