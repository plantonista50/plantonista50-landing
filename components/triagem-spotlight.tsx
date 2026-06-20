"use client";

import { Icon } from "@/lib/icon";
import { HudBrackets } from "@/lib/hud-brackets";
import { Kicker } from "@/lib/kicker";

const BEDS = [
  { num: "Leito 3", name: "M, 67a · dispneia", points: "0,14 12,13 24,12 36,10 48,7 60,5 72,3", stroke: "#f87171", score: "NEWS2 · 7", scoreClass: "bg-[color:var(--critical-soft)] text-critical border-[rgba(248,113,113,.3)] animate-pulse-orb" },
  { num: "Leito 7", name: "F, 54a · DPOC", points: "0,10 12,11 24,10 36,9 48,10 60,9 72,9", stroke: "#fbbf24", score: "NEWS2 · 4", scoreClass: "bg-[color:var(--warn-soft)] text-warn border-[rgba(251,191,36,.25)]" },
  { num: "Leito 12", name: "M, 31a · dor lombar", points: "0,8 12,9 24,10 36,11 48,12 60,13 72,13", stroke: "#34d399", score: "NEWS2 · 1", scoreClass: "bg-[color:var(--ok-soft)] text-ok border-[rgba(52,211,153,.25)]" },
];

export function TriagemSpotlight() {
  return (
    <section
      className="py-24 md:py-36 spotlight border-y border-[color:var(--hairline)]"
      style={{ background: "var(--bg-2)" }}
      id="triagem"
    >
      <div className="max-w-page mx-auto px-5 relative z-[3]">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-[72px] items-center">
          <div data-reveal data-dir="left">
            <Kicker code="HUD · NEWS2">SuGa TRIAGEM</Kicker>
            <p className="font-semibold text-ink leading-snug mb-6" style={{ fontSize: "clamp(1.4rem, 4.4vw, 2.2rem)", letterSpacing: "-.025em" }}>
              O plantão inteiro em um painel. <em className="italic text-accent font-semibold">E o alerta te encontra no Telegram.</em>
            </p>
            <p className="text-ink-2 text-base leading-relaxed mb-2">
              O HUD acompanha o NEWS2 de cada leito em tempo real e mostra a deterioração antes de ela virar urgência. Você programa o lembrete — <b className="text-ink">"checar gasometria do leito 7"</b> — e ele chega no seu Telegram na hora certa.
            </p>
            <ul className="list-none grid gap-3 mt-6">
              {[
                "NEWS2 em tempo real com curva de deterioração por leito",
                "Lembretes no Telegram programados por você",
                "Dashboard editável com todos os pacientes do turno",
                "Conectado ao SuGa I-PASS: handoff com a última atualização de cada paciente",
              ].map((t, i) => (
                <li key={i} className="flex gap-3 items-start text-[.96rem] text-ink-2">
                  <span
                    className="w-6 h-6 rounded-full text-accent flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "var(--accent-tint)", border: "1px solid var(--accent-tint-2)" }}
                  >
                    <Icon name="check" size={14} />
                  </span>
                  <span><b className="text-ink">{t.split(" ").slice(0, 3).join(" ")}</b>{" " + t.split(" ").slice(3).join(" ")}</span>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal data-dir="right">
            {/* HUD NEWS2 */}
            <div
              className="news2-hud hud relative p-5 rounded-2xl mb-4 shadow-[0_30px_80px_rgba(0,0,0,.5)]"
              style={{ background: "linear-gradient(180deg, var(--elev) 0%, var(--surface) 100%)", border: "1px solid var(--border)" }}
            >
              <HudBrackets />
              <div className="font-mono text-[.68rem] tracking-[.16em] uppercase text-ink-3 mb-3.5 font-semibold flex justify-between items-center">
                <span><b className="text-accent">SuGa TRIAGEM</b> · HUD do turno</span>
                <span className="text-ok">8 leitos</span>
              </div>
              {BEDS.map((b) => (
                <div key={b.num} className="flex items-center gap-3 py-2.5 border-b border-dashed border-[color:var(--hairline)] last:border-b-0 text-[.88rem]">
                  <span className="font-mono text-[.72rem] text-ink-3 min-w-[58px] uppercase tracking-[.04em]">{b.num}</span>
                  <span className="flex-1 text-ink-2 text-[.86rem]">{b.name}</span>
                  <svg className="w-[72px] h-5 flex-shrink-0" viewBox="0 0 72 20">
                    <polyline points={b.points} fill="none" stroke={b.stroke} strokeWidth="1.5" />
                  </svg>
                  <span className={`font-mono text-[.7rem] font-bold py-[3px] px-2.5 rounded tracking-[.06em] flex-shrink-0 border ${b.scoreClass}`}>{b.score}</span>
                </div>
              ))}
            </div>

            {/* Telegram phone */}
            <div
              data-reveal
              data-dir="up"
              className="phone max-w-[320px] mx-auto rounded-[28px] p-3.5"
              style={{ background: "var(--bg)", border: "1px solid var(--border)", boxShadow: "0 30px 80px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.06)" }}
            >
              <div className="w-[90px] h-[5px] rounded-md mx-auto mb-3" style={{ background: "var(--elev)" }} />
              <div className="rounded-[18px] p-3.5" style={{ background: "var(--bg-2)", border: "1px solid var(--hairline)" }}>
                <div className="flex items-center gap-2.5 pb-3 border-b border-[color:var(--hairline)] mb-3">
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, var(--accent-bright), var(--accent-deep))" }}
                  >
                    <Icon name="monitor_heart" size={16} style={{ color: "#06080c" }} />
                  </span>
                  <div>
                    <b className="text-[.86rem] text-ink block leading-tight">Plantonista 5.0</b>
                    <span className="font-mono text-[.64rem] text-ok">bot · online</span>
                  </div>
                </div>
                {[
                  { content: <><b className="text-ink">⏰ Lembrete programado</b><br />Checar gasometria do <b className="text-ink">leito 7</b>.</>, time: "02:30 ✓✓", alert: false },
                  { content: <><b className="text-critical">⚠ Deterioração detectada</b><br />Leito 3: NEWS2 subiu de 4 → <b className="text-ink">7</b>. Reavaliar agora.</>, time: "02:47 ✓✓", alert: true },
                  { content: <><b className="text-ink">📋 Handoff pronto</b><br />SuGa I-PASS gerou a passagem com a última atualização dos 8 leitos.</>, time: "06:55 ✓✓", alert: false },
                ].map((m, i) => (
                  <div
                    key={i}
                    data-tg
                    className={`border rounded-xl rounded-tl px-3 py-2.5 mb-2.5 text-[.84rem] text-ink-2 leading-snug ${m.alert ? "border-[rgba(248,113,113,.3)] bg-[rgba(248,113,113,.05)]" : "border-[color:var(--border)] bg-[color:var(--surface)]"}`}
                    style={{ willChange: "transform, opacity" }}
                  >
                    {m.content}
                    <span className="block font-mono text-[.62rem] text-ink-4 mt-1 text-right">{m.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* slot de vídeo */}
            <div className="media-slot mt-4 !min-h-[120px]">
              <Icon name="play_circle" />
              <b>Vídeo · 20–30s loop</b>
              <span>Screen-record real: NEWS2 subindo no HUD → notificação chegando no Telegram. Sem som, legenda embutida.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
