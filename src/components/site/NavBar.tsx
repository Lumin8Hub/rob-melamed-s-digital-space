import { Link } from "@tanstack/react-router";
import { Timecode } from "./Timecode";

const links = [
  { to: "/work", label: "WORK" },
  { to: "/about", label: "ABOUT" },
  { to: "/contact", label: "CONTACT" },
] as const;

export function NavBar() {
  return (
    <header className="sticky top-0 z-40 border-b hairline bg-[color:var(--ink)]/85 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--ink)]/70">
      <nav className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-5 md:px-10">
        <Link
          to="/"
          className="mono text-[12px] tracking-[0.18em] text-[color:var(--reel)] hover:text-[color:var(--amber)] transition-colors"
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
                  className="mono text-[11px] tracking-[0.22em] text-[color:var(--reel)] hover:text-[color:var(--amber)] transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <span className="mono text-[9px] tracking-[0.2em] text-[color:var(--stone)]">TC</span>
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
            className="mono text-[10px] tracking-[0.22em] text-[color:var(--reel)]"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
