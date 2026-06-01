import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel automatically handles output, no need for "standalone"
  // output: "standalone",  ← only for Docker/VPS self-hosting
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  allowedDevOrigins: [
    ".space-z.ai",
    ".z.ai",
    "localhost",
  ],
};

export default nextConfig;
