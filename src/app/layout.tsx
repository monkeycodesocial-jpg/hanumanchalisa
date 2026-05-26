import type { Metadata } from "next";
import { Cinzel, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SpiritualDecor from "@/components/SpiritualDecor";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-spiritual",
  display: "swap",
});

const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari", "latin"],
  variable: "--font-devanagari",
  display: "swap",
});

export const metadata: Metadata = {
  title: "विश्वव्यापी श्री हनुमान चालीसा महाअभियान | Global Hanuman Chalisa Movement",
  description:
    "Join the worldwide Shri Hanuman Chalisa Mahabhiyan — Hanuman Chalisa Path, Shri Ram Naam Jap, Deep Prajwalan, and global bhakti. Upload and share your devotional moments.",
  keywords: [
    "Hanuman Chalisa",
    "Ram Naam Jap",
    "Sanatan Dharma",
    "Bhakti",
    "Purushottam Maas",
    "Hanuman Ji",
    "Shri Ram",
    "Global Devotion",
    "हनुमान चालीसा",
  ],
  openGraph: {
    title: "विश्वव्यापी श्री हनुमान चालीसा महाअभियान",
    description: "एक साथ • एक समय • एक संकल्प — Global Hanuman Chalisa Movement",
    type: "website",
    locale: "hi_IN",
    siteName: "Hanuman Chalisa Mahabhiyan",
  },
  twitter: {
    card: "summary_large_image",
    title: "Global Hanuman Chalisa Mahabhiyan",
    description: "Spread devotion worldwide — Hanuman Chalisa, Ram Naam Jap, Bhakti",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="hi"
      className={`${cinzel.variable} ${devanagari.variable}`}
      suppressHydrationWarning
    >
      <body className="font-devanagari overflow-x-hidden" suppressHydrationWarning>
        <SpiritualDecor />
        <Header />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
