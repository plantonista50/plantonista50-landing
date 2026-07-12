"use client";

/**
 * DemoScrub — "O plantão em 4 cenas"
 * --------------------------------------------------------------
 * A peça central da landing: uma janela do produto PINADA na
 * viewport enquanto o scroll avança a ação como um vídeo scrubbed
 * (padrão Apple/Claude.ai): cada rolagem = um frame.
 *
 *  CENA 1 · EXAMINATOR — o exame colado, com PII à mostra
 *  CENA 2 · ANONM 4.0  — a PII é censurada linha a linha, ao vivo
 *  CENA 3 · RESULTADO  — o formato compacto DD/MM: SIGLA VALOR
 *  CENA 4 · TRIAGEM    — HUD de leitos com NEWS2 em tempo real
 *  CENA 5 · I-PASS     — handoff ordenado por gravidade
 *
 * Toda a coreografia vive no SmoothScrollProvider (timeline GSAP
 * com scrub — ease:none nos passos pra ler como frames). Mobile:
 * sem pin, cenas empilhadas (fail-safe igual ao .act).
 */

import { Icon } from "@/lib/icon";

/* linha de exame com PII marcada — a censura anima via [data-pii] */
function PiiSpan({ raw, tag }: { raw: string; tag: string }) {
  return (
    <span className="pii-wrap" data-pii>
      <span className="pii-raw">{raw}</span>
      <span className="pii-tag">{tag}</span>
    </span>
  );
}

const BEDS: { n: string; who: string; cond: string; news: number; level: "alto" | "mod" | "baixo" }[] = [
  { n: "01", who: "M.A.S · 58", cond: "Sepse abd.", news: 7, level: "alto" },
  { n: "02", who: "J.C.R · 74", cond: "AVCi · janela", news: 5, level: "mod" },
  { n: "03", who: "A.F.O · 45", cond: "Dor torácica", news: 6, level: "alto" },
  { n: "04", who: "P.H.N · 61", cond: "ICC descomp.", news: 4, level: "mod" },
  { n: "05", who: "R.P.L · 33", cond: "Pancreatite", news: 2, level: "baixo" },
  { n: "06", who: "L.M.B · 29", cond: "Trauma MMII", news: 1, level: "baixo" },
];

const IPASS = [
  { sev: "UTI", who: "Leito 01 · M.A.S", txt: "Sepse abdominal · noradrenalina 0,3 · reavaliar lactato 4h" },
  { sev: "UTI", who: "Leito 03 · A.F.O", txt: "SCA sem supra · 2ª troponina pendente · monitorizado" },
  { sev: "ENF", who: "Leito 02 · J.C.R", txt: "AVCi fora de janela · NIHSS 6 estável · TC controle 24h" },
  { sev: "ENF", who: "Leito 04 · P.H.N", txt: "ICC perfil B · furosemida EV · balanço negativo" },
];

export function DemoScrub() {
  return (
    <section className="demo" id="demo">
      <div className="demo-pin min-h-screen flex flex-col items-center justify-center px-4 py-16 md:py-10">
        {/* o enquadramento: o visitante precisa saber O QUE vai ver */}
        <div className="max-w-page mx-auto w-full relative z-[3] mb-6 md:mb-8 text-center lg:text-left">
          <div className="font-mono text-[.68rem] text-accent tracking-[.2em] uppercase mb-2">Como funciona · continue rolando</div>
          <h2 className="font-bold text-ink leading-[1.05] m-0" style={{ fontSize: "clamp(1.5rem, 3.6vw, 2.5rem)", letterSpacing: "-.03em" }}>
            Um plantão de 12 horas. <em className="italic text-accent font-semibold">Trinta segundos de scroll.</em>
          </h2>
          <p className="text-ink-3 mt-2 m-0 text-[.95rem]">Isto não é um vídeo — é o produto. O seu scroll comanda cada passo.</p>
        </div>

        <div className="max-w-page mx-auto w-full grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 lg:gap-12 items-center relative z-[3]">

          {/* rail de etapas — a história da noite, acende conforme o scroll */}
          <div className="demo-rail hidden lg:flex flex-col gap-1.5">
            {[
              ["01", "Você cola o exame"],
              ["02", "O nome do paciente some"],
              ["03", "O essencial, em 8 segundos"],
              ["04", "A piora avisa antes"],
              ["05", "O plantão passa limpo"],
            ].map(([n, t], i) => (
              <div key={n} className="demo-step flex items-center gap-3 py-2" data-step={i}>
                <span className="demo-step-num font-mono text-[.7rem] font-bold w-7 h-7 rounded-md flex items-center justify-center border border-[color:var(--border)] text-ink-4">{n}</span>
                <span className="demo-step-label text-[.88rem] text-ink-3 font-medium">{t}</span>
              </div>
            ))}
          </div>

          {/* a janela do produto — pinada; as telas trocam por scrub */}
          <div className="demo-device hud relative rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)", background: "linear-gradient(180deg, var(--elev) 0%, var(--surface) 100%)", boxShadow: "0 40px 100px rgba(0,0,0,.6), 0 0 0 1px rgba(34,211,238,.06)" }}>
            {/* chrome do navegador */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[color:var(--hairline)]" style={{ background: "rgba(6,8,12,.8)" }}>
              <span className="flex gap-1.5">
                <i className="w-2.5 h-2.5 rounded-full block" style={{ background: "#f87171" }} />
                <i className="w-2.5 h-2.5 rounded-full block" style={{ background: "#fbbf24" }} />
                <i className="w-2.5 h-2.5 rounded-full block" style={{ background: "#34d399" }} />
              </span>
              <span className="flex-1 text-center font-mono text-[.68rem] text-ink-4 tracking-[.06em]">plantonista50.ia.br · <b className="text-accent">plantão noturno</b></span>
              <span className="demo-clock font-mono text-[.68rem] text-ink-4">03:12</span>
            </div>

            {/* palco das telas */}
            <div className="demo-stage relative" style={{ minHeight: "min(52vh, 480px)" }}>

              {/* CENA 1+2 · EXAMINATOR → ANONM (mesma tela, a censura acontece nela) */}
              <div className="demo-screen" data-screen="exam">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[.68rem] tracking-[.14em] uppercase text-ink-3"><b className="text-accent">SuGa</b> EXAMINATOR · colar ou fotografar</span>
                  <span className="demo-fw font-mono text-[.62rem] py-1 px-2 rounded border" style={{ borderColor: "var(--accent-tint-2)", background: "var(--accent-tint)", color: "var(--accent)" }}>
                    <Icon name="shield_lock" size={11} className="align-[-2px]" /> PII Firewall
                  </span>
                </div>
                <div className="rounded-xl p-4 font-mono text-[.8rem] leading-[1.9] text-ink-2" style={{ background: "rgba(6,8,12,.6)", border: "1px solid var(--hairline)" }}>
                  <p data-line>Paciente: <PiiSpan raw="João Carlos da Silva" tag="[paciente]" /> · <PiiSpan raw="CPF 123.456.789-00" tag="[removido]" /></p>
                  <p data-line>Origem: <PiiSpan raw="Hospital São Lucas" tag="[hospital]" /> · Nasc.: <PiiSpan raw="31/03/1962" tag="[data]" /></p>
                  <p data-line>Hemograma 15/03 — Hb 12.5 g/dL · Ht 37% · Leuco 14.200</p>
                  <p data-line>Glicemia 178 mg/dL · Creatinina 1.4 · Ureia 52</p>
                  <p data-line>TGO 45 U/L · TGP 51 U/L · Albumina 3.2 g/dL</p>
                  <p data-line>Contato: <PiiSpan raw="(85) 98765-4321" tag="[removido]" /></p>
                </div>
                <div className="demo-fwbar mt-4 flex items-center gap-3 font-mono text-[.64rem] text-ink-4 tracking-[.08em] uppercase">
                  <span className="demo-fwbar-track flex-1 h-[3px] rounded overflow-hidden" style={{ background: "var(--hairline)" }}>
                    <i className="demo-fwbar-fill block h-full" style={{ background: "linear-gradient(90deg, var(--accent-deep), var(--accent-bright))", transform: "scaleX(0)", transformOrigin: "left" }} />
                  </span>
                  <span>regex → NER → quasi-IDs · 28 padrões</span>
                </div>
              </div>

              {/* CENA 3 · RESULTADO compacto */}
              <div className="demo-screen" data-screen="result">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[.68rem] tracking-[.14em] uppercase text-ink-3">AnalysisResult · <b className="text-accent">temperatura zero</b></span>
                  <span className="font-mono text-[.62rem] py-1 px-2 rounded border" style={{ borderColor: "rgba(52,211,153,.25)", background: "var(--ok-soft)", color: "var(--ok)" }}>8.4s</span>
                </div>
                <div className="rounded-xl p-5" style={{ background: "rgba(6,8,12,.6)", border: "1px solid var(--hairline)" }}>
                  <p data-line className="font-mono text-[clamp(.9rem,2.4vw,1.25rem)] font-bold text-ink tracking-[-.01em] mb-3">
                    15/03: <b className="text-accent">HB</b> 12.5 · <b className="text-accent">LEUCO</b> 14.2k · <b className="text-accent">GLI</b> 178 · <b className="text-accent">CR</b> 1.4 · <b className="text-accent">TGO</b> 45 · <b className="text-accent">ALB</b> 3.2
                  </p>
                  <p data-line className="flex items-center gap-2 font-mono text-[.74rem] text-ink-3 mb-2">
                    <Icon name="warning" size={14} style={{ color: "#fbbf24" }} /> MissingItemDetector: sem K+ / Na+ / PCR no material enviado
                  </p>
                  <p data-line className="flex items-center gap-2 font-mono text-[.74rem] text-ink-3">
                    <Icon name="verified" size={14} className="text-accent" /> NumericGuard ok · AuditLog #a8f2c1 · PII: 6 remoções
                  </p>
                </div>
                <p data-line className="mt-4 font-mono text-[.66rem] text-ink-4 tracking-[.08em] uppercase text-center">a IA nunca viu o nome do paciente</p>
              </div>

              {/* CENA 4 · TRIAGEM HUD */}
              <div className="demo-screen" data-screen="triagem">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[.68rem] tracking-[.14em] uppercase text-ink-3"><b className="text-accent">SuGa</b> TRIAGEM · NEWS2 enfermaria</span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[.62rem] text-ink-3"><i className="w-1.5 h-1.5 rounded-full bg-ok inline-block" style={{ boxShadow: "0 0 8px rgba(52,211,153,.6)" }} /> live</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                  {BEDS.map((b) => (
                    <div key={b.n} data-line className={"demo-bed rounded-lg p-3 border " + (b.level === "alto" ? "demo-bed-alto" : "")} style={{ borderColor: b.level === "alto" ? "rgba(248,113,133,.35)" : "var(--hairline)", background: "rgba(6,8,12,.55)" }}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-[.64rem] text-ink-4">LEITO {b.n}</span>
                        <span className="font-mono text-[.62rem] font-bold py-0.5 px-1.5 rounded" style={{
                          color: b.level === "alto" ? "#f87171" : b.level === "mod" ? "#fbbf24" : "var(--ok)",
                          background: b.level === "alto" ? "rgba(248,113,133,.12)" : b.level === "mod" ? "rgba(251,191,36,.1)" : "var(--ok-soft)",
                        }}>N2·{b.news}</span>
                      </div>
                      <div className="text-[.8rem] font-semibold text-ink-2">{b.who}</div>
                      <div className="font-mono text-[.66rem] text-ink-4 mt-0.5">{b.cond}</div>
                    </div>
                  ))}
                </div>
                <div data-line className="demo-alert mt-3.5 flex items-center gap-2.5 rounded-lg py-2.5 px-3.5 font-mono text-[.74rem]" style={{ border: "1px solid rgba(248,113,133,.35)", background: "rgba(248,113,133,.08)", color: "#fca5a5" }}>
                  <Icon name="notifications_active" size={15} />
                  Leito 03: NEWS2 subiu 4 → 6 · reavaliar agora — alerta enviado no Telegram
                </div>
              </div>

              {/* CENA 5 · I-PASS */}
              <div className="demo-screen" data-screen="ipass">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[.68rem] tracking-[.14em] uppercase text-ink-3"><b className="text-accent">SuGa</b> I-PASS · fim do turno · 07:00</span>
                  <span className="font-mono text-[.62rem] py-1 px-2 rounded border" style={{ borderColor: "var(--accent-tint-2)", background: "var(--accent-tint)", color: "var(--accent)" }}>por gravidade</span>
                </div>
                <div className="flex flex-col gap-2.5">
                  {IPASS.map((h) => (
                    <div key={h.who} data-line className="flex items-start gap-3 rounded-lg p-3.5" style={{ border: "1px solid var(--hairline)", background: "rgba(6,8,12,.55)" }}>
                      <span className="font-mono text-[.62rem] font-bold py-1 px-2 rounded flex-shrink-0" style={{
                        color: h.sev === "UTI" ? "#f87171" : "var(--accent)",
                        background: h.sev === "UTI" ? "rgba(248,113,133,.12)" : "var(--accent-tint)",
                        border: h.sev === "UTI" ? "1px solid rgba(248,113,133,.3)" : "1px solid var(--accent-tint-2)",
                      }}>{h.sev}</span>
                      <div>
                        <div className="font-mono text-[.72rem] text-ink-3 mb-0.5">{h.who}</div>
                        <div className="text-[.86rem] text-ink-2 leading-snug">{h.txt}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <p data-line className="mt-4 font-mono text-[.66rem] text-ink-4 tracking-[.08em] uppercase text-center">nenhum paciente crítico esquecido na troca</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
