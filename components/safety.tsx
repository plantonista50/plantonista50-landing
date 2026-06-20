"use client";

import { Icon } from "@/lib/icon";
import { HudBrackets } from "@/lib/hud-brackets";
import { Kicker } from "@/lib/kicker";

const ROWS = [
  ["paciente", "João Silva", "[paciente]"],
  ["cpf", "123.456.789-00", "[removido]"],
  ["telefone", "(85) 98765-4321", "[removido]"],
  ["instituição", "Hospital São Lucas", "[hospital]"],
  ["nascimento", "31/03/1962", "[data]"],
];

export function Safety() {
  return (
    <section className="py-24 md:py-36" id="seguranca">
      <div className="max-w-page mx-auto px-5 relative z-[3]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center" style={{ perspective: 1400 }}>
          <div data-reveal data-dir="left">
            <Kicker code="SAFETY LAYER">ANONM 4.0</Kicker>
            <p className="font-semibold text-ink leading-snug mb-6" style={{ fontSize: "clamp(1.4rem, 4.4vw, 2.2rem)", letterSpacing: "-.025em" }}>
              <em className="italic text-accent font-semibold">Anonimizar antes de processar</em> — e não depois — não é escolha técnica. É declaração de valores.
            </p>
            <p className="text-ink-2 text-base leading-relaxed mb-3.5">
              O <b className="text-ink">ANONM 4.0</b> protege todas as suguinhas. A inteligência artificial nunca vê o nome do seu paciente. Os dados sensíveis são removidos no servidor, em camadas, <b className="text-ink">antes</b> de qualquer análise. Cada remoção fica registrada.
            </p>
            <ul className="list-none grid gap-3 mt-5">
              {[
                "Nome, CPF, telefone, endereço, instituição — removidos automaticamente",
                "Funciona em texto, PDF, imagem e áudio",
                "Registro auditável de cada campo removido",
                "A conversa se apaga sozinha ao fim do plantão",
              ].map((t) => (
                <li key={t} className="flex gap-3 items-start text-[.96rem] text-ink-2">
                  <span
                    className="w-6 h-6 rounded-full text-accent flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "var(--accent-tint)", border: "1px solid var(--accent-tint-2)" }}
                  >
                    <Icon name="check" size={14} />
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            data-reveal
            data-dir="right"
            className="anonm-viz hud relative p-6 md:p-7 rounded-2xl"
            style={{
              background: "linear-gradient(180deg, var(--elev) 0%, var(--surface) 100%)",
              border: "1px solid var(--border)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,.06), 0 30px 80px rgba(0,0,0,.5)",
              willChange: "transform",
            }}
          >
            <HudBrackets />
            <div className="font-mono text-[.7rem] tracking-[.16em] uppercase text-ink-3 mb-4 font-semibold flex justify-between items-center">
              <span><b className="text-accent">ANONM 4.0</b> · antes de qualquer IA tocar</span>
              <span className="inline-flex items-center gap-1.5 py-[3px] px-2 rounded text-[.62rem] tracking-[.1em]" style={{ background: "var(--ok-soft)", color: "var(--ok)", border: "1px solid rgba(52,211,153,.25)" }}>
                <Icon name="verified" size={11} />
                SECURED
              </span>
            </div>
            {ROWS.map(([f, pii, clean]) => (
              <div key={f} className="flex items-center gap-2.5 py-2.5 border-b border-dashed border-[color:var(--hairline)] last:border-b-0 flex-wrap">
                <span className="font-mono text-ink-3 text-[.74rem] min-w-[80px] tracking-[.04em] uppercase">{f}</span>
                <span className="line-through py-1 px-2.5 rounded-md text-[.84rem] font-mono" style={{ background: "var(--critical-soft)", color: "var(--critical)", border: "1px solid rgba(248,113,133,.2)" }}>{pii}</span>
                <span className="text-ink-4">→</span>
                <span className="font-semibold py-1 px-2.5 rounded-md text-[.82rem] font-mono" style={{ background: "var(--accent-tint)", color: "var(--accent)", border: "1px solid var(--accent-tint-2)" }}>{clean}</span>
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-[color:var(--hairline)] flex justify-between font-mono text-[.74rem] text-ink-3 flex-wrap gap-2 tracking-[.04em] uppercase">
              <span><Icon name="verified" size={13} className="text-accent align-[-2px]" /> 5 itens removidos</span>
              <b className="text-accent">audit · #a8f2c1</b>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
