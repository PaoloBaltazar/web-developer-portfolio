"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";
import ContactForm from "./ContactForm";
import GlyphField from "./GlyphField";
import { ButtonLink, Eyebrow, FadeUp, TextReveal } from "./primitives";
import { profile } from "@/lib/content";

const DETAILS = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
  { label: "Based in", value: profile.location },
  { label: "Status", value: profile.availability },
];

const ELSEWHERE = [
  { label: "LinkedIn", href: profile.links.linkedin },
  { label: "GitHub", href: profile.links.github },
  { label: "Automation portfolio", href: profile.links.automationPortfolio },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const fieldY = useTransform(scrollYProgress, [0, 1], ["18%", "-6%"]);
  const glow = useTransform(scrollYProgress, [0, 1], [0.25, 1]);

  return (
    <section
      id="contact"
      ref={ref}
      className="relative z-10 -mt-8 overflow-hidden rounded-t-[28px] bg-stone-1100 md:rounded-t-[40px]"
    >
      {/* Depth layers behind the copy */}
      <div className="hairline-grid pointer-events-none absolute inset-0 opacity-45" />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[340px]"
        style={reduce ? undefined : { y: fieldY }}
      >
        <GlyphField />
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-[560px] w-[min(900px,110vw)] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(255,165,87,0.14),transparent_66%)] blur-3xl"
        style={reduce ? undefined : { opacity: glow }}
      />

      <div className="shell relative pt-28 md:pt-40">
        <FadeUp>
          <Eyebrow>Contact</Eyebrow>
        </FadeUp>

        <TextReveal
          as="h2"
          text="Let’s build something that _ships_."
          className="display display-xl mt-7 max-w-[13ch] text-stone-100"
        />

        <FadeUp delay={0.15}>
          <p className="lede mt-7 max-w-[52ch] text-stone-600">
            I take on full-stack web development and AI automation as separate
            engagements — contract, freelance, or full-time. Tell me which one you
            need and I will tell you exactly how I would build it.
          </p>
        </FadeUp>

      </div>
      <div className="shell relative mt-14 grid gap-12 pb-28 md:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-16">
        <div>
        {/* Oversized email link */}
        <FadeUp delay={0.2}>
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex max-w-full items-center gap-4 border-b border-stone-100/15 pb-3 transition-colors duration-500 hover:border-orange-500/70"
          >
            <span className="display truncate text-[clamp(1.25rem,2.6vw,1.9rem)] text-stone-100 transition-colors duration-500 group-hover:text-orange-500">
              {profile.email}
            </span>
            <svg
              viewBox="0 0 16 16"
              className="h-4 w-4 shrink-0 text-stone-650 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:text-orange-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </FadeUp>

        {/* Résumé downloads */}
        <FadeUp delay={0.25}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <ButtonLink
              href={profile.resumes.webDev}
              download
              arrow={false}
              className="!px-6"
            >
              <span className="inline-flex items-center gap-2.5">
                Download résumé
                <svg
                  viewBox="0 0 16 16"
                  className="h-3 w-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path
                    d="M8 2v9M4.5 7.5 8 11l3.5-3.5M2.5 13.5h11"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </ButtonLink>
          </div>
        </FadeUp>

        {/* Detail grid */}
        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-stone-100/10 bg-stone-100/10 sm:grid-cols-2">
          {DETAILS.map((d, i) => (
            <motion.div
              key={d.label}
              className="bg-stone-1100 p-5"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mono-label text-stone-700">{d.label}</div>
              {d.href ? (
                <a
                  href={d.href}
                  className="mt-2 block break-words text-[15px] text-stone-200 transition-colors duration-300 hover:text-orange-500"
                >
                  {d.value}
                </a>
              ) : (
                <div className="mt-2 break-words text-[15px] text-stone-200">
                  {d.value}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Elsewhere */}
        <FadeUp delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="mono-label text-stone-700">Elsewhere</span>
            {ELSEWHERE.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mono-label group inline-flex items-center gap-2 rounded-pill border border-stone-100/12 px-4 py-2 text-stone-500 transition-colors duration-300 hover:border-stone-100/35 hover:text-stone-100"
              >
                {l.label}
                <svg
                  viewBox="0 0 16 16"
                  className="h-2.5 w-2.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path d="M4 12 12 4M6 4h6v6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            ))}
          </div>
        </FadeUp>
        </div>

        {/* Form column */}
        <FadeUp delay={0.15} className="lg:pt-1">
          <ContactForm />
        </FadeUp>
      </div>
    </section>
  );
}
