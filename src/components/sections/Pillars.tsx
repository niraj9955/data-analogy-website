"use client";

import { Badge } from "@/components/ui/badge";
import { getIcon, type LucideIcon } from "@/lib/icons";
import type { PillarData } from "@/lib/types";

export function PillarsSection({ pillars }: { pillars: PillarData[] }) {
  return (
    <section id="pillars" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-cyan-200 text-cyan-700"
          >
            Our Foundation
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our {pillars.length} Pillars of Engineering
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const Icon: LucideIcon = getIcon(pillar.icon);
            return (
              <div
                key={pillar.id}
                className="group relative rounded-3xl overflow-hidden h-80 sm:h-96 cursor-pointer"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${pillar.image})` }}
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${pillar.gradient} opacity-80 group-hover:opacity-90 transition-opacity duration-300`}
                />
                <div className="relative h-full flex flex-col justify-between p-6">
                  <div>
                    <Icon className="text-white drop-shadow-lg mb-3" size={48} />
                    <h3 className="text-3xl font-bold text-white drop-shadow-lg">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-white/95 text-sm leading-relaxed drop-shadow">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
