"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { Settings, Lock, Eye, EyeOff } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AdminPanel = dynamic(
  () => import("@/components/sections/AdminPanel").then((mod) => mod.AdminPanel),
  { ssr: false }
);

const ADMIN_PASSWORD = "dataanalogy@2026";

export default function HomePage() {
  const [data, setData] = useState<InitData | null>(null);
  const [loading, setLoading] = useState(true);
  const [adminOpen, setAdminOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth");
    if (auth === "true") setIsAuthenticated(true);
  }, []);

  const handleAdminClick = () => {
    if (isAuthenticated) { setAdminOpen(true); }
    else { setShowLogin(true); setPassword(""); setLoginError(false); }
  };

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
      setShowLogin(false); setAdminOpen(true); setPassword(""); setLoginError(false);
    } else { setLoginError(true); }
  };

  const handleLogout = () => {
    setIsAuthenticated(false); sessionStorage.removeItem("admin_auth"); setAdminOpen(false);
  };

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
      <Footer siteConfig={siteConfig} navLinks={navLinks} services={services} />

      <button onClick={handleAdminClick} className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gray-900 hover:bg-gray-800 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110" aria-label="Admin">
        {isAuthenticated ? <Settings size={24} /> : <Lock size={24} />}
      </button>

      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm mx-4">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center"><Lock size={32} className="text-cyan-600" /></div>
            </div>
            <h2 className="text-xl font-bold text-center text-gray-900 mb-2">Admin Access</h2>
            <p className="text-sm text-gray-500 text-center mb-6">Enter password to access admin panel</p>
            <div className="space-y-4">
              <div className="relative">
                <Input type={showPassword ? "text" : "password"} placeholder="Enter admin password" value={password} onChange={(e) => { setPassword(e.target.value); setLoginError(false); }} onKeyDown={(e) => e.key === "Enter" && handleLogin()} className={loginError ? "border-red-500" : ""} autoFocus />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
              </div>
              {loginError && <p className="text-sm text-red-500 text-center">Wrong password.</p>}
              <Button onClick={handleLogin} className="w-full bg-cyan-600 hover:bg-cyan-700 text-white">Unlock Admin Panel</Button>
              <Button variant="outline" onClick={() => setShowLogin(false)} className="w-full">Cancel</Button>
            </div>
          </div>
        </div>
      )}

      {adminOpen && isAuthenticated && (
        <AdminPanel open={adminOpen} onClose={() => setAdminOpen(false)} data={data} onRefresh={fetchData} onLogout={handleLogout} />
      )}
    </div>
  );
}
