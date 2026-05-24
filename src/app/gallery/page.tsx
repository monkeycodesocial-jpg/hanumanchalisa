import GalleryGrid from "@/components/GalleryGrid";
import ParticipationCounter from "@/components/ParticipationCounter";

export const metadata = {
  title: "Global Bhakti Gallery | Hanuman Chalisa Mahabhiyan",
  description: "View devotional photos and videos from Hanuman Chalisa events, Ram Naam Jap, and global Sanatan Dharma participation.",
};

export default function GalleryPage() {
  return (
    <div className="py-16 px-4">
      <div className="text-center mb-12">
        <p className="text-divine-gold font-spiritual tracking-widest text-sm mb-2">
          GLOBAL GALLERY
        </p>
        <h1 className="font-devanagari text-3xl md:text-4xl text-amber-50 mb-3">
          विश्व भक्ति गैलरी
        </h1>
        <p className="text-amber-200/70 text-sm max-w-xl mx-auto">
          Devotional moments from devotees worldwide — Hanuman Chalisa, Ram Naam Jap, and sacred gatherings.
        </p>
        <div className="mt-6 flex justify-center">
          <ParticipationCounter />
        </div>
        <div className="sanskrit-divider w-32 mx-auto mt-8" />
      </div>
      <div className="max-w-7xl mx-auto">
        <GalleryGrid />
      </div>
    </div>
  );
}
