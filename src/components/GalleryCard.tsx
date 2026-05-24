"use client";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import type { GalleryItem } from "@/lib/types";

interface GalleryCardProps {
  item: GalleryItem;
  index: number;
  onClick: () => void;
}

export default function GalleryCard({ item, index, onClick }: GalleryCardProps) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "100px" });

  return (
    <motion.button
      ref={ref}
      type="button"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: Math.min(index * 0.03, 0.5) }}
      className="break-inside-avoid w-full text-left golden-border overflow-hidden group cursor-pointer bg-divine-deep/40 lotus-card"
      onClick={onClick}
    >
      <div className="relative overflow-hidden">
        {item.isVideo ? (
          <div className="relative aspect-video bg-black/40">
            {inView ? (
              <video
                src={item.url}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                muted
                playsInline
                autoPlay
                loop
                preload="metadata"
              />
            ) : (
              <div className="w-full h-full bg-divine-maroon/30 animate-pulse min-h-[120px]" />
            )}
            <span className="absolute bottom-2 right-2 text-xs bg-black/50 px-2 py-0.5 rounded">
              ▶ Video
            </span>
          </div>
        ) : inView ? (
          <img
            src={item.url}
            alt={item.caption || item.name}
            loading="lazy"
            className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full aspect-[4/3] bg-divine-maroon/30 animate-pulse" />
        )}
      </div>
      <div className="p-3 border-t border-divine-gold/10">
        <p className="text-amber-50 text-sm font-medium truncate">{item.name}</p>
        {item.city && <p className="text-amber-200/60 text-xs truncate">{item.city}</p>}
        {item.caption && (
          <p className="text-amber-200/70 text-xs mt-1 line-clamp-2 italic">{item.caption}</p>
        )}
        <p className="text-divine-gold/40 text-[10px] mt-1">
          {new Date(item.created_at).toLocaleDateString()}
          {item.compressed && " • optimized"}
        </p>
      </div>
    </motion.button>
  );
}
