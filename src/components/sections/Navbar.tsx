"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { NavLinkData } from "@/lib/types";

/**
 * Fixed navbar with an always-on solid dark navy background.
 * The hero slider (and the rest of the page) scrolls beneath it,
 * but slide content is padded to start below the bar — no overlap.
 */
export function Navbar({
  navLinks,
  companyName,
}: {
  navLinks: NavLinkData[];
  companyName: string;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#071629]/95 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#home" className="flex items-center gap-2">
            <div className="font-display text-xl lg:text-2xl font-bold tracking-tight text-white">
              {companyName}
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="text-sm font-medium text-white/90 hover:text-white transition-colors duration-300 hover:opacity-80"
              >
                {link.label}
              </a>
            ))}
            <a href="#contact">
              <Button
                size="sm"
                className="bg-cyan-600 hover:bg-cyan-700 text-white rounded-full px-6"
              >
                Get in Touch
              </Button>
            </a>
          </div>

          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-[#071629]/98 backdrop-blur-md shadow-xl border-t border-white/10">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-white/90 hover:text-white font-medium py-2"
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setMobileOpen(false)}>
              <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white rounded-full mt-2">
                Get in Touch
              </Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
