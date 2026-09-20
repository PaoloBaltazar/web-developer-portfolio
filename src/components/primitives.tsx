"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";
import Link from "next/link";
import { Fragment, useRef, type ReactNode } from "react";

/* ------------------------------------------------------------------
   Eyebrow — mono, uppercase, with the small status dot Griffin uses
   ------------------------------------------------------------------ */
export function Eyebrow({
  children,
  dot = true,
  tone = "muted",
  className = "",
}: {
  children: ReactNode;
  dot?: boolean;
  tone?: "muted" | "accent" | "bright" | "ink";
  className?: string;
}) {
  const toneClass =
    tone === "accent"
      ? "text-accent"
      : tone === "bright"
        ? "text-stone-200"
        : tone === "ink"
          ? "text-ink/60"
          : "text-stone-600";

  // Emphasis inverts on the light Projects panel.
  const dotClass = tone === "ink" ? "bg-accent-ink" : "bg-accent";

  return (
    <span className={`mono-label inline-flex items-center gap-2.5 ${toneClass} ${className}`}>
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${dotClass}`}
          />
          <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${dotClass}`} />
        </span>
      )}
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------
   TextReveal — per-word mask reveal, triggered once on scroll into view
   ------------------------------------------------------------------ */
export function TextReveal({
  text,
  as: Tag = "h2",
  className = "",
  delay = 0,
  stagger = 0.035,
  /** Words wrapped in _underscores_ render in italic serif, Griffin-style. */
  accentClassName = "italic text-stone-50",
}: {
  text: string;
  as?: React.ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  accentClassName?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px -12% 0px" });
  const reduce = useReducedMotion();

  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className}>
      <span className="sr-only">{text.replace(/_(.+?)_/g, "$1")}</span>
      <span aria-hidden="true">
        {words.map((word, i) => {
          // _accent_ may carry trailing punctuation, e.g. _ships_.
          const m = word.match(/^_(.+?)_([^\w]*)$/);
          const isAccent = Boolean(m);
          const clean = m ? m[1] + m[2] : word;
          return (
            <Fragment key={`${word}-${i}`}>
              <span className="reveal-mask">
                <motion.span
                  className={`inline-block will-change-transform ${isAccent ? accentClassName : ""}`}
                  initial={reduce ? { y: 0, opacity: 1 } : { y: "110%", opacity: 0 }}
                  animate={
                    inView || reduce
                      ? { y: "0%", opacity: 1 }
                      : { y: "110%", opacity: 0 }
                  }
                  transition={{
                    duration: 0.9,
                    delay: delay + i * stagger,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {clean}
                </motion.span>
              </span>
              {i < words.length - 1 ? " " : null}
            </Fragment>
          );
        })}
      </span>
    </Tag>
  );
}

/* ------------------------------------------------------------------
   FadeUp — the workhorse entrance
   ------------------------------------------------------------------ */
export function FadeUp({
  children,
  delay = 0,
  y = 28,
  className = "",
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------
   Stagger container for lists / grids
   ------------------------------------------------------------------ */
export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export function Stagger({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------
   Pill buttons — filled cream + outlined, matching Griffin's CTA pair
   ------------------------------------------------------------------ */
type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  external?: boolean;
  download?: boolean;
  className?: string;
  arrow?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant = "solid",
  external = false,
  download = false,
  className = "",
  arrow = true,
}: ButtonProps) {
  const base =
    "group relative inline-flex items-center gap-2.5 rounded-pill px-6 py-3 mono-label transition-colors duration-300 overflow-hidden";

  const styles =
    variant === "solid"
      ? "bg-cream text-stone-1100 hover:bg-white"
      : "border border-stone-100/25 text-stone-100 hover:border-stone-100/60 hover:bg-stone-100/5";

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      {arrow && (
        <svg
          viewBox="0 0 16 16"
          className="relative z-10 h-3 w-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </>
  );

  const props = {
    className: `${base} ${styles} ${className}`,
    ...(external ? { target: "_blank", rel: "noopener noreferrer" } : {}),
    ...(download ? { download: "" } : {}),
  };

  if (external || download || href.startsWith("http") || href.startsWith("/") === false) {
    return (
      <a href={href} {...props}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} {...props}>
      {inner}
    </Link>
  );
}
