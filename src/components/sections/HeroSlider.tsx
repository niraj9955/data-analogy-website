"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PillarData, SiteConfigData } from "@/lib/types";
import { AnimatedBackground } from "@/components/sections/AnimatedBackground";

/**
 * TCS.com-style cinematic hero slider.
 * 4 auto-rotating full-screen slides, each with its own animated scene:
 *   1. "4 Pillars of Digital Transformation" — flowing waves + 3D rotating pillar cards
 *   2. Company hero — headline, subtitle, CTAs and stats (the site's SEO h1 lives here)
 *   3. "5-Stage Data Transformation Journey" — perspective grid floor + path drawing
 *      itself with numbered pins popping in one by one
 *   4. "5-Layer Enterprise Data Stack" — waves + translucent 3D layers stacking bottom-up
 * Chrome: pause/play (bottom-left), progress indicators (bottom-center), per-slide CTA
 * (bottom-right). Auto-advance pauses when the tab is hidden or the hero is off-screen.
 */

const DURATION = 12000; // ms per slide
const YELLOW = "#FFB400";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 38, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: EASE } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.35 } },
};

/* ── Deep navy TCS-like gradient backdrop ─────────────────────────────── */
function NavyBackdrop() {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #061629 0%, #0b2a52 38%, #0e3a74 62%, #081f3e 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 58%, rgba(40,110,220,0.28), transparent 65%)",
        }}
      />
    </div>
  );
}

/* ── Big yellow brand number + label (TCS "5" element) ────────────────── */
function BigNumber({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="flex items-center gap-4 sm:gap-6">
      <motion.div
        variants={fadeUp}
        className="relative leading-none font-black tracking-tighter"
        style={{ color: YELLOW, fontSize: "clamp(5.5rem, 14vw, 11rem)" }}
      >
        {n}
        {/* small brand triangle marker under the number (TCS style) */}
        <svg
          className="absolute left-1/2 -translate-x-1/2 -bottom-3 sm:-bottom-4 w-4 h-4 sm:w-5 sm:h-5"
          viewBox="0 0 20 20"
          fill={YELLOW}
          aria-hidden="true"
        >
          <path d="M10 18 2 6h16L10 18Z" />
        </svg>
      </motion.div>
      <motion.p
        variants={fadeUp}
        className="text-white text-lg sm:text-2xl lg:text-3xl font-semibold leading-snug max-w-[12rem] sm:max-w-[15rem]"
      >
        {children}
      </motion.p>
    </motion.div>
  );
}

/* ── Slide 1 scene: 3D rotating ring of pillar cards ──────────────────── */
function PillarRing({ pillars }: { pillars: PillarData[] }) {
  const reduce = useReducedMotion();
  const items = pillars.slice(0, 4);
  const count = Math.max(items.length, 1);
  const angle = 360 / count;
  const radius = 190; // px — translateZ; scaled down responsively below

  return (
    <div className="relative h-[300px] sm:h-[360px] flex items-center justify-center [perspective:1300px]">
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4, ease: EASE }}
        className="scale-[0.58] sm:scale-75 lg:scale-90"
      >
        <div
          className="relative [transform-style:preserve-3d]"
          style={{ animation: reduce ? undefined : "hero-ring-spin 26s linear infinite" }}
        >
        {items.map((p, i) => (
          <div
            key={p.id ?? i}
            className="absolute left-1/2 top-1/2 w-[240px] sm:w-[280px] h-[150px] sm:h-[176px] -ml-[120px] sm:-ml-[140px] -mt-[75px] sm:-mt-[88px] rounded-2xl overflow-hidden ring-1 ring-white/25 shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
            style={{
              transform: `rotateY(${i * angle}deg) translateZ(${radius}px)`,
              backfaceVisibility: "hidden",
            }}
          >
            {/* pillar artwork / fallback gradient */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: p.image ? `url(${p.image})` : undefined,
                background:
                  !p.image
                    ? "linear-gradient(140deg,#123163,#081c38)"
                    : undefined,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#04101f]/95 via-[#04101f]/45 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-4">
              <p className="text-white font-bold tracking-[0.18em] text-sm sm:text-base" style={{ color: YELLOW }}>
                {p.title}
              </p>
              <p className="text-white/70 text-[11px] sm:text-xs mt-1 line-clamp-2">{p.desc}</p>
            </div>
          </div>
        ))}
        </div>
      </motion.div>
      {/* soft glow under the ring */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[70%] h-10 rounded-full bg-cyan-400/20 blur-2xl" />
    </div>
  );
}

/* ── Slide 3 scene: perspective grid floor ────────────────────────────── */
function GridFloorCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const horizon = h * 0.34;
      const vpx = w * 0.5;

      // radial glow at the vanishing point
      const glow = ctx.createRadialGradient(vpx, horizon, 0, vpx, horizon, w * 0.5);
      glow.addColorStop(0, "rgba(64,140,255,0.20)");
      glow.addColorStop(1, "rgba(64,140,255,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      // vertical converging lines
      ctx.lineWidth = 1;
      for (let k = -14; k <= 14; k++) {
        const xBottom = vpx + k * (w / 9);
        ctx.strokeStyle = `rgba(96,170,255,${0.16 + 0.1 * (1 - Math.abs(k) / 14)})`;
        ctx.beginPath();
        ctx.moveTo(vpx + k * 6, horizon);
        ctx.lineTo(xBottom, h);
        ctx.stroke();
      }

      // horizontal lines — perspective spacing (t^2), drifting toward viewer
      const speed = 0.07;
      const off = reduce ? 0 : ((t / 1000) * speed) % 1;
      for (let i = 0; i < 16; i++) {
        let tt = i / 16 + off;
        if (tt > 1) tt -= 1;
        const y = horizon + (h - horizon) * tt * tt;
        const a = 0.05 + 0.22 * tt;
        ctx.strokeStyle = `rgba(96,170,255,${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // darken the sky above the horizon
      const sky = ctx.createLinearGradient(0, 0, 0, horizon);
      sky.addColorStop(0, "rgba(4,10,22,0.85)");
      sky.addColorStop(1, "rgba(4,10,22,0)");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, horizon);
    };

    const loop = (t: number) => {
      draw(t);
      if (!reduce) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}

/* ── Slide 3: journey path + numbered pins ────────────────────────────── */
const JOURNEY = [
  { n: 1, title: "Assess & Plan", desc: "Current-state audit and transformation roadmap", x: 12, y: 78 },
  { n: 2, title: "Migrate", desc: "Zero-loss migration to S/4HANA & cloud", x: 38, y: 56 },
  { n: 3, title: "Integrate", desc: "Unified systems, pipelines and workflows", x: 53, y: 47 },
  { n: 4, title: "Analyze", desc: "Dashboards that turn data into insight", x: 79, y: 40 },
  { n: 5, title: "AI-Driven", desc: "Predictive intelligence on trusted data", x: 90, y: 49 },
];

function JourneyScene() {
  const reduce = useReducedMotion();
  return (
    <div className="relative w-full max-w-5xl mx-auto px-4">
      {/* headline */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="flex items-center justify-center gap-3 sm:gap-5 mb-2 sm:mb-4"
      >
        <motion.span
          variants={fadeUp}
          className="font-black leading-none tracking-tighter"
          style={{ color: YELLOW, fontSize: "clamp(3rem, 8vw, 6rem)" }}
        >
          5
        </motion.span>
        <motion.p variants={fadeUp} className="text-white font-semibold text-lg sm:text-2xl max-w-[16rem]">
          Stage Data Transformation Journey
        </motion.p>
      </motion.div>

      <div className="relative h-[300px] sm:h-[380px]">
        <svg viewBox="0 0 1000 400" className="absolute inset-0 w-full h-full" fill="none" preserveAspectRatio="none">
          <motion.path
            d="M 20 340 C 180 320 220 230 380 225 C 520 220 540 160 700 155 C 820 152 880 185 975 205"
            stroke="rgba(120,190,255,0.9)"
            strokeWidth={3}
            strokeLinecap="round"
            initial={{ pathLength: reduce ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.8, ease: "easeInOut", delay: 0.5 }}
          />
        </svg>

        {/* pins — circle sits exactly on the path point, label floats above */}
        {JOURNEY.map((p, i) => (
          <motion.div
            key={p.n}
            className="absolute"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            initial={reduce ? false : { opacity: 0, scale: 0.4, y: 26 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1.1 + i * 0.85, duration: 0.55, ease: EASE }}
          >
            <div className="-translate-x-1/2 -translate-y-1/2 relative">
              <div
                className="w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-bold text-[#04101f] shadow-[0_0_24px_rgba(255,180,0,0.5)] ring-2 ring-white/40"
                style={{ backgroundColor: YELLOW, fontSize: "0.8rem" }}
              >
                {p.n}
              </div>
              <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 flex flex-col items-center w-28 sm:w-40">
                <p className="text-white font-semibold text-[11px] sm:text-sm text-center leading-tight">{p.title}</p>
                <p className="hidden sm:block text-white/60 text-[10px] text-center mt-1 leading-snug">{p.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}

        {/* endpoint brand text (TCS "Human + AI" moment) */}
        <motion.p
          initial={reduce ? false : { opacity: 0, filter: "blur(6px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 5.6, duration: 1 }}
          className="absolute right-[2%] top-[16%] text-white text-xl sm:text-3xl font-bold tracking-wide"
        >
          Data <span style={{ color: YELLOW }}>+</span> AI
        </motion.p>
      </div>
    </div>
  );
}

/* ── Slide 4: translucent 3D stack building bottom-up ─────────────────── */
const STACK = [
  { title: "Infrastructure & Cloud", desc: "Resilient, scalable foundations" },
  { title: "Data Platforms", desc: "Databases, lakes and warehouses" },
  { title: "Integration & Migration", desc: "Zero-loss pipelines and ETL" },
  { title: "Analytics & BI", desc: "Reports and dashboards that decide" },
  { title: "AI Intelligence", desc: "Models that predict and act" },
];

function StackScene() {
  const reduce = useReducedMotion();
  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center">
      <div className="flex justify-center lg:justify-start">
        <BigNumber n="5">Layer Enterprise Data Stack</BigNumber>
      </div>

      <div className="relative h-[300px] sm:h-[380px] flex items-center justify-center [perspective:1200px]">
        <div className="relative [transform-style:preserve-3d] scale-[0.6] sm:scale-75 lg:scale-100">
          {STACK.map((layer, i) => (
            <motion.div
              key={layer.title}
              initial={reduce ? false : { opacity: 0, y: 90 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + (STACK.length - 1 - i) * 0.5, duration: 0.8, ease: EASE }}
              className="absolute left-1/2 top-1/2 w-[300px] h-[300px] -ml-[150px] -mt-[150px]"
            >
              {/* static isometric transform lives on a child (framer animates the parent) */}
              <div
                className="absolute inset-0"
                style={{
                  transform: `translateY(${(STACK.length - 1 - i) * -46}px) rotateX(58deg) rotateZ(-45deg)`,
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className="absolute inset-0 rounded-3xl border border-cyan-300/40"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(56,140,255,0.28), rgba(20,60,130,0.18))",
                    boxShadow:
                      "0 0 30px rgba(70,160,255,0.25), inset 0 0 24px rgba(120,200,255,0.18)",
                    backdropFilter: "blur(2px)",
                  }}
                />
                <div className="absolute left-full ml-6 top-1/2 -translate-y-1/2 whitespace-nowrap" style={{ transform: "rotateZ(45deg)" }}>
                  <p className="text-white font-semibold text-sm sm:text-base">{layer.title}</p>
                  <p className="hidden sm:block text-white/55 text-xs mt-0.5">{layer.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Per-slide bottom-right CTA ───────────────────────────────────────── */
const SLIDE_CTAS = [
  { label: "Explore Pillars", href: "#pillars" },
  { label: "Explore Services", href: "#services" },
  { label: "Our Approach", href: "#about" },
  { label: "Our Services", href: "#services" },
];

const SLIDE_COUNT = 4;

export function HeroSlider({
  siteConfig,
  pillars,
}: {
  siteConfig: SiteConfigData;
  pillars: PillarData[];
}) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [paused, setPaused] = useState(false);
  const inViewRef = useRef(true);
  const touchX = useRef<number | null>(null);

  const goTo = useCallback((i: number) => {
    setIndex(((i % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT);
    setElapsed(0);
  }, []);

  /* auto-advance ticker — freezes when paused / tab hidden / off-screen */
  useEffect(() => {
    const id = setInterval(() => {
      if (reduce || paused || document.hidden || !inViewRef.current) return;
      setElapsed((e) => {
        if (e + 100 >= DURATION) {
          setIndex((i) => (i + 1) % SLIDE_COUNT);
          return 0;
        }
        return e + 100;
      });
    }, 100);
    return () => clearInterval(id);
  }, [paused, reduce]);

  /* pause auto-advance while hero is scrolled out of view */
  useEffect(() => {
    const section = document.getElementById("home");
    if (!section) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
      },
      { threshold: 0.25 }
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  const progress = Math.min(100, (elapsed / DURATION) * 100);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 60) goTo(index + (dx < 0 ? 1 : -1));
    touchX.current = null;
  };

  return (
    <section
      id="home"
      className="relative h-screen min-h-[640px] overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* always-mounted SEO headline (visible one lives on slide 2) */}
      <h1 className="sr-only">
        {siteConfig.heroTitle} {siteConfig.heroHighlight} — {siteConfig.companyName}
      </h1>

      <AnimatePresence mode="sync">
        {/* ════ SLIDE 1 — 4 Pillars of Digital Transformation ════ */}
        {index === 0 && (
          <motion.div
            key="s-pillars"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.85, ease: EASE }}
          >
            <NavyBackdrop />
            <AnimatedBackground className="absolute inset-0 h-full w-full mix-blend-screen" />
            <div className="relative z-10 h-full max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-6 items-center pt-20 pb-28">
              <div>
                <BigNumber n="4">Pillars of Digital Transformation</BigNumber>
                <motion.p
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  className="text-white/60 text-sm sm:text-base mt-6 max-w-md"
                >
                  {siteConfig.companyName} builds every engagement on four unshakeable
                  foundations — from zero-loss migration to enterprise-grade scale.
                </motion.p>
              </div>
              <PillarRing pillars={pillars} />
            </div>
          </motion.div>
        )}

        {/* ════ SLIDE 2 — company hero (headline, CTAs, stats) ════ */}
        {index === 1 && (
          <motion.div
            key="s-hero"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.85, ease: EASE }}
          >
            {/* city/network brand image + subtle waves, TCS-like */}
            <div className="absolute inset-0">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${siteConfig.heroBackground})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/85 via-gray-900/65 to-cyan-900/55" />
              <AnimatedBackground className="absolute inset-0 h-full w-full mix-blend-screen opacity-70" />
            </div>

            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center pb-24"
            >
              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              >
                {siteConfig.heroTitle}
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                  {siteConfig.heroHighlight}
                </span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10"
              >
                {siteConfig.heroSubtitle}
              </motion.p>
              <motion.div variants={fadeUp} className="flex gap-4 justify-center">
                <a href="#services">
                  <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-white rounded-full px-8 text-base">
                    Explore Services
                    <ArrowRight className="ml-2" size={18} />
                  </Button>
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur px-8 py-3 text-base font-medium text-white hover:bg-white/20 transition-colors"
                >
                  Get in Touch
                </a>
              </motion.div>
              <motion.div variants={fadeUp} className="mt-14 grid grid-cols-3 gap-8 max-w-lg mx-auto">
                {[
                  { value: siteConfig.stat1Value, label: siteConfig.stat1Label },
                  { value: siteConfig.stat2Value, label: siteConfig.stat2Label },
                  { value: siteConfig.stat3Value, label: siteConfig.stat3Label },
                ]
                  .filter((s) => s.label)
                  .map((stat) => (
                    <div key={stat.label}>
                      <div className="text-2xl sm:text-3xl font-bold text-cyan-400">{stat.value}</div>
                      <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                    </div>
                  ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* ════ SLIDE 3 — 5-Stage Data Transformation Journey ════ */}
        {index === 2 && (
          <motion.div
            key="s-journey"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.85, ease: EASE }}
          >
            <NavyBackdrop />
            <GridFloorCanvas className="absolute inset-0 h-full w-full" />
            <div className="relative z-10 h-full flex flex-col items-center justify-center pb-24">
              <JourneyScene />
            </div>
          </motion.div>
        )}

        {/* ════ SLIDE 4 — 5-Layer Enterprise Data Stack ════ */}
        {index === 3 && (
          <motion.div
            key="s-stack"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.85, ease: EASE }}
          >
            <NavyBackdrop />
            <AnimatedBackground className="absolute inset-0 h-full w-full mix-blend-screen" />
            <div className="relative z-10 h-full flex items-center justify-center pb-24">
              <StackScene />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════ slider chrome ════ */}
      {/* pause / play */}
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? "Play slides" : "Pause slides"}
        className="absolute bottom-6 left-5 sm:left-8 z-30 w-10 h-10 rounded-full border border-white/25 bg-white/10 backdrop-blur flex items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        {paused ? <Play size={16} /> : <Pause size={16} />}
      </button>

      {/* progress indicators */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
        {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className="relative h-1 w-9 sm:w-12 rounded-full bg-white/25 overflow-hidden"
          >
            {i === index && (
              <div
                className="absolute inset-y-0 left-0 bg-white rounded-full"
                style={{ width: `${progress}%`, transition: "width 100ms linear" }}
              />
            )}
          </button>
        ))}
      </div>

      {/* per-slide CTA (hidden on small screens) */}
      <a
        href={SLIDE_CTAS[index].href}
        className="absolute bottom-5 right-5 sm:right-8 z-30 hidden sm:inline-flex items-center gap-2 bg-[#1467d2] hover:bg-[#0f57b6] text-white text-sm font-medium rounded-full px-6 py-2.5 shadow-lg transition-colors"
      >
        {SLIDE_CTAS[index].label}
        <ArrowRight size={15} />
      </a>
    </section>
  );
}
