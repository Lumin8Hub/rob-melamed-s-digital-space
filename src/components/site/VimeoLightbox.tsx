import { useEffect } from "react";
import { useAudio } from "./AudioProvider";

export function VimeoLightbox({
  vimeoId,
  caption,
  onClose,
}: {
  vimeoId?: string;
  caption: string;
  onClose: () => void;
}) {
  const { duck, unduck } = useAudio();

  useEffect(() => {
    duck();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      unduck();
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, duck, unduck]);

  return (
    <div
      className="fixed inset-0 z-[80] bg-[color:var(--ink)]/95 backdrop-blur-sm flex items-center justify-center px-4 py-10"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={caption}
    >
      <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between pb-3 mono text-[10px] tracking-[0.22em] text-[color:var(--stone)]">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[color:var(--tally)] tally-blink" />
            <span>NOW PLAYING</span>
          </div>
          <button
            onClick={onClose}
            className="hover:text-[color:var(--amber)] transition-colors"
            aria-label="Close"
          >
            CLOSE &nbsp;✕
          </button>
        </div>

        <div className="aspect-video border hairline bg-black">
          {vimeoId ? (
            <iframe
              className="w-full h-full"
              src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={caption}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-center px-6">
              <div className="mono text-[11px] tracking-[0.25em] text-[color:var(--amber)] mb-3">
                — FULL SPOT ON REQUEST —
              </div>
              <div className="text-[color:var(--reel)] font-medium max-w-md mb-4">{caption}</div>
              <a
                href={`mailto:rob@robmelamed.com?subject=${encodeURIComponent(`Request: ${caption}`)}`}
                className="mono text-[10px] tracking-[0.2em] text-[color:var(--stone)] hover:text-[color:var(--amber)] transition-colors max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                Client work is shared privately. Email rob@robmelamed.com for the cut.
              </a>
            </div>
          )}
        </div>

        <div className="pt-3 mono text-[10px] tracking-[0.18em] text-[color:var(--stone)]">
          {caption}
        </div>
      </div>
    </div>
  );
}
