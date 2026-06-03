"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getIcon, type LucideIcon } from "@/lib/icons";
import type { ServiceData } from "@/lib/types";

export function ServicesSection({ services }: { services: ServiceData[] }) {
  return (
    <section id="services" className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-cyan-200 text-cyan-700"
          >
            What We Offer
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            End-to-end technology solutions tailored to scale your enterprise.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon: LucideIcon = getIcon(service.icon);
            return (
              <Card
  key={service.id}
 className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gray-50 border-gray-200"
>
              <CardHeader className="pb-3">
  <div className="flex items-center gap-3">
    <div
      className={`w-12 h-12 shrink-0 rounded-xl ${service.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
    >
      <Icon className={service.color} size={24} />
    </div>
    <CardTitle className="text-lg font-bold text-gray-900">
      {service.title}
    </CardTitle>
  </div>
</CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{service.desc}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
