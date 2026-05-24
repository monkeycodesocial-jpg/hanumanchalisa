import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-divine-gold/20 mt-20">
      <div className="sanskrit-divider mb-8" />
      <div className="max-w-7xl mx-auto px-4 py-10 text-center">
        <p className="text-3xl text-divine-gold/40 mb-4 font-spiritual">ॐ</p>
        <p className="font-devanagari text-lg text-amber-100/90 mb-2">
          जय श्री राम • जय हनुमान
        </p>
        <p className="text-amber-200/60 text-sm max-w-xl mx-auto mb-6">
          Spreading Hanuman Chalisa devotion and Sanatan Dharma positivity worldwide.
          One prayer, one time, one sankalp.
        </p>
        <div className="flex justify-center gap-6 text-sm">
          <Link href="/upload" className="text-divine-gold hover:underline">
            Upload
          </Link>
          <Link href="/gallery" className="text-divine-gold hover:underline">
            Gallery
          </Link>
        </div>
        <p className="text-amber-200/40 text-xs mt-8">
          © {new Date().getFullYear()} Vishvavyapi Shri Hanuman Chalisa Mahabhiyan
        </p>
      </div>
    </footer>
  );
}
