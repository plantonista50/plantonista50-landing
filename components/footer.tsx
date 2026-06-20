"use client";

import { Icon } from "@/lib/icon";

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--hairline)] pt-14 pb-7" style={{ background: "#04060a" }}>
      <div className="max-w-page mx-auto px-5 relative z-[3]">
        <div className="grid grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-8 md:gap-10 mb-9">
          <div>
            <div className="flex items-center gap-2.5 font-bold text-ink mb-3">
              <span
                className="relative inline-flex items-center justify-center w-7 h-7 rounded-[7px] overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, var(--accent-bright), var(--accent-deep))",
                  boxShadow: "0 0 0 1px rgba(255,255,255,.12) inset, 0 4px 18px var(--accent-glow)",
                }}
              >
                <Icon name="monitor_heart" size={15} style={{ color: "#06080c", position: "relative", zIndex: 1 }} />
              </span>
              Plantonista <span className="font-mono text-ink-3 font-medium text-[.74rem] ml-0.5">5.0</span>
            </div>
            <p className="text-ink-3 text-[.92rem] max-w-[280px] mt-3.5 leading-relaxed">
              ANONM 4.0 + SuGa Suite. Tudo o que o plantonista precisa, a um clique. Feito por emergencista, para emergencistas.
            </p>
            <p className="mt-3.5 font-mono text-[.72rem] text-ink-4">Fortaleza, CE · DPO: Andre Yuuzo Sugayama</p>
          </div>

          <div>
            <h4 className="font-mono text-[.7rem] text-accent tracking-[.18em] uppercase mb-3.5 font-bold">SuGa Suite</h4>
            {[
              { href: "#anonm", label: "ANONM 4.0" },
              { href: "#suite", label: "SuGa BRAINSTORM" },
              { href: "#suite", label: "SuGa EXAMINATOR" },
              { href: "#triagem", label: "SuGa TRIAGEM" },
              { href: "#suite", label: "SuGa PRONTUÁRIO" },
              { href: "#suite", label: "SuGa EVIDENCE" },
              { href: "#suite", label: "SuGa I-PASS" },
            ].map((l) => (
              <a key={l.label} href={l.href} className="block py-1.5 text-ink-3 text-[.92rem] transition-colors duration-500 ease-power3 hover:text-ink">
                {l.label}
              </a>
            ))}
          </div>

          <div>
            <h4 className="font-mono text-[.7rem] text-accent tracking-[.18em] uppercase mb-3.5 font-bold">Compliance</h4>
            {["LGPD", "Retenção de dados", "Termos de uso", "Política de privacidade"].map((l) => (
              <a key={l} href="#" className="block py-1.5 text-ink-3 text-[.92rem] transition-colors duration-500 ease-power3 hover:text-ink">
                {l}
              </a>
            ))}
          </div>

          <div>
            <h4 className="font-mono text-[.7rem] text-accent tracking-[.18em] uppercase mb-3.5 font-bold">Contato</h4>
            {["Imprensa", "Parcerias hospitalares", "Suporte clínico"].map((l) => (
              <a key={l} href="#" className="block py-1.5 text-ink-3 text-[.92rem] transition-colors duration-500 ease-power3 hover:text-ink">
                {l}
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-[color:var(--hairline)] pt-5 flex justify-between flex-wrap gap-3.5 font-mono text-[.72rem] text-ink-3 tracking-[.04em] uppercase">
          <span>© 2026 Plantonista 5.0 · Todos os direitos reservados</span>
          <span className="inline-flex items-center gap-1.5">
            <Icon name="verified" size={13} className="text-accent" /> Suporte à decisão clínica · não substitui julgamento médico
          </span>
        </div>
      </div>
    </footer>
  );
}
