import {
  LOGO_G_VIEWBOX,
  LOGO_PATH_G,
  LOGO_PATH_P,
  LOGO_RATIO,
  LOGO_STROKE_WIDTH,
  LOGO_VIEWBOX,
} from "@/lib/logo";
import { profile } from "@/lib/content";

/** Full GP monogram. Inherits colour from the parent via currentColor. */
export function LogoMark({
  height = 30,
  className = "",
  title,
}: {
  height?: number;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      height={height}
      width={height * LOGO_RATIO}
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      style={{ display: "block", overflow: "visible" }}
    >
      {title && <title>{title}</title>}
      <g
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={LOGO_STROKE_WIDTH}
        strokeLinejoin="round"
      >
        <path d={LOGO_PATH_G} />
        <path d={LOGO_PATH_P} />
      </g>
    </svg>
  );
}

/** G alone, square-cropped — holds legibility down to 16px. */
export function LogoG({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox={LOGO_G_VIEWBOX}
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      style={{ display: "block" }}
    >
      <g
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={LOGO_STROKE_WIDTH}
        strokeLinejoin="round"
      >
        <path d={LOGO_PATH_G} />
      </g>
    </svg>
  );
}

/** Nav lockup: monogram, hairline rule, wordmark. */
export function LogoLockup({
  height = 26,
  className = "",
}: {
  height?: number;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-3.5 ${className}`}>
      <LogoMark height={height} title={profile.name} />
      <span
        aria-hidden="true"
        className="block w-px self-stretch bg-current opacity-20"
      />
      <span className="text-[15px] font-medium tracking-[-0.01em]">
        {profile.shortName}
      </span>
    </span>
  );
}
