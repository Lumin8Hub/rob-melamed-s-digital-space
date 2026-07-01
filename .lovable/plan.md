
# Rob Melamed site — improvement plan execution

Working from the uploaded work order. Scope this round to everything Lovable can ship today with no new assets from Rob. Everything on the P0 asset-blocked list stays parked with a clear handoff note; P2/P3 items wait until real reel assets land.

## 1. Ship now (no assets needed)

### 1a. Soften the EntryGate audio claim (P0 #3)
`src/components/site/EntryGate.tsx` currently promises "THIS SITE OPENS WITH AUDIO. IT IS THE ACTUAL PRODUCT." There's no audio in the codebase — this is a false claim on the first screen. Replace with a neutral line ("Best experienced with sound") and keep the sound-on/muted choice intact so it's ready when a bed arrives.

### 1b. Favicon + apple-touch-icon + manifest (P1 #3)
No `public/` directory exists. Generate a minimalist mark using the site's Ink Black + Timecode Amber palette (a bracketed monogram `[RM]` in IBM Plex Mono, matching the SMPTE aesthetic), export as:
- `public/favicon.svg` (primary), `public/favicon.ico` (fallback)
- `public/apple-touch-icon.png` (180×180)
- `public/site.webmanifest` with name, theme_color `#0C0C0E`, background `#0C0C0E`
Wire all four into the `links`/`meta` arrays in `src/routes/__root.tsx`.

### 1c. robots.txt + sitemap.xml (P1 #4)
Static files in `public/`. Sitemap lists `/`, `/work`, `/about`, `/contact`. Robots allows all, points at sitemap. Use a placeholder base URL (`https://robmelamed.com`) with a comment marking it for swap when the real domain lands.

### 1d. Throttle the Timecode component (P1 #2)
Rewrite `src/components/site/Timecode.tsx`:
- Only call `setState` when the formatted string changes vs. the previous tick (drops ~60 renders/sec → ~24).
- Pause the rAF loop on `document.visibilitychange` when the tab is hidden; resume on visible.
- Keep the reduced-motion branch and the `startOffsetMs` API unchanged.

### 1e. Strengthen keyboard focus states (P1 #6)
Add visible focus rings (amber, 2px offset, matching the existing `WorkTile` pattern) to:
- Nav links (`NavBar.tsx`)
- Form inputs and the submit button (`contact.tsx` `Field` + form)
- EntryGate "sound on" / "muted" buttons
Use a shared utility class in `src/styles.css` to keep it consistent.

## 2. Leave parked with clear TODO comments

These are P0 items blocked on Rob. Not touching code beyond confirming the existing TODO comments read clearly — no invented values.

| Item | File | Waiting on |
|---|---|---|
| Formspree endpoint | `src/routes/contact.tsx` `FORM_ENDPOINT` | Key from Rob |
| Real Vimeo IDs | `src/data/work.ts` | 6 IDs + posters |
| IMDb link | `Footer.tsx`, `contact.tsx` | Confirmed URL |
| Grayson Matthews years / ASCAP wording | `src/routes/about.tsx` | Rob confirmation |
| Portrait/reel-poster vendoring + WebP conversion (P0 #7 + P1 #1) | `src/assets/` | Source files or live URL |
| GitHub Pages one-time setup (P0 #8) | Org settings | Human action outside repo |
| Brand credit sign-off (P0 #6) | index/work | Client approvals |

## 3. Explicitly deferred

- **P1 #5 analytics** — needs Rob's pick (Plausible vs. Fathom vs. GA4) and account.
- **P1 #7 contrast audit** — will run Lighthouse against the built preview after 1a–1e land; if `--stone` on `--ink` fails 4.5:1 for 11px text, bump the stone token one step lighter.
- **All of P2** — depends on real reel MP4 + Vimeo IDs.
- **All of P3** — product decisions, not build-ready.

## Technical notes

- Favicon SVG will be authored directly (small file, no image-gen needed for a text mark). The ICO/PNG derivatives generated in the same step.
- Timecode change is behavior-preserving; visible readout is identical, just fewer React commits.
- No new dependencies. No route changes. No dev-server restart needed.

## Files touched

- `src/components/site/EntryGate.tsx`
- `src/components/site/Timecode.tsx`
- `src/components/site/NavBar.tsx`
- `src/routes/__root.tsx`
- `src/routes/contact.tsx`
- `src/styles.css`
- `public/favicon.svg`, `public/favicon.ico`, `public/apple-touch-icon.png`, `public/site.webmanifest`, `public/robots.txt`, `public/sitemap.xml` (new)

## Verification

- Read the built preview at `/`, `/work`, `/about`, `/contact`; confirm favicon shows in the tab and focus rings appear when tabbing.
- Confirm Timecode still ticks visibly and freezes under `prefers-reduced-motion`.
- Run Lighthouse for the contrast spot-check (P1 #7) and act on the result.
