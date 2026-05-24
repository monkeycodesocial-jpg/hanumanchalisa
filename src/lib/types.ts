export interface GalleryItem {
  id: string;
  file_url: string;
  file_type: string;
  file_name: string;
  name: string;
  city: string;
  caption: string;
  isVideo: boolean;
  created_at: string;
  approved: boolean;
  compressed: boolean;
  url: string;
  thumbnail: string;
}

export type UploadPhase = "idle" | "compressing" | "uploading" | "success" | "error";
