"use client";

import { useRef, useState } from "react";

export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.volume = 0.3;
      audio.play().catch(() => {});
      setPlaying(true);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="none"
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      />
      <button
        type="button"
        onClick={toggle}
        className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full golden-border bg-divine-deep/90 flex items-center justify-center text-xl shadow-lg hover:scale-110 transition-transform"
        title={playing ? "Pause bhajan" : "Play bhajan"}
        aria-label={playing ? "Pause background music" : "Play background music"}
      >
        {playing ? "🔇" : "🎵"}
      </button>
    </>
  );
}
