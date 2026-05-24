"use client";

import { motion } from "framer-motion";

const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${(i * 17 + 7) % 100}%`,
  top: `${(i * 23 + 11) % 100}%`,
  delay: (i % 5) * 0.8,
}));

const RAM_NAAM = ["श्री राम", "जय श्री राम", "राम", "जय हनुमान"];

export default function SpiritualDecor() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden>
      <div className="om-watermark top-10 left-1/2 -translate-x-1/2">ॐ</div>
      <div className="om-watermark bottom-20 right-10 text-6xl">ॐ</div>

      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{ left: p.left, top: p.top, animationDelay: `${p.delay}s` }}
        />
      ))}

      {RAM_NAAM.map((text, i) => (
        <motion.span
          key={text}
          className="absolute text-divine-gold/20 font-spiritual text-sm md:text-base whitespace-nowrap"
          style={{ top: `${15 + i * 20}%` }}
          initial={{ x: "-20%" }}
          animate={{ x: "120vw" }}
          transition={{
            duration: 18 + i * 4,
            repeat: Infinity,
            delay: i * 5,
            ease: "linear",
          }}
        >
          {text}
        </motion.span>
      ))}

      <motion.div
        className="absolute top-4 right-6 text-3xl opacity-30"
        animate={{ rotate: [-8, 8, -8] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        🔔
      </motion.div>
    </div>
  );
}
