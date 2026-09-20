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
  copy: string[]; // um parágrafo por item
  freeBadge?: boolean;
  id?: string;
};

const MODS: Mod[] = [
  {
    num: "01", cat: "RACIOCÍNIO", icon: "neurology", pre: "SuGa", name: "BRAINSTORM", id: "brainstorm",
    tag: "O suguinha com raciocínio clínico",
    copy: [
      "Bateu a dúvida de um caso ou quer um outro ponto de vista? Mande o caso pro SuGa Brainstorm, que ele mapeia a zona crítica dos diagnósticos que você não pode perder, ranqueia hipóteses por risco — e responde com fontes buscadas na hora em SciELO, PubMed, Europe PMC e acrescentamos os principais repositórios de FOAMed que todo emergencista ama. Você debate com ele até a sua conduta fechar.",
    ],
  },
  {
    num: "02", cat: "EXAMES", icon: "labs", pre: "SuGa", name: "EXAMINATOR", id: "examinator",
    tag: "Exames em formato compacto",
    copy: [
      "O suguinha original. Tudo começou com o SuGa Examinator. Mande o PDF, uma foto ou cole o laudo do exame que ele extrai com IA de temperatura zero (não inventa) e devolve a transcrição em uma linha: 15/03 · HB 12.5 · GLI 178. As informações sensíveis do seu paciente removidas antes de chegar à IA. Demos esse nome como uma brincadeira, fazendo alusão ao filme do “Terminator”.",
    ],
  },
  {
    num: "03", cat: "TRIAGEM", icon: "monitor_heart", pre: "SuGa", name: "TRIAGEM", id: "triagem-mod",
    tag: "NEWS2 / SOFA em tempo real",
    copy: [
      "Num plantão com 15 pacientes você precisa saber quem deve ser avaliado primeiro, e com isso, nasceu o SuGa Triagem que sugere a classificação de risco e o perfil, se enfermaria ou UTI. Mapeia os pacientes em um Dashboard, o HUD, permitindo a visualização dos pacientes de uma maneira gráfica na palma da sua mão. Diga adeus àqueles “papeizinhos” cheios de garrancho do colega que se perdiam ao longo do plantão.",
    ],
  },
  {
    num: "04", cat: "PRONTUÁRIO", icon: "mic", pre: "SuGa", name: "PRONTUÁRIO", id: "prontuario",
    tag: "Escriba clínico anonimizado",
    copy: [
      "Você recebeu um paciente na sala crítica, reanimou, intubou, passou acesso e agora que estabilizou, hora de “pagar a papelada”. O SuGa Prontuário faz isso para você. Você dita a história do seu paciente com tudo que você lembrar, medicações, alergias, sinais vitais, exame físico alterado e condutas, tudo isso pelo celular, e ele monta uma evolução estruturada, para você apenas copiar e colar. O Plantonista 5.0 sincroniza em tempo real as informações entre o celular e o PC. A parte da digitação você deixa com ele. A sua tendinite vai agradecer.",
    ],
  },
  {
    num: "05", cat: "EVIDÊNCIA", icon: "menu_book", pre: "SuGa", name: "EVIDENCE",
    tag: "Analisa um artigo com o olhar de um Emergencista e avalia sua relevância para a prática do dia a dia",
    copy: [
      "Você manda o artigo, ele devolve um veredito: MUDA A PRÁTICA, PROMISSOR ou NÃO MUDA. Avalia método, amostra, conflitos de interesse, NNT/NNH — e você faz um “bate-bola” sobre o artigo com ele. Atualização direto ao ponto ressaltando a relevância para o plantonista. Suas horas de redes sociais vão reduzir muuuito.",
    ],
  },
  {
    num: "06", cat: "PASSAGEM", icon: "swap_horiz", pre: "SuGa", name: "I-PASS",
    tag: "Handoff por gravidade",
    copy: [
      "Hora de passar o plantão. Protocolo de “Kioto” ativado. No fim do turno o handoff sai pronto com um clique — Missão cumprida e com “gás” sobrando.",
    ],
  },
];

export function Suite() {
  return (
    <section className="py-24 md:py-36" id="suite">
      <div className="max-w-page mx-auto px-5 relative z-[3]">
        <div data-reveal data-dir="left" className="mb-9">
          <Kicker code="O QUE VOCÊ RECEBE">Seis ferramentas</Kicker>
          <h2 className="font-bold text-ink leading-[1.04] mb-4.5" style={{ fontSize: "clamp(2rem, 7vw, 4rem)", letterSpacing: "-.035em" }}>
            Uma ferramenta para <em className="italic text-accent font-semibold">cada momento do plantão.</em>
          </h2>
          <p className="text-ink-2 max-w-[640px] leading-relaxed" style={{ fontSize: "1.04rem" }}>
            Carinhosamente chamamos de <b className="text-ink">suguinhas</b>. Cada suguinha nasceu de uma dor real: a dúvida das 3h da manhã, a transcrição interminável de exames, memorizar todos os pacientes, a passagem cheia de falhas. Todas rodam sobre o <b className="text-ink">ANONM 4.0</b>, o motor que apaga a identidade do paciente <em className="text-accent">antes</em> de chegar na IA.
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
              className="mod hud relative p-7 rounded-2xl overflow-hidden transition-all duration-500 ease-power3 hover:border-[rgba(168,199,250,.3)] hover:shadow-[0_30px_60px_rgba(0,0,0,.55),0_0_0_1px_var(--accent-tint)]"
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
              {m.copy.map((para, i) => (
                <p key={i} className={`text-ink-2 text-[.94rem] leading-snug m-0${i > 0 ? " mt-3" : ""}`}>{para}</p>
              ))}
              {m.freeBadge && (
                <span
                  className="inline-flex items-center gap-1.5 mt-3 font-mono text-[.66rem] font-bold text-ok py-1 px-2.5 rounded uppercase tracking-[.08em]"
                  style={{ background: "var(--ok-soft)", border: "1px solid rgba(76,175,107,.25)" }}
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
