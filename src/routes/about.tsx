import { createFileRoute } from "@tanstack/react-router";
import { PageFrame } from "@/components/site/PageFrame";
import portraitUrl from "@/assets/rob-portrait.png";

const portrait = { url: portraitUrl };

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Rob Melamed" },
      {
        name: "description",
        content:
          "Toronto composer, audio producer and voice director. Fifteen years in — one set of ears, from score to casting to final mix.",
      },
      { property: "og:title", content: "About — Rob Melamed" },
      {
        property: "og:description",
        content: "One set of ears, start to finish. Toronto composer and audio director.",
      },
      { property: "og:image", content: portrait.url },
      { property: "og:url", content: "/about" },
      { name: "twitter:image", content: portrait.url },
    ],
    links: [{ rel: "canonical", href: "/about" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Rob Melamed",
          jobTitle: "Composer, Audio Producer, Voice Director",
          alumniOf: "Berklee College of Music",
          worksFor: "Independent",
          award: "2× Canadian Screen Award nominee",
          address: { "@type": "PostalAddress", addressLocality: "Toronto", addressRegion: "ON", addressCountry: "CA" },
        }),
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageFrame surface="reel">
      <article className="bg-[color:var(--reel)] text-[color:var(--ink)]">
        {/* Header + portrait */}
        <section className="mx-auto max-w-[1400px] px-5 md:px-10 pt-14 md:pt-20 pb-10 grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-7">
            <h1 className="text-[clamp(2.25rem,5vw,4.25rem)] font-semibold tracking-[-0.035em] leading-[1.02]">
              One set of ears,{" "}
              <span className="text-[color:var(--tally)]">start to finish.</span>
            </h1>
          </div>

          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden border border-[color:var(--ink)]/10">
              <img
                src={portrait.url}
                alt="Rob Melamed, Toronto composer and audio producer"
                className="absolute inset-0 h-full w-full object-cover"
                loading="eager"
              />
              <div className="absolute top-3 left-3 mono text-[9px] tracking-[0.25em] text-[color:var(--reel)] mix-blend-difference">
                ROB · TORONTO
              </div>
              <div className="absolute bottom-3 right-3 mono text-[9px] tracking-[0.25em] text-[color:var(--reel)] mix-blend-difference">
                REF · 01
              </div>
            </div>
          </div>
        </section>

        {/* Body copy */}
        <section className="mx-auto max-w-[900px] px-5 md:px-10 pb-16 md:pb-24 space-y-6 text-lg md:text-xl leading-[1.55] tracking-[-0.005em]">
          <p>
            I'm a Toronto composer, audio producer and voice director. On commercial work,
            I run the whole chain myself — score, casting, voice direction, final mix.
            National brands have trusted that one room with campaigns most agencies staff
            with six people.
          </p>
          <p>
            Fifteen years in, after composing at Grayson Matthews and a film-scoring
            foundation from Berklee, I've learned the same thing twice: the music is
            never the point. The story is.
          </p>
          <p>
            On screen, my longtime scoring partner Ryan McLarnon and I have picked up
            two Canadian Screen Award nominations, most recently for the
            Hallmark/Lionsgate series{" "}
            <em className="text-[color:var(--ink)]">Mistletoe Murders</em>, with credits
            on CTV, CBC and Disney Channel.
          </p>
          <p className="text-2xl md:text-3xl font-medium tracking-[-0.02em] text-[color:var(--tally)] pt-4">
            Same standards either way. You don't get a department. You get me.
          </p>
        </section>

        {/* Quick facts strip */}
        <section className="border-t border-[color:var(--ink)]/15">
          <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mono text-[10px] tracking-[0.18em] text-[color:var(--ink)]/70">
            {[
              ["LOCATION", "Toronto, ON"],
              ["ROLE", "Composer · Audio Prod"],
              ["ROLE", "Voice Director"],
              ["EDU", "Berklee — Film Scoring"],
              ["PREV", "Grayson Matthews"],
              ["AWARDS", "2× CSA Nominee"],
            ].map(([label, value]) => (
              <div key={label + value}>
                <div className="text-[color:var(--stone)] mb-1">{label}</div>
                <div className="text-[color:var(--ink)]">{value}</div>
              </div>
            ))}
          </div>
        </section>
      </article>
    </PageFrame>
  );
}
