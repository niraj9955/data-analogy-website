"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { Settings } from "lucide-react";
import type { InitData } from "@/lib/types";
import { LoadingScreen } from "@/components/sections/LoadingScreen";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { ServicesSection } from "@/components/sections/Services";
import { PillarsSection } from "@/components/sections/Pillars";
import { IndustriesSection } from "@/components/sections/Industries";
import { BlogSection } from "@/components/sections/BlogSection";
import { WhyUs } from "@/components/sections/WhyUs";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";

// Lazy load AdminPanel - it's 990 lines and only needed when admin opens
const AdminPanel = dynamic(
  () => import("@/components/sections/AdminPanel").then((mod) => mod.AdminPanel),
  { ssr: false }
);

export default function HomePage() {
  const [data, setData] = useState<InitData | null>(null);
  const [loading, setLoading] = useState(true);
  const [adminOpen, setAdminOpen] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/init");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Keyboard shortcut: Ctrl+Shift+A to toggle admin
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "A") {
        e.preventDefault();
        setAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Failed to load site data.</p>
      </div>
    );
  }

  const { siteConfig, services, pillars, industries, blogs, navLinks } = data;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar navLinks={navLinks} companyName={siteConfig.companyName} />
      <main className="flex-1">
        <Hero siteConfig={siteConfig} />
        <About siteConfig={siteConfig} />
        <ServicesSection services={services} />
        <PillarsSection pillars={pillars} />
        <IndustriesSection industries={industries} />
        <BlogSection blogs={blogs} />
        <WhyUs siteConfig={siteConfig} />
        <ContactSection siteConfig={siteConfig} />
      </main>
      <Footer
        siteConfig={siteConfig}
        navLinks={navLinks}
        services={services}
      />

      {/* Admin Toggle Button */}
      <button
        onClick={() => setAdminOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gray-900 hover:bg-gray-800 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
        aria-label="Open Admin Panel"
      >
        <Settings size={24} />
      </button>

      {/* Admin Panel - lazy loaded */}
      {adminOpen && (
        <AdminPanel
          open={adminOpen}
          onClose={() => setAdminOpen(false)}
          data={data}
          onRefresh={fetchData}
        />
      )}
    </div>
  );
}
