"use client";

import { Kicker } from "@/lib/kicker";

const ITEMS = [
  { initials: "RA", name: "Dr. Rafael A.", crm: "Emergencista · CRM-CE 14.232", quote: "Eu usava IA genérica escondido, com peso na consciência pelos dados do paciente. Agora peço segunda opinião em paz — e o plantão ficou mais leve." },
  { initials: "JM", name: "Dra. Juliana M.", crm: "Clínica médica · CRM-SP 198.470", quote: "O lembrete do Telegram me salvou às 3h: \"checar gasometria do leito 7\". Eu tinha 12 pacientes na cabeça. O TRIAGEM lembrou por mim." },
  { initials: "TS", name: "Dr. Thiago S.", crm: "UTI · CRM-RJ 52.881", quote: "O BRAINSTORM só me traz literatura de emergência que presta. Sem artigo de ambulatório, sem ruído. E eu posso debater com o resultado." },
];

export function Testimonials() {
  return (
    <section className="py-24 md:py-36">
      <div className="max-w-page mx-auto px-5 relative z-[3]">
        <div data-reveal data-dir="left">
          <Kicker code="FIELD REPORTS">Médicos no plantão</Kicker>
          <h2 className="font-bold text-ink leading-[1.04] mb-4.5" style={{ fontSize: "clamp(2rem, 7vw, 4rem)", letterSpacing: "-.035em" }}>
            Quem entra com ele, <em className="italic text-accent font-semibold">não volta atrás.</em>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 lg:gap-4.5 mt-12">
          {ITEMS.map((t) => (
            <div
              key={t.initials}
              data-reveal
              data-dir="up"
              data-tilt
              className="testi relative p-7 rounded-2xl flex flex-col gap-5 transition-all duration-500 ease-power3 hover:shadow-[0_30px_60px_rgba(0,0,0,.5)] hover:border-[rgba(34,211,238,.25)]"
              style={{ background: "linear-gradient(180deg, var(--surface) 0%, var(--bg-2) 100%)", border: "1px solid var(--border)", willChange: "transform" }}
            >
              <q className="m-0 text-ink text-base leading-relaxed flex-1 [quotes:none] before:content-none after:content-none">
                {t.quote}
              </q>
              <div className="flex items-center gap-3.5 pt-4 border-t border-[color:var(--hairline)]">
                <div className="w-[42px] h-[42px] rounded-full flex items-center justify-center text-accent font-mono font-bold text-[.85rem]" style={{ background: "linear-gradient(135deg, var(--elev), var(--surface))", border: "1px solid var(--border)" }}>
                  {t.initials}
                </div>
                <div>
                  <div className="font-bold text-ink text-[.95rem] leading-tight">{t.name}</div>
                  <div className="font-mono text-[.74rem] text-ink-3 mt-1">{t.crm}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
