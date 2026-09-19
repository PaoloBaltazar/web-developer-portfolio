"use client";

import { motion } from "motion/react";
import { Eyebrow, FadeUp, Stagger, TextReveal, staggerChild } from "./primitives";
import { capabilityPractices, experience } from "@/lib/content";

export default function Capabilities() {
  return (
    <div className="relative border-t border-stone-100/8">
      {/* ---- Experience ---- */}
      <div className="shell grid gap-12 py-24 md:py-32 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <FadeUp>
            <Eyebrow>Experience</Eyebrow>
          </FadeUp>
          <TextReveal
            as="h3"
            text="Where the reps came from."
            className="display display-md mt-6 max-w-[12ch] text-stone-100"
          />
          <FadeUp delay={0.15}>
            <p className="mt-5 max-w-[34ch] text-[14.5px] leading-relaxed text-stone-600">
              Each role is tagged with the practice it belongs to.
            </p>
          </FadeUp>
        </div>

        <ol>
          {experience.map((e, i) => (
            <motion.li
              key={e.company}
              className="group relative border-t border-stone-100/10 py-7 last:border-b"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.75, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-orange-500/60 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />

              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h4 className="text-[1.05rem] font-medium tracking-[-0.01em] text-stone-100">
                  {e.role}
                </h4>
                <span className="mono-label text-stone-700">{e.period}</span>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-2.5">
                <span className="mono-label text-stone-400">{e.company}</span>
                <span className="mono-label rounded-pill border border-stone-100/12 px-2.5 py-1 text-orange-500/80">
                  {e.discipline}
                </span>
              </div>

              <p className="mt-3 max-w-[52ch] text-[14.5px] leading-relaxed text-stone-600">
                {e.note}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>

      {/* ---- Capabilities, one block per practice ---- */}
      <div className="shell border-t border-stone-100/8 py-24 md:py-32">
        <FadeUp>
          <Eyebrow>Capabilities</Eyebrow>
        </FadeUp>
        <TextReveal
          as="h3"
          text="Two stacks, kept _apart_."
          className="display display-md mt-6 max-w-[16ch] text-stone-100"
        />

        <div className="mt-14 space-y-14 md:mt-16 md:space-y-16">
          {capabilityPractices.map((practice, pi) => {
            const isPrimary = pi === 0;
            return (
              <div key={practice.id}>
                <FadeUp>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span
                      className={`mono-label ${isPrimary ? "text-orange-500" : "text-stone-700"}`}
                    >
                      0{pi + 1}
                    </span>
                    <h4
                      className={`display leading-none ${
                        isPrimary
                          ? "text-[1.75rem] text-stone-100"
                          : "text-[1.35rem] text-stone-400"
                      }`}
                    >
                      {practice.name}
                    </h4>
                    <span
                      className={`mono-label rounded-pill border px-2.5 py-1 ${
                        isPrimary
                          ? "border-orange-500/30 text-orange-500"
                          : "border-stone-100/12 text-stone-700"
                      }`}
                    >
                      {practice.tier}
                    </span>
                    <span className="h-px flex-1 bg-stone-100/12" />
                  </div>
                </FadeUp>

                {/* Hairline spec list — no fixed grid, so no empty cells and
                    no cards stretched past their content. */}
                <Stagger className="mt-6 md:mt-8">
                  <dl>
                    {practice.groups.map((group) => (
                      <motion.div
                        key={group.title}
                        variants={staggerChild}
                        className="group relative grid gap-3 border-t border-stone-100/10 py-5 last:border-b md:grid-cols-[minmax(0,15rem)_1fr] md:gap-8 md:py-6"
                      >
                        <span
                          aria-hidden="true"
                          className={`absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 ${
                            isPrimary ? "bg-orange-500/60" : "bg-stone-100/30"
                          }`}
                        />

                        <dt
                          className={`mono-label transition-colors duration-500 md:pt-1.5 ${
                            isPrimary
                              ? "text-stone-200 group-hover:text-orange-500"
                              : "text-stone-600 group-hover:text-stone-300"
                          }`}
                        >
                          {group.title}
                        </dt>

                        <dd className="flex flex-wrap gap-1.5">
                          {group.items.map((item) => (
                            <span
                              key={item}
                              className={`mono-label rounded-pill border px-2.5 py-1.5 transition-colors duration-500 ${
                                isPrimary
                                  ? "border-stone-100/12 text-stone-500 group-hover:border-stone-100/25 group-hover:text-stone-300"
                                  : "border-stone-100/8 text-stone-650 group-hover:border-stone-100/18 group-hover:text-stone-500"
                              }`}
                            >
                              {item}
                            </span>
                          ))}
                        </dd>
                      </motion.div>
                    ))}
                  </dl>
                </Stagger>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
