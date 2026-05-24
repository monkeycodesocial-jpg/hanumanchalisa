"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchPublicGallery } from "@/lib/supabase/upload";
import type { GalleryItem } from "@/lib/types";

const PAGE_SIZE = 24;

export function useGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async (pageNum: number, reset: boolean) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetchPublicGallery({ page: pageNum, pageSize: PAGE_SIZE });
      setItems((prev) => (reset ? res.items : [...prev, ...res.items]));
      setHasMore(res.hasMore);
      setPage(pageNum);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load gallery");
      if (reset) setItems([]);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(0, true);

    const onUpdate = () => load(0, true);
    window.addEventListener("gallery-updated", onUpdate);
    return () => window.removeEventListener("gallery-updated", onUpdate);
  }, [load]);

  const loadMore = () => {
    if (!loading && hasMore) load(page + 1, false);
  };

  return { items, loading, error, hasMore, loadMore, refresh: () => load(0, true) };
}
