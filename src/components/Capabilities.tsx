"use client";

import { motion } from "motion/react";
import { Eyebrow, FadeUp, Stagger, TextReveal, staggerChild } from "./primitives";
import { capabilities, experience } from "@/lib/content";

export default function Capabilities() {
  return (
    <div className="relative border-t border-stone-100/8">
      <div className="shell grid gap-16 py-24 md:py-32 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        {/* Experience timeline */}
        <div>
          <FadeUp>
            <Eyebrow>Experience</Eyebrow>
          </FadeUp>
          <TextReveal
            as="h3"
            text="Where the reps came from."
            className="display display-md mt-6 text-stone-100"
          />

          <ol className="mt-10 space-y-0">
            {experience.map((e, i) => (
              <motion.li
                key={e.company}
                className="group relative border-t border-stone-100/10 py-6 last:border-b"
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
                <div className="mono-label mt-1.5 text-orange-500/80">{e.company}</div>
                <p className="mt-3 max-w-[48ch] text-[14.5px] leading-relaxed text-stone-600">
                  {e.note}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Capability columns */}
        <div>
          <FadeUp>
            <Eyebrow>Capabilities</Eyebrow>
          </FadeUp>
          <TextReveal
            as="h3"
            text="The stack I reach for."
            className="display display-md mt-6 text-stone-100"
          />

          <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {capabilities.map((group) => (
              <motion.div
                key={group.title}
                variants={staggerChild}
                className="group relative overflow-hidden rounded-xl border border-stone-100/10 bg-stone-100/[0.025] p-5 transition-colors duration-500 hover:border-stone-100/22 hover:bg-stone-100/[0.05]"
              >
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-orange-500/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                />
                <h4 className="mono-label relative text-stone-100">{group.title}</h4>
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
      </div>
    </div>
  );
}
