import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { PageFrame } from "@/components/site/PageFrame";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Rob Melamed" },
      {
        name: "description",
        content: "Tell me about the spot. Direct line to Rob Melamed — Toronto composer and audio producer.",
      },
      { property: "og:title", content: "Contact — Rob Melamed" },
      {
        property: "og:description",
        content: "Tell me about the spot. Frictionless brief intake.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

// Rob's form endpoint (Formspree / Web3Forms). Until this is set, the form
// falls back to a pre-filled email so a brief is never silently lost.
const FORM_ENDPOINT = "";

function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // No endpoint configured yet → open a pre-filled email so the brief still reaches Rob.
    if (!FORM_ENDPOINT) {
      const body = [
        `Name: ${data.get("name") ?? ""}`,
        `Agency / Studio: ${data.get("agency") ?? ""}`,
        `Email: ${data.get("email") ?? ""}`,
        `Project type: ${data.get("type") ?? ""}`,
        `Timeline: ${data.get("timeline") ?? ""}`,
        "",
        `${data.get("message") ?? ""}`,
      ].join("\n");
      window.location.href = `mailto:rob@robmelamed.com?subject=${encodeURIComponent(
        `New brief — ${data.get("name") ?? ""}`,
      )}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
      return;
    }

    try {
      setStatus("sending");
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <PageFrame surface="reel">
      <div className="bg-[color:var(--reel)] text-[color:var(--ink)]">
        <section className="mx-auto max-w-[1400px] px-5 md:px-10 pt-14 md:pt-20 pb-10">
          <div className="mono text-[10px] tracking-[0.3em] text-[color:var(--stone)] mb-5">
            — 00:03 &nbsp;/&nbsp; CONTACT —
          </div>
          <h1 className="text-[clamp(2.25rem,5.5vw,4.5rem)] font-semibold tracking-[-0.035em] leading-[1.02] max-w-3xl">
            Tell me about <span className="text-[color:var(--tally)]">the spot.</span>
          </h1>
          <p className="mt-5 max-w-xl text-[color:var(--ink)]/75 leading-relaxed">
            Producers, agency creatives, showrunners — send the brief. If it's a
            fit, you'll hear back within a working day.
          </p>
        </section>

        <section className="mx-auto max-w-[1400px] px-5 md:px-10 pb-24 grid md:grid-cols-12 gap-12">
          {/* Form */}
          <form onSubmit={onSubmit} className="md:col-span-8 grid gap-5">
            <Field label="Name" name="name" required autoComplete="name" />
            <Field label="Agency / Studio" name="agency" autoComplete="organization" />
            <Field label="Email" name="email" type="email" required autoComplete="email" />

            <div className="grid gap-2">
              <label className="mono text-[10px] tracking-[0.22em] text-[color:var(--stone)]">
                PROJECT TYPE
              </label>
              <select
                name="type"
                required
                className="mono text-[13px] bg-transparent border-b border-[color:var(--ink)]/30 focus:border-[color:var(--tally)] outline-none py-3"
                defaultValue=""
              >
                <option value="" disabled>Select…</option>
                <option>Brand campaign</option>
                <option>Broadcast</option>
                <option>Film &amp; TV</option>
                <option>Other</option>
              </select>
            </div>

            <div className="grid gap-2">
              <label className="mono text-[10px] tracking-[0.22em] text-[color:var(--stone)]">
                MESSAGE
              </label>
              <textarea
                name="message"
                rows={6}
                required
                placeholder="Air date, deliverables, references, anything you'd send a composer…"
                className="text-base bg-transparent border border-[color:var(--ink)]/20 focus:border-[color:var(--tally)] outline-none p-4 resize-y placeholder:text-[color:var(--stone)]"
              />
            </div>

            <Field label="Timeline (optional)" name="timeline" placeholder="e.g. Air late April" />

            <div className="pt-4 flex items-center gap-4">
              <button
                type="submit"
                disabled={status === "sending"}
                className="mono text-[11px] tracking-[0.25em] px-6 py-3.5 bg-[color:var(--ink)] text-[color:var(--reel)] hover:bg-[color:var(--tally)] transition-colors disabled:opacity-60"
              >
                {status === "sending" ? "▸ SENDING…" : "▸ SEND BRIEF"}
              </button>
              {status === "sent" && (
                <span className="mono text-[10px] tracking-[0.2em] text-[color:var(--tally)]">
                  — RECEIVED. THANK YOU. —
                </span>
              )}
              {status === "error" && (
                <span className="mono text-[10px] tracking-[0.2em] text-[color:var(--tally)]">
                  — DIDN'T SEND — EMAIL rob@robmelamed.com —
                </span>
              )}
            </div>
          </form>

          {/* Direct paths */}
          <aside className="md:col-span-4 space-y-6 border-t md:border-t-0 md:border-l border-[color:var(--ink)]/15 md:pl-10 pt-8 md:pt-0">
            <div>
              <div className="mono text-[10px] tracking-[0.22em] text-[color:var(--stone)] mb-2">
                DIRECT
              </div>
              <a
                href="mailto:rob@robmelamed.com"
                className="text-lg font-medium hover:text-[color:var(--tally)] transition-colors"
              >
                rob@robmelamed.com
              </a>
            </div>
            <div>
              <div className="mono text-[10px] tracking-[0.22em] text-[color:var(--stone)] mb-2">
                ELSEWHERE
              </div>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://www.linkedin.com/in/rob-melamed-4b515812"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[color:var(--tally)] transition-colors"
                  >
                    LinkedIn ↗
                  </a>
                </li>
                {/* IMDb — restore once Rob's profile URL is confirmed. */}
              </ul>
            </div>
            <div>
              <div className="mono text-[10px] tracking-[0.22em] text-[color:var(--stone)] mb-2">
                BASED IN
              </div>
              <div>Toronto, ON — working nationally.</div>
            </div>
          </aside>
        </section>
      </div>
    </PageFrame>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div className="grid gap-2">
      <label className="mono text-[10px] tracking-[0.22em] text-[color:var(--stone)]">
        {label.toUpperCase()}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="text-base bg-transparent border-b border-[color:var(--ink)]/30 focus:border-[color:var(--tally)] outline-none py-3 placeholder:text-[color:var(--stone)]"
      />
    </div>
  );
}
