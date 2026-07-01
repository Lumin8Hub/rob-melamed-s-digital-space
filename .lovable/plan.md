
# Rob Melamed — Signature Site build

The brief locks the visual direction (palette, type, motion, signature device), so I'm skipping design-direction exploration and building the spec directly.

## Scope (v1)

Four routes, exactly as the brief specifies:

- `/` Home — entry gate, reel, positioning, trust strip
- `/work` Work — single grid of pieces (hero of the site)
- `/about` About — story, pedigree, awards
- `/contact` Contact — intake form + direct paths

Skipping for v1 (per brief): `/work/[slug]`, private WIP page, music library.

## Design system (built once, used everywhere)

Tokens in `src/styles.css` (oklch values mapped from the brief's hex):

- `--ink-black` `#0C0C0E` — canvas for Home + Work
- `--reel-white` `#F5F2EA` — canvas for About + Contact, text-on-dark
- `--timecode-amber` `#E8A33D` — links, hovers, timecode readouts
- `--tally-red` `#D14B3D` — reserved exclusively for the "now playing" indicator
- `--stone-gray` `#8B887F` — secondary text, hairlines

Fonts loaded via `<link>` in `__root.tsx` head (Tailwind v4 rule): **IBM Plex Sans** (400/600/700, tight tracking on display) + **IBM Plex Mono** (400/500) — mono used *only* for timecodes, nav labels, work-grid captions, footer.

Tailwind theme tokens wire the colors and fonts into utility classes; shadcn components are not used for the marketing surfaces (would dilute the system).

## Signature components

- **`<Timecode />`** — live SMPTE-style `HH:MM:SS:FF` readout (24fps), `requestAnimationFrame`-driven, in mono + amber. Respects `prefers-reduced-motion` (freezes to a static frame). Used in the nav bar continuously, plus as a label/divider on Work tiles and section transitions.
- **`<EntryGate />`** — full-screen "ENTER — REEL, SOUND ON" overlay. Tap unmounts the gate, sets a session flag so it doesn't re-trigger on internal nav, and signals the hero video to unmute. Skip path for reduced-motion users (auto-bypass, muted reel).
- **`<NavBar />`** — wordmark left, `WORK / ABOUT / CONTACT` mono links center-right, live timecode far right.
- **`<Footer />`** — mono, minimal: email, LinkedIn, IMDb, © year, one timecode line.
- **`<WorkTile />`** — poster frame, muted loop on hover, amber timecode flicker + small scale-up. Crawlable text under the tile: brand · role · year. Click opens a lightbox playing the Vimeo embed.

Motion: opacity + 8–12px rise on scroll reveal (Framer Motion, single shared variant). No custom cursor, no parallax, no page transitions.

## Page contents

**Home** (`/`, ink-black):
- EntryGate overlay on first visit
- Full-bleed muted reel loop (placeholder MP4 until Rob delivers; use a generated cinematic placeholder)
- Recommended headline: *"A one-person post-audio house for brands that want the budget on screen, not in the boardroom."*
- Two CTAs: `See the work` → /work, `Start a project` → /contact
- Trust strip: McDonald's · Walmart · Hyundai · Kia (text-only mono wordmarks, since logos need Rob's sign-off)

**Work** (`/work`, ink-black):
- Single responsive grid (1 col mobile, 2 tablet, 3 desktop), no tabs
- Seed with 6–8 placeholder tiles using the confirmed brands from the brief (brand · role · year). Real Vimeo IDs swapped in later — wire the lightbox to accept a Vimeo ID prop now.

**About** (`/about`, reel-white):
- Portrait — use the uploaded "white shirt at wood table" environmental photo (closest to "in the room" warmth); fall back to the headshot if Rob prefers.
- Body copy verbatim from the brief's revised About (Ryan McLarnon credit intact, bracketed `[X years]` left as visible placeholder so Rob spots it).
- Quick-facts strip in mono.

**Contact** (`/contact`, reel-white):
- Headline: *"Tell me about the spot."*
- Fields per brief: Name, Agency, Email, Project type (select), Message, Timeline (optional).
- Form posts to a placeholder endpoint (Formspree-shaped) — clearly commented for swap. No backend.
- Secondary path: mailto + LinkedIn.

## SEO

Per-route `head()` with unique title/description/OG. Single H1 per page. Person + CreativeWork JSON-LD on Home and About. Crawlable text on every Work tile. `og:image` on leaf routes only (use the portrait on About, a reel poster on Home/Work).

## Technical notes

- TanStack Start route files under `src/routes/` — `index.tsx` (replace placeholder), `work.tsx`, `about.tsx`, `contact.tsx`.
- Uploaded photos uploaded as Lovable Assets (CDN), referenced via `.asset.json` pointers.
- Reel hero loop: generate a short cinematic placeholder image (looped Ken Burns) since we can't generate video here; comment marks the swap point for Rob's real MP4.
- All animation gated behind `useReducedMotion()`.

## Out of scope (call out to the user after build)

- Vimeo IDs, real reel MP4, ambient audio bed, logo assets, final About wording, Formspree key, DNS cutover, analytics — all listed in the brief's Section 7 checklist as Rob-supplied.

## Files to create / change

- `src/styles.css` — add tokens + theme mappings
- `src/routes/__root.tsx` — font `<link>`s, default meta
- `src/routes/index.tsx` — replace placeholder, Home
- `src/routes/work.tsx`, `src/routes/about.tsx`, `src/routes/contact.tsx` — new
- `src/components/site/` — `NavBar`, `Footer`, `Timecode`, `EntryGate`, `WorkTile`, `VimeoLightbox`, `Reveal`
- `src/data/work.ts` — tile data (brand, role, year, vimeoId, poster)
- `src/assets/` — Lovable Asset pointers for the portrait + a generated reel poster
- `bun add framer-motion` (for restrained motion + reduced-motion hook)

Ready to build on approval.
