"use client";

import { motion } from "motion/react";
import { Stagger, staggerChild } from "./primitives";
import { disciplines } from "@/lib/content";

/**
 * The two practices, presented side by side and weighted equally.
 * Neither is described as supporting the other.
 */
export default function Practices() {
  return (
    <Stagger className="grid gap-5 md:grid-cols-2">
      {disciplines.map((d) => (
        <motion.article
          key={d.id}
          variants={staggerChild}
          className="group relative flex flex-col overflow-hidden rounded-2xl border border-stone-100/10 bg-stone-100/[0.025] p-7 transition-colors duration-500 hover:border-stone-100/22 hover:bg-stone-100/[0.05] md:p-9"
        >
          <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-orange-500/70 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
          <div
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-orange-500/10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
            aria-hidden="true"
          />

          <div className="relative flex items-center gap-3">
            <span className="mono-label text-orange-500">{d.index}</span>
            <span className="mono-label text-stone-650">{d.role}</span>
          </div>

          <h3 className="display relative mt-5 text-[clamp(1.6rem,2.6vw,2.1rem)] leading-[1.1] text-stone-100">
            {d.name}
          </h3>
          <p className="relative mt-3 text-[15px] leading-relaxed text-stone-300">
            {d.claim}
          </p>
          <p className="relative mt-4 max-w-[46ch] text-[14.5px] leading-relaxed text-stone-600">
            {d.body}
          </p>

          <div className="relative mt-auto flex flex-wrap gap-1.5 pt-7">
            {d.keywords.map((k) => (
              <span
                key={k}
                className="mono-label rounded-pill border border-stone-100/12 px-2.5 py-1 text-stone-600 transition-colors duration-500 group-hover:border-stone-100/22 group-hover:text-stone-500"
              >
                {k}
              </span>
            ))}
          </div>

          <a
            href={d.resume}
            download
            className="mono-label relative mt-6 inline-flex w-fit items-center gap-2 text-stone-500 transition-colors duration-300 hover:text-orange-500"
          >
            {d.name} résumé
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
          </a>
        </motion.article>
      ))}
    </Stagger>
  );
}
