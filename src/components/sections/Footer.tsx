"use client";

import Image from "next/image";
import { Facebook, Youtube, Twitter, Instagram, Linkedin } from "lucide-react";
import type { SiteConfigData } from "@/lib/types";

export function Footer({ siteConfig }: { siteConfig: SiteConfigData }) {
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
    <footer className="bg-black text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        {/* Top row — brand (logo + name + tagline) and socials */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-10 border-b border-gray-800/80">
          <div className="flex items-center gap-4">
            <span className="bg-white rounded-xl p-1.5 shrink-0 shadow-lg shadow-black/40 ring-1 ring-white/10">
              <Image
                src="/data-analogy-logo.png"
                alt="Data Analogy logo"
                width={44}
                height={44}
                className="h-11 w-11 object-contain"
              />
            </span>
            <span className="flex flex-col items-start">
              <span className="font-display text-white font-bold text-2xl tracking-tight leading-none">
                {siteConfig.companyName}
              </span>
              <span className="text-xs sm:text-sm text-gray-500 mt-2 max-w-md leading-relaxed">
                {siteConfig.footerTagline}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="h-10 w-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-500 hover:text-cyan-400 hover:border-cyan-400/60 hover:bg-cyan-400/5 transition-all duration-300"
              >
                <social.icon size={17} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom row — copyright + policy links */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-5">
          <p className="text-sm text-gray-500 order-2 lg:order-1">
            &copy;{new Date().getFullYear()} {siteConfig.companyName}. All rights reserved.
          </p>

          <nav className="flex flex-wrap justify-center gap-x-7 gap-y-2 text-sm order-1 lg:order-2">
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
        </div>
      </div>
    </footer>
  );
}
