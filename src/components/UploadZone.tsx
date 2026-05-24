"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IMAGE_COMPRESS_THRESHOLD_KB, isSupabaseConfigured } from "@/lib/constants";
import { uploadToSupabase } from "@/lib/supabase/upload";
import { sanitizeText } from "@/lib/sanitize";
import {
  isImageFile,
  isVideoFile,
  normalizeFileForUpload,
  validateMediaFile,
} from "@/lib/validateFile";
import type { GalleryItem, UploadPhase } from "@/lib/types";
import UploadProgress from "./UploadProgress";
import UploadSuccessToast from "./UploadSuccessToast";

export default function UploadZone() {
  const previewUrlRef = useRef<string | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [caption, setCaption] = useState("");
  const [phase, setPhase] = useState<UploadPhase>("idle");
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [error, setError] = useState("");
  const [successItem, setSuccessItem] = useState<GalleryItem | null>(null);

  const clearPreview = useCallback(() => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
    setPreview(null);
  }, []);

  useEffect(() => () => {
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
  }, []);

  const handleFile = useCallback(
    (raw: File) => {
      const err = validateMediaFile(raw);
      if (err) {
        setError(err);
        setPhase("error");
        setFile(null);
        clearPreview();
        return;
      }
      const f = normalizeFileForUpload(raw);
      setFile(f);
      setPhase("idle");
      setError("");
      clearPreview();
      const url = URL.createObjectURL(f);
      previewUrlRef.current = url;
      setPreview(url);
    },
    [clearPreview]
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a photo or video");
      setPhase("error");
      return;
    }

    if (!isSupabaseConfigured()) {
      setError("Supabase is not configured. Add keys to .env.local and restart the server.");
      setPhase("error");
      return;
    }

    setPhase("compressing");
    setProgress(0);
    setError("");

    try {
      const item = await uploadToSupabase({
        file,
        name: name ? sanitizeText(name, 80) : undefined,
        city: city ? sanitizeText(city, 80) : undefined,
        caption: caption ? sanitizeText(caption, 300) : undefined,
        onProgress: (pct, msg) => {
          setProgress(pct);
          setStatusMessage(msg);
          setPhase(pct < 60 ? "compressing" : "uploading");
        },
      });

      setPhase("success");
      setSuccessItem(item);
      setFile(null);
      clearPreview();
      setCaption("");
      window.dispatchEvent(new CustomEvent("gallery-updated"));
    } catch (err) {
      setPhase("error");
      setError(err instanceof Error ? err.message : "Upload failed");
    }
  };

  const isBusy = phase === "compressing" || phase === "uploading";
  const willCompress = file && isImageFile(file) && file.size > IMAGE_COMPRESS_THRESHOLD_KB * 1024;

  return (
    <>
      <form onSubmit={onSubmit} className="max-w-2xl mx-auto">
        <input
          id="bhakti-file-input"
          type="file"
          accept="image/*,video/*,.heic,.heif"
          disabled={isBusy}
          className="sr-only"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
            e.target.value = "";
          }}
        />

        <label
          htmlFor="bhakti-file-input"
          className={`relative lotus-upload-zone border-2 border-dashed rounded-2xl p-8 md:p-12 text-center block cursor-pointer transition-all ${
            isBusy ? "pointer-events-none opacity-80" : "border-divine-gold/40 hover:border-divine-gold/70"
          }`}
        >
          <p className="text-4xl mb-3 pointer-events-none">📸</p>
          <p className="font-devanagari text-lg text-amber-50 mb-1 pointer-events-none">
            {file ? "Tap to change file" : "Tap or drag your bhakti photo / video"}
          </p>
          <p className="text-amber-200/60 text-sm pointer-events-none">
            Images auto-compress over {IMAGE_COMPRESS_THRESHOLD_KB}KB • Max 20MB images / 200MB videos
          </p>

          {file && (
            <p className="mt-3 text-divine-gold text-sm font-medium pointer-events-none">
              ✓ {file.name} ({(file.size / 1024).toFixed(0)} KB)
              {willCompress && " — will optimize before upload"}
            </p>
          )}

          {preview && file && isImageFile(file) && (
            <img
              src={preview}
              alt="Preview"
              className="mt-4 max-h-56 mx-auto rounded-lg object-contain golden-border pointer-events-none"
            />
          )}
          {preview && file && isVideoFile(file) && (
            <video
              src={preview}
              className="mt-4 max-h-56 mx-auto rounded-lg golden-border w-full max-w-md pointer-events-none"
              muted
              playsInline
              controls
            />
          )}
        </label>

        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          <input
            type="text"
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={80}
            disabled={isBusy}
            className="px-4 py-3 rounded-xl bg-divine-deep/80 border border-divine-gold/30 text-amber-50 placeholder:text-amber-200/40 focus:border-divine-gold outline-none disabled:opacity-50"
          />
          <input
            type="text"
            placeholder="City (optional)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            maxLength={80}
            disabled={isBusy}
            className="px-4 py-3 rounded-xl bg-divine-deep/80 border border-divine-gold/30 text-amber-50 placeholder:text-amber-200/40 focus:border-divine-gold outline-none disabled:opacity-50"
          />
        </div>

        <textarea
          placeholder="Devotional caption (optional)"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          maxLength={300}
          rows={3}
          disabled={isBusy}
          className="w-full mt-4 px-4 py-3 rounded-xl bg-divine-deep/80 border border-divine-gold/30 text-amber-50 placeholder:text-amber-200/40 focus:border-divine-gold outline-none resize-none disabled:opacity-50"
        />

        <AnimatePresence>
          {isBusy && (
            <UploadProgress
              percent={progress}
              message={statusMessage}
              phase={phase === "compressing" ? "compressing" : "uploading"}
            />
          )}
        </AnimatePresence>

        {error && (
          <p className="mt-4 text-center text-sm text-red-400 bg-red-950/30 rounded-lg py-2 px-3">
            {error}
          </p>
        )}

        <motion.button
          type="submit"
          disabled={!file || isBusy}
          whileHover={!isBusy && file ? { scale: 1.02 } : {}}
          className="w-full mt-6 py-4 rounded-full bg-gradient-to-r from-saffron-500 via-saffron-600 to-divine-maroon text-white font-spiritual tracking-wider disabled:opacity-50 shadow-xl flex items-center justify-center gap-2"
        >
          {isBusy ? (
            <>
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              {phase === "compressing" ? "Optimizing..." : "Uploading..."}
            </>
          ) : (
            "Share Your Bhakti Moment"
          )}
        </motion.button>
      </form>

      <AnimatePresence>
        {successItem && (
          <UploadSuccessToast item={successItem} onClose={() => setSuccessItem(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
