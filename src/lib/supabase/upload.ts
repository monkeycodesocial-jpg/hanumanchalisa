import { getSupabase, STORAGE_BUCKET } from "./client";
import type { UploadRow } from "./database.types";
import { sanitizeFileName, sanitizeText } from "../sanitize";
import { normalizeFileForUpload } from "../validateFile";
import { compressImageIfNeeded } from "../compressImage";
import type { GalleryItem } from "../types";

export interface UploadInput {
  file: File;
  name?: string;
  city?: string;
  caption?: string;
  onProgress?: (percent: number, message: string) => void;
}

export function rowToGalleryItem(row: UploadRow): GalleryItem {
  const isVideo = row.file_type.startsWith("video/");
  return {
    id: row.id,
    file_url: row.file_url,
    file_type: row.file_type,
    file_name: row.file_name,
    name: row.uploaded_by,
    city: row.city,
    caption: row.caption,
    isVideo,
    created_at: row.created_at,
    approved: row.approved,
    compressed: row.compressed,
    url: row.file_url,
    thumbnail: row.file_url,
  };
}

export async function uploadToSupabase(input: UploadInput): Promise<GalleryItem> {
  const { onProgress } = input;
  let file = normalizeFileForUpload(input.file);

  onProgress?.(5, "Preparing your sacred offering...");

  let compressed = false;
  if (file.type.startsWith("image/") || /\.(jpe?g|png|webp|gif|heic|heif)$/i.test(file.name)) {
    try {
      const result = await compressImageIfNeeded(file, (msg, pct) => onProgress?.(pct, msg));
      file = result.file;
      compressed = result.compressed;
    } catch {
      onProgress?.(20, "Preparing image for upload...");
    }
  }

  let mime = file.type && file.type !== "application/octet-stream" ? file.type : "";
  if (!mime) {
    const n = file.name.toLowerCase();
    if (/\.heic$/.test(n)) mime = "image/heic";
    else if (/\.heif$/.test(n)) mime = "image/heif";
    else if (/\.png$/.test(n)) mime = "image/png";
    else if (/\.webp$/.test(n)) mime = "image/webp";
    else if (/\.gif$/.test(n)) mime = "image/gif";
    else if (/\.(jpe?g)$/.test(n)) mime = "image/jpeg";
    else if (/\.mp4$/.test(n)) mime = "video/mp4";
    else if (/\.mov$/.test(n)) mime = "video/quicktime";
    else mime = "application/octet-stream";
  }
  if (compressed && mime.startsWith("image/")) mime = "image/jpeg";

  const safeName = sanitizeFileName(file.name);
  const storagePath = `${Date.now()}_${Math.random().toString(36).slice(2, 9)}_${safeName}`;

  onProgress?.(60, "Uploading to sacred gallery...");

  const supabase = getSupabase();
  const { error: storageError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(storagePath, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: mime,
    });

  if (storageError) {
    throw new Error(storageError.message || "Storage upload failed");
  }

  onProgress?.(85, "Saving devotion metadata...");

  const { data: urlData } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(storagePath);
  const fileUrl = urlData.publicUrl;

  const { data: row, error: dbError } = await supabase
    .from("uploads")
    .insert({
      file_url: fileUrl,
      file_type: mime,
      file_name: safeName,
      uploaded_by: sanitizeText(input.name || "Anonymous Devotee", 80),
      city: sanitizeText(input.city || "", 80),
      caption: sanitizeText(input.caption || "", 300),
      approved: true,
      compressed,
    })
    .select()
    .single();

  if (dbError || !row) {
    await supabase.storage.from(STORAGE_BUCKET).remove([storagePath]);
    throw new Error(dbError?.message || "Failed to save upload record");
  }

  onProgress?.(100, "Jai Shri Ram — Upload complete!");

  return rowToGalleryItem(row as UploadRow);
}

export async function fetchPublicGallery(options?: {
  page?: number;
  pageSize?: number;
}): Promise<{ items: GalleryItem[]; hasMore: boolean }> {
  const page = options?.page ?? 0;
  const pageSize = options?.pageSize ?? 24;
  const from = page * pageSize;
  const to = from + pageSize - 1;

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("uploads")
    .select("*")
    .eq("approved", true)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw new Error(error.message);

  const items = ((data || []) as UploadRow[]).map(rowToGalleryItem);
  const hasMore = items.length === pageSize;

  return { items, hasMore };
}

export async function fetchPublicStats(): Promise<{
  totalUploads: number;
  totalParticipants: number;
  citiesParticipating: number;
}> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("uploads")
    .select("uploaded_by, city")
    .eq("approved", true);

  if (error) throw new Error(error.message);

  const rows = (data || []) as UploadRow[];
  const cities = new Set(rows.filter((r) => r.city).map((r) => r.city.toLowerCase()));
  const participants = new Set(rows.map((r) => r.uploaded_by.toLowerCase()));

  return {
    totalUploads: rows.length,
    totalParticipants: participants.size,
    citiesParticipating: cities.size,
  };
}
