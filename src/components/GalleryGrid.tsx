"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useGallery } from "@/hooks/useGallery";
import GalleryCard from "./GalleryCard";
import Lightbox from "./Lightbox";
import { useState } from "react";

export default function GalleryGrid() {
  const { items, loading, error, hasMore, loadMore } = useGallery();
  const [lightbox, setLightbox] = useState<(typeof items)[0] | null>(null);
  const { ref, inView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView && hasMore && !loading) loadMore();
  }, [inView, hasMore, loading, loadMore]);

  return (
    <div>
      {loading && items.length === 0 && (
        <div className="flex flex-col items-center py-20 gap-4">
          <div className="w-12 h-12 border-2 border-divine-gold/30 border-t-divine-gold rounded-full animate-spin" />
          <p className="text-divine-gold font-spiritual animate-pulse">
            Loading global bhakti gallery...
          </p>
        </div>
      )}

      {error && (
        <p className="text-center text-red-400/90 py-10 bg-red-950/20 rounded-lg">{error}</p>
      )}

      {!loading && items.length === 0 && !error && (
        <p className="text-center text-amber-200/60 py-20 font-devanagari text-lg">
          अभी कोई भक्ति क्षण साझा नहीं हुआ — पहले आप अपना योगदान दें 🙏
        </p>
      )}

      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {items.map((item, i) => (
          <GalleryCard key={item.id} item={item} index={i} onClick={() => setLightbox(item)} />
        ))}
      </div>

      <div ref={ref} className="h-16 flex justify-center items-center mt-8">
        {loading && items.length > 0 && (
          <p className="text-divine-gold font-spiritual animate-pulse">Loading more...</p>
        )}
      </div>

      {hasMore && !loading && items.length > 0 && (
        <motion.div className="flex justify-center mt-6">
          <button
            type="button"
            onClick={loadMore}
            className="px-8 py-3 rounded-full golden-border text-divine-gold font-spiritual hover:bg-divine-gold/10"
          >
            Load More Devotion
          </button>
        </motion.div>
      )}

      <Lightbox item={lightbox} onClose={() => setLightbox(null)} />
    </div>
  );
}
