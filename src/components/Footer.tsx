import { profile } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-stone-100/8 bg-stone-1100">
      <div className="shell flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <span className="mono-label text-stone-700">
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span className="mono-label text-stone-700">
          {profile.roles.join(" · ")}
        </span>
        <a
          href="#home"
          className="mono-label inline-flex items-center gap-2 text-stone-700 transition-colors duration-300 hover:text-stone-200"
        >
          Back to top
          <svg
            viewBox="0 0 16 16"
            className="h-3 w-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M8 13V3M4 7l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
