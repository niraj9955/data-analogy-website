"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { InitData } from "@/lib/types";

const AdminPanel = dynamic(
  () => import("@/components/sections/AdminPanel").then((mod) => mod.AdminPanel),
  { ssr: false }
);

const ADMIN_PASSWORD = "dataanalogy@2026";

export function AdminLogin() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [data, setData] = useState<InitData | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/init");
      if (res.ok) setData(await res.json());
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("admin_auth") === "true") setAuthed(true);
    fetchData();
  }, [fetchData]);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_auth", "true");
      setAuthed(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setAuthed(false);
    setPassword("");
    router.push("/");
  };

  /* Authenticated — full admin panel */
  if (authed) {
    if (loadingData || !data) {
      return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center">
          <Loader2 className="animate-spin text-cyan-400" size={36} />
        </div>
      );
    }
    return (
      <div className="min-h-screen bg-gray-950">
        <header className="bg-black border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <span className="bg-white rounded-lg p-1">
                <Image src="/data-analogy-logo.png" alt="Data Analogy" width={28} height={28} className="h-7 w-7 object-contain" />
              </span>
              <span className="font-display text-white font-bold tracking-tight">Admin Panel</span>
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
                View Site
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout} className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800">
                Logout
              </Button>
            </div>
          </div>
        </header>
        <AdminPanel open onClose={handleLogout} data={data} onRefresh={fetchData} />
      </div>
    );
  }

  /* Login card */
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-cyan-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex items-center justify-center mb-6">
            <span className="bg-gray-950 rounded-xl p-2.5 shadow-lg">
              <Image src="/data-analogy-logo.png" alt="Data Analogy" width={44} height={44} className="h-11 w-11 object-contain" />
            </span>
          </div>
          <h1 className="text-xl font-bold text-center text-gray-900 mb-1">Admin Access</h1>
          <p className="text-sm text-gray-500 text-center mb-6">
            Enter the admin password to manage site content
          </p>
          <div className="space-y-4">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setLoginError(false); }}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className={loginError ? "border-red-500 pr-10" : "pr-10"}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {loginError && (
              <p className="text-sm text-red-500 text-center">Wrong password. Try again.</p>
            )}
            <Button
              onClick={handleLogin}
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
            >
              Unlock Admin Panel
            </Button>
            <Link
              href="/"
              className="block text-center text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              &larr; Back to website
            </Link>
          </div>
        </div>
        <p className="text-center text-xs text-gray-600 mt-4">
          Restricted area &mdash; authorized personnel only
        </p>
      </div>
    </div>
  );
}
