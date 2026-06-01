import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Data Analogy - Turning Enterprise Data Into Scalable Solutions",
  description:
    "Data Analogy is a technology services company focused on helping organizations manage, migrate, and make sense of their data. SAP Data Migration, Software Development, and Data Analytics solutions.",
  keywords: [
    "Data Analogy",
    "SAP Data Migration",
    "Software Development",
    "Data Analytics",
    "Enterprise Solutions",
    "Tech Consulting",
  ],
  authors: [{ name: "Data Analogy" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Data Analogy - Turning Enterprise Data Into Scalable Solutions",
    description:
      "Technology services company focused on SAP data migration, software development, and data analytics.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
