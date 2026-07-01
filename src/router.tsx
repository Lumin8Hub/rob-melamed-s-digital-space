import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

// Vite injects BASE_URL from vite.config.ts `base` (always ends with "/").
// Local dev / Cloudflare / Lovable preview → "/". GitHub Pages → "/<repo>/".
// TanStack Router wants basepath WITHOUT the trailing slash, and undefined when "/".
const rawBase = import.meta.env.BASE_URL ?? "/";
const basepath = rawBase === "/" ? undefined : rawBase.replace(/\/$/, "");

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    basepath,
  });

  return router;
};
