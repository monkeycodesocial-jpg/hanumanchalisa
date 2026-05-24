"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/upload", label: "Upload" },
  { href: "/gallery", label: "Gallery" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-divine-temple/80 border-b border-divine-gold/20">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl text-divine-gold animate-glow">🪷</span>
          <div>
            <p className="font-spiritual text-divine-gold text-sm md:text-base tracking-wider">
              श्री हनुमान
            </p>
            <p className="text-[10px] md:text-xs text-amber-200/70">महाअभियान</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-amber-100/90 hover:text-divine-gold transition-colors font-spiritual text-sm tracking-wide"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/upload"
            className="px-4 py-2 rounded-full bg-gradient-to-r from-saffron-600 to-saffron-500 text-white text-sm font-medium shadow-lg shadow-saffron-900/40 hover:scale-105 transition-transform"
          >
            Share Bhakti
          </Link>
        </nav>

        <button
          type="button"
          className="md:hidden text-divine-gold p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-divine-gold/20 overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-3">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-amber-100 py-2 font-spiritual"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
