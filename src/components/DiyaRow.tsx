"use client";

const COUNT = 7;

export default function DiyaRow() {
  return (
    <div className="flex justify-center gap-3 md:gap-5 my-8">
      {Array.from({ length: COUNT }).map((_, i) => (
        <div key={i} className="flex flex-col items-center animate-float" style={{ animationDelay: `${i * 0.3}s` }}>
          <div className="w-3 h-5 diya-flame mb-1" />
          <div className="w-4 h-2 bg-gradient-to-b from-amber-700 to-amber-900 rounded-b-full" />
        </div>
      ))}
    </div>
  );
}
