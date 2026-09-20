"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "{}<>/\\[]()=+-*;:$#01_|".split("");

/**
 * Canvas character matrix — the textural band under the hero.
 * Cells breathe on a slow noise wave and brighten around the pointer.
 * Pauses entirely when scrolled out of view or when motion is reduced.
 */
export default function GlyphField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: -9999, y: -9999 });
  const visible = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const CELL_W = 15;
    const CELL_H = 19;
    let cols = 0;
    let rows = 0;
    let cells: { g: string; seed: number }[] = [];
    let dpr = 1;
    let raf = 0;
    let start = performance.now();

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(rect.width / CELL_W) + 1;
      rows = Math.ceil(rect.height / CELL_H) + 1;
      cells = new Array(cols * rows).fill(null).map(() => ({
        g: GLYPHS[(Math.random() * GLYPHS.length) | 0],
        seed: Math.random(),
      }));
    };

    const draw = (now: number) => {
      const rect = canvas.getBoundingClientRect();
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.font = '11px var(--font-geist-mono), ui-monospace, monospace';
      ctx.textBaseline = "top";

      const px = pointer.current.x;
      const py = pointer.current.y;
      const radius = 190;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cell = cells[r * cols + c];
          if (!cell) continue;
          const x = c * CELL_W;
          const y = r * CELL_H;

          // Slow diagonal wave so the field never reads as static noise.
          const wave =
            Math.sin((c * 0.26 + r * 0.19) - (reduce ? 0 : t * 0.5)) * 0.5 + 0.5;

          let alpha = 0.035 + wave * cell.seed * 0.16;

          // Pointer spotlight
          if (px > -9000) {
            const dx = x - px;
            const dy = y - py;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < radius) {
              const falloff = 1 - dist / radius;
              alpha += falloff * falloff * 0.5;
            }
          }

          if (alpha < 0.03) continue;
          ctx.fillStyle = `rgba(250, 250, 250, ${Math.min(alpha, 0.72)})`;
          ctx.fillText(cell.g, x, y);
        }
      }

      // Occasional glyph churn keeps it alive without being busy.
      if (!reduce && cells.length) {
        for (let i = 0; i < 3; i++) {
          const idx = (Math.random() * cells.length) | 0;
          cells[idx].g = GLYPHS[(Math.random() * GLYPHS.length) | 0];
        }
      }
    };

    const loop = (now: number) => {
      if (visible.current) draw(now);
      raf = requestAnimationFrame(loop);
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => {
      pointer.current = { x: -9999, y: -9999 };
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting;
      },
      { rootMargin: "120px" },
    );
    io.observe(canvas);

    const ro = new ResizeObserver(() => build());
    ro.observe(canvas);

    build();
    start = performance.now();
    raf = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`h-full w-full ${className}`}
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent, black 18%, black 72%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, black 18%, black 72%, transparent)",
      }}
    />
  );
}
