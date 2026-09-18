"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import GlyphField from "./GlyphField";
import TechMarquee from "./TechMarquee";
import { ButtonLink, Eyebrow } from "./primitives";
import { heroTicker, profile } from "@/lib/content";

const LINE_ONE = "Websites that ship.";
const LINE_TWO = "Systems that run.";

function Line({ text, delay }: { text: string; delay: number }) {
  return (
    <span className="reveal-mask-line">
      <motion.span
        className="block will-change-transform"
        initial={{ y: "108%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.15, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {text}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [tick, setTick] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  /* Three depth planes drifting at different rates as the hero leaves. */
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "38%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.62], [1, 0]);
  const fieldY = useTransform(scrollYProgress, [0, 1], ["0%", "-16%"]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => (t + 1) % heroTicker.length), 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      ref={ref}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* ---- Layer 0: static ground texture ---- */}
      <div className="hairline-grid pointer-events-none absolute inset-0 -z-30 opacity-60" />

      {/* ---- Layer 1: warm glow behind the headline ---- */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[8%] -z-20 h-[620px] w-[min(1100px,120vw)] -translate-x-1/2"
        style={reduce ? undefined : { scale: glowScale, opacity: glowOpacity }}
      >
        <div className="h-full w-full rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(255,165,87,0.13),rgba(255,165,87,0.04)_42%,transparent_70%)] blur-3xl" />
      </motion.div>

      <div className="relative flex flex-1 flex-col justify-end pt-28">
        {/* ---- Layer 2: copy ---- */}
        <motion.div
          className="shell relative z-10 pb-12"
          style={reduce ? undefined : { y: copyY, opacity: copyOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Eyebrow tone="muted">{profile.availability}</Eyebrow>
          </motion.div>

          <h1 className="display display-xl mt-7 max-w-[15ch] text-stone-100">
            <Line text={LINE_ONE} delay={0.28} />
            <Line text={LINE_TWO} delay={0.4} />
          </h1>

          <motion.p
            className="lede mt-7 max-w-[54ch] text-stone-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
          >
            I&rsquo;m Gabriel Paolo — a full-stack web developer and AI automation
            specialist.{" "}
            <span className="text-stone-650">
              I build production websites and web apps end to end, then wire the
              automations that keep them earning after launch.
            </span>
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.86, ease: [0.16, 1, 0.3, 1] }}
          >
            <ButtonLink href="#projects">View projects</ButtonLink>
            <ButtonLink
              href={profile.resumes.webDev}
              variant="outline"
              download
              arrow={false}
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

            {/* Rotating mono ticker, mirroring Griffin's right-aligned strapline */}
            <div className="ml-auto hidden h-6 items-center overflow-hidden lg:flex">
              <span className="mono-label flex items-center gap-2.5 text-stone-650">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                <span className="relative block h-4 w-[240px] overflow-hidden">
                  {heroTicker.map((t, i) => (
                    <motion.span
                      key={t}
                      className="absolute inset-0 whitespace-nowrap"
                      initial={false}
                      animate={{
                        y: i === tick ? "0%" : i < tick ? "-110%" : "110%",
                        opacity: i === tick ? 1 : 0,
                      }}
                      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {t}
                    </motion.span>
                  ))}
                </span>
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* ---- Layer 3: glyph matrix band ---- */}
        <motion.div
          className="relative h-[clamp(150px,21vh,240px)] w-full shrink-0"
          style={reduce ? undefined : { y: fieldY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.5 }}
        >
          <GlyphField />
        </motion.div>
      </div>

      <TechMarquee />

    </section>
  );
}
