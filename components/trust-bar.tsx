"use client";

const ITEMS: { value: string; label: string; target?: number; prefix?: string; suffix?: string }[] = [
  { value: "< 10s", label: "do exame ao parecer", target: 10, prefix: "< ", suffix: "s" },
  { value: "28", label: "dados sensíveis removidos", target: 28 },
  { value: "7", label: "ferramentas a um clique", target: 7 },
  { value: "15h", label: "e a conversa some", target: 15, suffix: "h" },
];

export function TrustBar() {
  return (
    <section className="py-12 border-y border-[color:var(--hairline)]" style={{ background: "linear-gradient(180deg, transparent, rgba(34,211,238,.03), transparent)" }}>
      <div className="max-w-page mx-auto px-5 relative z-[3]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-7 md:gap-10">
          {ITEMS.map((item, i) => (
            <div
              key={i}
              data-reveal
              data-dir="up"
              className="pl-[18px] md:pl-6 border-l border-[color:var(--hairline)] [&:nth-child(odd)]:border-l-0 [&:nth-child(odd)]:pl-0 md:[&:nth-child(odd)]:border-l md:[&:nth-child(odd)]:border-[color:var(--hairline)] md:[&:nth-child(odd)]:pl-6 md:[&:first-child]:border-l-0 md:[&:first-child]:pl-0"
            >
              <b
                className="block font-extrabold text-ink leading-none mb-2"
                style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", letterSpacing: "-.035em" }}
                data-count={item.target}
                data-target={item.target?.toString()}
                data-prefix={item.prefix}
                data-suffix={item.suffix}
              >
                {item.value}
              </b>
              <span className="block font-mono text-[.72rem] text-ink-3 tracking-[.06em] uppercase">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
