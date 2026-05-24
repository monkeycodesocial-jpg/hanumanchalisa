"use client";

interface UploadProgressProps {
  percent: number;
  message: string;
  phase: "compressing" | "uploading";
}

export default function UploadProgress({ percent, message, phase }: UploadProgressProps) {
  return (
    <div className="mt-6 golden-border p-6 bg-divine-deep/60">
      <div className="flex items-center gap-3 mb-4">
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 rounded-full border-2 border-divine-gold/30" />
          <div
            className="absolute inset-0 rounded-full border-2 border-t-divine-gold border-r-saffron-500 animate-spin"
            style={{ borderBottomColor: "transparent", borderLeftColor: "transparent" }}
          />
          <span className="absolute inset-0 flex items-center justify-center text-lg">
            {phase === "compressing" ? "✨" : "🙏"}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-amber-50 text-sm font-medium truncate">{message}</p>
          <p className="text-amber-200/50 text-xs capitalize">{phase}...</p>
        </div>
        <span className="text-divine-gold font-spiritual tabular-nums">{percent}%</span>
      </div>

      <div className="h-2 rounded-full bg-divine-maroon/40 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-saffron-500 via-divine-gold to-saffron-400 transition-all duration-300 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-divine-gold/60 animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}
