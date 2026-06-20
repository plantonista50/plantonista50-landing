"use client";

import { Kicker } from "@/lib/kicker";

const ITEMS = [
  { num: "8 min", title: "por paciente no PS", body: "Tempo médio — incluindo a leitura de exames antes de bater na maca." },
  { num: "30%", title: "do plantão em burocracia", body: "Prontuário, receita, atestado, passagem. Tempo que não vira cuidado." },
  { num: "30–40%", title: "dos erros por falta de informação", body: "Não é falha do médico — é falha do sistema que entrega tudo fragmentado." },
];

export function Wound() {
  return (
    <section className="py-24 md:py-36">
      <div className="max-w-page mx-auto px-5 relative z-[3]">
        <div data-reveal data-dir="left">
          <Kicker code="REF · 00">A carga invisível</Kicker>
          <h2 className="font-bold text-ink leading-[1.04] mb-4.5" style={{ fontSize: "clamp(2rem, 7vw, 4rem)", letterSpacing: "-.035em" }}>
            Atender é metade do plantão. <em className="italic text-accent font-semibold">A outra metade te consome.</em>
          </h2>
          <p className="text-ink-2 max-w-[640px] mb-12 leading-relaxed" style={{ fontSize: "1.04rem" }}>
            Além do paciente, o plantonista carrega a papelada burocrática inteira: prontuário, receita, atestado, passagem. O Plantonista 5.0 existe para aliviar essa carga cognitiva — e devolver sua atenção para quem precisa dela.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ITEMS.map((it, i) => (
            <div
              key={i}
              data-reveal
              data-dir="up"
              data-tilt
              className="wound-card relative overflow-hidden p-8 rounded-2xl transition-shadow duration-500 ease-power3 hover:shadow-[0_30px_60px_rgba(0,0,0,.5),0_0_0_1px_var(--accent-tint)]"
              style={{
                border: "1px solid var(--border)",
                background: "linear-gradient(180deg, var(--surface) 0%, var(--bg-2) 100%)",
                willChange: "transform",
              }}
            >
              <span
                className="inline-block font-extrabold leading-none text-accent mb-4"
                style={{ fontSize: "clamp(2.6rem, 8vw, 4.2rem)", letterSpacing: "-.045em", textShadow: "0 0 36px var(--accent-glow)" }}
              >
                {it.num}
              </span>
              <h3 className="text-[1.1rem] text-ink font-bold mb-2 m-0">{it.title}</h3>
              <p className="text-ink-2 text-[.95rem] leading-relaxed m-0">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
