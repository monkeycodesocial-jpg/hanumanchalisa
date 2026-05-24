import Hero from "@/components/Hero";
import EventInfo from "@/components/EventInfo";
import DailyQuote from "@/components/DailyQuote";
import QRSection from "@/components/QRSection";
import ShareButtons from "@/components/ShareButtons";

export default function HomePage() {
  return (
    <>
      <Hero />
      <EventInfo />
      <DailyQuote />
      <section className="py-12 px-4 text-center">
        <h2 className="font-spiritual text-divine-gold tracking-wider mb-6">
          Spread the Sankalp
        </h2>
        <ShareButtons />
      </section>
      <QRSection />
    </>
  );
}
