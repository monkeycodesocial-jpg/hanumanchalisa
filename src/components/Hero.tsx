"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { EVENT } from "@/lib/constants";
import DiyaRow from "./DiyaRow";
import ParticipationCounter from "./ParticipationCounter";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 pt-8 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-saffron-glow pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-saffron-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-divine-maroon/30 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-4xl"
      >
        <p className="text-divine-gold font-spiritual tracking-[0.3em] text-sm md:text-base mb-4">
          ॐ श्री हनुमानाय नमः
        </p>

        <div className="flex justify-center gap-6 md:gap-12 mb-6 text-5xl md:text-7xl">
          <motion.span
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            title="Hanuman Ji"
          >
            🙏
          </motion.span>
          <motion.span
            className="text-divine-gold"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ॐ
          </motion.span>
          <motion.span
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            title="Shri Ram"
          >
            🏹
          </motion.span>
        </div>

        <h1 className="font-devanagari text-3xl md:text-5xl lg:text-6xl font-bold text-amber-50 leading-tight mb-4 drop-shadow-lg">
          {EVENT.title}
        </h1>

        <p className="font-devanagari text-xl md:text-2xl text-divine-gold mb-2">
          {EVENT.subtitle}
        </p>

        <p className="text-amber-200/80 text-sm md:text-base max-w-2xl mx-auto mb-6">
          Join devotees worldwide in Hanuman Chalisa Path, Shri Ram Naam Jap, and spreading
          divine positivity across the globe.
        </p>

        <DiyaRow />
        <ParticipationCounter />

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            href="/upload"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-saffron-500 via-saffron-600 to-divine-maroon text-white font-spiritual tracking-wide shadow-xl shadow-saffron-900/50 hover:scale-105 transition-transform text-center"
          >
            Upload Your Bhakti Moments
          </Link>
          <Link
            href="/gallery"
            className="px-8 py-4 rounded-full golden-border text-divine-gold font-spiritual tracking-wide hover:bg-divine-gold/10 transition-colors text-center"
          >
            View Global Gallery
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
