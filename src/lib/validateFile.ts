import { BLOCKED_EXTENSIONS } from "./constants";

const IMAGE_EXT = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp", ".heic", ".heif"];
const VIDEO_EXT = [".mp4", ".webm", ".mov", ".m4v"];

const EXT_TO_MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".heic": "image/heic",
  ".heif": "image/heif",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
  ".m4v": "video/mp4",
};

export const MAX_IMAGE_BYTES = 20 * 1024 * 1024;
export const MAX_VIDEO_BYTES = 200 * 1024 * 1024;

export function getFileExtension(name: string): string {
  const lower = name.toLowerCase();
  const dot = lower.lastIndexOf(".");
  return dot >= 0 ? lower.slice(dot) : "";
}

export function resolveMimeType(file: File): string {
  if (file.type && file.type !== "application/octet-stream") {
    return file.type;
  }
  return EXT_TO_MIME[getFileExtension(file.name)] || "";
}

export function isImageMime(mime: string): boolean {
  return mime.startsWith("image/");
}

export function isVideoMime(mime: string): boolean {
  return mime.startsWith("video/");
}

export function validateMediaFile(file: File): string | null {
  const ext = getFileExtension(file.name);

  if (BLOCKED_EXTENSIONS.includes(ext)) {
    return "Executable and unsupported file types are not allowed.";
  }

  const mime = resolveMimeType(file);
  const validExt = IMAGE_EXT.includes(ext) || VIDEO_EXT.includes(ext);

  if (!mime && !validExt) {
    return "Only image and video files are allowed.";
  }

  if (mime && !isImageMime(mime) && !isVideoMime(mime)) {
    return "Invalid file type.";
  }

  const isVideo = isVideoFile(file);
  const max = isVideo ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES;
  const maxLabel = isVideo ? "200MB" : "20MB";

  if (file.size > max) {
    return `File too large. Maximum ${maxLabel} for ${isVideo ? "videos" : "images"}.`;
  }

  if (file.size === 0) {
    return "File is empty.";
  }

  return null;
}

export function isVideoFile(file: File): boolean {
  const mime = resolveMimeType(file);
  if (mime) return isVideoMime(mime);
  return VIDEO_EXT.includes(getFileExtension(file.name));
}

export function isImageFile(file: File): boolean {
  const mime = resolveMimeType(file);
  if (mime) return isImageMime(mime);
  return IMAGE_EXT.includes(getFileExtension(file.name));
}

export function normalizeFileForUpload(file: File): File {
  const mime = resolveMimeType(file);
  if (!mime || mime === file.type) return file;
  return new File([file], file.name, { type: mime, lastModified: file.lastModified });
}
