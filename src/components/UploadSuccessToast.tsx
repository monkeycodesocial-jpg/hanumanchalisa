"use client";

import { motion } from "framer-motion";
import type { GalleryItem } from "@/lib/types";

interface UploadSuccessToastProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export default function UploadSuccessToast({ item, onClose }: UploadSuccessToastProps) {
  if (!item) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] w-[calc(100%-2rem)] max-w-md"
    >
      <div className="golden-border bg-gradient-to-br from-divine-maroon/95 to-divine-deep/95 p-5 shadow-2xl shadow-black/50">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-3 text-amber-200/60 hover:text-divine-gold"
          aria-label="Close"
        >
          ×
        </button>

        <p className="text-center font-devanagari text-lg text-divine-gold mb-1">
          Jai Shri Ram 🚩 Upload Successful
        </p>
        <p className="text-center text-amber-200/80 text-sm mb-4">
          Your bhakti moment is now part of the global movement
        </p>

        <div className="rounded-lg overflow-hidden golden-border max-h-40">
          {item.isVideo ? (
            <video
              src={item.url}
              className="w-full max-h-40 object-cover"
              muted
              playsInline
              autoPlay
              loop
            />
          ) : (
            <img src={item.url} alt="Upload preview" className="w-full max-h-40 object-cover" />
          )}
        </div>

        {item.caption && (
          <p className="text-amber-200/70 text-xs text-center mt-3 italic line-clamp-2">
            {item.caption}
          </p>
        )}
      </div>
    </motion.div>
  );
}
