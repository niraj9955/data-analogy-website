"use client";

import { Mail, Phone, MapPin as LocationIcon } from "lucide-react";
import type { SiteConfigData, NavLinkData, ServiceData } from "@/lib/types";

export function Footer({
  siteConfig,
  navLinks,
  services,
}: {
  siteConfig: SiteConfigData;
  navLinks: NavLinkData[];
  services: ServiceData[];
}) {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-white text-xl font-bold mb-3">
              {siteConfig.companyName}
            </h3>
            <p className="text-sm leading-relaxed">
              {siteConfig.footerTagline}
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="hover:text-cyan-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Services</h4>
            <ul className="space-y-2 text-sm">
              {services.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <a
                    href="#services"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={14} />
                <span>{siteConfig.email}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} />
                <span>{siteConfig.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <LocationIcon size={14} />
                <span>{siteConfig.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.companyName}. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
