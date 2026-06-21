"use client";

import { Icon } from "@/lib/icon";
import { HudBrackets } from "@/lib/hud-brackets";
import { Kicker } from "@/lib/kicker";

type Mod = {
  num: string;
  cat: string;
  icon: string;
  pre?: string;
  name: string;
  bigName?: string;
  tag: string;
  copy: string;
  freeBadge?: boolean;
  id?: string;
};

const MODS: Mod[] = [
  { num: "01", cat: "SAFETY LAYER", icon: "shield_lock", name: "ANONM", bigName: "4.0", tag: "Anonimização nativa", copy: "Remove nome, CPF, telefone, endereço e instituição antes de qualquer IA tocar o texto. O histórico do paciente nunca vira moeda.", id: "anonm" },
  { num: "02", cat: "RACIOCÍNIO", icon: "neurology", pre: "SuGa", name: "BRAINSTORM", tag: "Segunda opinião com fontes", copy: "A segunda opinião das 3h da manhã. Só literatura de emergência selecionada — e você pode debater com o resultado até a conduta fechar." },
  { num: "03", cat: "EXAMES", icon: "labs", pre: "SuGa", name: "EXAMINATOR", tag: "Laudos e imagens", copy: "Você cola o laudo, ele devolve o que importa — já protegido, já organizado, pronto para a sua decisão.", freeBadge: true },
  { num: "04", cat: "TRIAGEM", icon: "monitor_heart", pre: "SuGa", name: "TRIAGEM", tag: "HUD · NEWS2 em tempo real", copy: "O painel que carrega o plantão por você: a piora aparece antes de virar urgência, e o lembrete te encontra no Telegram." },
  { num: "05", cat: "PRONTUÁRIO", icon: "mic", pre: "SuGa", name: "PRONTUÁRIO", tag: "Escriba clínico anonimizado", copy: "Você fala, ele escreve. O paciente protegido, as suas mãos livres — e a digitação deixa de roubar o seu turno.", freeBadge: true },
  { num: "06", cat: "EVIDÊNCIA", icon: "menu_book", pre: "SuGa", name: "EVIDENCE", tag: "Aplicação prática · emergência", copy: "O artigo de vinte páginas vira resposta prática: muda a sua conduta ou não muda. Direto, do jeito que o plantão exige." },
  { num: "07", cat: "PASSAGEM", icon: "swap_horiz", pre: "SuGa", name: "I-PASS", tag: "Handoff automático", copy: "Na troca de turno, ninguém fica para trás: o handoff sai pronto, com a última atualização de cada paciente." },
];

export function Suite() {
  return (
    <section className="py-24 md:py-36" id="suite">
      <div className="max-w-page mx-auto px-5 relative z-[3]">
        <div data-reveal data-dir="left" className="mb-9">
          <Kicker code="REF · 01–07">O Selo SuGa</Kicker>
          <h2 className="font-bold text-ink leading-[1.04] mb-4.5" style={{ fontSize: "clamp(2rem, 7vw, 4rem)", letterSpacing: "-.035em" }}>
            Sete suguinhas. <em className="italic text-accent font-semibold">Um selo.</em>
          </h2>
          <p className="text-ink-2 max-w-[640px] leading-relaxed" style={{ fontSize: "1.04rem" }}>
            Cada suguinha cobre um momento do plantão. Todos começam pelo ANONM 4.0 — então você usa sem medo, sem precisar de mais uma assinatura.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 lg:gap-4">
          {MODS.map((m) => (
            <div
              key={m.num}
              id={m.id}
              data-reveal
              data-dir="up"
              data-tilt
              className="mod hud relative p-7 rounded-2xl overflow-hidden transition-all duration-500 ease-power3 hover:border-[rgba(34,211,238,.3)] hover:shadow-[0_30px_60px_rgba(0,0,0,.55),0_0_0_1px_var(--accent-tint)]"
              style={{
                border: "1px solid var(--border)",
                background: "linear-gradient(180deg, var(--surface) 0%, var(--bg-2) 100%)",
                willChange: "transform",
              }}
            >
              <HudBrackets />
              <div className="flex items-center justify-between mb-[18px]">
                <span className="flex items-center gap-2 font-mono text-[.7rem] text-ink-4 tracking-[.1em]">
                  REF · <b className="text-accent font-bold py-0.5 px-[7px] rounded" style={{ background: "var(--accent-tint)", border: "1px solid var(--accent-tint-2)" }}>{m.num}</b> · {m.cat}
                </span>
                <div
                  className="w-10 h-10 rounded-[10px] flex items-center justify-center text-accent transition-all duration-500 ease-power3"
                  style={{ background: "linear-gradient(135deg, var(--elev), var(--surface))", border: "1px solid var(--border)" }}
                >
                  <Icon name={m.icon} size={20} />
                </div>
              </div>
              <h3 className="text-[1.22rem] font-extrabold text-ink m-0 mb-1" style={{ letterSpacing: "-.02em" }}>
                {m.pre && <span className="font-mono text-[.76rem] font-bold text-accent tracking-[.08em] mr-1">{m.pre}</span>}
                {m.name}
                {m.bigName && <span className="font-mono text-[.76rem] font-bold text-accent tracking-[.08em] ml-1">{m.bigName}</span>}
              </h3>
              <div className="font-mono text-[.68rem] text-ink-3 tracking-[.12em] uppercase mb-3.5">{m.tag}</div>
              <p className="text-ink-2 text-[.94rem] leading-snug m-0">{m.copy}</p>
              {m.freeBadge && (
                <span
                  className="inline-flex items-center gap-1.5 mt-3 font-mono text-[.66rem] font-bold text-ok py-1 px-2.5 rounded uppercase tracking-[.08em]"
                  style={{ background: "var(--ok-soft)", border: "1px solid rgba(52,211,153,.25)" }}
                >
                  <Icon name="savings" size={12} />
                  Sem assinatura à parte
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
