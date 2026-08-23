"use client";

import { Music, Pause } from "lucide-react";
import { useRef, useState } from "react";

export interface ButangMuzikProps {
  url?: string;
}

/** Muzik tidak autoplay — dasar browser (CLAUDE.md §3.4). Butang main manual sahaja. */
export function ButangMuzik({ url }: ButangMuzikProps) {
  const [main, setMain] = useState(false);
  const rujukanAudio = useRef<HTMLAudioElement>(null);

  if (!url) return null;

  function togol() {
    const audio = rujukanAudio.current;
    if (!audio) return;
    if (main) {
      audio.pause();
    } else {
      void audio.play();
    }
    setMain(!main);
  }

  return (
    <div className="absolute bottom-4 left-4 z-30">
      <audio ref={rujukanAudio} src={url} loop />
      <button
        type="button"
        onClick={togol}
        aria-label={main ? "Matikan muzik" : "Mainkan muzik"}
        className="flex size-9 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm"
        style={{ color: "var(--kad-teks)" }}
      >
        {main ? <Pause className="size-4" /> : <Music className="size-4" />}
      </button>
    </div>
  );
}
