"use client";

import { motion } from "motion/react";
import { Stagger, staggerChild } from "./primitives";
import { disciplines } from "@/lib/content";

/**
 * The two practices, deliberately unequal: web development is the primary
 * offer and gets the larger, warmer card; automation is a quieter sibling.
 */
export default function Practices() {
  return (
    <Stagger className="grid gap-5 lg:grid-cols-[1.55fr_1fr]">
      {disciplines.map((d) => {
        const isPrimary = d.primary;

        return (
          <motion.article
            key={d.id}
            variants={staggerChild}
            className={`group relative flex flex-col overflow-hidden rounded-2xl border transition-colors duration-500 ${
              isPrimary
                ? "border-orange-500/25 bg-[linear-gradient(160deg,rgba(255,165,87,0.07),rgba(249,245,239,0.02)_55%)] p-7 hover:border-orange-500/45 md:p-10"
                : "border-stone-100/10 bg-stone-100/[0.02] p-7 hover:border-stone-100/20 md:p-8"
            }`}
          >
            {isPrimary && (
              <span
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-orange-500/70 via-orange-500/25 to-transparent"
                aria-hidden="true"
              />
            )}
            <div
              className={`pointer-events-none absolute -right-10 -top-10 rounded-full blur-3xl transition-opacity duration-700 ${
                isPrimary
                  ? "h-56 w-56 bg-orange-500/12 opacity-70 group-hover:opacity-100"
                  : "h-32 w-32 bg-stone-100/5 opacity-0 group-hover:opacity-100"
              }`}
              aria-hidden="true"
            />

            <div className="relative flex flex-wrap items-center gap-x-3 gap-y-2">
              <span
                className={`mono-label ${isPrimary ? "text-orange-500" : "text-stone-700"}`}
              >
                {d.index}
              </span>
              <span
                className={`mono-label rounded-pill border px-2.5 py-1 ${
                  isPrimary
                    ? "border-orange-500/30 text-orange-500"
                    : "border-stone-100/12 text-stone-700"
                }`}
              >
                {d.tier}
              </span>
              <span className="mono-label text-stone-650">{d.role}</span>
            </div>

            <h3
              className={`display relative mt-5 leading-[1.05] text-stone-100 ${
                isPrimary
                  ? "text-[clamp(1.9rem,3.4vw,2.9rem)]"
                  : "text-[clamp(1.5rem,2.2vw,1.85rem)]"
              }`}
            >
              {d.name}
            </h3>

            <p
              className={`relative mt-3 leading-relaxed ${
                isPrimary ? "text-[16.5px] text-stone-200" : "text-[14.5px] text-stone-400"
              }`}
            >
              {d.claim}
            </p>
            <p
              className={`relative mt-4 max-w-[52ch] leading-relaxed ${
                isPrimary ? "text-[15px] text-stone-500" : "text-[13.5px] text-stone-650"
              }`}
            >
              {d.body}
            </p>

            <div className="relative mt-auto flex flex-wrap gap-1.5 pt-7">
              {d.keywords.map((k) => (
                <span
                  key={k}
                  className={`mono-label rounded-pill border px-2.5 py-1 transition-colors duration-500 ${
                    isPrimary
                      ? "border-orange-500/20 text-stone-400 group-hover:border-orange-500/35 group-hover:text-stone-200"
                      : "border-stone-100/10 text-stone-700 group-hover:text-stone-600"
                  }`}
                >
                  {k}
                </span>
              ))}
            </div>

            {d.resume && (
              <a
                href={d.resume}
                download
                className={`mono-label relative mt-7 inline-flex w-fit items-center gap-2 transition-colors duration-300 ${
                  isPrimary
                    ? "rounded-pill bg-cream px-5 py-2.5 text-stone-1100 hover:bg-white"
                    : "text-stone-600 hover:text-stone-300"
                }`}
              >
                {isPrimary ? "Download this résumé" : `${d.name} résumé`}
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
            )}

            {d.portfolio && (
              <a
                href={d.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="mono-label group/link relative mt-7 inline-flex w-fit items-center gap-2 rounded-pill border border-stone-100/18 px-5 py-2.5 text-stone-300 transition-colors duration-300 hover:border-stone-100/40 hover:text-stone-100"
              >
                View automation portfolio
                <svg
                  viewBox="0 0 16 16"
                  className="h-3 w-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path
                    d="M4 12 12 4M6 4h6v6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            )}
          </motion.article>
        );
      })}
    </Stagger>
  );
}
