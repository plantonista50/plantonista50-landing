"use client";

import { useEffect } from "react";

/**
 * SmoothScrollProvider
 * --------------------
 * Inicializa Lenis (glide premium, lerp-based) + GSAP/ScrollTrigger
 * e registra todas as animações de scroll da página.
 *
 * Regra de ouro respeitada:
 *  - Lenis controla o scroll · GSAP controla o movimento dos elementos.
 *  - Toda transição ≥ 0.6s · easings: power3 / expo / sine / none.
 *  - Um único loop (gsap.ticker dirige lenis.raf — sem double-rAF).
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let canceled = false;

    (async () => {
      const reduce =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const touch =
        typeof window !== "undefined" &&
        window.matchMedia("(pointer: coarse)").matches;

      const [{ default: Lenis }, gsapMod, stMod] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (canceled) return;

      const gsap = gsapMod.default;
      const ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.config({ ignoreMobileResize: true });
      gsap.config({ force3D: true, nullTargetWarn: false });

      // ============ Lenis (glide com inércia) ============
      let lenis: InstanceType<typeof Lenis> | null = null;
      if (!reduce) {
        lenis = new Lenis({
          lerp: 0.075,
          wheelMultiplier: 0.92,
          touchMultiplier: 1.6,
          smoothWheel: true,
          syncTouch: false,
          gestureOrientation: "vertical",
        });
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((time: number) => lenis!.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);

        // âncoras internas glidam via Lenis
        const NAV_H = 68;
        const expoOut = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
        document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
          const id = a.getAttribute("href");
          if (!id || id === "#" || id.length < 2) return;
          a.addEventListener("click", (e) => {
            const t = document.querySelector(id);
            if (!t) return;
            e.preventDefault();
            document.getElementById("navLinks")?.classList.remove("open");
            lenis!.scrollTo(t as HTMLElement, {
              offset: -NAV_H,
              duration: 1.7,
              easing: expoOut,
            });
          });
        });
      } else {
        document
          .querySelectorAll<HTMLElement>("[data-reveal]")
          .forEach((el) => {
            el.style.opacity = "1";
            el.style.transform = "none";
          });
      }

      // ============ direção de entrada ============
      const fromFor = (el: HTMLElement) => {
        const dir = el.dataset.dir || "up";
        if (dir === "left") return { x: -30, y: 0 };
        if (dir === "right") return { x: 30, y: 0 };
        return { x: 0, y: 28 };
      };

      // ============ HERO · cascata ============
      if (!reduce) {
        const heroEls = gsap.utils.toArray<HTMLElement>(".hero [data-reveal]");
        const tl = gsap.timeline({ delay: 0.15 });
        heroEls.forEach((el) => {
          const f = fromFor(el);
          tl.fromTo(
            el,
            { opacity: 0, x: f.x, y: f.y },
            { opacity: 1, x: 0, y: 0, duration: 0.9, ease: "power3.out" },
            "<0.08"
          );
        });
      }

      // ============ REVEALS universais ============
      if (!reduce) {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          if (el.closest(".hero")) return;
          const f = fromFor(el);
          gsap.fromTo(
            el,
            { opacity: 0, x: f.x, y: f.y },
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 86%", once: true },
            }
          );
        });
      }

      // ============ progresso ============
      gsap.to(".progress i", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });

      // ============ scroll cue some ============
      if (!reduce) {
        const cue = document.getElementById("scrollCue");
        if (cue)
          gsap.to(cue, {
            opacity: 0,
            y: -12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "18% top",
              scrub: 0.6,
            },
          });
      }

      // ============ vídeo · respiração + parallax + tensão na saída ============
      if (!reduce) {
        const vid = document.querySelector<HTMLVideoElement>(".hero-video video");
        if (vid) {
          gsap.fromTo(
            vid,
            { scale: 1.06 },
            {
              scale: 1.14,
              duration: 12,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
            }
          );
          gsap.to(vid, {
            yPercent: 14,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });
          gsap.to(".hero-video", {
            opacity: 0.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".hero",
              start: "40% top",
              end: "bottom top",
              scrub: 0.8,
            },
          });
        }
      }

      // ============ ATO pinado · "olhar de câmera" stagger 0.2s ============
      if (!reduce) {
        const mm = gsap.matchMedia();
        mm.add("(min-width: 768px)", () => {
          const scenes = gsap.utils.toArray<HTMLElement>(".act .scene");
          const kidsOf = (sc: HTMLElement) =>
            gsap.utils.toArray<HTMLElement>(sc.children);

          scenes.forEach((sc, i) => {
            gsap.set(sc, { opacity: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 1.04 });
            gsap.set(kidsOf(sc), { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 34 });
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: ".act",
              start: "top top",
              end: "+=" + scenes.length * 95 + "%",
              pin: ".act-pin",
              scrub: 0.9,
              anticipatePin: 1,
            },
          });

          scenes.forEach((sc, i) => {
            if (i === 0) return;
            const prev = scenes[i - 1];
            tl.to(
              prev,
              { opacity: 0, scale: 0.97, duration: 1, ease: "power3.inOut" },
              ">"
            )
              .to(
                kidsOf(prev),
                { opacity: 0, y: -28, duration: 0.8, ease: "power3.in", stagger: 0.08 },
                "<"
              )
              .to(
                sc,
                { opacity: 1, scale: 1, duration: 1.1, ease: "expo.out" },
                "<0.2"
              )
              .to(
                kidsOf(sc),
                { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.2 },
                "<0.1"
              );
          });
        });
        mm.add("(max-width: 767px)", () => {
          gsap.utils.toArray<HTMLElement>(".act .scene").forEach((sc) => {
            sc.style.position = "relative";
            sc.style.opacity = "1";
            sc.style.padding = "60px 20px";
            sc.style.transform = "none";
          });
          const pin = document.querySelector<HTMLElement>(".act-pin");
          if (pin) pin.style.height = "auto";
        });
      } else {
        document.querySelectorAll<HTMLElement>(".act .scene").forEach((sc) => {
          sc.style.position = "relative";
          sc.style.opacity = "1";
        });
      }

      // ============ DEMO pinado · o produto scrubbed como vídeo ============
      // Cada beat usa ease:none dentro de timeline com scrub → o dedo do
      // usuário controla o "frame", como sequência de imagens da Apple.
      if (!reduce) {
        const mm2 = gsap.matchMedia();
        mm2.add("(min-width: 768px)", () => {
          const demo = document.querySelector<HTMLElement>(".demo");
          if (!demo) return;
          const screens = gsap.utils.toArray<HTMLElement>(".demo .demo-screen");
          const steps = gsap.utils.toArray<HTMLElement>(".demo .demo-step");
          const linesOf = (s: HTMLElement) => gsap.utils.toArray<HTMLElement>(s.querySelectorAll("[data-line]"));
          const piiOf = (s: HTMLElement) => gsap.utils.toArray<HTMLElement>(s.querySelectorAll("[data-pii]"));

          // estado inicial: só a 1ª tela visível, linhas escondidas
          screens.forEach((s, i) => gsap.set(s, { autoAlpha: i === 0 ? 1 : 0 }));
          screens.forEach((s) => gsap.set(linesOf(s), { autoAlpha: 0, y: 14 }));
          gsap.set(".demo .pii-tag", { autoAlpha: 0, scale: 0.85 });
          gsap.set(".demo .demo-alert", { scale: 0.96 });

          const activate = (i: number) => () =>
            steps.forEach((st, j) => st.classList.toggle("on", j <= i));

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: ".demo",
              start: "top top",
              end: "+=420%",
              pin: ".demo-pin",
              scrub: 1,
              anticipatePin: 1,
            },
          });

          const exam = screens[0], result = screens[1], triagem = screens[2], ipass = screens[3];

          // CENA 1 · linhas do exame "digitam" frame a frame
          tl.call(activate(0))
            .to(linesOf(exam), { autoAlpha: 1, y: 0, duration: 1, ease: "none", stagger: 0.5 })
            .to({}, { duration: 0.6 });

          // CENA 2 · ANONM censura cada PII, uma por uma + barra do firewall
          tl.call(activate(1))
            .to(".demo .demo-fwbar-fill", { scaleX: 1, duration: 3.2, ease: "none" }, "<")
            .to(piiOf(exam).map((w) => w.querySelector(".pii-raw")), { autoAlpha: 0.18, duration: 0.5, ease: "none", stagger: 0.55 }, "<")
            .to(piiOf(exam).map((w) => w.querySelector(".pii-tag")), { autoAlpha: 1, scale: 1, duration: 0.5, ease: "none", stagger: 0.55 }, "<0.15")
            .to({}, { duration: 0.6 });

          // troca de tela: exam → result
          tl.to(exam, { autoAlpha: 0, y: -20, duration: 0.8, ease: "power2.in" })
            .to(result, { autoAlpha: 1, duration: 0.6, ease: "none" }, "<0.4");

          // CENA 3 · resultado compacto
          tl.call(activate(2))
            .to(linesOf(result), { autoAlpha: 1, y: 0, duration: 1, ease: "none", stagger: 0.7 })
            .to({}, { duration: 0.8 });

          // troca: result → triagem
          tl.to(result, { autoAlpha: 0, y: -20, duration: 0.8, ease: "power2.in" })
            .to(triagem, { autoAlpha: 1, duration: 0.6, ease: "none" }, "<0.4");

          // CENA 4 · leitos pipocam, alerta por último com ênfase
          tl.call(activate(3))
            .to(linesOf(triagem).slice(0, -1), { autoAlpha: 1, y: 0, duration: 0.8, ease: "none", stagger: 0.35 })
            .to(linesOf(triagem).slice(-1), { autoAlpha: 1, y: 0, scale: 1, duration: 0.9, ease: "none" })
            .to({}, { duration: 0.8 });

          // troca: triagem → ipass
          tl.to(triagem, { autoAlpha: 0, y: -20, duration: 0.8, ease: "power2.in" })
            .to(ipass, { autoAlpha: 1, duration: 0.6, ease: "none" }, "<0.4");

          // CENA 5 · handoff por gravidade
          tl.call(activate(4))
            .to(linesOf(ipass), { autoAlpha: 1, y: 0, duration: 0.9, ease: "none", stagger: 0.55 })
            .to({}, { duration: 1 });
        });
        mm2.add("(max-width: 767px)", () => {
          // mobile: sem pin — cenas empilhadas e visíveis (fail-safe)
          document.querySelectorAll<HTMLElement>(".demo .demo-screen").forEach((s) => {
            s.style.position = "relative";
            s.style.opacity = "1";
            s.style.visibility = "visible";
          });
          document.querySelectorAll<HTMLElement>(".demo [data-line]").forEach((l) => {
            l.style.opacity = "1";
            l.style.transform = "none";
            l.style.visibility = "visible";
          });
          document.querySelectorAll<HTMLElement>(".demo .pii-tag").forEach((t) => {
            t.style.opacity = "1";
            t.style.transform = "none";
            t.style.visibility = "visible";
          });
          document.querySelectorAll<HTMLElement>(".demo .pii-raw").forEach((r) => {
            r.style.opacity = "0.18";
          });
          const fill = document.querySelector<HTMLElement>(".demo .demo-fwbar-fill");
          if (fill) fill.style.transform = "scaleX(1)";
        });
      } else {
        // reduced-motion: tudo visível, censura aplicada (estado final)
        document.querySelectorAll<HTMLElement>(".demo .demo-screen, .demo [data-line], .demo .pii-tag").forEach((el) => {
          el.style.opacity = "1";
          el.style.visibility = "visible";
          el.style.transform = "none";
          if (el.classList.contains("demo-screen")) el.style.position = "relative";
        });
        document.querySelectorAll<HTMLElement>(".demo .pii-raw").forEach((r) => (r.style.opacity = "0.18"));
      }

      // ============ telegram msgs em sequência ============
      if (!reduce) {
        const msgs = gsap.utils.toArray<HTMLElement>("[data-tg]");
        if (msgs.length) {
          gsap.set(msgs, { opacity: 0, y: 16, scale: 0.97 });
          ScrollTrigger.create({
            trigger: ".phone",
            start: "top 80%",
            once: true,
            onEnter: () =>
              gsap.to(msgs, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.9,
                ease: "power3.out",
                stagger: 0.45,
              }),
          });
        }
      }

      // ============ counters ============
      document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const target = parseFloat(el.dataset.target || "0") || 0;
        const prefix = el.dataset.prefix || "";
        const suffix = el.dataset.suffix || "";
        const finalText = el.textContent || "";
        const proxy = { v: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () =>
            gsap.to(proxy, {
              v: target,
              duration: 1.6,
              ease: "expo.out",
              onUpdate: () => {
                el.textContent = prefix + Math.floor(proxy.v) + suffix;
              },
              onComplete: () => {
                el.textContent = finalText;
              },
            }),
        });
      });

      // ============ tilt 3D via quickTo (sem brigar com CSS) ============
      if (!touch && !reduce) {
        document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((card) => {
          gsap.set(card, { transformPerspective: 900 });
          const rx = gsap.quickTo(card, "rotationX", {
            duration: 0.6,
            ease: "power3.out",
          });
          const ry = gsap.quickTo(card, "rotationY", {
            duration: 0.6,
            ease: "power3.out",
          });
          const ty = gsap.quickTo(card, "y", {
            duration: 0.6,
            ease: "power3.out",
          });
          card.addEventListener("mousemove", (e) => {
            const r = card.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width;
            const py = (e.clientY - r.top) / r.height;
            card.style.setProperty("--mx", px * 100 + "%");
            card.style.setProperty("--my", py * 100 + "%");
            rx((0.5 - py) * 5);
            ry((px - 0.5) * 5);
            ty(-4);
          });
          card.addEventListener("mouseleave", () => {
            rx(0);
            ry(0);
            ty(0);
          });
        });

        const device = document.querySelector<HTMLElement>(".device");
        if (device) {
          gsap.set(device, {
            transformPerspective: 1400,
            rotationY: -10,
            rotationX: 4,
          });
          gsap.to(device, {
            y: -10,
            duration: 3,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        }
      }

      // ============ CTA magnético ============
      if (!touch && !reduce) {
        document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((btn) => {
          const bx = gsap.quickTo(btn, "x", { duration: 0.7, ease: "power3.out" });
          const by = gsap.quickTo(btn, "y", { duration: 0.7, ease: "power3.out" });
          btn.addEventListener("mousemove", (e) => {
            const r = btn.getBoundingClientRect();
            bx((e.clientX - (r.left + r.width / 2)) * 0.22);
            by((e.clientY - (r.top + r.height / 2)) * 0.22);
          });
          btn.addEventListener("mouseleave", () => {
            bx(0);
            by(0);
          });
        });
      }

      // ============ sticky CTA mobile ============
      const sticky = document.getElementById("stickyCta");
      const hero = document.querySelector(".hero");
      if (sticky && hero) {
        new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              sticky.classList.toggle("show", !entry.isIntersecting);
            });
          },
          { threshold: 0.1 }
        ).observe(hero);
      }

      // ============ canvas hero ambient (partículas leves) ============
      const canvas = document.getElementById("hero-canvas") as HTMLCanvasElement | null;
      if (canvas && !reduce) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          let W = 0, H = 0, parts: { x: number; y: number; vy: number; r: number; a: number }[] = [];
          let on = true;
          const N = touch ? 14 : 30;
          const resize = () => {
            W = canvas.width = canvas.offsetWidth;
            H = canvas.height = canvas.offsetHeight;
          };
          const init = () => {
            parts = [];
            for (let i = 0; i < N; i++) {
              parts.push({
                x: Math.random() * W,
                y: Math.random() * H,
                vy: -(0.12 + Math.random() * 0.3),
                r: 0.8 + Math.random() * 1.3,
                a: 0.15 + Math.random() * 0.4,
              });
            }
          };
          const draw = () => {
            requestAnimationFrame(draw);
            if (!on) return;
            ctx.clearRect(0, 0, W, H);
            parts.forEach((p) => {
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(34,211,238,${p.a})`;
              ctx.fill();
              p.y += p.vy;
              if (p.y < -10) {
                p.y = H + 10;
                p.x = Math.random() * W;
              }
            });
          };
          resize(); init(); draw();
          window.addEventListener("resize", () => { resize(); init(); });
          if (hero) {
            new IntersectionObserver(
              (es) => es.forEach((e) => (on = e.isIntersecting)),
              { threshold: 0.05 }
            ).observe(hero);
          }
        }
      }

      cleanup = () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
        lenis?.destroy();
      };
    })();

    return () => {
      canceled = true;
      cleanup?.();
    };
  }, []);

  return <>{children}</>;
}
