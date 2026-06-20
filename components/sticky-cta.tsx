"use client";

import { Icon } from "@/lib/icon";

export function StickyCta() {
  return (
    <div
      id="stickyCta"
      className="fixed left-3 right-3 bottom-3 z-[90] opacity-0 translate-y-5 pointer-events-none transition-all duration-500 ease-power3 md:hidden"
    >
      <a
        href="#cta"
        className="flex items-center justify-center gap-2 bg-ink text-[#06080c] px-5 py-3.5 rounded-xl font-bold text-[.96rem]"
        style={{ boxShadow: "0 14px 32px rgba(0,0,0,.6), 0 0 0 1px var(--accent-tint-2)" }}
      >
        Solicitar acesso
        <Icon name="arrow_forward" size={18} />
      </a>

      <style jsx>{`
        :global(#stickyCta.show) {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
      `}</style>
    </div>
  );
}
