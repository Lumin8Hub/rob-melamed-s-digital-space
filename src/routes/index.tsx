import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageFrame } from "@/components/site/PageFrame";
import { EntryGate } from "@/components/site/EntryGate";
import { Timecode } from "@/components/site/Timecode";
import reelPosterUrl from "@/assets/reel-poster.jpg";
import heroVideoUrl from "@/assets/hero-video.mp4";

const reelPoster = { url: reelPosterUrl };

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rob Melamed — One-Person Post-Audio for National Brands" },
      {
        name: "description",
        content:
          "A one-person post-audio house for brands that want the budget on screen, not in the boardroom. Score, casting, voice direction and mix from one set of ears in Toronto.",
      },
      { property: "og:title", content: "Rob Melamed — Post-Audio" },
      {
        property: "og:description",
        content: "One-person post-audio house for national brands. Toronto.",
      },
      { property: "og:image", content: reelPoster.url },
      { property: "og:url", content: "/" },
      { name: "twitter:image", content: reelPoster.url },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const trust = ["McDonald's", "Walmart", "Hyundai", "Kia", "Hallmark", "Lionsgate"];

function Index() {
  const [soundOn, setSoundOn] = useState(false);

  return (
    <>
      <EntryGate onEnter={setSoundOn} />
      <PageFrame surface="ink">
        {/* HERO */}
        <section className="relative">
          <div className="relative h-[86vh] min-h-[560px] w-full overflow-hidden">
            {/* Placeholder poster — swap for <video muted loop playsInline autoPlay> with Rob's reel MP4 */}
            <img
              src={reelPoster.url}
              alt="Rob Melamed reel — background still"
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--ink)]/40 via-[color:var(--ink)]/20 to-[color:var(--ink)]" />

            {/* Corner overlays */}
            <div className="absolute top-6 left-5 md:left-10 flex items-center gap-3 mono text-[10px] tracking-[0.25em] text-[color:var(--stone)]">
              <span className="inline-block w-2 h-2 rounded-full bg-[color:var(--tally)] tally-blink" />
              <span>REEL &nbsp;/&nbsp; {soundOn ? "SOUND ON" : "MUTED"}</span>
            </div>
            <div className="absolute top-6 right-5 md:right-10 mono text-[10px] tracking-[0.25em] text-[color:var(--amber)]">
              <Timecode />
            </div>

            {/* Hero copy */}
            <div className="relative z-10 h-full flex flex-col justify-end">
              <div className="mx-auto max-w-[1400px] w-full px-5 md:px-10 pb-14 md:pb-20 reveal">
                <h1 className="text-[clamp(2rem,5.5vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.035em] max-w-4xl">
                  A one-person post-audio house{" "}
                  <span className="text-[color:var(--amber)]">for brands that want the budget on screen,</span>{" "}
                  not in the boardroom.
                </h1>


                <div className="mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <Link
                    to="/work"
                    className="mono text-[11px] tracking-[0.25em] px-6 py-3.5 bg-[color:var(--amber)] text-[color:var(--ink)] hover:bg-[color:var(--reel)] transition-colors"
                  >
                    ▸ SEE THE WORK
                  </Link>
                  <Link
                    to="/contact"
                    className="mono text-[11px] tracking-[0.25em] px-6 py-3.5 border hairline text-[color:var(--reel)] hover:border-[color:var(--amber)] hover:text-[color:var(--amber)] transition-colors"
                  >
                    START A PROJECT
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom hairline timecode strip */}
            <div className="absolute bottom-0 inset-x-0 border-t hairline bg-[color:var(--ink)]/60 backdrop-blur-sm">
              <div className="mx-auto max-w-[1400px] px-5 md:px-10 h-9 flex items-center justify-between mono text-[9px] tracking-[0.25em] text-[color:var(--stone)]">
                <span>CH01 &nbsp;/&nbsp; MAIN</span>
                <span>24 FPS &nbsp;/&nbsp; 48 kHz</span>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST STRIP */}
        <section className="border-b hairline">
          <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-10">
            <ul className="flex flex-wrap items-center gap-x-10 gap-y-4">
              {trust.map((name) => (
                <li
                  key={name}
                  className="mono text-[13px] md:text-[15px] tracking-[0.15em] text-[color:var(--reel)]/85 hover:text-[color:var(--amber)] transition-colors"
                >
                  {name.toUpperCase()}
                </li>
              ))}
            </ul>
          </div>
        </section>


        {/* POSITIONING SECTION */}
        <section className="mx-auto max-w-[1400px] px-5 md:px-10 py-20 md:py-28 grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-8 md:col-start-5">
            <p className="text-2xl md:text-3xl leading-[1.25] tracking-[-0.02em] text-[color:var(--reel)]">
              One set of ears from first cue to final mix. No account layer, no
              hand-offs, no departmental drift. The music is never the point{" "}
              <span className="text-[color:var(--amber)]">— the story is.</span>
            </p>
            <div className="mt-10 grid sm:grid-cols-3 gap-6 mono text-[11px] tracking-[0.14em] text-[color:var(--stone)]">
              <div>
                <div className="text-[color:var(--amber)] mb-1">SCORE</div>
                Written to the edit, not around it.
              </div>
              <div>
                <div className="text-[color:var(--amber)] mb-1">VOICE</div>
                Casting and direction, wherever the session needs to happen.
              </div>
              <div>
                <div className="text-[color:var(--amber)] mb-1">MIX</div>
                Delivered ready to air. No revisions chasing revisions.
              </div>
            </div>
          </div>
        </section>


        {/* FEATURED CTA */}
        <section className="border-t hairline">
          <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em]">
                Hear it before you <span className="text-[color:var(--amber)]">take my word for it.</span>
              </h2>
            </div>
            <Link
              to="/work"
              className="mono text-[11px] tracking-[0.25em] px-6 py-3.5 border border-[color:var(--amber)] text-[color:var(--amber)] hover:bg-[color:var(--amber)] hover:text-[color:var(--ink)] transition-colors self-start md:self-auto"
            >
              ▸ WATCH THE REEL
            </Link>
          </div>
        </section>

      </PageFrame>
    </>
  );
}
