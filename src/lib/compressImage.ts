import imageCompression from "browser-image-compression";
import { isIOS, isMobileDevice } from "./device";
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

  // Web workers often fail on iOS Safari — run compression on main thread for mobile
  const useWebWorker = !isMobileDevice() && !isIOS();

  try {
    const compressed = await imageCompression(file, {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 1920,
      useWebWorker,
      fileType: "image/jpeg",
      initialQuality: 0.85,
      onProgress: (p) => {
        onProgress?.("Optimizing image...", 15 + Math.round(p * 0.4));
      },
    });

    onProgress?.("Image optimized", 55);

    const out =
      compressed.type === "image/jpeg"
        ? compressed
        : new File([compressed], file.name.replace(/\.\w+$/i, ".jpg"), {
            type: "image/jpeg",
            lastModified: Date.now(),
          });

    return { file: out, compressed: true };
  } catch (err) {
    console.warn("Image compression failed, using original:", err);
    onProgress?.("Using original image...", 40);
    // If original is within upload limit, continue; caller validates size
    return { file, compressed: false };
  }
}
