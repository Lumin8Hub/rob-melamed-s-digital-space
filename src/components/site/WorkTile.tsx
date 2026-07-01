import { useState } from "react";
import type { WorkPiece } from "@/data/work";
import { VimeoLightbox } from "./VimeoLightbox";

const toneClass: Record<WorkPiece["tone"], string> = {
  warm: "bg-[radial-gradient(120%_100%_at_20%_20%,oklch(0.28_0.04_60)_0%,oklch(0.16_0.005_285)_60%)]",
  cool: "bg-[radial-gradient(120%_100%_at_80%_20%,oklch(0.28_0.03_240)_0%,oklch(0.16_0.005_285)_60%)]",
  amber: "bg-[radial-gradient(140%_100%_at_50%_30%,oklch(0.42_0.11_65)_0%,oklch(0.16_0.005_285)_65%)]",
  smoke: "bg-[radial-gradient(120%_100%_at_50%_50%,oklch(0.24_0.005_285)_0%,oklch(0.15_0.005_285)_70%)]",
};

export function WorkTile({ piece, index }: { piece: WorkPiece; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group text-left block w-full focus:outline-none focus-visible:ring-1 focus-visible:ring-[color:var(--amber)]"
        aria-label={`Play ${piece.brand} — ${piece.title}`}
      >
        <div
          className={`relative aspect-video overflow-hidden border hairline ${toneClass[piece.tone]} transition-transform duration-500 group-hover:scale-[1.015]`}
        >
          {/* Corner burn-in */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[color:var(--tally)] opacity-0 group-hover:opacity-100 group-hover:tally-blink transition-opacity" />
            <span className="mono text-[9px] tracking-[0.22em] text-[color:var(--stone)]">
              CH{(index + 1).toString().padStart(2, "0")}
            </span>
          </div>
          <div className="absolute top-3 right-3 mono text-[10px] tracking-[0.15em] text-[color:var(--amber)] opacity-70 group-hover:opacity-100 transition-opacity">
            {piece.duration}
          </div>

          {/* Centered brand */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4">
              <div className="mono text-[10px] tracking-[0.3em] text-[color:var(--stone)] mb-3">
                — CUE {(index + 1).toString().padStart(2, "0")} —
              </div>
              <div className="font-semibold text-2xl md:text-3xl tracking-[-0.02em] text-[color:var(--reel)]">
                {piece.brand}
              </div>
            </div>
          </div>

          {/* Bottom timecode strip */}
          <div className="absolute bottom-0 inset-x-0 border-t hairline bg-[color:var(--ink)]/50 backdrop-blur-sm px-3 py-2 flex items-center justify-between mono text-[9px] tracking-[0.18em] text-[color:var(--stone)]">
            <span>PLAY&nbsp;▸</span>
            <span className="text-[color:var(--amber)] group-hover:opacity-100 opacity-70">
              {piece.duration}
            </span>
          </div>
        </div>

        <div className="pt-4 pb-2">
          <div className="mono text-[10px] tracking-[0.2em] text-[color:var(--stone)] mb-1">
            {piece.year} &nbsp;·&nbsp; {piece.brand}
          </div>
          <div className="font-medium text-[color:var(--reel)] tracking-[-0.01em]">
            {piece.title}
          </div>
          <div className="mono text-[10px] tracking-[0.14em] text-[color:var(--stone)] mt-1">
            {piece.role}
          </div>
        </div>
      </button>

      {open && (
        <VimeoLightbox
          vimeoId={piece.vimeoId}
          caption={`${piece.brand} — ${piece.title}`}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
