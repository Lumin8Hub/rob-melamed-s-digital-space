import { Link } from "@tanstack/react-router";
import { Volume2, VolumeX } from "lucide-react";
import { Timecode } from "./Timecode";
import { useAudio } from "./AudioProvider";

const links = [
  { to: "/work", label: "WORK" },
  { to: "/about", label: "ABOUT" },
  { to: "/contact", label: "CONTACT" },
] as const;

export function NavBar() {
  const { soundOn, toggle } = useAudio();
  return (
    <header className="sticky top-0 z-40 border-b hairline bg-[color:var(--ink)]/85 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--ink)]/70">
      <nav className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-5 md:px-10">
        <Link
          to="/"
          className="focus-ring mono text-[12px] tracking-[0.18em] text-[color:var(--reel)] hover:text-[color:var(--amber)] transition-colors"
        >
          ROB&nbsp;MELAMED
        </Link>

        <div className="flex items-center gap-6 md:gap-9">
          <ul className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  activeProps={{ className: "text-[color:var(--amber)]" }}
                  className="focus-ring mono text-[11px] tracking-[0.22em] text-[color:var(--reel)] hover:text-[color:var(--amber)] transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              className={`focus-ring group flex items-center gap-2 mono text-[10px] tracking-[0.2em] px-2.5 py-1.5 border transition-colors ${
                soundOn
                  ? "border-[color:var(--amber)] text-[color:var(--amber)]"
                  : "border-[color:var(--stone)]/40 text-[color:var(--stone)] hover:text-[color:var(--amber)] hover:border-[color:var(--amber)]"
              }`}
              aria-label={soundOn ? "Mute background audio" : "Unmute background audio"}
              aria-pressed={soundOn}
              title={soundOn ? "Mute background audio" : "Unmute background audio"}
            >
              {soundOn ? <Volume2 className="w-3.5 h-3.5" aria-hidden /> : <VolumeX className="w-3.5 h-3.5" aria-hidden />}
              <span className="hidden sm:inline">{soundOn ? "SOUND ON" : "MUTED"}</span>
            </button>
            <span className="hidden md:inline mono text-[9px] tracking-[0.2em] text-[color:var(--stone)]">TC</span>
            <Timecode />
          </div>
        </div>
      </nav>

      {/* Mobile links row */}
      <div className="md:hidden flex items-center justify-center gap-6 border-t hairline py-2">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            activeProps={{ className: "text-[color:var(--amber)]" }}
            className="focus-ring mono text-[10px] tracking-[0.22em] text-[color:var(--reel)]"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
