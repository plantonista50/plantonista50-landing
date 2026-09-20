"use client";

import { Kicker } from "@/lib/kicker";

const ITEMS = [
  {
    q: "Preciso manter outra assinatura de IA para usar?",
    a: <>Não. O Plantonista 5.0 funciona stand-alone — todos os suguinhas ficam disponíveis sem limites de uso, tendo apenas uma assinatura. Com uma diferença que nenhuma IA genérica oferece: aqui, tudo passa pelo <b className="text-ink">ANONM 4.0</b> antes.</>,
  },
  {
    q: "É realmente seguro pela LGPD?",
    a: <>Segurança por desenho. O <b className="text-ink">ANONM 4.0</b> remove 28 padrões de identificadores <b className="text-ink">antes</b> de o texto chegar à IA — a LLM nunca recebe dado pessoal. Cada remoção fica registrada para auditoria, o texto bruto não é persistido, o áudio é apagado assim que vira texto, e a conversa expira sozinha em 15h. Base legal: Art. 11 da LGPD (dados sensíveis de saúde).</>,
  },
  {
    q: "Como funcionam os lembretes no Telegram?",
    a: <>Você programa direto no <b className="text-ink">SuGa TRIAGEM</b>: "checar gasometria do leito 7 às 2h30". O lembrete chega como mensagem no seu Telegram, na hora marcada.</>,
  },
  {
    q: "E se a IA inventar uma dosagem?",
    a: <>É um risco real em qualquer ferramenta de IA — e nós tratamos esse risco com honestidade. O <b className="text-ink">SuGa BRAINSTORM</b> usa apenas literatura selecionada, cita a fonte de cada conduta. A decisão final é sempre sua, então sempre confira as respostas que receber.</>,
  },
  {
    q: "Quem pode usar?",
    a: <>Médicos com CRM ativo no Brasil. O cadastro valida o CRM no momento do registro. Foco principal: plantonistas de pronto-socorro, intensivistas e residentes de emergência.</>,
  },
  {
    q: "Quanto custa?",
    a: <>Menos que um refrigerante por dia. O <b className="text-ink">Plantonista</b> sai por R$ 149,90/mês com análises ilimitadas em todos os suguinhas, e o <b className="text-ink">Plano anual</b> por R$ 1.499,00, ganhando 2 meses grátis. Hospitais têm plano institucional sob consulta.</>,
  },
  {
    q: "Integra com o prontuário do hospital?",
    a: <>Integração direta com os principais sistemas brasileiros está no roadmap. Hoje a saída do <b className="text-ink">SuGa PRONTUÁRIO</b> é texto estruturado pronto para colar, e o <b className="text-ink">SuGa I-PASS</b> entrega o handoff com a última atualização de cada paciente.</>,
  },
];

export function Faq() {
  return (
    <section
      className="py-24 md:py-36 border-y border-[color:var(--hairline)]"
      style={{ background: "var(--bg-2)" }}
      id="faq"
    >
      <div className="max-w-page mx-auto px-5 relative z-[3]">
        <div data-reveal data-dir="up" className="text-center max-w-[700px] mx-auto">
          <Kicker code="REF · 00" className="justify-center">Perguntas honestas</Kicker>
          <h2 className="font-bold text-ink leading-[1.04] mb-4.5 mx-auto" style={{ fontSize: "clamp(2rem, 7vw, 4rem)", letterSpacing: "-.035em" }}>
            O que médicos perguntam <em className="italic text-accent font-semibold">antes</em> de testar.
          </h2>
        </div>
        <div className="max-w-[820px] mx-auto mt-12">
          {ITEMS.map((it, i) => (
            <details
              key={i}
              data-reveal
              data-dir="up"
              className="faq-item border rounded-xl mb-2.5 overflow-hidden transition-all duration-500 ease-power3 open:border-[rgba(168,199,250,.4)] open:shadow-[0_10px_30px_rgba(0,0,0,.3)]"
              style={{ background: "var(--surface)", borderColor: "var(--border)" }}
            >
              <summary className="list-none cursor-pointer p-5 font-semibold text-base text-ink flex items-center justify-between gap-3.5">
                {it.q}
              </summary>
              <div className="px-5 pb-5 text-ink-2 text-[.96rem] leading-relaxed">{it.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
