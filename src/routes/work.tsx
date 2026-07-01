import { createFileRoute } from "@tanstack/react-router";
import { PageFrame } from "@/components/site/PageFrame";
import { WorkTile } from "@/components/site/WorkTile";
import { work } from "@/data/work";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — Rob Melamed" },
      {
        name: "description",
        content:
          "Selected commercial, broadcast and screen work — composed, produced and mixed by Rob Melamed. McDonald's, Walmart, Hyundai, Kia, Hallmark and more.",
      },
      { property: "og:title", content: "Work — Rob Melamed" },
      {
        property: "og:description",
        content:
          "A working reel of national commercial, broadcast, and screen work — score, casting, and mix, one composer start to finish.",

      },
      { property: "og:url", content: "/work" },
    ],
    links: [{ rel: "canonical", href: "/work" }],
  }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <PageFrame surface="ink">
      {/* Header */}
      <section className="border-b hairline">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 pt-14 pb-10 md:pt-20 md:pb-14">
          <div className="mono text-[10px] tracking-[0.3em] text-[color:var(--stone)] mb-5">
            — SESSION LOG &nbsp;/&nbsp; {work.length.toString().padStart(2, "0")} CUES —
          </div>
          <h1 className="text-[clamp(2.25rem,5vw,4rem)] font-semibold tracking-[-0.03em] leading-[1.02] max-w-4xl">
            The work.<span className="text-[color:var(--amber)]"> Locked to picture.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[color:var(--stone)] leading-relaxed">
            Selected commercial, broadcast and screen pieces. Click any tile to play the
            full spot.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-[1400px] px-5 md:px-10 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {work.map((piece, i) => (
            <WorkTile key={piece.slug} piece={piece} index={i} />
          ))}
        </div>

        <div className="mt-16 border-t hairline pt-8 mono text-[10px] tracking-[0.22em] text-[color:var(--stone)] flex flex-wrap items-center justify-between gap-4">
          <span>— END OF LOG —</span>
        </div>
      </section>
    </PageFrame>
  );
}
