import { Timecode } from "./Timecode";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t hairline mt-24">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-10 grid gap-6 md:grid-cols-3 items-start mono text-[11px] tracking-[0.12em] text-[color:var(--stone)]">
        <div className="space-y-2">
          <div className="text-[color:var(--reel)]">ROB MELAMED</div>
          <div>Composer · Audio Producer · Voice Director</div>
          <div>Toronto, ON</div>
        </div>

        <ul className="space-y-2">
          <li>
            <a href="mailto:rob@robmelamed.com" className="hover:text-[color:var(--amber)] transition-colors">
              rob@robmelamed.com
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/rob-melamed-4b515812"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[color:var(--amber)] transition-colors"
            >
              LinkedIn ↗
            </a>
          </li>
          {/* IMDb — restore once Rob's profile URL is confirmed. */}
        </ul>

        <div className="md:text-right space-y-2">
          <div>© {year} Rob Melamed. All rights reserved.</div>
          <div className="flex md:justify-end items-center gap-2">
            <span>SESSION</span>
            <Timecode />
          </div>
        </div>
      </div>
    </footer>
  );
}
