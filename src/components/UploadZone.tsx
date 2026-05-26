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
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  useEffect(
    () => () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    },
    []
  );

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

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
    e.target.value = "";
  };

  const openFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please choose a photo or video first, then tap Share.");
      setPhase("error");
      return;
    }

    if (!isSupabaseConfigured()) {
      setError("Site configuration error. Please try again later.");
      setPhase("error");
      return;
    }

    setPhase("compressing");
    setProgress(0);
    setError("");
    setStatusMessage("Starting upload...");

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
      const msg = err instanceof Error ? err.message : "Upload failed";
      setError(
        msg.includes("Failed to fetch") || msg.includes("Network")
          ? "Network error. Check mobile data/Wi‑Fi and try again."
          : msg
      );
    }
  };

  const isBusy = phase === "compressing" || phase === "uploading";
  const willCompress =
    file && isImageFile(file) && file.size > IMAGE_COMPRESS_THRESHOLD_KB * 1024;

  return (
    <>
      <form onSubmit={onSubmit} className="max-w-2xl mx-auto">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*,.heic,.heif"
          disabled={isBusy}
          className="hidden"
          aria-hidden
          onChange={onFileChange}
        />

        <div
          className={`lotus-upload-zone border-2 border-dashed rounded-2xl p-6 md:p-10 text-center transition-all ${
            isBusy ? "opacity-80" : "border-divine-gold/40"
          }`}
        >
          <p className="text-4xl mb-3">📸</p>
          <p className="font-devanagari text-lg text-amber-50 mb-2">
            Share your bhakti photo or video
          </p>
          <p className="text-amber-200/60 text-sm mb-5">
            Tap below to choose from gallery • Max 20MB images / 200MB videos
          </p>

          <button
            type="button"
            disabled={isBusy}
            onClick={openFilePicker}
            className="w-full max-w-sm mx-auto py-4 px-6 rounded-full golden-border bg-divine-maroon/40 text-divine-gold font-spiritual text-base active:scale-95 transition-transform disabled:opacity-50 touch-manipulation min-h-[48px]"
          >
            {file ? "Change Photo / Video" : "Choose Photo or Video"}
          </button>

          {file && (
            <p className="mt-4 text-divine-gold text-sm font-medium break-all px-2">
              ✓ Selected ({(file.size / 1024 / 1024).toFixed(1)} MB)
              {willCompress && " — will optimize"}
            </p>
          )}

          {preview && file && isImageFile(file) && (
            <img
              src={preview}
              alt="Preview"
              className="mt-4 max-h-48 mx-auto rounded-lg object-contain golden-border w-full"
            />
          )}
          {preview && file && isVideoFile(file) && (
            <video
              src={preview}
              className="mt-4 max-h-48 mx-auto rounded-lg golden-border w-full"
              muted
              playsInline
              controls
            />
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          <input
            type="text"
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={80}
            disabled={isBusy}
            className="px-4 py-3 text-base rounded-xl bg-divine-deep/80 border border-divine-gold/30 text-amber-50 placeholder:text-amber-200/40 focus:border-divine-gold outline-none disabled:opacity-50"
          />
          <input
            type="text"
            placeholder="City (optional)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            maxLength={80}
            disabled={isBusy}
            className="px-4 py-3 text-base rounded-xl bg-divine-deep/80 border border-divine-gold/30 text-amber-50 placeholder:text-amber-200/40 focus:border-divine-gold outline-none disabled:opacity-50"
          />
        </div>

        <textarea
          placeholder="Devotional caption (optional)"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          maxLength={300}
          rows={3}
          disabled={isBusy}
          className="w-full mt-4 px-4 py-3 text-base rounded-xl bg-divine-deep/80 border border-divine-gold/30 text-amber-50 placeholder:text-amber-200/40 focus:border-divine-gold outline-none resize-none disabled:opacity-50"
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
          <p className="mt-4 text-center text-sm text-red-400 bg-red-950/30 rounded-lg py-3 px-3 break-words">
            {error}
          </p>
        )}

        <motion.button
          type="submit"
          disabled={!file || isBusy}
          className="w-full mt-6 py-4 min-h-[52px] rounded-full bg-gradient-to-r from-saffron-500 via-saffron-600 to-divine-maroon text-white font-spiritual tracking-wider text-base disabled:opacity-50 shadow-xl flex items-center justify-center gap-2 touch-manipulation active:scale-[0.98]"
        >
          {isBusy ? (
            <>
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0" />
              {phase === "compressing" ? "Optimizing..." : "Uploading..."}
            </>
          ) : file ? (
            "Share Your Bhakti Moment"
          ) : (
            "Select a file first"
          )}
        </motion.button>

        <p className="text-center text-amber-200/50 text-xs mt-3">
          Step 1: Choose file → Step 2: Tap Share
        </p>
      </form>

      <AnimatePresence>
        {successItem && (
          <UploadSuccessToast item={successItem} onClose={() => setSuccessItem(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
