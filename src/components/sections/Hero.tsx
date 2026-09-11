"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SiteConfigData } from "@/lib/types";
import { AnimatedBackground } from "@/components/sections/AnimatedBackground";

/** Staggered entrance for hero content — plays once on load (TCS-style) */
const heroItem = {
  hidden: { opacity: 0, y: 42, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero({ siteConfig }: { siteConfig: SiteConfigData }) {
  const bgRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const reduce = useReducedMotion();

  /**
   * JS parallax — keeps the hero background glued to the viewport while the
   * user scrolls (TCS.com behaviour). Works on ALL browsers including iOS
   * Safari, where CSS background-attachment: fixed is unsupported.
   *
   * The wrapper is taller than the section (-20% / 140%) so translating it
   * down by `scrollY` never exposes gaps; the section's overflow-hidden
   * clips it, so content appears to slide OVER a fixed background.
   */
  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const apply = () => {
      rafRef.current = null;
      const y = window.scrollY;
      // only needed while the hero is anywhere near the viewport
      if (y <= window.innerHeight * 1.25) {
        el.style.transform = `translate3d(0, ${y}px, 0)`;
      }
    };

    const onScroll = () => {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(apply);
      }
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax background stack — JS keeps this pinned to the viewport */}
      <div
        ref={bgRef}
        className="absolute left-0 right-0 -top-[20%] h-[140%] will-change-transform"
      >
        {/* base brand image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${siteConfig.heroBackground})` }}
        />
        {/* TCS-style flowing wave animation */}
        <AnimatedBackground className="absolute inset-0 h-full w-full mix-blend-screen" />
        {/* readability overlay (moves with the stack => stays 'fixed' too) */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-900/60 to-cyan-900/50" />
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        initial={reduce ? false : "hidden"}
        animate={reduce ? undefined : "show"}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } } }}
      >
        <motion.h1
          variants={heroItem}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
        >
          {siteConfig.heroTitle}
          <br />
          <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
            {siteConfig.heroHighlight}
          </span>
        </motion.h1>
        <motion.p
          variants={heroItem}
          className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10"
        >
          {siteConfig.heroSubtitle}
        </motion.p>
        <motion.div variants={heroItem} className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#services">
            <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-white rounded-full px-8 text-base">
              Explore Services
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </a>
          <a href="#contact">

          </a>
        </motion.div>

        <motion.div
          variants={heroItem}
          className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
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

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-3 bg-white/60 rounded-full" />
        </div>
      </div>
    </section>
  );
}
