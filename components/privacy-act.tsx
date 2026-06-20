"use client";

import { HudBrackets } from "@/lib/hud-brackets";

function SceneTag({ red, children }: { red?: boolean; children: React.ReactNode }) {
  return (
    <div
      className={`font-mono text-[.7rem] font-semibold tracking-[.2em] uppercase mb-6 inline-flex items-center gap-2 ${red ? "text-critical" : "text-accent"}`}
    >
      <span className={`w-6 h-px ${red ? "bg-critical" : "bg-accent"} opacity-60`} />
      <span>{children}</span>
      <span className={`w-6 h-px ${red ? "bg-critical" : "bg-accent"} opacity-60`} />
    </div>
  );
}

export function PrivacyAct() {
  return (
    <section className="act relative bg-bg" id="ato">
      <div className="act-pin h-screen flex items-center justify-center text-center px-5 py-20 relative overflow-hidden">
        <span
          className="glow"
          aria-hidden="true"
          style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 1200, height: 600 }}
        />

        {/* cena 1 */}
        <div className="scene absolute inset-0 flex flex-col items-center justify-center px-5 py-20 opacity-0">
          <SceneTag red>A pergunta que ninguém faz</SceneTag>
          <h2 className="font-extrabold leading-[.96] text-ink mb-[22px] max-w-[1100px]" style={{ fontSize: "clamp(2rem, 8vw, 6rem)", letterSpacing: "-.05em" }}>
            Para onde vai o histórico{" "}
            <em className="italic font-bold text-critical" style={{ textShadow: "0 0 40px rgba(248,113,113,.4)" }}>
              do seu paciente?
            </em>
          </h2>
          <p className="font-mono text-ink-2 max-w-[560px] mx-auto leading-[1.7] tracking-[.02em]" style={{ fontSize: "clamp(.86rem, 1.5vw, 1rem)" }}>
            Numa era em que informação é a nova moeda, dados clínicos são enviados todos os dias para IAs que não pactuam com a LGPD.
          </p>
        </div>

        {/* cena 2 */}
        <div className="scene absolute inset-0 flex flex-col items-center justify-center px-5 py-20 opacity-0">
          <SceneTag red>O destino invisível</SceneTag>
          <h2 className="font-extrabold leading-[.96] text-ink mb-[22px] max-w-[1100px]" style={{ fontSize: "clamp(2rem, 8vw, 6rem)", letterSpacing: "-.05em" }}>
            Servidores internacionais.{" "}
            <em className="italic font-bold text-critical" style={{ textShadow: "0 0 40px rgba(248,113,113,.4)" }}>
              Mercados que pagam bem.
            </em>
          </h2>
          <p className="font-mono text-ink-2 max-w-[560px] mx-auto leading-[1.7] tracking-[.02em]" style={{ fontSize: "clamp(.86rem, 1.5vw, 1rem)" }}>
            Histórico médico identificável pode alimentar mercados farmacêuticos, precificação de seguros e segmentação de vacinas — sem o paciente jamais saber.
          </p>
          <div className="flex gap-2 flex-wrap justify-center mt-[18px]">
            {["→ servidor fora do Brasil", "→ sem pacto com a LGPD", "→ dados viram produto"].map((t) => (
              <span key={t} className="font-mono text-[.7rem] py-1 px-2.5 rounded-md tracking-[.04em]" style={{ background: "var(--critical-soft)", color: "var(--critical)", border: "1px solid rgba(248,113,113,.25)" }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* cena 3 */}
        <div className="scene absolute inset-0 flex flex-col items-center justify-center px-5 py-20 opacity-0">
          <SceneTag>ANONM 4.0 · O escudo</SceneTag>
          <h2 className="font-extrabold leading-[.96] text-ink mb-[22px] max-w-[1100px]" style={{ fontSize: "clamp(2rem, 8vw, 6rem)", letterSpacing: "-.05em" }}>
            Aqui, a IA{" "}
            <em className="italic font-bold text-accent" style={{ textShadow: "0 0 40px var(--accent-glow)" }}>
              nunca vê o nome.
            </em>
          </h2>
          <p className="font-mono text-ink-2 max-w-[560px] mx-auto leading-[1.7] tracking-[.02em]" style={{ fontSize: "clamp(.86rem, 1.5vw, 1rem)" }}>
            O ANONM 4.0 remove os identificadores no servidor, antes de qualquer análise. O que sai é clínica pura — sem rosto, sem CPF, sem endereço.
          </p>
          <div
            className="hud relative mt-8 max-w-[640px] w-full text-left p-5 rounded-2xl"
            style={{
              background: "linear-gradient(180deg, var(--elev) 0%, var(--surface) 100%)",
              border: "1px solid var(--border)",
              boxShadow: "0 30px 80px rgba(0,0,0,.5)",
            }}
          >
            <HudBrackets />
            {[
              ["paciente", "João Silva", "[paciente]"],
              ["cpf", "123.456.789-00", "[removido]"],
              ["instituição", "Hospital São Lucas", "[hospital]"],
            ].map(([f, pii, clean]) => (
              <div key={f} className="flex items-center gap-3 py-2.5 font-mono text-[.86rem] flex-wrap">
                <span className="text-ink-3 text-[.72rem] min-w-[88px] tracking-[.04em] uppercase">{f}</span>
                <span className="line-through py-[3px] px-2.5 rounded-md text-[.82rem]" style={{ background: "var(--critical-soft)", color: "var(--critical)", border: "1px solid rgba(248,113,133,.2)" }}>
                  {pii}
                </span>
                <span className="text-ink-4">→</span>
                <span className="font-semibold py-[3px] px-2.5 rounded-md text-[.8rem]" style={{ background: "var(--accent-tint)", color: "var(--accent)", border: "1px solid var(--accent-tint-2)" }}>
                  {clean}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
