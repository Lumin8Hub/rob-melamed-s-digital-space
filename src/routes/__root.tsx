import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AudioProvider } from "../components/site/AudioProvider";
import { EntryGate } from "../components/site/EntryGate";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[color:var(--ink)] text-[color:var(--reel)] px-4">
      <div className="max-w-md text-center">
        <div className="mono text-[10px] tracking-[0.3em] text-[color:var(--stone)] mb-4">— OFFLINE / NO SIGNAL —</div>
        <h1 className="text-6xl font-semibold tracking-[-0.03em]">404</h1>
        <p className="mt-3 mono text-[11px] tracking-[0.15em] text-[color:var(--stone)]">
          THIS CUE DOES NOT EXIST.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="mono text-[11px] tracking-[0.22em] px-5 py-3 border border-[color:var(--amber)] text-[color:var(--amber)] hover:bg-[color:var(--amber)] hover:text-[color:var(--ink)] transition-colors"
          >
            ▸ RETURN TO SESSION
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[color:var(--ink)] text-[color:var(--reel)] px-4">
      <div className="max-w-md text-center">
        <div className="mono text-[10px] tracking-[0.3em] text-[color:var(--tally)] mb-4">— DROP OUT —</div>
        <h1 className="text-xl font-semibold tracking-[-0.02em]">This page didn't load.</h1>
        <p className="mt-2 mono text-[11px] tracking-[0.15em] text-[color:var(--stone)]">
          SOMETHING BROKE IN THE CHAIN. TRY AGAIN.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="mono text-[11px] tracking-[0.22em] px-4 py-3 border border-[color:var(--amber)] text-[color:var(--amber)] hover:bg-[color:var(--amber)] hover:text-[color:var(--ink)] transition-colors"
          >
            ▸ RETRY
          </button>
          <a
            href="/"
            className="mono text-[11px] tracking-[0.22em] px-4 py-3 border hairline text-[color:var(--reel)] hover:border-[color:var(--reel)] transition-colors"
          >
            HOME
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Rob Melamed — Composer, Audio Producer, Voice Director" },
      {
        name: "description",
        content:
          "One-person post-audio house for national brands. Score, casting, voice direction and final mix from a single room in Toronto.",
      },
      { name: "author", content: "Rob Melamed" },
      { name: "theme-color", content: "#0C0C0E" },
      { property: "og:site_name", content: "Rob Melamed" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      // Prefix static /public assets with Vite's BASE_URL so they resolve under
      // GitHub Pages' subpath (/<repo>/) as well as under root ("/").
      { rel: "icon", type: "image/svg+xml", href: `${import.meta.env.BASE_URL}favicon.svg` },
      { rel: "apple-touch-icon", sizes: "180x180", href: `${import.meta.env.BASE_URL}apple-touch-icon.png` },
      { rel: "manifest", href: `${import.meta.env.BASE_URL}site.webmanifest` },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Rob Melamed",
          jobTitle: "Composer, Audio Producer, Voice Director",
          url: "/",
          address: { "@type": "PostalAddress", addressLocality: "Toronto", addressRegion: "ON", addressCountry: "CA" },
          sameAs: [
            "https://www.linkedin.com/in/rob-melamed-4b515812",
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AudioProvider>
        <EntryGate />
        <Outlet />
      </AudioProvider>
    </QueryClientProvider>
  );
}
