import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SmoothScrollProvider } from "@/lib/smooth-scroll-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Plantonista 5.0 — Para quem vive de plantão",
  description:
    "Cansado de viver de plantão, mas quer continuar vivendo dele? O Plantonista 5.0 protege o seu paciente, alivia a sua carga e deixa o turno mais leve. Feito por emergencista, para emergencistas.",
  openGraph: {
    title: "Plantonista 5.0 — Para quem vive de plantão",
    description:
      "ANONM 4.0 + SuGa Suite. Feito por emergencista, para emergencistas.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#06080c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="font-sans bg-bg text-ink antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
