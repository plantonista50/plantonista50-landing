import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./lib/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#06080c",
          2: "#0c0f15",
        },
        surface: {
          DEFAULT: "#11161f",
          2: "#181e29",
        },
        elev: "#1f2633",
        border: "#262e3d",
        ink: {
          DEFAULT: "#ffffff",
          2: "#d8dce5",
          3: "#959cab",
          4: "#5a6275",
        },
        accent: {
          DEFAULT: "#22d3ee",
          bright: "#67e8f9",
          deep: "#0891b2",
        },
        ok: "#34d399",
        warn: "#fbbf24",
        critical: "#f87171",
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "Inter",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        mono: [
          "var(--font-jetbrains)",
          "JetBrains Mono",
          "ui-monospace",
          "monospace",
        ],
      },
      letterSpacing: {
        tightest: "-0.05em",
        tighter2: "-0.035em",
      },
      maxWidth: {
        page: "1240px",
      },
      transitionTimingFunction: {
        power3: "cubic-bezier(0.215, 0.61, 0.355, 1)",
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        pulse2: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: ".6", transform: "scale(.85)" },
        },
        ring: {
          "0%": { transform: "scale(.8)", opacity: ".6" },
          "100%": { transform: "scale(2)", opacity: "0" },
        },
        ecg: {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "-1000" },
        },
        scrollPulse: {
          "0%, 100%": { opacity: ".3" },
          "50%": { opacity: "1" },
        },
        breathe: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(34,211,238,0)" },
          "50%": {
            boxShadow:
              "0 0 0 6px rgba(34,211,238,.08),0 0 28px rgba(34,211,238,.18)",
          },
        },
        teleMove: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "pulse-orb": "pulse2 2.4s ease-in-out infinite",
        "ring-orb": "ring 2.4s ease-in-out infinite",
        ecg: "ecg 6s linear infinite",
        "scroll-pulse": "scrollPulse 2.4s ease-in-out infinite",
        breathe: "breathe 3.2s ease-in-out infinite",
        "tele-move": "teleMove 60s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
