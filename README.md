# Plantonista 5.0 — Landing (Next.js)

Landing page do Plantonista 5.0. Stack:

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** com tokens da identidade Health Corp
- **GSAP + ScrollTrigger** para o movimento dos elementos
- **Lenis** para o glide do scroll

## Estrutura

```
landing/
├── app/
│   ├── layout.tsx        # fontes + provider + metadata
│   ├── page.tsx          # composição da home
│   └── globals.css       # tokens em :root + classes não-utility
├── components/           # uma seção = um componente
└── lib/
    ├── smooth-scroll-provider.tsx   # Lenis + GSAP + animações
    ├── hud-brackets.tsx              # cantos HUD reaproveitáveis
    └── icons.tsx                     # wrapper de Material Symbols
```

## Rodar local

```bash
npm install
npm run dev
```

## Mídia (slots prontos)

- `public/hero-loop.mp4` + `.webm` (12–15s, sem som)
- `public/hero-poster.jpg` (frame escolhido do loop)
- `public/founder.jpg` (foto do fundador em ambiente de plantão)

Sem os arquivos, a página degrada elegante para véu + canvas.

## Deploy (GitHub Pages)

A publicação é automática via GitHub Actions (`.github/workflows/deploy.yml`):

1. Em **Settings → Pages**, defina **Source = GitHub Actions**.
2. Todo push na branch `main` dispara `npm ci && npm run build` (export estático
   em `./out`) e publica no Pages.
3. Domínio custom: `plantonista50.ia.br` (servido via `public/CNAME`).
   `public/.nojekyll` evita que o Jekyll do Pages descarte a pasta `_next/`.

Build local do export estático:

```bash
npm run build   # gera ./out portável (Pages, Vercel, Cloudflare, Netlify, S3, Nginx)
```

## Filosofia de motion

- Lenis em modo **lerp 0.075** (peso de site cinematográfico)
- Toda transição de scroll ≥ 0.6s
- Easings exclusivos: `power3.out`, `power3.inOut`, `expo.out`, `sine.inOut`
- Stagger de 0.2s entre filhos das cenas pinadas
- Mobile: tilt 3D, magnético e pin desativados em touch
