import { useEffect, useState } from "react";

/**
 * Live SMPTE-style timecode HH:MM:SS:FF at 24 fps.
 * Static frame when prefers-reduced-motion.
 */
export function Timecode({ className = "", startOffsetMs }: { className?: string; startOffsetMs?: number }) {
  const [tc, setTc] = useState(() => format(startOffsetMs ?? 0));

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const start = performance.now();
    let raf = 0;
    const tick = () => {
      const elapsed = performance.now() - start + (startOffsetMs ?? 0);
      setTc(format(elapsed));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [startOffsetMs]);

  return (
    <span className={`mono text-[11px] tracking-tight text-[color:var(--amber)] tabular-nums ${className}`}>
      {tc}
    </span>
  );
}

function format(ms: number) {
  const totalFrames = Math.floor((ms / 1000) * 24);
  const ff = totalFrames % 24;
  const totalSeconds = Math.floor(totalFrames / 24);
  const ss = totalSeconds % 60;
  const mm = Math.floor(totalSeconds / 60) % 60;
  const hh = Math.floor(totalSeconds / 3600) % 24;
  return `${p(hh)}:${p(mm)}:${p(ss)}:${p(ff)}`;
}

function p(n: number) {
  return n.toString().padStart(2, "0");
}
