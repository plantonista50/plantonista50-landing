import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  code?: string;
  className?: string;
};

/** Eyebrow padronizado · dot pulsante + ring + code opcional (ex.: "REF · 00"). */
// `ref` é reservado pelo React em componentes funcionais → usamos `code`.
export function Kicker({ children, code, className }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 font-mono text-[.7rem] font-semibold uppercase tracking-[.18em] text-accent mb-5 ${className ?? ""}`}
    >
      <span className="relative inline-block w-[7px] h-[7px] bg-accent animate-pulse-orb" style={{ boxShadow: "0 0 12px var(--accent-glow)" }}>
        <span className="absolute -inset-[3px] border border-accent opacity-40 animate-ring-orb" />
      </span>
      {children}
      {code && (
        <span className="font-mono text-[.66rem] font-medium text-ink-3 tracking-[.1em] pl-2.5 border-l border-[color:var(--hairline)] normal-case">
          {code}
        </span>
      )}
    </span>
  );
}
