"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchPublicStats } from "@/lib/supabase/upload";

export default function ParticipationCounter() {
  const [count, setCount] = useState<number | null>(null);
  const base = parseInt(process.env.NEXT_PUBLIC_BASE_PARTICIPATION_COUNT || "10800", 10);

  useEffect(() => {
    const load = () => {
      fetchPublicStats()
        .then((s) => setCount(base + s.totalUploads + s.totalParticipants))
        .catch(() => setCount(base));
    };
    load();
    window.addEventListener("gallery-updated", load);
    return () => window.removeEventListener("gallery-updated", load);
  }, [base]);

  return (
    <motion.div
      className="inline-block golden-border px-6 py-3 mt-4"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <p className="text-xs text-amber-200/70 uppercase tracking-widest font-spiritual">
        Global Participation
      </p>
      <p className="text-3xl md:text-4xl font-spiritual text-divine-gold tabular-nums">
        {count !== null ? count.toLocaleString("en-IN") : "..."}+
      </p>
    </motion.div>
  );
}
