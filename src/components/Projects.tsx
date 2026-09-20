"use client";

import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { Eyebrow, FadeUp, TextReveal } from "./primitives";
import {
  projectFilters,
  projects,
  type DisciplineId,
  type Project,
} from "@/lib/content";

const ACCENT: Record<Project["accent"], string> = {
  orange: "#cf7822",
  mint: "#45a868",
  cobalt: "#7482fe",
  purple: "#8e77ff",
  amber: "#b48a05",
  pink: "#e5578c",
};

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="mono-label rounded-pill border border-ink/14 px-2.5 py-1 text-ink/55">
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

  const accent = ACCENT[p.accent];

  return (
    <motion.article
      ref={ref}
      className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-ink/12 bg-stone-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-ink/25 hover:shadow-[0_24px_60px_-24px_rgba(39,37,30,0.25)]"
      initial={{ opacity: 0, y: 46 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6% 0px -6% 0px" }}
      transition={{ duration: 0.9, delay: (index % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <span
        className="absolute inset-x-0 top-0 z-20 h-px origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
        style={{ background: accent }}
      />

      {/* Screenshot of the live site, at its native 16:10 */}
      <div className="relative aspect-[16/10] overflow-hidden border-b border-ink/10 bg-stone-1100">
        {p.thumb ? (
          <>
            <motion.div
              className="absolute inset-0 scale-[1.06]"
              style={reduce ? undefined : { y: mediaY }}
            >
              <Image
                src={p.thumb}
                alt={`${p.title} — screenshot of the live site`}
                fill
                sizes="(max-width: 1024px) 100vw, 640px"
                className="object-cover object-top transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              />
            </motion.div>
            <div
              className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/10"
              aria-hidden="true"
            />
          </>
        ) : (
          <>
            <div className="dot-grid absolute inset-0 opacity-45" />
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <Schematic project={p} accent={accent} />
            </div>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col p-7 md:p-8">
        <div className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
          <span className="mono-label text-ink/45">{p.eyebrow}</span>
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
                className="mt-[5px] h-3 w-3 shrink-0"
                fill="none"
                stroke={accent}
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

/** Wireframe panel built from the project's own stack labels. */
function Schematic({ project, accent }: { project: Project; accent: string }) {
  const rows = project.stack.slice(0, 5);
  return (
    <div className="w-full max-w-[320px]">
      <div className="mb-4 flex items-center gap-1.5">
        {["#f05356", "#e9b40b", "#6fd790"].map((c) => (
          <span
            key={c}
            className="h-2 w-2 rounded-full"
            style={{ background: c, opacity: 0.55 }}
          />
        ))}
        <span className="mono-label ml-2 text-stone-650">{project.id}</span>
      </div>

      <div className="space-y-2">
        {rows.map((r, i) => (
          <motion.div
            key={r}
            className="flex items-center gap-3 rounded-lg border border-stone-100/10 bg-stone-100/3 px-3 py-2.5"
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.65,
              delay: 0.15 + i * 0.09,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: i === 0 ? accent : "#625d58" }}
            />
            <span className="mono-label truncate text-stone-500">{r}</span>
            <span className="ml-auto h-px flex-1 max-w-[52px] bg-stone-100/12" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function GridCard({ p, index }: { p: Project; index: number }) {
  const accent = ACCENT[p.accent];
  return (
    <motion.article
      className="group relative flex w-full flex-col overflow-hidden rounded-xl border border-ink/12 bg-stone-50 p-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-ink/25 hover:shadow-[0_18px_48px_-18px_rgba(39,37,30,0.22)] md:p-7"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6% 0px -6% 0px" }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.09, ease: [0.16, 1, 0.3, 1] }}
    >
      <span
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
        style={{ background: accent }}
      />

      <div className="flex items-center gap-2.5">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
        <span className="mono-label text-ink/45">{p.eyebrow}</span>
      </div>

      <h3 className="display mt-4 text-[1.55rem] leading-[1.12] text-ink">{p.title}</h3>
      <p className="mt-3 text-[14.5px] leading-relaxed text-ink/60">{p.summary}</p>

      <ul className="mt-5 space-y-2">
        {p.outcomes.map((o) => (
          <li key={o} className="flex gap-2.5 text-[13.5px] leading-relaxed text-ink/70">
            <span
              className="mt-[7px] h-1 w-1 shrink-0 rounded-full"
              style={{ background: accent }}
            />
            {o}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
        {p.stack.map((s) => (
          <Chip key={s}>{s}</Chip>
        ))}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<DisciplineId | "all">("all");

  const counts = useMemo(
    () => ({
      all: projects.length,
      web: projects.filter((p) => p.discipline === "web").length,
      automation: projects.filter((p) => p.discipline === "automation").length,
    }),
    [],
  );

  const visible = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((p) => p.discipline === filter),
    [filter],
  );

  const featured = visible.filter((p) => p.featured);
  const rest = visible.filter((p) => !p.featured);

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
            accentClassName="italic text-orange-600"
          />
          <FadeUp delay={0.15}>
            <p className="lede max-w-[38ch] text-ink/55">
              Websites and web apps first — then the automation work I take on
              separately. Each one with the outcome it produced.
            </p>
          </FadeUp>
        </div>

        {/* Practice filter — the two disciplines are browsable separately */}
        <FadeUp delay={0.2}>
          <LayoutGroup id="project-filter">
            <div
              role="tablist"
              aria-label="Filter projects by practice"
              className="mt-12 flex flex-wrap gap-1.5 md:mt-16"
            >
              {projectFilters.map((f) => {
                const isActive = filter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setFilter(f.id)}
                    className={`relative rounded-pill px-4 py-2.5 transition-colors duration-300 ${
                      isActive ? "text-stone-50" : "text-ink/55 hover:text-ink"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="project-filter-pill"
                        className="absolute inset-0 rounded-pill bg-ink"
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                    <span className="mono-label relative flex items-center gap-2">
                      {f.label}
                      <span className={isActive ? "text-stone-400" : "text-ink/35"}>
                        {counts[f.id]}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </FadeUp>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {featured.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                className="flex"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16, transition: { duration: 0.3 } }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <FeaturedCard p={p} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {rest.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                className="flex"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.3 } }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <GridCard p={p} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
