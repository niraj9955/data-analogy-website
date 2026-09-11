"use client";

import { useEffect, useRef } from "react";

/**
 * TCS-style flowing wave background.
 * Layered sine "ribbons" (cyan / teal / white + one amber accent) drawn on canvas,
 * blended with mix-blend-screen over the hero imagery.
 * - DPR-aware, pauses when off-screen or tab hidden
 * - Respects prefers-reduced-motion (renders a single static frame)
 */
export function AnimatedBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let inView = true;
    let pageVisible = !document.hidden;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

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

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView && pageVisible) start();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const onVis = () => {
      pageVisible = !document.hidden;
      if (pageVisible && inView) start();
    };
    document.addEventListener("visibilitychange", onVis);

    // ── Ribbon configuration (TCS-like: stacked translucent flowing lines) ──
    interface Ribbon {
      baseY: number;   // 0..1 of height
      amp: number;     // px amplitude
      waves: number;   // horizontal wave count
      speed: number;   // phase speed
      lines: number;   // lines per ribbon
      spread: number;  // vertical fan between lines
      color: string;   // "r,g,b"
      alpha: number;   // base alpha
      width: number;   // stroke width
    }

    const ribbons: Ribbon[] = [
      // big cyan ribbon — upper area, sweeps across like TCS
      { baseY: 0.62, amp: h * 0.10 || 60, waves: 1.6, speed: 0.32, lines: 26, spread: 4.4, color: "56,189,248", alpha: 0.45, width: 1 },
      // teal ribbon — lower area, slower
      { baseY: 0.80, amp: h * 0.08 || 48, waves: 1.15, speed: 0.22, lines: 20, spread: 3.8, color: "45,212,191", alpha: 0.36, width: 1 },
      // white shimmer ribbon — thin, fast, high
      { baseY: 0.40, amp: h * 0.07 || 42, waves: 2.1, speed: 0.45, lines: 12, spread: 2.8, color: "255,255,255", alpha: 0.20, width: 0.8 },
      // amber accent line — single TCS orange thread riding the main ribbon
      { baseY: 0.60, amp: h * 0.10 || 60, waves: 1.6, speed: 0.32, lines: 1, spread: 0, color: "251,146,60", alpha: 0.72, width: 1.8 },
    ];

    let baseYsCached: Ribbon[] | null = null;
    const buildRibbons = () => {
      // recompute height-relative values on resize
      ribbons[0].baseY = 0.62; ribbons[0].amp = Math.max(34, h * 0.10);
      ribbons[1].baseY = 0.80; ribbons[1].amp = Math.max(28, h * 0.08);
      ribbons[2].baseY = 0.38; ribbons[2].amp = Math.max(24, h * 0.07);
      ribbons[3].baseY = 0.60; ribbons[3].amp = Math.max(34, h * 0.10);
      baseYsCached = null;
    };
    buildRibbons();

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const time = t / 1000;

      for (const r of ribbons) {
        ctx.lineWidth = r.width;
        for (let i = 0; i < r.lines; i++) {
          const k = i / Math.max(1, r.lines - 1);
          const phase = time * r.speed + i * 0.16;
          const amp = r.amp * (0.82 + 0.36 * k);
          const yOff = i * r.spread;
          // fade the ribbon edges in/out along its own length
          const alpha = r.alpha * (0.55 + 0.45 * Math.sin(Math.PI * k));

          ctx.strokeStyle = `rgba(${r.color},${alpha.toFixed(3)})`;
          ctx.beginPath();
          const step = Math.max(6, w / 110);
          for (let x = -20; x <= w + 20; x += step) {
            const nx = x / Math.max(1, w);
            const wave =
              Math.sin(nx * Math.PI * 2 * r.waves + phase) * amp +
              Math.sin(nx * Math.PI * 2 * r.waves * 2.7 + phase * 1.6) * amp * 0.22 +
              Math.sin(nx * Math.PI * 2 * r.waves * 0.4 - phase * 0.7) * amp * 0.35;
            const y = r.baseY * h + yOff + wave;
            if (x <= -20) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      }
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const loop = (t: number) => {
      raf = 0;
      if (!inView || !pageVisible) return;
      draw(t);
      raf = requestAnimationFrame(loop);
    };

    function start() {
      if (raf) return;
      if (reduced) { draw(1200); return; } // static single frame
      raf = requestAnimationFrame(loop);
    }

    // initial paint
    draw(0);
    if (!reduced) start();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
