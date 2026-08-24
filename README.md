# Woody's Bar-B-Que

Website for Woody's Bar-B-Que, 3446 W Slauson Ave, Los Angeles. Built with
Next.js 16 (App Router), TypeScript and Tailwind v4, following the
[scrollcraft](https://github.com/nateherkai/scroll-craft) method.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
```

## The two things to know first

**1. There is no photography yet.** The repository contains zero Woody's image
assets. Every image slot renders an honest typographic composition instead of a
photograph, and none of it is stock or AI-generated. To go live with real
photos, edit `src/data/assets.ts` only: set an asset's `src` and change its
`rights` to `"approved"`. No component changes are needed. See
[`docs/asset-register.md`](docs/asset-register.md).

**2. Uncertain business data is withheld, not guessed.** Fourteen values are
unresolved (Sunday closing time, menu prices, the ordering URL, the canonical
domain, and more). Each is either omitted or rendered as a link to the live
listing. See [`docs/business-data-audit.md`](docs/business-data-audit.md) before
changing anything in `src/data/business.ts`.

## Structure

```
src/
  app/            routes, globals.css (the whole design system), sitemap, robots
  components/
    scenes/       Scene1..Scene7, the homepage's seven chapters
    site/         Header, MobileActionBar, LocationDetails
    ui/           Plate (image-or-typeset), ActionLink (conditional CTA)
    ScrollDriver  publishes scroll position as CSS custom properties
    Reveal        entrance reveals, progressive enhancement only
  data/           business.ts, menu.ts, assets.ts  <- single source of truth
  lib/schema.ts   Restaurant structured data, verified values only
docs/             BRIEF.md, business-data-audit.md, asset-register.md
```

## The scroll engine

The scrollcraft engine drives the page. Both engine files are copied in
**verbatim and must never be edited per project** (that is the skill's one
absolute rule):

- `public/scrollcraft.js` — served as-is by a deferred `<script>` in the layout.
  It lives in `public/` so it is neither bundled, typechecked nor linted.
- `src/app/scrollcraft.css` — imported at the top of `globals.css`. It owns the
  mechanism: `.sc-stage`, `.sc-copy`, `.sc-scrim` and every `[data-sc-*]`
  selector. Nothing in `globals.css` restyles those; it re-themes the engine
  through six colour tokens and two font tokens, which is the supported route.

`src/components/ScrollCraftMount.tsx` mounts it from an effect, after hydration,
guarded so React Strict Mode's double-invoke re-measures instead of mounting a
second engine.

The homepage is seven acts: `pin > pan > flow > pin > flow > pin > flow`. The
score, and why each device was chosen, is in [`docs/BRIEF.md`](docs/BRIEF.md).

### Turning on the video

Scenes 1 and 4 are built as pinned stages in the exact shape a `scrub` act
wants. When approved footage exists:

1. Put the clips at `public/video/woodys-hero.mp4` (plus `-m.mp4` for the
   portrait phone crop), and the same for `woodys-pit.mp4`.
2. Encode them for **scrubbing, not playback** with the skill's encoder:
   `bash scroll-craft/plugins/nateherk-design/skills/scrollcraft/scripts/encode.sh in.mp4 out.mp4`
   A normal web encode plays fine and scrubs like mud.
3. Flip `const videoReady = false` to `true` in `Scene1Hero.tsx` and
   `Scene4PitToPlate.tsx`, and change those sections' `data-sc-act` from `pin`
   to `scrub`.

That gives the page its two `scrub` acts, which is the documented maximum.

## Rules the code enforces

These are not conventions. Break them and the checks fail.

- **`ActionLink` renders nothing when `href` is null.** There is no disabled
  state. This is why no Order Online button exists while `orderOnlineUrl` is
  null, and why one will appear everywhere the moment a verified URL is set.
- **`verifiedOpeningHoursSpecification()`** filters to verified days, so the
  disputed Sunday hours cannot reach structured data.
- **`showPrices`** gates every price render. It is `false`.
- **No `AggregateRating`, no `Review` schema, no hardcoded ratings or counts.**
- **Content survives JavaScript failure.** Every route is statically prerendered
  and no copy is gated on script. Entrance animations live behind an `html.js`
  class set before paint, so they only ever apply when they can be undone.

## Checks

```bash
npm run build                 # typecheck + production build
npx eslint src --max-warnings=0
node check-degrade.mjs        # no-JS and reduced-motion states
node check-a11y.mjs           # headings, names, focus, links, overflow, tap targets
node screenshot.mjs http://localhost:3000 label 1440 900 --full
node shot-scene.mjs 4         # one scene at its real scroll position
```

The scrollcraft harness also runs against this site, from `scroll-craft/`:

```bash
node scroll-craft/plugins/nateherk-design/skills/scrollcraft/scripts/shoot.mjs \
  --url http://localhost:3000 --out lab/shots
```

## Deployment

Set `NEXT_PUBLIC_SITE_URL` to the confirmed production domain. It drives the
canonical URLs, the sitemap and the structured data. It defaults to localhost,
and **no parked or legacy domain is hardcoded anywhere** because the canonical
domain is not yet confirmed.
