"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { profile } from "@/lib/content";

/**
 * Layered portrait: an offset hairline frame sits behind the photo, and the
 * image drifts slower than its mask so the two planes separate on scroll.
 */
export default function Portrait() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const frameY = useTransform(scrollYProgress, [0, 1], ["14px", "-14px"]);

  return (
    <motion.div
      ref={ref}
      className="relative mx-auto w-full max-w-[340px] lg:max-w-none"
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Offset frame — the rear plane */}
      <motion.div
        aria-hidden="true"
        className="dot-grid absolute -right-4 -top-4 bottom-8 left-8 rounded-xl border border-stone-100/12"
        style={reduce ? undefined : { y: frameY }}
      />

      {/* Photo — the front plane */}
      <div className="relative overflow-hidden rounded-xl border border-stone-100/14 bg-stone-1000">
        <div className="relative aspect-[4/5] overflow-hidden">
          <motion.div
            className="absolute inset-0 scale-[1.12]"
            style={reduce ? undefined : { y: imageY }}
          >
            <Image
              src={profile.photo}
              alt={`${profile.name}, ${profile.roles.join(" and ")}`}
              fill
              sizes="(max-width: 1024px) 340px, 420px"
              className="object-cover object-top"
              priority={false}
            />
          </motion.div>

          {/* Grade the photo down into the canvas rather than sitting it on top */}
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(12,12,11,0.92),rgba(12,12,11,0.12)_45%,transparent)]"
            aria-hidden="true"
          />
        </div>

        {/* Caption plate */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
          <div>
            <div className="mono-label text-stone-50">{profile.shortName}</div>
            <div className="mono-label mt-1.5 text-stone-500">
              {profile.location}
            </div>
          </div>
          <span className="mono-label flex items-center gap-2 text-stone-500">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Open
          </span>
        </div>
      </div>
    </motion.div>
  );
}
