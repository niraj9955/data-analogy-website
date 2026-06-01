"use client";

import { CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { SiteConfigData } from "@/lib/types";

export function About({ siteConfig }: { siteConfig: SiteConfigData }) {
  const whatWeDoItems = siteConfig.whatWeDoItems
    ? siteConfig.whatWeDoItems.split("|")
    : [];

  return (
    <section id="about" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <Badge
              variant="outline"
              className="mb-4 border-cyan-200 text-cyan-700"
            >
              About Us
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              {siteConfig.aboutTitle}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {siteConfig.aboutText1}
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mt-4">
              {siteConfig.aboutText2}
            </p>
          </div>

          <div>
            <Badge
              variant="outline"
              className="mb-4 border-cyan-200 text-cyan-700"
            >
              Our Expertise
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              {siteConfig.whatWeDoTitle}
            </h2>
            <ul className="space-y-4">
              {whatWeDoItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="text-cyan-600 mt-1 shrink-0" size={20} />
                  <span className="text-gray-600 text-lg">{item.trim()}</span>
                </li>
              ))}
            </ul>
            <p className="text-lg text-gray-600 mt-6 font-medium">
              {siteConfig.whatWeDoClosing}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
