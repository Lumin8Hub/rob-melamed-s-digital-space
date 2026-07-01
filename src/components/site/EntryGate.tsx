import { useEffect, useState } from "react";
import { Timecode } from "./Timecode";

const KEY = "rm-entered";

export function EntryGate({ onEnter }: { onEnter?: (soundOn: boolean) => void }) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;
    const already = sessionStorage.getItem(KEY);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (already || reduce) {
      onEnter?.(already === "sound");
      return;
    }
    setVisible(true);
  }, [onEnter]);

  const enter = (soundOn: boolean) => {
    sessionStorage.setItem(KEY, soundOn ? "sound" : "muted");
    setVisible(false);
    onEnter?.(soundOn);
  };

  if (!mounted || !visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[color:var(--ink)] text-[color:var(--reel)]">
      <div className="absolute top-5 left-5 md:top-8 md:left-10 flex items-center gap-3 mono text-[10px] tracking-[0.2em] text-[color:var(--stone)]">
        <span className="inline-block w-2 h-2 rounded-full bg-[color:var(--tally)] tally-blink" />
        <span>REC</span>
        <Timecode />
      </div>

      <div className="absolute top-5 right-5 md:top-8 md:right-10 mono text-[10px] tracking-[0.22em] text-[color:var(--stone)]">
        ROB MELAMED &nbsp;/&nbsp; POST-AUDIO
      </div>

      <div className="flex flex-col items-center px-6 text-center max-w-xl">
        <div className="mono text-[10px] tracking-[0.3em] text-[color:var(--stone)] mb-6">
          — REEL START —
        </div>
        <h1 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05]">
          Enter.
          <span className="block text-[color:var(--amber)]">Sound on.</span>
        </h1>
        <p className="mt-5 mono text-[11px] tracking-[0.18em] text-[color:var(--stone)] max-w-sm">
          THIS SITE OPENS WITH AUDIO. IT IS THE ACTUAL PRODUCT.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => enter(true)}
            className="mono text-[11px] tracking-[0.25em] px-6 py-3 border border-[color:var(--amber)] text-[color:var(--amber)] hover:bg-[color:var(--amber)] hover:text-[color:var(--ink)] transition-colors"
          >
            ▸ &nbsp; ENTER &mdash; SOUND ON
          </button>
          <button
            onClick={() => enter(false)}
            className="mono text-[10px] tracking-[0.2em] text-[color:var(--stone)] hover:text-[color:var(--reel)] transition-colors px-4 py-3"
          >
            Continue muted
          </button>
        </div>
      </div>

      <div className="absolute bottom-6 mono text-[9px] tracking-[0.3em] text-[color:var(--stone)]">
        LOCKED&nbsp;TO&nbsp;PICTURE
      </div>
    </div>
  );
}
