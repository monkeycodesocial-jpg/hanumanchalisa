"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { GalleryItem } from "@/lib/types";

interface LightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export default function Lightbox({ item, onClose }: LightboxProps) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <button
            type="button"
            className="absolute top-4 right-4 text-white text-3xl z-10 hover:text-divine-gold"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="max-w-5xl w-full max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {item.isVideo ? (
              <video
                src={item.url}
                controls
                autoPlay
                className="w-full max-h-[75vh] rounded-lg mx-auto"
              />
            ) : (
              <img
                src={item.url}
                alt={item.caption || item.name}
                className="max-h-[75vh] w-auto mx-auto object-contain rounded-lg"
              />
            )}
            <div className="mt-4 text-center text-amber-100">
              <p className="font-devanagari text-lg">{item.name}</p>
              {item.city && <p className="text-amber-200/70 text-sm">{item.city}</p>}
              {item.caption && <p className="text-amber-200/90 mt-2 italic">{item.caption}</p>}
              <p className="text-divine-gold/60 text-xs mt-2">
                {new Date(item.created_at).toLocaleDateString()}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
