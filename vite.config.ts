// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// GitHub Pages build: emit a fully static, prerendered site served under a subpath
// (https://<user>.github.io/<repo>/). Gated behind GITHUB_PAGES=true, which ONLY the
// Pages CI workflow sets — Lovable's own Cloudflare/Nitro build never sets it and
// is therefore completely unaffected, so the in-editor preview keeps working.
//
// Nitro is disabled for this build on purpose: the Lovable config forces Nitro
// into a Cloudflare ".output/" layout, but TanStack Start's prerender expects the
// server at "dist/server/server.js". Turning Nitro off lets Start emit its native
// "dist/" layout and prerender cleanly under Node → static HTML in "dist/client/".
//
// PAGES_BASE is provided by the workflow (e.g. "/rob-melamed-s-digital-space/").
// Trailing slash is required by Vite. Falls back to "/" for local static builds.
const isPages = process.env.GITHUB_PAGES === "true";
const pagesBase = process.env.PAGES_BASE || "/";

export default defineConfig({
  ...(isPages ? { nitro: false, vite: { base: pagesBase } } : {}),
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(isPages
      ? { prerender: { enabled: true, crawlLinks: true } }
      : {}),
  },
});
