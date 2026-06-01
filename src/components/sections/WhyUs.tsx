"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getIcon, type LucideIcon } from "@/lib/icons";
import type { SiteConfigData } from "@/lib/types";

export function WhyUs({ siteConfig }: { siteConfig: SiteConfigData }) {
  const reasons = [
    {
      title: "Enterprise-Grade Solutions",
      desc: "Built for scale, reliability, and performance from the ground up.",
      icon: "Layers" as const,
    },
    {
      title: "Secure & Scalable Architecture",
      desc: "Security baked in from day one. Architecture that grows with you.",
      icon: "ShieldCheck" as const,
    },
    {
      title: "Data-First Engineering",
      desc: "We put data at the core of every decision and every line of code.",
      icon: "Database" as const,
    },
    {
      title: "Proven Track Record",
      desc: "50+ projects delivered with 99.9% data accuracy across industries.",
      icon: "Target" as const,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
            Why Choose Us
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {siteConfig.whyUsTitle}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            {siteConfig.whyUsSubtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason) => {
            const Icon: LucideIcon = getIcon(reason.icon);
            return (
              <div
                key={reason.title}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors duration-300"
              >
                <Icon className="text-cyan-400 mb-4" size={36} />
                <h3 className="font-bold text-lg mb-2">{reason.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {reason.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-20 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            {siteConfig.ctaTitle}
          </h3>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            {siteConfig.ctaSubtitle}
          </p>
          <a href="#contact">
            <Button
              size="lg"
              className="bg-cyan-600 hover:bg-cyan-700 text-white rounded-full px-8 text-base"
            >
              {siteConfig.ctaButtonText}
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
