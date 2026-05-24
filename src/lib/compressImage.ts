import imageCompression from "browser-image-compression";
import { isImageFile } from "./validateFile";

const TARGET_BYTES = 200 * 1024; // 200KB

export type CompressProgress = (message: string, percent: number) => void;

export async function compressImageIfNeeded(
  file: File,
  onProgress?: CompressProgress
): Promise<{ file: File; compressed: boolean }> {
  if (!isImageFile(file)) {
    return { file, compressed: false };
  }

  if (file.size <= TARGET_BYTES) {
    return { file, compressed: false };
  }

  onProgress?.("Optimizing image...", 15);

  const compressed = await imageCompression(file, {
    maxSizeMB: 0.2,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    onProgress: (p) => {
      onProgress?.("Optimizing image...", 15 + Math.round(p * 0.4));
    },
  });

  onProgress?.("Image optimized", 55);

  return { file: compressed, compressed: true };
}
