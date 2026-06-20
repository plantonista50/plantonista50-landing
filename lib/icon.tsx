import type { CSSProperties } from "react";

type Props = {
  name: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
};

/** Wrapper para Material Symbols Outlined (carregado em layout.tsx). */
export function Icon({ name, size, className, style }: Props) {
  const merged: CSSProperties = size
    ? { fontSize: `${size}px`, ...style }
    : style ?? {};
  return (
    <span className={`material-symbols-outlined ${className ?? ""}`} style={merged}>
      {name}
    </span>
  );
}
