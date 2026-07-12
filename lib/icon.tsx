import type { CSSProperties } from "react";

type Props = {
  name: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * Ícones SVG inline (stroke, currentColor) — zero dependência de CDN.
 * O font Material Symbols era ponto único de falha (rede hospitalar com
 * firewall = ícone virando texto cru). Mesma API de antes: name/size.
 */
const PATHS: Record<string, React.ReactNode> = {
  check: <path d="M5 12.5l4.5 4.5L19 7" />,
  check_circle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.5l2.5 2.5 4.5-5" />
    </>
  ),
  close: <path d="M6 6l12 12M18 6L6 18" />,
  arrow_forward: <path d="M4 12h15M13 6l6 6-6 6" />,
  warning: (
    <>
      <path d="M12 3.5L2.5 20h19L12 3.5z" />
      <path d="M12 10v4.5" />
      <path d="M12 17.5v.01" />
    </>
  ),
  verified: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.5 12.5l2.5 2.5 4.5-5" />
    </>
  ),
  shield_lock: (
    <>
      <path d="M12 3l7.5 2.8v5.7c0 4.6-3.2 7.6-7.5 9-4.3-1.4-7.5-4.4-7.5-9V5.8L12 3z" />
      <circle cx="12" cy="11" r="1.8" />
      <path d="M12 12.8v3" />
    </>
  ),
  monitor_heart: (
    <>
      <path d="M12 20.5S4.5 16 3 11.5C1.8 8 4 5 7 5c2 0 3.8 1 5 2.8C13.2 6 15 5 17 5c3 0 5.2 3 4 6.5-1.5 4.5-9 9-9 9z" />
      <path d="M7 12h3l1.2-2.5 1.6 4.5 1.2-2h3" />
    </>
  ),
  notifications_active: (
    <>
      <path d="M6.5 9.5a5.5 5.5 0 0111 0v4.5l1.8 2.8H4.7l1.8-2.8V9.5z" />
      <path d="M10 19.8a2.2 2.2 0 004 0" />
      <path d="M3.5 6A8 8 0 016 3.2M20.5 6A8 8 0 0018 3.2" />
    </>
  ),
  savings: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5v9M14.8 9.3c-.5-.9-1.6-1.4-2.8-1.4-1.7 0-3 .9-3 2.1 0 2.9 6 1.4 6 4.1 0 1.2-1.3 2.1-3 2.1-1.2 0-2.3-.5-2.8-1.4" />
    </>
  ),
  play_circle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M10 8.5l5.5 3.5-5.5 3.5v-7z" />
    </>
  ),
  photo_camera: (
    <>
      <path d="M4 7.5h3.2L9 5h6l1.8 2.5H20a1 1 0 011 1V18a1 1 0 01-1 1H4a1 1 0 01-1-1V8.5a1 1 0 011-1z" />
      <circle cx="12" cy="13" r="3.4" />
    </>
  ),
  labs: (
    <>
      <path d="M9 3h6M10 3v6.2L4.8 18a2 2 0 001.8 3h10.8a2 2 0 001.8-3L14 9.2V3" />
      <path d="M7.5 15h9" />
    </>
  ),
  menu_book: (
    <>
      <path d="M12 6.5C10 5 7.5 4.5 4 4.5v13.7c3.5 0 6 .5 8 2 2-1.5 4.5-2 8-2V4.5c-3.5 0-6 .5-8 2z" />
      <path d="M12 6.5v13.7" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5.5 11.5a6.5 6.5 0 0013 0M12 18v3M9 21h6" />
    </>
  ),
  neurology: (
    <>
      <path d="M12 3.5c-4.4 0-7.5 3-7.5 6.8 0 2.1 1 4 2.6 5.2l.6 5h8.6l.6-5c1.6-1.2 2.6-3.1 2.6-5.2 0-3.8-3.1-6.8-7.5-6.8z" />
      <path d="M12 8v6M9.2 10l2.8 1.6 2.8-1.6" />
    </>
  ),
  swap_horiz: (
    <>
      <path d="M16.5 4.5L20.5 8.5l-4 4M20.5 8.5H7" />
      <path d="M7.5 19.5l-4-4 4-4M3.5 15.5H17" />
    </>
  ),
};

export function Icon({ name, size = 20, className, style }: Props) {
  const merged: CSSProperties = { flexShrink: 0, ...style };
  return (
    <svg
      className={className}
      style={merged}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name] ?? <circle cx="12" cy="12" r="4" />}
    </svg>
  );
}
