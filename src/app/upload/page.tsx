import UploadZone from "@/components/UploadZone";
import ShareButtons from "@/components/ShareButtons";
import QRSection from "@/components/QRSection";

export const metadata = {
  title: "Upload Bhakti Moments | Hanuman Chalisa Mahabhiyan",
  description:
    "Share devotional photos and videos — stored securely in Supabase with automatic image optimization.",
};

export default function UploadPage() {
  return (
    <div className="py-16 px-4">
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <p className="text-divine-gold font-spiritual tracking-widest text-sm mb-2">
          SHARE YOUR DEVOTION
        </p>
        <h1 className="font-devanagari text-3xl md:text-4xl text-amber-50 mb-3">
          अपने भक्ति क्षण साझा करें
        </h1>
        <p className="text-amber-200/70 text-sm">
          Upload to our global gallery. Images over 200KB are automatically optimized before
          upload. Videos upload directly (max 200MB).
        </p>
        <div className="sanskrit-divider w-32 mx-auto mt-6" />
      </div>
      <UploadZone />
      <div className="mt-16 text-center">
        <ShareButtons title="Share your bhakti — Hanuman Chalisa Mahabhiyan" />
      </div>
      <QRSection />
    </div>
  );
}
