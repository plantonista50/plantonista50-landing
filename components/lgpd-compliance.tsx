"use client";

import { Icon } from "@/lib/icon";
import { Kicker } from "@/lib/kicker";

const COMPLIANCE = [
  { icon: "shield_lock",    label: "LGPD",            detail: "Lei Geral de Proteção de Dados (13.709/2018)" },
  { icon: "verified_user",  label: "CFM 2.454/2026",  detail: "Resolução sobre IA de suporte à decisão clínica" },
  { icon: "privacy_tip",    label: "ANVISA (DSS)",     detail: "Enquadramento como Software de Suporte à Decisão" },
  { icon: "security",       label: "ISO 27001",        detail: "Controles de segurança da informação" },
];

const LEGAL_TEXT = `1. TERMOS DE USO E PRIVACIDADE
O Plantonista 5.0 é uma ferramenta de suporte à decisão clínica baseada em Inteligência Artificial, destinada exclusivamente a médicos. O sistema atua como auxiliar administrativo. A responsabilidade final pela validação, edição e uso das informações no prontuário é exclusiva do profissional médico.

2. SEGURANÇA DE DADOS E INFRAESTRUTURA
Utilizamos infraestrutura de nuvem de classe mundial. Nossos parceiros de processamento incluem Microsoft Azure e OpenAI, garantindo criptografia de ponta a ponta. O armazenamento de logs e autenticação é realizado via ambiente seguro (Supabase), com proteção contra acessos não autorizados.

3. ANONIMIZAÇÃO E SIGILO — MÓDULO DE PROTEÇÃO (ANONM 4.0)
Antes de qualquer processamento clínico, os dados de áudio e texto passam por um rigoroso processo de anonimização proprietário. Identificadores diretos de pacientes (Nomes, CPF, Telefones) são removidos automaticamente por algoritmos de detecção, impedindo que a IA generativa tenha acesso à identidade dos pacientes. O desenvolvedor não retém os dados de áudio ou imagens após o processamento da sessão, garantindo a transitoriedade da informação.

4. LIMITAÇÃO DE RESPONSABILIDADE
Como toda tecnologia baseada em LLM (Large Language Models), o sistema pode apresentar imprecisões ("alucinações"). É dever do médico conferir dosagens e terminologias. Ao utilizar a ferramenta, o usuário declara estar ciente de que o software é uma ferramenta de meio, não substituindo o julgamento clínico humano.

5. CONFORMIDADE CFM 2.454/2026
Este sistema está enquadrado como ferramenta de suporte à decisão clínica conforme a Resolução CFM 2.454/2026. O médico mantém autonomia total sobre todas as decisões clínicas e é o único responsável pela conduta adotada.`;

export function LgpdCompliance() {
  return (
    <section className="py-24 md:py-32" id="compliance">
      <div className="max-w-page mx-auto px-5 relative z-[3]">
        <div data-reveal data-dir="up" className="mb-10 max-w-[640px]">
          <Kicker code="CONFORMIDADE">Transparência total</Kicker>
          <h2 className="font-bold text-ink leading-[1.04] mb-4" style={{ fontSize: "clamp(1.8rem, 5vw, 3.2rem)", letterSpacing: "-.035em" }}>
            Construído para <em className="italic text-accent font-semibold">dentro da lei.</em>
          </h2>
          <p className="text-ink-2 leading-relaxed" style={{ fontSize: "1rem" }}>
            Cada linha de código respeita a LGPD e as diretrizes do CFM. Sem surpresas, sem letras miúdas.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {COMPLIANCE.map((c) => (
            <div
              key={c.label}
              data-reveal
              data-dir="up"
              className="flex flex-col items-start gap-3 p-5 rounded-2xl transition-all duration-500 ease-power3"
              style={{
                border: "1px solid var(--border)",
                background: "linear-gradient(180deg, var(--surface) 0%, var(--bg-2) 100%)",
              }}
            >
              <span
                className="w-10 h-10 rounded-[10px] flex items-center justify-center text-accent"
                style={{ background: "linear-gradient(135deg, var(--elev), var(--surface))", border: "1px solid var(--border)" }}
              >
                <Icon name={c.icon} size={20} />
              </span>
              <div>
                <div className="font-mono text-[.72rem] font-bold text-accent tracking-[.08em] uppercase mb-1">{c.label}</div>
                <div className="text-ink-3 text-[.82rem] leading-snug">{c.detail}</div>
              </div>
            </div>
          ))}
        </div>

        <div data-reveal data-dir="up" className="grid lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-12 items-start">
          <div>
            <h3 className="font-semibold text-ink mb-3" style={{ fontSize: "1.15rem", letterSpacing: "-.02em" }}>
              Leia nossos termos
            </h3>
            <p className="text-ink-3 text-[.9rem] leading-relaxed mb-5">
              Os mesmos termos que o médico aceita ao criar conta estão disponíveis abaixo — sem camadas, sem esconder. Porque transparência não é só compliance, é respeito.
            </p>
            <div className="flex flex-col gap-2.5">
              {[
                { icon: "check_circle", color: "var(--ok)", text: "Dados anonimizados antes da IA ler" },
                { icon: "check_circle", color: "var(--ok)", text: "Sem retenção de áudio pós-sessão" },
                { icon: "check_circle", color: "var(--ok)", text: "Auditoria de cada campo removido" },
                { icon: "check_circle", color: "var(--ok)", text: "Médico é o validador final, sempre" },
              ].map((r) => (
                <div key={r.text} className="flex items-center gap-2.5 text-ink-2 text-[.9rem]">
                  <Icon name={r.icon} size={16} style={{ color: r.color, flexShrink: 0 }} />
                  {r.text}
                </div>
              ))}
            </div>
          </div>

          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid var(--border)", background: "var(--surface)", boxShadow: "0 30px 80px rgba(0,0,0,.4)" }}
          >
            <div
              className="flex items-center gap-2 px-4 py-2.5 border-b"
              style={{ background: "rgba(16,17,20,.8)", borderColor: "var(--hairline)" }}
            >
              <span className="flex gap-1.5">
                <i className="w-2.5 h-2.5 rounded-full block" style={{ background: "#ff5b52" }} />
                <i className="w-2.5 h-2.5 rounded-full block" style={{ background: "#f2a13a" }} />
                <i className="w-2.5 h-2.5 rounded-full block" style={{ background: "#4caf6b" }} />
              </span>
              <span className="flex-1 text-center font-mono text-[.64rem] text-ink-4 tracking-[.1em]">TERMOS · PRIVACIDADE · LGPD</span>
            </div>
            <div
              className="p-5 overflow-y-auto font-mono text-[.78rem] text-ink-3 leading-[1.75] tracking-[.01em]"
              style={{ maxHeight: "280px" }}
            >
              {LEGAL_TEXT.split("\n\n").map((para, i) => {
                const [title, ...rest] = para.split("\n");
                return (
                  <div key={i} className="mb-4">
                    <p className="font-bold text-accent mb-1.5">{title}</p>
                    <p>{rest.join(" ")}</p>
                  </div>
                );
              })}
            </div>
            <div
              className="px-5 py-3 border-t flex items-center gap-2 font-mono text-[.66rem] text-ok"
              style={{ borderColor: "var(--hairline)", background: "rgba(76,175,107,.04)" }}
            >
              <Icon name="verified" size={13} />
              Documento em conformidade com LGPD · CFM 2.454/2026
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
