import type { Metadata } from "next";
import { Hanken_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

// Closest free equivalent of TCS.com's "Basis Grotesque" — used site-wide
// for headings AND body, exactly like tcs.com uses a single grotesque family
const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://www.dataanalogy.com";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DataAnalogy.Com",
    alternateName: ["Data Analogy", "DataAnalogy"],
    url: siteUrl,
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DataAnalogy.Com",
    alternateName: "Data Analogy",
    url: siteUrl,
    logo: `${siteUrl}/icon-512.png`,
    email: "contact@dataanalogy.com",
    description:
      "Technology services company focused on SAP data migration, software development, and data analytics.",
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "DataAnalogy.Com - Turning Enterprise Data Into Scalable Solutions",
  description:
    "DataAnalogy.Com is a technology services company focused on helping organizations manage, migrate, and make sense of their data. SAP Data Migration, Software Development, and Data Analytics solutions.",
  keywords: [
    "Data Analogy",
    "DataAnalogy.Com",
    "SAP Data Migration",
    "Software Development",
    "Data Analytics",
    "Enterprise Solutions",
    "Tech Consulting",
  ],
  authors: [{ name: "DataAnalogy.Com" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "DataAnalogy.Com - Turning Enterprise Data Into Scalable Solutions",
    description:
      "Technology services company focused on SAP data migration, software development, and data analytics.",
    type: "website",
    siteName: "DataAnalogy.Com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${hanken.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
