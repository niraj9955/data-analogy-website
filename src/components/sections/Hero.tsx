"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { SiteConfigData } from "@/lib/types";

export function Hero({ siteConfig }: { siteConfig: SiteConfigData }) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${siteConfig.heroBackground})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-900/60 to-cyan-900/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
       
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
          {siteConfig.heroTitle}
          <br />
          <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
            {siteConfig.heroHighlight}
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
          {siteConfig.heroSubtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#services">
            <Button
              size="lg"
              className="bg-cyan-600 hover:bg-cyan-700 text-white rounded-full px-8 text-base"
            >
              Explore Services
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </a>
          <a href="#contact">
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 text-base"
            >
              Talk to Our Experts
            </Button>
          </a>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { value: siteConfig.stat1Value, label: siteConfig.stat1Label },
            { value: siteConfig.stat2Value, label: siteConfig.stat2Label },
            { value: siteConfig.stat3Value, label: siteConfig.stat3Label },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl sm:text-3xl font-bold text-cyan-400">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-3 bg-white/60 rounded-full" />
        </div>
      </div>
    </section>
  );
}
