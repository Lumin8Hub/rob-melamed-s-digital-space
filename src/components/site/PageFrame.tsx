import type { ReactNode } from "react";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

export function PageFrame({
  children,
  surface = "ink",
}: {
  children: ReactNode;
  surface?: "ink" | "reel";
}) {
  const bg = surface === "reel" ? "bg-[color:var(--reel)] text-[color:var(--ink)]" : "bg-[color:var(--ink)] text-[color:var(--reel)]";
  return (
    <div className={`min-h-screen flex flex-col ${bg}`}>
      <div className={surface === "reel" ? "bg-[color:var(--ink)]" : ""}>
        <NavBar />
      </div>
      <main className="flex-1">{children}</main>
      <div className={surface === "reel" ? "bg-[color:var(--ink)] text-[color:var(--reel)]" : ""}>
        <Footer />
      </div>
    </div>
  );
}
