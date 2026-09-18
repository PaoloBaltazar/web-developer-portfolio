# Gabriel Paolo Baltazar — Portfolio

Personal portfolio for a **Web Developer / AI Automation Specialist**, built to the
[griffin.com](https://www.griffin.com/) design language — its stone/orange palette,
light-serif display type, mono labels, and layered scroll-driven depth.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 + TypeScript |
| Styling | Tailwind CSS v4 (`@theme` tokens in `src/app/globals.css`) |
| Motion | `motion` (Framer Motion) + `lenis` smooth scroll |
| Type | Newsreader (display serif) · Geist Sans · Geist Mono |

## Run it

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Editing content

**Almost everything lives in one file: [`src/lib/content.ts`](src/lib/content.ts).**

| Export | Drives |
|---|---|
| `profile` | Name, email, phone, location, social links, résumé paths |
| `heroTicker` | Rotating mono strapline in the hero |
| `techMarquee` | Scrolling tech strip under the hero |
| `chapters` | The four pinned About chapters + their isometric layer labels |
| `stats` | The four-up stat row |
| `projects` | Project cards (`featured: true` renders the large split card) |
| `experience` | Experience timeline |
| `capabilities` | The three skill columns |

### ⚠️ Before you publish

`profile.links.github` and `profile.links.linkedin` are **placeholder root URLs** —
replace them with your real profile URLs in `src/lib/content.ts`.
Also update `SITE` in `src/app/layout.tsx` to your real domain once you have one.

### Résumés

Both PDFs sit in `public/` and are wired to download buttons:

- `Gabriel-Paolo-Baltazar-Full-Stack-Developer-Resume.pdf` — the primary download
  (nav button, hero button, Contact section)
- `Gabriel-Paolo-Baltazar-AI-Automation-Resume.pdf` — secondary, in Contact

To swap one, overwrite the file in `public/` keeping the same filename.

## Design system

Tokens are declared in `src/app/globals.css` under `@theme`, mirroring Griffin's ramps:

- **Canvas** `--color-stone-1100: #0c0c0b` · **Text** `--color-stone-100: #f9f5ef`
- **Ink** `#27251e` (used on the cream Projects layer)
- **Accent** orange ramp, `--color-orange-500: #ffa557`
- Helper classes: `.display` / `.display-xl|lg|md`, `.mono-label`, `.lede`, `.shell`,
  `.dot-grid`, `.hairline-grid`, `.reveal-mask`, `.reveal-mask-line`

## Motion architecture

Depth comes from running several planes at different scroll rates rather than one
global parallax:

- `Hero` — headline, glyph canvas, and glow each drift at a different rate as the
  section exits
- `About` — a 420vh pin; scroll progress advances the chapter, swaps the isometric
  layer stack, and drives the vertical rail
- `Projects` — a cream panel with a rounded top edge that rides *over* the dark
  canvas; each featured card parallaxes its own schematic panel
- `Contact` — a second rounded dark layer closing over the cream one

`TextReveal` masks headings word-by-word. Wrap a word in `_underscores_` to render it
in italic accent serif, e.g. `"what they _changed_."`.

All scroll-linked motion is skipped under `prefers-reduced-motion: reduce`.

## Deploying

```bash
npx vercel
```

The site is fully static (`○ prerendered`), so any host works.
