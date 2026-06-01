"use client";

import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getIcon, type LucideIcon } from "@/lib/icons";
import type { IndustryData } from "@/lib/types";

export function IndustriesSection({ industries }: { industries: IndustryData[] }) {
  const [active, setActive] = useState(0);

  const prev = useCallback(
    () => setActive((i) => (i - 1 + industries.length) % industries.length),
    [industries.length]
  );
  const next = useCallback(
    () => setActive((i) => (i + 1) % industries.length),
    [industries.length]
  );

  const getOffset = (offset: number) =>
    industries[(active + offset + industries.length) % industries.length];

  return (
    <section id="industries" className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-cyan-200 text-cyan-700"
          >
            Industries
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Industries We Serve
          </h2>
        </div>

        {/* Desktop Carousel */}
        <div className="hidden lg:flex items-center justify-center gap-4">
          <button
            onClick={prev}
            className="shrink-0 w-12 h-12 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center shadow-sm transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft size={24} className="text-gray-600" />
          </button>

          <div className="flex items-center justify-center gap-4 flex-1">
            {[-2, -1, 0, 1, 2].map((offset) => {
              const item = getOffset(offset);
              const isMain = offset === 0;
              const isSide = Math.abs(offset) === 1;
              const Icon: LucideIcon = getIcon(item.icon);
              return (
                <div
                  key={`${item.id}-${offset}`}
                  className={`relative rounded-3xl overflow-hidden transition-all duration-500 cursor-pointer ${
                    isMain
                      ? "w-64 h-80 scale-100 shadow-xl z-10"
                      : isSide
                      ? "w-52 h-64 opacity-75 scale-95"
                      : "w-44 h-52 opacity-50 scale-90"
                  }`}
                  style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() =>
                    setActive((active + offset + industries.length) % industries.length)
                  }
                >
                  <div className="absolute inset-0 bg-black/50" />
                  <div className="relative h-full flex flex-col items-center justify-center p-4 text-center">
                    <Icon
                      className="text-white drop-shadow-lg mb-2"
                      size={isMain ? 48 : 36}
                    />
                    <h3
                      className={`font-bold text-white drop-shadow-lg mb-1 ${
                        isMain ? "text-xl" : "text-base"
                      }`}
                    >
                      {item.name}
                    </h3>
                    {isMain && (
                      <p className="text-white/90 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={next}
            className="shrink-0 w-12 h-12 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center shadow-sm transition-colors"
            aria-label="Next"
          >
            <ChevronRight size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Mobile: Scrollable Grid */}
        <div
          className="lg:hidden grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-96 overflow-y-auto pr-2"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#cbd5e1 transparent",
          }}
        >
          {industries.map((item) => {
            const Icon: LucideIcon = getIcon(item.icon);
            return (
              <div
                key={item.id}
                className="relative rounded-2xl overflow-hidden h-40 sm:h-48"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="absolute inset-0 bg-black/55" />
                <div className="relative h-full flex flex-col items-center justify-center p-3 text-center">
                  <Icon className="text-white drop-shadow mb-2" size={32} />
                  <h3 className="font-bold text-white text-sm drop-shadow">
                    {item.name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
