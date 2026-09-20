"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { Eyebrow, FadeUp, TextReveal } from "./primitives";
import { projects, type Project } from "@/lib/content";


function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="mono-label rounded-pill border border-ink/20 px-2.5 py-1 text-ink/60">
      {children}
    </span>
  );
}

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M4 12 12 4M6 4h6v6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FeaturedCard({ p, index }: { p: Project; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Gentle drift inside the frame — the image is over-scaled to cover it.
  const mediaY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <motion.article
      ref={ref}
      className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-ink/12 bg-stone-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-ink/25 hover:shadow-[0_24px_60px_-24px_rgba(39,37,30,0.25)]"
      initial={{ opacity: 0, y: 46 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6% 0px -6% 0px" }}
      transition={{ duration: 0.9, delay: (index % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="absolute inset-x-0 top-0 z-20 h-px origin-left scale-x-0 bg-ink transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />

      {/* Screenshot of the live site, at its native 16:10 */}
      <div className="relative aspect-[16/10] overflow-hidden border-b border-ink/10 bg-stone-1100">
        <motion.div
          className="absolute inset-0 scale-[1.06]"
          style={reduce ? undefined : { y: mediaY }}
        >
          <Image
            src={p.thumb}
            alt={`${p.title} — screenshot of the live site`}
            fill
            sizes="(max-width: 1024px) 100vw, 640px"
            className="object-cover object-top grayscale transition-[filter,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] group-hover:grayscale-0"
          />
        </motion.div>
        <div
          className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/10"
          aria-hidden="true"
        />
      </div>

      <div className="flex flex-1 flex-col p-7 md:p-8">
        <div className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-ink" />
          <span className="mono-label text-ink/60">{p.eyebrow}</span>
        </div>

        <h3 className="display mt-4 text-[clamp(1.6rem,2.4vw,2rem)] leading-[1.1] text-ink">
          {p.title}
        </h3>
        <p className="mt-3 max-w-[52ch] text-[14.5px] leading-relaxed text-ink/60">
          {p.summary}
        </p>

        <ul className="mt-6 space-y-2.5">
          {p.outcomes.map((o) => (
            <li key={o} className="flex gap-2.5 text-[13.5px] leading-relaxed text-ink/70">
              <svg
                viewBox="0 0 16 16"
                className="mt-[5px] h-3 w-3 shrink-0 text-ink"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                aria-hidden="true"
              >
                <path d="m3 8.5 3.2 3.2L13 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {o}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
          {p.stack.map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </div>

        {p.href && (
          <a
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mono-label mt-7 inline-flex w-fit items-center gap-2 rounded-pill bg-ink px-5 py-3 text-stone-50 transition-colors duration-300 hover:bg-stone-900"
          >
            {p.hrefLabel ?? "Open"}
            <ArrowIcon className="h-3 w-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        )}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative z-10 -mt-8 rounded-t-[28px] bg-cream text-ink shadow-[0_-30px_80px_-30px_rgba(0,0,0,0.75)] md:rounded-t-[40px]"
    >
      <div className="shell py-24 md:py-32">
        <FadeUp>
          <Eyebrow tone="ink">Projects</Eyebrow>
        </FadeUp>

        <div className="mt-7 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <TextReveal
            as="h2"
            text="Things I have shipped, and what they _changed_."
            className="display display-lg max-w-[16ch] text-ink"
            accentClassName="italic text-ink"
          />
          <FadeUp delay={0.15}>
            <p className="lede max-w-[38ch] text-ink/60">
              Websites and web apps built end to end, each one live — with the
              outcome it produced.
            </p>
          </FadeUp>
        </div>

        <div className="mt-14 grid gap-6 md:mt-16 lg:grid-cols-2">
          {projects.map((p, i) => (
            <FeaturedCard key={p.id} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
