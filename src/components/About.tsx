"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";
import IsoStack from "./IsoStack";
import Portrait from "./Portrait";
import Practices from "./Practices";
import { Eyebrow, FadeUp, Stagger, TextReveal, staggerChild } from "./primitives";
import { chapters, stats } from "@/lib/content";

export default function About() {
  const pinRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(
      chapters.length - 1,
      Math.max(0, Math.floor(v * chapters.length * 0.999)),
    );
    setActive((prev) => (prev === next ? prev : next));
  });

  const railScale = useTransform(smooth, [0, 1], [0, 1]);
  const chapter = chapters[active];

  return (
    <section id="about" className="relative">
      {/* ---- Intro: copy + portrait ---- */}
      <div className="shell relative py-28 md:py-40">
        <div className="dot-grid pointer-events-none absolute inset-0 -z-10 opacity-35" />

        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-20">
          <div>
            <FadeUp>
              <Eyebrow>About</Eyebrow>
            </FadeUp>
            <TextReveal
              as="h2"
              text="A _full-stack_ web developer."
              className="display display-lg mt-7 max-w-[15ch] text-stone-100"
            />
            <FadeUp delay={0.15}>
              <p className="lede mt-7 max-w-[54ch] text-stone-600">
                Computer Science graduate from Holy Angel University. Web
                development is the work I do most and go deepest on — production
                sites and web apps, owned from the interface down to the deploy.
                AI automation is a separate, smaller practice I also take on.
              </p>
            </FadeUp>
          </div>

          <Portrait />
        </div>

        <div className="mt-20 md:mt-24">
          <Practices />
        </div>
      </div>

      {/* ---- Pinned layered scroll ---- */}
      <div ref={pinRef} className="relative h-[420vh]">
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
          <div className="hairline-grid pointer-events-none absolute inset-0 -z-20 opacity-45" />

          {/* Ambient accent bloom that follows the active chapter */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`bloom-${active}`}
              aria-hidden="true"
              className="pointer-events-none absolute right-[8%] top-1/2 -z-10 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,165,87,0.11),transparent_62%)] blur-2xl"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />
          </AnimatePresence>

          <div className="shell grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_minmax(0,1fr)] lg:gap-16">
            {/* Left: rail + chapter copy */}
            <div className="relative flex gap-6 md:gap-9">
              {/* Vertical progress rail */}
              <div className="relative hidden w-px shrink-0 bg-stone-100/10 sm:block">
                <motion.div
                  className="absolute inset-x-0 top-0 origin-top bg-gradient-to-b from-orange-500 to-orange-500/20"
                  style={{ scaleY: railScale, height: "100%" }}
                />
              </div>

              <div className="min-w-0 flex-1">
                <ol className="space-y-1">
                  {chapters.map((c, i) => {
                    const isActive = i === active;
                    return (
                      <li key={c.index}>
                        <button
                          type="button"
                          onClick={() => {
                            const el = pinRef.current;
                            if (!el) return;
                            const top =
                              el.offsetTop +
                              (el.offsetHeight - window.innerHeight) *
                                ((i + 0.5) / chapters.length);
                            window.scrollTo({ top, behavior: "smooth" });
                          }}
                          className="group flex w-full items-center gap-3 py-1.5 text-left"
                          aria-current={isActive ? "step" : undefined}
                        >
                          <span
                            className={`mono-label transition-colors duration-500 ${
                              isActive ? "text-orange-500" : "text-stone-700"
                            }`}
                          >
                            {c.index}
                          </span>
                          <span
                            className={`mono-label transition-colors duration-500 ${
                              isActive
                                ? "text-stone-100"
                                : "text-stone-700 group-hover:text-stone-500"
                            }`}
                          >
                            {c.label}
                          </span>
                          <span
                            className={`h-px flex-1 origin-left transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                              isActive
                                ? "scale-x-100 bg-orange-500/45"
                                : "scale-x-0 bg-stone-100/20"
                            }`}
                          />
                        </button>
                      </li>
                    );
                  })}
                </ol>

                <div className="relative mt-9 min-h-[230px] sm:min-h-[210px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={chapter.index}
                      initial={{ opacity: 0, y: 26, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -18, filter: "blur(6px)" }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <h3 className="display display-md max-w-[17ch] text-stone-100">
                        {chapter.title}
                      </h3>
                      <p className="lede mt-5 max-w-[48ch] text-stone-600">
                        {chapter.body}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Right: isometric layer stack */}
            <div className="relative hidden items-center justify-center lg:flex">
              <IsoStack
                planes={chapter.planes}
                chapterKey={chapter.index}
                progress={smooth}
              />
            </div>

            {/* Compact stack for small screens */}
            <div className="lg:hidden">
              <AnimatePresence mode="wait">
                <motion.ul
                  key={`m-${chapter.index}`}
                  className="grid grid-cols-2 gap-2"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {chapter.planes.map((p, i) => (
                    <li
                      key={p}
                      className={`mono-label rounded-lg border px-3 py-3 ${
                        i === 0
                          ? "border-orange-500/40 bg-orange-500/8 text-stone-100"
                          : "border-stone-100/10 bg-stone-100/3 text-stone-600"
                      }`}
                    >
                      {p}
                    </li>
                  ))}
                </motion.ul>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* ---- Stats ---- */}
      <div className="shell border-t border-stone-100/8 py-16 md:py-20">
        <Stagger className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {stats.map((s) => (
            <motion.div key={s.label} variants={staggerChild}>
              <div className="display text-[clamp(2.25rem,4.2vw,3.25rem)] text-stone-100">
                {s.value}
              </div>
              <div className="mono-label mt-2 text-stone-650">{s.label}</div>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
