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
| `profile` | Name, email, phone, location, photo, social links, résumé paths |
| `disciplines` | The two practice cards in About. `resume` on the primary, `portfolio` (outbound link) on the secondary |
| `heroTicker` | Rotating mono strapline in the hero |
| `techMarquee` | Scrolling tech strip under the hero |
| `chapters` | The four pinned About chapters + their isometric layer labels |
| `stats` | The four-up stat row |
| `projects` | Project cards. Every entry needs a `thumb`; the type enforces it |
| `experience` | Experience timeline (each entry tagged with its practice) |
| `capabilityPractices` | Capability cards, grouped under each practice |

### Practice hierarchy — read this before editing copy

Two rules, and they work together:

1. **Separate.** Web Development and AI Automation are independent offers. Neither
   is described as supporting the other — no "automations that keep your site
   running" framing.
2. **Not equal.** Web development is the *primary* practice and carries the site.
   AI automation is explicitly *secondary*.

The weighting is expressed structurally, not just in adjectives:

| | Web Development | AI Automation |
|---|---|---|
| Practice card (`Practices.tsx`) | Wide (1.55fr), warm accent, solid CTA | Narrow (1fr), muted, text link |
| Capability groups | 4, full width | 2, capped at 52% width |
| Projects section | All four entries | None — links out to its own portfolio |
| Hero headline & lede | Entire headline; lede opens with it | One closing sentence |

`disciplines[].primary` and `.tier` in `content.ts` drive the card styling, so
flipping the emphasis later is a data change, not a rewrite.

### ⚠️ Before you publish

`profile.links.github` and `profile.links.linkedin` are **placeholder root URLs** —
replace them with your real profile URLs in `src/lib/content.ts`.
Also update `SITE` in `src/app/layout.tsx` to your real domain once you have one.

### Logo

The GP monogram is the same mark as the AI automation portfolio — the outlined
glyph paths were lifted from that site so both stay identical, with no font
dependency.

- `src/lib/logo.ts` — the two path strings (G and P), viewBoxes and stroke width
- `src/components/Logo.tsx` — `LogoMark` (full GP), `LogoG` (G alone),
  `LogoLockup` (mark + hairline rule + wordmark)
- `src/app/icon.svg` — favicon: the G alone on a dark rounded tile

The mark inherits colour through `currentColor`, so it works on both the dark
canvas and the cream Projects layer without a second asset.

**Regenerating the favicon.** It is a plain `<g transform>` (not a nested `<svg>`)
for compatibility. The G is drawn at 48 of 64 units with `stroke-width="30"` —
much heavier than the 14 used on screen, because at 16px the original hairlines
render sub-pixel and the glyph disappears. If you re-cut it, check it at 16px.

### Project thumbnails

`public/projects/*.jpg` — 1600x1000 (16:10) captures of each live site, referenced
by `Project.thumb`. Web projects render them at native aspect above the copy; the
automation cards have no capture and use the compact text card instead.

Project screenshots are `grayscale` at rest and ease to full colour on hover, so
the page stays monochrome until you interact with it.

The Projects section carries **web work only**. Automation work is represented by
a single outbound button on the AI Automation practice card, pointing at
`profile.links.automationPortfolio`. There is no filter UI, because there is
nothing left to filter.

Captures were taken headless at 1440x900 @2x, then downscaled. The sites animate
on scroll, so a naive screenshot lands on a half-rendered page — the capture
script scrolls the full page first to fire every reveal, returns to the top, waits
for fonts and any hero video, and only then shoots. Signet is captured at a scroll
offset of 860 rather than 0, because its hero is mostly whitespace until the
product mockup comes into frame.

To re-shoot, use Playwright with that scroll-then-return pattern and export at
1600px wide, JPEG quality ~82 (each file lands around 120–190 KB).

### Photo

`public/gabriel-paolo-baltazar.jpg` (864×1210). Referenced via `profile.photo` and
rendered by `Portrait.tsx`, which crops it 4:5 and applies a warm grade so it sits
inside the palette. To swap it, drop a new portrait-orientation image in `public/`
and update `profile.photo`.

### Contact form

The form posts to a Server Action (`src/app/actions.ts`) that validates input,
drops bot submissions via a honeypot field, and sends through **Resend**.

**It will not deliver mail until you set an API key.** Copy `.env.example` to
`.env.local` and fill it in:

```bash
cp .env.example .env.local
```

| Variable | Notes |
|---|---|
| `RESEND_API_KEY` | From [resend.com](https://resend.com). Without it the form tells visitors to email directly. |
| `CONTACT_TO_EMAIL` | Where enquiries land. Defaults to `profile.email`. |
| `CONTACT_FROM_EMAIL` | Must be on a domain verified in Resend. `onboarding@resend.dev` works for testing. |

On Vercel, add the same three under **Project → Settings → Environment Variables**.

Note that `ContactState` and `initialContactState` live in `src/lib/contact.ts`,
not in the action file — a `"use server"` module may only export async functions.

### Résumés

`Gabriel-Paolo-Baltazar-Full-Stack-Developer-Resume.pdf` is the only résumé the
site publishes — linked from the nav, the hero, the Web Development practice card,
and Contact. The AI automation résumé was deliberately removed; `disciplines[].resume`
is optional, so a practice without one simply renders no download link.

To swap one, overwrite the file in `public/` keeping the same filename.

## Design system

Layout, type scale and spacing follow Griffin's system. The palette is a neutral
greyscale of our own. Tokens live in `src/app/globals.css` under `@theme`.

- **Canvas** `--color-stone-1100: #0a0a0a` · **Text** `--color-stone-100: #fafafa`
- **Ink** `#0a0a0a` — text on the light Projects panel
- **Accent** `--color-accent: #ffffff` — the *only* emphasis token

The `stone-*` names are kept from the original warm ramp so the hundreds of
existing `text-stone-600` / `border-stone-100/12` classes did not have to change;
only the values behind them are neutral now.

**There is no hue anywhere.** Emphasis is carried by brightness, not colour:
body copy sits at mid-grey and anything highlighted steps up to `accent` on dark
surfaces, or down to `ink` on the cream panel. If you reach for a colour, don't —
use a contrast step, a hairline, or italic serif instead.

### Contrast floor

Mid-greys are deliberately brighter than a plain desaturation would produce,
because 11px `.mono-label` text has to clear WCAG AA. Against `#0a0a0a`:
`stone-700` → 4.99:1, `stone-650` → 6.1:1, `stone-600` → 7.3:1. On the cream
panel, `ink/60` is the floor (5.26:1) — `ink/45` and `ink/55` both fail.

Every text/background pair on the page currently passes AA, the lowest at 5.01:1.
Re-check with the script in `Verification` below after any palette edit.

- Helper classes: `.display` / `.display-xl|lg|md`, `.mono-label`, `.lede`, `.shell`,
  `.dot-grid`, `.hairline-grid`, `.reveal-mask`, `.reveal-mask-line`

## Motion architecture

Depth comes from running several planes at different scroll rates rather than one
global parallax:

- `Hero` — headline, glyph canvas, and glow each drift at a different rate as the
  section exits
- `About` — a 420vh pin; scroll progress advances the chapter, swaps the isometric
  layer stack, and drives the vertical rail
- `Portrait` — the photo (greyscaled) and its offset hairline frame drift in
  opposite directions, separating into two planes
- `Projects` — a cream panel with a rounded top edge that rides *over* the dark
  canvas; each featured card parallaxes its own schematic panel. Practice tabs
  filter the grid with a shared-layout pill and `popLayout` transitions
- `Contact` — a second rounded dark layer closing over the cream one

`TextReveal` masks headings word-by-word. Wrap a word in `_underscores_` to render it
in italic accent serif, e.g. `"what they _changed_."`.

All scroll-linked motion is skipped under `prefers-reduced-motion: reduce`.

## Deploying

```bash
npx vercel
```

The site is fully static (`○ prerendered`), so any host works.
