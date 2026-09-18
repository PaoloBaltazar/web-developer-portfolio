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
| `disciplines` | The two practice cards in About |
| `heroTicker` | Rotating mono strapline in the hero |
| `techMarquee` | Scrolling tech strip under the hero |
| `chapters` | The four pinned About chapters + their isometric layer labels |
| `stats` | The four-up stat row |
| `projects` | Project cards — `discipline` drives the filter, `featured: true` renders the large split card |
| `projectFilters` | The All / Web development / AI automation tabs |
| `experience` | Experience timeline (each entry tagged with its practice) |
| `capabilityPractices` | Capability cards, grouped under each practice |

### The two practices are deliberately separate

Copy throughout the site presents **Web Development** and **AI Automation** as two
independent offers. Neither is described as supporting the other — no "automations
that keep your site running" framing. If you edit copy, keep that separation:
they are two things this person is hired for, not one service with an add-on.

### ⚠️ Before you publish

`profile.links.github` and `profile.links.linkedin` are **placeholder root URLs** —
replace them with your real profile URLs in `src/lib/content.ts`.
Also update `SITE` in `src/app/layout.tsx` to your real domain once you have one.

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

Both PDFs sit in `public/` and are wired to download buttons:

- `Gabriel-Paolo-Baltazar-Full-Stack-Developer-Resume.pdf` — nav, hero, the Web
  Development practice card, and Contact
- `Gabriel-Paolo-Baltazar-AI-Automation-Resume.pdf` — the AI Automation practice
  card and Contact

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
- `Portrait` — the photo and its offset hairline frame drift in opposite
  directions, separating into two planes
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
