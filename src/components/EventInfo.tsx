"use client";

import { motion } from "framer-motion";
import { EVENT } from "@/lib/constants";

const DETAILS = [
  { label: "Date", value: EVENT.date, icon: "📅" },
  { label: "Time", value: EVENT.time, icon: "🕯️" },
  { label: "Occasion", value: EVENT.occasion, icon: "🪷" },
];

export default function EventInfo() {
  return (
    <section className="py-20 px-4" id="event">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-divine-gold font-spiritual tracking-widest text-sm mb-2">
            EVENT DETAILS
          </p>
          <h2 className="font-devanagari text-3xl md:text-4xl text-amber-50">
            महाअभियान की जानकारी
          </h2>
          <div className="sanskrit-divider w-48 mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {DETAILS.map((d, i) => (
            <motion.div
              key={d.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="golden-border p-6 text-center bg-divine-deep/50"
            >
              <span className="text-3xl mb-3 block">{d.icon}</span>
              <p className="text-amber-200/60 text-sm font-spiritual uppercase tracking-wider">
                {d.label}
              </p>
              <p className="text-xl text-amber-50 mt-1 font-medium">{d.value}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="golden-border p-8 bg-gradient-to-br from-divine-maroon/40 to-divine-deep/60"
        >
          <h3 className="font-spiritual text-divine-gold text-center mb-6 tracking-wider">
            Sacred Activities
          </h3>
          <ul className="grid sm:grid-cols-2 gap-4">
            {EVENT.activities.map((activity) => (
              <li
                key={activity}
                className="flex items-center gap-3 text-amber-100/90 py-2 border-b border-divine-gold/10"
              >
                <span className="text-divine-gold">✦</span>
                <span className="font-devanagari">{activity}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
