# BRIEF — Woody's Bar-B-Que

**Status:** Interviewed. Answers supplied by the client as locked creative direction on 2026-08-24 and reproduced here in their words. Not self-authored.

**Build:** `woodys-slauson`
**Method:** scrollcraft (github.com/nateherkai/scroll-craft), methodology and taste floor. Engine not mounted — see "Runtime deviation" below.

---

## The eight answers, verbatim

### 1. Vibe in three to five words, plus references

> **Vibe: Smoky. Soulful. Editorial. Bold. Warm.**
>
> 1. **The Bear** — tactile food imagery, kitchen intensity, human warmth, and close-up appetite appeal.
> 2. **1970s Ebony magazine restaurant editorials** — cultural confidence, neighborhood pride, rich color, and authentic storytelling.
> 3. **Stax Records album-cover design** — bold typography, strong contrast, heritage character, and visual rhythm.
>
> Use these references for mood and art direction only. Do not reproduce copyrighted compositions, logos, photography, or recognizable layouts.

### 2. The scroll journey, in their words

> Visitors should first encounter an appetite-first rib hero with immediate access to the menu, phone, and directions.
>
> 1. The first craving
> 2. Woody's signature meats
> 3. Woody and Jenetha Phillips' 1975 origin story
> 4. The live-oak brick-pit cooking tradition
> 5. The full table of meats, sides, and desserts
> 6. Community trust, customer voices, and the Slauson location
> 7. A decisive final invitation to bring Woody's home
>
> The journey begins with hunger, earns trust through heritage and craft, and ends with a clear conversion action.

### 3. The energy curve

> * **Scene 1:** Immediate, cinematic, and appetite-intensive
> * **Scene 2:** Energetic and rhythmic
> * **Scene 3:** Calm, intimate, and human
> * **Scene 4:** Rising intensity and the most immersive craft moment
> * **Scene 5:** Lively, abundant, and generous
> * **Scene 6:** Grounded, local, reassuring, and trust-building
> * **Scene 7:** Confident conversion peak without feeling aggressive
>
> The page must not maintain the same visual intensity throughout. Give the food and story room to breathe.

### 4. Intended feeling stage by stage, and the one moment

> * **Scene 1:** Hungry and curious
> * **Scene 2:** Eager to explore
> * **Scene 3:** Connected to the people and history
> * **Scene 4:** Immersed in the craft
> * **Scene 5:** Excited by abundance and choice
> * **Scene 6:** Confident that Woody's is authentic, established, and worth visiting
> * **Scene 7:** Ready to view the menu, call, or get directions
>
> **The One Moment:** A restrained **Pit-to-Plate transition** in Scene 4. A real photograph of Woody's live-oak brick pit transitions into meat cooking over the fire and then into an authentic finished rib plate. A thin ember-colored **"Since 1975"** line travels through the sequence and resolves into an underline beneath the Woody's wordmark or final section statement.
>
> Use approved real Woody's photography only. Do not generate fake smoke, fire, food, or cooking imagery.

### 5. One thing no other site does

> **The Woody's Pit-to-Plate Reveal.** A restrained scroll-driven sequence in Scene 4 using up to three approved authentic images: live-oak fire or brick pit, meat cooking on the pit, finished sauced ribs or a combination plate. Editorial cropping, masks, subtle crossfades, and the moving "Since 1975" line. Tactile and cinematic, not technical or gimmicky.
>
> No scroll hijacking. No forced scroll snapping. No generated smoke effects. No autoplay video with sound. No excessive parallax. No WebGL unless the existing project already justifies it. Polished static diptych or triptych fallback when images are unavailable. Complete `prefers-reduced-motion` fallback. Preserve readable content and conversion actions if JavaScript fails.

### 6. Distance from premium-minimal

> * **70% premium-minimal**
> * **20% dense, appetite-driven food storytelling**
> * **10% restrained retro/brutalist signage energy**
>
> Editorial and confident, with occasional bold typography and heritage signage cues. Must not become fully brutalist, playful, maximalist, overly nostalgic, or visually chaotic.

### 7. One unbroken world, or distinct scenes?

> **Distinct scenes.** Exactly seven. Each scene has its own composition, pacing, dominant image treatment, and cinematic entrance. Connect the scenes through typography, color, thin ember lines, and subtle transitions, but allow every chapter to feel like a deliberate cut.
>
> Use normal scrolling. Do not create one uninterrupted visual canvas and do not use mandatory scroll snapping.

### 8. What assets exist

> At prompt creation time, the only assets confirmed as being supplied directly are the visual design references. No high-resolution client-owned Woody's photography, original logo package, video footage, or complete brand kit has been confirmed as production-ready.
>
> Public research revealed candidate assets (bulldog logo and wordmark, rib photography, rib tips, hot links, combination plates, Slauson exterior, night signage, counter and menu board, brick pit, location collages, founder and family photography). **These public images are research references, not automatic permission to republish them.**
>
> Use only authentic, client-owned, licensed, or explicitly approved Woody's assets in production. Never hotlink Yelp, Google, editorial, or directory image URLs. Never substitute AI-generated or generic stock BBQ photography for missing authentic Woody's food imagery.

**Verified against the machine on 2026-08-24: zero Woody's image assets exist in this repository or anywhere on this workstation. The build therefore ships in its asset-less state by design.** See `docs/asset-register.md`.

---

## The feeling curve

One line per scene: the emotion, then what on screen causes it. Written before the scenes were designed.

| # | Scene | Feeling | What causes it |
|---|---|---|---|
| 1 | Arrival | Hungry, curious | One plate held at architectural scale, filling the frame before any sentence claims anything |
| 2 | Straight From the Pit | Eager to explore | The meats arrive at unequal sizes in an uneven rhythm, so the eye never settles into a grid |
| 3 | The 1975 Story | Connected | The page goes quiet and light. Two names and a date, set as running text with the most air on the page |
| 4 | The Woody's Way | Immersed | The ember line threads pit into fire into plate, and the frames change under the reader's own hand |
| 5 | The Full Table | Excited by abundance | More dishes than one screen holds, kept as an index rather than a grid, so the range reads as generous |
| 6 | What LA Says / Visit | Trusting | Specifics instead of praise: a street address, a phone number, an honest note that hours change |
| 7 | Bring Home the Smoke | Ready to act | The ember line resolves into the underline beneath the wordmark, and the three actions sit at full size |

No two adjacent scenes carry the same feeling. Scene 3 is the deliberate trough before the peak.

## The peak

**Scene 4, the Pit-to-Plate Reveal.** It gets the largest scroll span on the page by a visible margin, the quietest scene in front of it (Scene 3), and whatever asset budget exists.

The sentence a visitor would say to a friend:

> "It's the site where a line of fire follows you down the page and ends up as the underline under their name."

## The tell-someone sentence

> **It's the site where** the fire from the pit follows you all the way down and signs the name at the bottom.

## Authored silence

Declared so the verification pass can tell it from dead scroll:

- **Scene 3** holds deliberately still. Light ground, one fade, the largest measure of white space on the page. It is the trough that makes Scene 4 read as a peak.
- **The final third of Scene 7**, after the ember line completes its underline. The page resolves and holds rather than trailing into a footer that fades out.
- **Under `prefers-reduced-motion`**, the Pit-to-Plate sequence renders as a completed static triptych with the ember line drawn to full length. Every frame is deliberately still there, and that is the accessibility path working, not a defect.

---

## The engine is mounted

`engine/scrollcraft.js` and `engine/scrollcraft.css` are copied in **verbatim and never edited**, which is the one rule the skill treats as absolute. The engine is served from `/public/scrollcraft.js` by a deferred script and mounted from an effect after React hydrates, so it never hands React a tree that has already been rewritten. It is themed the supported way: six colour tokens and two font tokens.

An earlier revision of this build did not mount the engine and drove a small amount of motion from bespoke CSS instead. That was the wrong call and the client corrected it. The reasoning that led there is recorded below, because two of the three concerns were real and had to be solved rather than avoided.

**Concern 1: no footage.** `scrub` is the engine's anchor device and there is no Woody's video. *Resolved by deferral.* Scenes 1 and 4 are built as pinned stages with the poster, scrim and copy already in the shape `scrub` wants, and a `videoReady` flag in each. When footage is approved, the flag flips and those two acts become the page's two `scrub` acts. The score below is written for both states and is valid in each.

**Concern 2: scroll hijacking.** *It was a misreading.* The engine pins with native `position: sticky` and maps progress to real scroll position. It never intercepts wheel or touch input, never snaps, and never moves the page on the reader's behalf. Nothing in the build hijacks scroll or snaps.

**Concern 3: content gated on JavaScript.** *Real, and solved directly.* Every `data-sc-cue` and `data-sc-in` element genuinely starts at `opacity: 0`, and pinned stages are `position: sticky` with `overflow: clip`. A `<noscript>` block in the layout hands the page back to the document: cues and entrances go to full opacity, stages become static and auto-height, the pan rail wraps, wipes clear. Verified by `check-degrade.mjs` with scripting disabled: seven scenes, every word, every conversion action, nothing faded.

What is kept from the method, unchanged: the interview and this BRIEF, the page grammar, the signature move, the fingerprint gate, the feeling curve before the score, the score table, verification by screenshotting the page's own scroll, and the fingerprint row on completion.

---

## The score

Device per beat. Four or more device families, never the same act family twice in a row, at most two `scrub` acts, and the peak holds the longest span.

| # | Beat | Act | Span | With footage | Why this device |
|---|---|---|---|---|---|
| 1 | Craving | `pin` | 1.9 | → `scrub` | The stage holds while the plate settles. Greet-and-hold cue so the headline and all three actions are on the landing screen and never fade |
| 2 | Signature meats | `pan` | 2.5 | `pan` | Lateral travel reads as breadth where vertical reads as argument. A lineup of meats is breadth. A grid would rank them; a rail does not |
| 3 | Origin | `flow` + `in` | — | `flow` | Not everything should be pinned, and the contrast is what makes the pinned acts land. Carries the page's one kinetic headline, because a flow act's progress runs while the reader scrolls through it |
| 4 | Craft, **the peak** | `pin` | 3.3 | → `scrub` | Longest span by a third over the next act. Frame one is the ground, frames two and three wipe open, the ember seam crosses all three |
| 5 | Range | `flow` + `in` | — | `flow` | A menu reads as a document. Reduced top padding, because the pinned peak needs a viewport to scroll off |
| 6 | Trust | `pin` | 1.5 | `pin` | A beat with two states: social proof, then the practical detail. The two cross over inside the held frame, which is what a pinned act is for |
| 7 | Commitment | `flow` + spotlight | — | `flow` | The close resolves onto the signed wordmark. Pointer devices make the last screen respond to the reader being present |

Sequence: `pin > pan > flow > pin > flow > pin > flow`. No act family repeats adjacently, in either the current or the with-footage state. Families in play: pin, pan, flow+in, reveal, kinetic, and pointer (spotlight, magnet).

**No `drift`.** devices.md is explicit that drift is for pages that are one continuous place, and that a chaptered page wants grounds painted per section so the change lands on a hard edge. This page cuts between seven chapters, including one paper ground, so each scene paints its own opaque background.

## Open items the client must close

Carried from the direction's release-blocking list. None of these are guessed in the build; each is withheld or marked in `docs/business-data-audit.md`.

- Exact public business-name spelling (Bar-B-Que vs Bar-B-Q)
- Sunday Slauson closing time (9:00 PM vs 10:00 PM across sources)
- Single-location versus multi-location scope
- Photography ownership and usage rights for every candidate asset
- Current menu prices, and whether phone ordering is accepted
- Current Slauson online-ordering URL, if one exists
- Final canonical production domain
