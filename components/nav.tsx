"use client";

import { Icon } from "@/lib/icon";

export function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-[rgba(6,8,12,0.72)] backdrop-blur-[18px] border-b border-[color:var(--hairline)]">
      <div className="max-w-page mx-auto px-5 md:px-7 py-3.5 md:py-4 flex items-center justify-between gap-3">
        <a href="#" className="flex items-center gap-2.5 font-bold text-[.95rem] md:text-base tracking-[-.015em]">
          <span
            className="relative inline-flex items-center justify-center w-7 h-7 md:w-[30px] md:h-[30px] rounded-[7px] overflow-hidden"
            style={{
              background: "linear-gradient(135deg, var(--accent-bright), var(--accent-deep))",
              boxShadow: "0 0 0 1px rgba(255,255,255,.12) inset, 0 4px 18px var(--accent-glow)",
            }}
          >
            <Icon name="monitor_heart" size={15} style={{ color: "#06080c", position: "relative", zIndex: 1 }} />
            <span
              className="absolute inset-0"
              style={{ background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,.45), transparent 60%)" }}
            />
          </span>
          Plantonista <span className="font-mono text-ink-3 font-medium text-[.74rem] ml-0.5">5.0</span>
        </a>

        <div id="navLinks" className="hidden md:flex items-center gap-7">
          <a href="#suite" className="font-medium text-[.9rem] text-ink-2 hover:text-ink transition-colors duration-500 ease-power3">SuGa Suite</a>
          <a href="#triagem" className="font-medium text-[.9rem] text-ink-2 hover:text-ink transition-colors duration-500 ease-power3">Triagem HUD</a>
          <a href="#anonm" className="font-medium text-[.9rem] text-ink-2 hover:text-ink transition-colors duration-500 ease-power3">ANONM 4.0</a>
          <a href="#faq" className="font-medium text-[.9rem] text-ink-2 hover:text-ink transition-colors duration-500 ease-power3">Perguntas</a>
          <a
            href="#cta"
            className="bg-ink text-[#06080c] py-2.5 px-[18px] rounded-lg font-bold text-[.86rem] whitespace-nowrap transition-all duration-500 ease-power3 hover:bg-accent hover:shadow-[0_10px_30px_var(--accent-glow)]"
          >
            Solicitar acesso
          </a>
        </div>

        <button
          aria-label="Menu"
          className="md:hidden flex flex-col gap-[5px] cursor-pointer p-1.5"
          onClick={() => document.getElementById("navLinks")?.classList.toggle("open")}
        >
          <span className="block w-[22px] h-[1.5px] bg-ink" />
          <span className="block w-[22px] h-[1.5px] bg-ink" />
          <span className="block w-[22px] h-[1.5px] bg-ink" />
        </button>
      </div>

      <style jsx>{`
        :global(#navLinks.open) {
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 60px;
          left: 0;
          right: 0;
          background: rgba(6, 8, 12, 0.97);
          backdrop-filter: blur(20px);
          padding: 1.4rem 20px;
          border-bottom: 1px solid var(--hairline);
          gap: 1rem;
        }
      `}</style>
    </nav>
  );
}
