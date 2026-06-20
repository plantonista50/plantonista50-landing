"use client";

const ITEMS = [
  ["REF 01", "ANONM 4.0"],
  ["REF 02", "SuGa BRAINSTORM"],
  ["REF 03", "SuGa EXAMINATOR"],
  ["REF 04", "SuGa TRIAGEM"],
  ["REF 05", "SuGa PRONTUÁRIO"],
  ["REF 06", "SuGa EVIDENCE"],
  ["REF 07", "SuGa I-PASS"],
];

export function Telemetry() {
  return (
    <div
      className="telemetry relative overflow-hidden py-3.5 border-y border-[color:var(--hairline)]"
      style={{ background: "rgba(12,15,21,.6)" }}
      aria-hidden="true"
    >
      <span className="absolute inset-y-0 left-0 w-[120px] z-[2] pointer-events-none" style={{ background: "linear-gradient(90deg, var(--bg), transparent)" }} />
      <span className="absolute inset-y-0 right-0 w-[120px] z-[2] pointer-events-none" style={{ background: "linear-gradient(-90deg, var(--bg), transparent)" }} />
      <div className="tele-track">
        {[...ITEMS, ...ITEMS].map(([num, name], i) => (
          <span key={i} className="inline-flex items-center gap-3.5 text-[.84rem] font-semibold text-ink-2">
            <span className="text-accent text-[.7rem] py-0.5 px-[7px] border rounded" style={{ borderColor: "var(--accent-tint-2)", background: "var(--accent-tint)" }}>
              {num}
            </span>
            {name}
            <span className="w-1.5 h-1.5 bg-accent flex-shrink-0" style={{ boxShadow: "0 0 8px var(--accent-glow)" }} />
          </span>
        ))}
      </div>
    </div>
  );
}
