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
  { num: "01", cat: "RACIOCÍNIO", icon: "neurology", pre: "SuGa", name: "BRAINSTORM", tag: "Copiloto de raciocínio clínico", copy: "A dúvida das 3h da manhã. Recebe o caso, mapeia a zona crítica dos diagnósticos que matam, ranqueia hipóteses por risco — e responde com fontes buscadas na hora em SciELO, PubMed e Europe PMC. Você debate até a conduta fechar.", id: "brainstorm" },
  { num: "02", cat: "EXAMES", icon: "labs", pre: "SuGa", name: "EXAMINATOR", tag: "Exames em formato compacto", copy: "Cola o laudo ou fotografa o exame. Ele roteia lab vs. imagem, extrai com IA de temperatura zero (não inventa) e devolve o que importa: 15/03 · HB 12.5 · GLI 178. PII removida antes da IA. Menos de 10s.", id: "examinator" },
  { num: "03", cat: "TRIAGEM", icon: "monitor_heart", pre: "SuGa", name: "TRIAGEM", tag: "NEWS2 / SOFA em tempo real", copy: "Extrai sinais vitais e calcula NEWS2 (enfermaria) ou SOFA (UTI), classifica risco ALTO/MODERADO/BAIXO e mapeia os leitos — paciente por número, nunca por nome. A piora aparece antes de virar urgência.", id: "triagem-mod" },
  { num: "04", cat: "PRONTUÁRIO", icon: "mic", pre: "SuGa", name: "PRONTUÁRIO", tag: "Escriba clínico anonimizado", copy: "Você fala, ele estrutura: HDA, exame físico e conduta no padrão brasileiro, já anonimizado, com os seus templates. A digitação deixa de roubar o turno.", id: "prontuario" },
  { num: "05", cat: "EVIDÊNCIA", icon: "menu_book", pre: "SuGa", name: "EVIDENCE", tag: "Veredito sobre o artigo", copy: "Um artigo entra, um veredito sai: MUDA A PRÁTICA, PROMISSOR ou NÃO MUDA. Avalia método, amostra, conflitos de interesse, NNT/NNH — e você pergunta o que quiser sobre ele. Só o que está no artigo." },
  { num: "06", cat: "PASSAGEM", icon: "swap_horiz", pre: "SuGa", name: "I-PASS", tag: "Handoff por gravidade", copy: "No fim do turno o handoff sai pronto pelo protocolo I-PASS, ordenado por gravidade — UTI primeiro, depois enfermaria — para nenhum paciente crítico ser esquecido na troca." },
];

export function Suite() {
  return (
    <section className="py-24 md:py-36" id="suite">
      <div className="max-w-page mx-auto px-5 relative z-[3]">
        <div data-reveal data-dir="left" className="mb-9">
          <Kicker code="REF · 01–06">A SuGa Suite</Kicker>
          <h2 className="font-bold text-ink leading-[1.04] mb-4.5" style={{ fontSize: "clamp(2rem, 7vw, 4rem)", letterSpacing: "-.035em" }}>
            Seis SuGas. <em className="italic text-accent font-semibold">Um plantão inteiro.</em>
          </h2>
          <p className="text-ink-2 max-w-[640px] leading-relaxed" style={{ fontSize: "1.04rem" }}>
            Cada SuGa cobre um momento do plantão — do raciocínio à passagem. Todas rodam sobre o <b className="text-ink">ANONM 4.0</b>, o motor que remove os dados do paciente <em className="text-accent">antes</em> de qualquer IA tocar o texto.
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
