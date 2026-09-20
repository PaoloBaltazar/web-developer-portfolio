"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { LogoMark } from "./Logo";
import { profile } from "@/lib/content";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useMotionValueEvent(scrollY, "change", (v) => setSolid(v > 40));

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            solid
              ? "border-b border-stone-100/8 bg-stone-1100/72 backdrop-blur-xl"
              : "border-b border-transparent bg-transparent"
          }`}
        />
        <nav className="shell relative flex h-16 items-center justify-between">
          <a
            href="#home"
            className="group flex items-center gap-3.5 text-stone-100"
            aria-label="Home"
          >
            <LogoMark
              height={26}
              title={profile.name}
              className="transition-colors duration-500 group-hover:text-accent"
            />
            <span
              aria-hidden="true"
              className="block h-6 w-px bg-stone-100/20 transition-colors duration-500 group-hover:bg-stone-100/35"
            />
            <span className="text-[15px] font-medium tracking-[-0.01em]">
              {profile.shortName}
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={`relative rounded-pill px-3.5 py-2 text-[13.5px] transition-colors duration-300 ${
                  active === l.id
                    ? "text-stone-100"
                    : "text-stone-600 hover:text-stone-300"
                }`}
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-pill bg-stone-100/8"
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
                <span className="relative">{l.label}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={profile.resumes.webDev}
              download
              className="mono-label hidden rounded-pill bg-cream px-5 py-2.5 text-stone-1100 transition-colors duration-300 hover:bg-white sm:inline-flex"
            >
              Résumé
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid h-9 w-9 place-items-center rounded-full border border-stone-100/15 text-stone-100 transition-colors hover:border-stone-100/40 md:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 block h-px w-full bg-current transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    open ? "top-1.5 rotate-45" : "top-0.5"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-full bg-current transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    open ? "top-1.5 -rotate-45" : "top-2.5"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-stone-1100/97 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="dot-grid absolute inset-0 opacity-40" />
            <div className="shell relative flex h-full flex-col justify-center gap-1 pb-24">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="display display-lg border-b border-stone-100/8 py-5 text-stone-100"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.08 + i * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <span className="mono-label mr-4 align-middle text-stone-650">
                    0{i + 1}
                  </span>
                  {l.label}
                </motion.a>
              ))}
              <motion.a
                href={profile.resumes.webDev}
                download
                className="mono-label mt-8 inline-flex w-fit items-center gap-2.5 rounded-pill bg-cream px-6 py-3 text-stone-1100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
              >
                Download résumé
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
