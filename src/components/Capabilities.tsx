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

        <div className="mt-16 space-y-16">
          {capabilityPractices.map((practice, pi) => (
            <div key={practice.id}>
              <FadeUp>
                <div className="flex items-center gap-4">
                  <span className="mono-label text-orange-500">
                    0{pi + 1}
                  </span>
                  <h4 className="display text-[1.5rem] leading-none text-stone-100">
                    {practice.name}
                  </h4>
                  <span className="h-px flex-1 bg-stone-100/12" />
                </div>
              </FadeUp>

              <Stagger className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {practice.groups.map((group) => (
                  <motion.div
                    key={group.title}
                    variants={staggerChild}
                    className="group relative overflow-hidden rounded-xl border border-stone-100/10 bg-stone-100/[0.025] p-5 transition-colors duration-500 hover:border-stone-100/22 hover:bg-stone-100/[0.05]"
                  >
                    <div
                      className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-orange-500/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                    <h5 className="mono-label relative text-stone-100">
                      {group.title}
                    </h5>
                    <ul className="relative mt-4 space-y-2">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-stone-600"
                        >
                          <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-stone-700 transition-colors duration-500 group-hover:bg-orange-500/70" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </Stagger>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
