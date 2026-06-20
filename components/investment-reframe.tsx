"use client";

import { Icon } from "@/lib/icon";
import { Kicker } from "@/lib/kicker";

export function InvestmentReframe() {
  return (
    <section
      className="py-24 md:py-36 px-7 text-center relative overflow-hidden border-y border-[color:var(--hairline)]"
      style={{ background: "var(--bg-2)" }}
    >
      <span className="glow" aria-hidden="true" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 1100, height: 500 }} />
      <div className="max-w-[880px] mx-auto relative z-[3]" data-reveal data-dir="up">
        <Kicker code="PARE · PENSE" className="justify-center">
          Uma pergunta honesta
        </Kicker>
        <h2
          className="font-extrabold text-ink leading-none mb-5"
          style={{ fontSize: "clamp(2rem, 6.4vw, 4rem)", letterSpacing: "-.045em" }}
        >
          Quando foi a última vez que você investiu{" "}
          <em className="italic font-bold text-accent" style={{ textShadow: "0 0 40px var(--accent-glow)" }}>
            no seu plantão?
          </em>
        </h2>
        <p className="text-ink-2 max-w-[620px] mx-auto mb-9 leading-relaxed" style={{ fontSize: "1.08rem" }}>
          A gente paga curso, congresso, prova de título — o ano inteiro investindo para cuidar melhor de quem chega na maca. E as suas doze horas, quem cuida?{" "}
          <b className="text-ink">O turno não é só a espera da sua vida começar. Ele também é a sua vida.</b>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-w-[720px] mx-auto text-left">
          <div
            data-reveal
            data-dir="left"
            className="p-7 rounded-2xl"
            style={{ border: "1px solid rgba(248,113,113,.25)", background: "var(--surface)" }}
          >
            <div className="font-mono text-[.7rem] tracking-[.14em] uppercase font-bold mb-3.5 text-critical">O plantão de sempre</div>
            <ul className="grid gap-2.5 list-none">
              {[
                "Doze pacientes na cabeça, o tempo todo",
                "A burocracia engolindo o intervalo do café",
                "Aquela dúvida às 3h, sem ninguém para dividir",
                "Sair do turno mais pesado do que entrou",
              ].map((t) => (
                <li key={t} className="flex gap-2.5 items-start text-[.92rem] text-ink-2 leading-snug">
                  <Icon name="close" size={16} className="text-critical flex-shrink-0 mt-[3px]" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div
            data-reveal
            data-dir="right"
            className="p-7 rounded-2xl"
            style={{ border: "1px solid rgba(34,211,238,.35)", background: "linear-gradient(180deg, rgba(34,211,238,.05), var(--surface))" }}
          >
            <div className="font-mono text-[.7rem] tracking-[.14em] uppercase font-bold mb-3.5 text-accent">O plantão acompanhado</div>
            <ul className="grid gap-2.5 list-none">
              {[
                ["O painel carrega os pacientes", " por você"],
                ["O prontuário se escreve", " enquanto você fala"],
                ["Segunda opinião na hora", ", com fonte"],
                ["Sair do turno com a cabeça leve", ""],
              ].map(([bold, rest], i) => (
                <li key={i} className="flex gap-2.5 items-start text-[.92rem] text-ink-2 leading-snug">
                  <Icon name="check" size={16} className="text-accent flex-shrink-0 mt-[3px]" />
                  <span>
                    <b className="text-ink">{bold}</b>
                    {rest}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
