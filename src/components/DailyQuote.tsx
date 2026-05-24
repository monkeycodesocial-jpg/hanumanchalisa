"use client";

import { getDailyQuote } from "@/lib/constants";
import { motion } from "framer-motion";

export default function DailyQuote() {
  const quote = getDailyQuote();

  return (
    <section className="py-16 px-4">
      <motion.blockquote
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center golden-border p-8 md:p-12 bg-divine-maroon/20"
      >
        <p className="text-4xl text-divine-gold/50 mb-4 font-spiritual">❝</p>
        <p className="font-devanagari text-xl md:text-2xl text-amber-50 leading-relaxed mb-4">
          {quote.text}
        </p>
        <cite className="text-divine-gold text-sm font-spiritual not-italic tracking-wider">
          — {quote.source}
        </cite>
      </motion.blockquote>
    </section>
  );
}
