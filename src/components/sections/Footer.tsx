"use client";

import { Mail, MapPin as LocationIcon, Facebook, Youtube, Twitter, Instagram, Linkedin } from "lucide-react";
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
  const policyLinks = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Disclaimer", href: "/terms-of-service#disclaimer" },
  ];

  const socials = [
    { icon: Facebook, label: "Facebook", href: "#" },
    { icon: Youtube, label: "YouTube", href: "#" },
    { icon: Twitter, label: "X (Twitter)", href: "#" },
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
  ];

  return (
    <footer className="bg-gray-950 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-display text-white text-xl font-bold mb-3">
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
                <LocationIcon size={14} />
                <span>{siteConfig.address}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* TCS-style bottom bar */}
      <div className="border-t border-gray-800 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col lg:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <span className="font-display text-white font-bold text-lg tracking-tight">
              {siteConfig.companyName}
            </span>
            <span className="text-sm text-gray-500">
              &copy;{new Date().getFullYear()} {siteConfig.companyName}. All rights reserved.
            </span>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            {policyLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-gray-500 hover:text-cyan-400 transition-colors"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
