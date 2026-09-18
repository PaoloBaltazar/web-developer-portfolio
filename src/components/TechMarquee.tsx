"use client";

import { techMarquee } from "@/lib/content";

/**
 * Infinite tech strip standing in for Griffin's client-logo bar.
 * Two identical tracks translate -50% in lockstep for a seamless loop.
 */
export default function TechMarquee() {
  const track = [...techMarquee, ...techMarquee];

  return (
    <div className="relative border-y border-stone-100/8 bg-stone-1100">
      <div
        className="group flex overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        {[0, 1].map((dup) => (
          <div
            key={dup}
            aria-hidden={dup === 1}
            className="flex shrink-0 animate-[marquee_42s_linear_infinite] items-center group-hover:[animation-play-state:paused]"
          >
            {track.map((item, i) => (
              <span
                key={`${dup}-${item}-${i}`}
                className="mono-label flex h-14 shrink-0 items-center gap-3 whitespace-nowrap border-r border-stone-100/8 px-8 text-stone-650 transition-colors duration-300 hover:text-stone-200"
              >
                <span className="h-1 w-1 rounded-full bg-stone-700" />
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
