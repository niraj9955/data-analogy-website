"use client";

import { useState, useEffect, useCallback } from "react";
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

export default function HomePage() {
  const [data, setData] = useState<InitData | null>(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => { fetchData(); }, [fetchData]);

  if (loading) return <LoadingScreen />;
  if (!data) return <div className="min-h-screen flex items-center justify-center"><p className="text-gray-500 text-lg">Failed to load site data.</p></div>;

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
      <Footer siteConfig={siteConfig} />
    </div>
  );
}
