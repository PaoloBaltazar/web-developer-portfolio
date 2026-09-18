"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * Lenis drives the real scroll position (rather than transforming a wrapper),
 * so every `useScroll` progress value downstream stays accurate.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const ref = useRef<LenisRef>(null);

  useEffect(() => {
    // Always open at the hero — a restored mid-page offset breaks the
    // scroll-linked entrances and looks like a rendering fault.
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    // Route in-page anchors through Lenis so jumps are eased, not instant,
    // and land clear of the fixed header.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
      const anchor = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();
      const lenis = ref.current?.lenis;
      const offset = hash === "#home" ? 0 : -72;
      if (lenis) {
        lenis.scrollTo(target as HTMLElement, { offset, duration: 1.25 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
      history.replaceState(null, "", hash);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <ReactLenis
      root
      ref={ref}
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
      }}
    >
      {children}
    </ReactLenis>
  );
}
