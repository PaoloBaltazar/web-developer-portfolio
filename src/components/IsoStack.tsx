"use client";

import { AnimatePresence, motion, type MotionValue, useTransform } from "motion/react";

const W = 250;
const H = 125;
const GAP = 86;

const ACCENT = "#ffa557";

function rhombus(cx: number, cy: number, w = W, h = H) {
  return `${cx},${cy - h / 2} ${cx + w / 2},${cy} ${cx},${cy + h / 2} ${cx - w / 2},${cy}`;
}

/**
 * Isometric plane stack. Each labelled plane is its own depth layer:
 * planes drift at different rates against scroll, so the stack gains
 * parallax separation as the section moves through the viewport.
 */
export default function IsoStack({
  planes,
  chapterKey,
  progress,
}: {
  planes: string[];
  chapterKey: string;
  progress: MotionValue<number>;
}) {
  const floatY = useTransform(progress, [0, 1], [34, -34]);
  const tilt = useTransform(progress, [0, 1], [3.5, -3.5]);

  const cx = 230;
  const topY = 96;
  const vbH = topY + GAP * (planes.length - 1) + H + 60;

  return (
    <motion.div
      className="relative w-full will-change-transform"
      style={{ y: floatY, rotate: tilt }}
    >
      <svg
        viewBox={`0 0 460 ${vbH}`}
        className="w-full overflow-visible"
        role="img"
        aria-label={`Layer diagram: ${planes.join(", ")}`}
      >
        <defs>
          <linearGradient id="planeFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f9f5ef" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#f9f5ef" stopOpacity="0.015" />
          </linearGradient>
          <linearGradient id="planeFillActive" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={ACCENT} stopOpacity="0.16" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0.03" />
          </linearGradient>
          <pattern
            id="isoDots"
            width="13"
            height="13"
            patternUnits="userSpaceOnUse"
            patternTransform="skewY(-26.57)"
          >
            <circle cx="1" cy="1" r="0.9" fill="#f9f5ef" fillOpacity="0.2" />
          </pattern>
        </defs>

        {/* Spine connecting the plane centres */}
        <line
          x1={cx}
          y1={topY}
          x2={cx}
          y2={topY + GAP * (planes.length - 1)}
          stroke="#f9f5ef"
          strokeOpacity="0.16"
          strokeWidth="1"
          strokeDasharray="3 5"
        />

        <AnimatePresence mode="wait">
          <motion.g key={chapterKey}>
            {planes.map((label, i) => {
              const cy = topY + i * GAP;
              const isTop = i === 0;
              const depth = i / Math.max(planes.length - 1, 1);

              return (
                <motion.g
                  key={`${chapterKey}-${label}`}
                  initial={{ opacity: 0, y: 46 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -26 }}
                  transition={{
                    duration: 0.75,
                    delay: i * 0.085,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {/* Extruded side wall for thickness */}
                  <polygon
                    points={`${cx - W / 2},${cy} ${cx},${cy + H / 2} ${cx},${cy + H / 2 + 7} ${cx - W / 2},${cy + 7}`}
                    fill="#0c0c0b"
                    fillOpacity="0.85"
                    stroke="#f9f5ef"
                    strokeOpacity="0.1"
                    strokeWidth="0.75"
                  />
                  <polygon
                    points={`${cx + W / 2},${cy} ${cx},${cy + H / 2} ${cx},${cy + H / 2 + 7} ${cx + W / 2},${cy + 7}`}
                    fill="#0c0c0b"
                    fillOpacity="0.6"
                    stroke="#f9f5ef"
                    strokeOpacity="0.1"
                    strokeWidth="0.75"
                  />

                  {/* Face */}
                  <polygon
                    points={rhombus(cx, cy)}
                    fill={isTop ? "url(#planeFillActive)" : "url(#planeFill)"}
                    stroke={isTop ? ACCENT : "#f9f5ef"}
                    strokeOpacity={isTop ? 0.55 : 0.22 - depth * 0.06}
                    strokeWidth="1"
                  />
                  <polygon
                    points={rhombus(cx, cy, W - 26, H - 13)}
                    fill="url(#isoDots)"
                    stroke="none"
                    opacity={0.5 - depth * 0.18}
                  />

                  {/* Leader line + label, alternating sides */}
                  {i % 2 === 0 ? (
                    <>
                      <line
                        x1={cx + W / 2 - 34}
                        y1={cy - 12}
                        x2={cx + W / 2 + 34}
                        y2={cy - 30}
                        stroke={isTop ? ACCENT : "#f9f5ef"}
                        strokeOpacity={isTop ? 0.6 : 0.26}
                        strokeWidth="0.75"
                      />
                      <circle
                        cx={cx + W / 2 - 34}
                        cy={cy - 12}
                        r="2"
                        fill={isTop ? ACCENT : "#f9f5ef"}
                        fillOpacity={isTop ? 0.9 : 0.4}
                      />
                      <text
                        x={cx + W / 2 + 40}
                        y={cy - 26}
                        fontSize="9.5"
                        letterSpacing="1.1"
                        fill="#f9f5ef"
                        fillOpacity={isTop ? 0.92 : 0.5}
                        style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                      >
                        {label.toUpperCase()}
                      </text>
                    </>
                  ) : (
                    <>
                      <line
                        x1={cx - W / 2 + 34}
                        y1={cy - 12}
                        x2={cx - W / 2 - 24}
                        y2={cy - 30}
                        stroke="#f9f5ef"
                        strokeOpacity="0.26"
                        strokeWidth="0.75"
                      />
                      <circle
                        cx={cx - W / 2 + 34}
                        cy={cy - 12}
                        r="2"
                        fill="#f9f5ef"
                        fillOpacity="0.4"
                      />
                      <text
                        x={cx - W / 2 - 30}
                        y={cy - 26}
                        textAnchor="end"
                        fontSize="9.5"
                        letterSpacing="1.1"
                        fill="#f9f5ef"
                        fillOpacity="0.5"
                        style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                      >
                        {label.toUpperCase()}
                      </text>
                    </>
                  )}
                </motion.g>
              );
            })}
          </motion.g>
        </AnimatePresence>
      </svg>
    </motion.div>
  );
}
