# Business data audit — Woody's Bar-B-Que

**Audited:** 2026-08-25
**Repository state at audit:** empty. This is a new build, so the "Existing project value" column is "None" throughout and no production value was overwritten.
**Source of truth in code:** `src/data/business.ts`

Research snapshot supplied by the client was assembled 2026-08-24. Time-sensitive values must be rechecked before publishing.

---

## Source priority applied

1. Current client-provided information
2. Current business-owned ordering or location system
3. Current Google Business Profile
4. Current business-owned website
5. Current verified business social profile
6. Yelp
7. Reputable editorial reporting
8. Third-party directories

**Excluded throughout:** `https://woodys.com/` (unrelated Florida/Jacksonville franchise). Verified by automated audit that no link anywhere in the build points to it.

---

## The audit

| Data point | Existing project value | Researched value | Source | Status | Action |
|---|---|---|---|---|---|
| Brand display name | None | Woody's Bar-B-Que | Signage / wordmark spelling | **Conflict** | Used for display. See name row below |
| Google listing name | None | Woody's Bar-B-Q | Google Business Profile | **Conflict** | Recorded as `brand.googleListingName`. Not published |
| Google entity id | None | `/g/11bxdx1tbq` | Google Business Profile | Verified | Recorded, not rendered |
| Street address | None | 3446 W Slauson Ave | GBP, Yelp, business site | Verified | Published |
| City / state / ZIP | None | Los Angeles, CA 90043 | GBP, Yelp | Verified | Published |
| Phone | None | (323) 294-9443 | GBP, Yelp | Verified | Published as `tel:+13232949443` |
| Directions URL | None | Google Maps dir API to the Slauson address | Constructed | Verified | Published |
| Hours, Mon to Thu | None | 11:00 AM to 9:00 PM | GBP, Instagram, Yelp agree | Verified | Published, and in schema |
| Hours, Fri to Sat | None | 11:00 AM to 10:00 PM | GBP, Instagram, Yelp agree | Verified | Published, and in schema |
| **Hours, Sunday** | None | Closes 9:00 PM (Google) **vs** 10:00 PM (Instagram) | GBP vs business Instagram | **UNRESOLVED** | **No time published.** Row renders "Check today" linking to the live listing. Excluded from schema by `verifiedOpeningHoursSpecification()` |
| Founded | None | August 1975 | Eater LA, Rams feature | Verified | Published |
| Founders | None | Woody and Jenetha Phillips | Eater LA | Verified | Published |
| Founder origin | None | Louisiana, moved to LA in the 1960s | Eater LA | Verified | Published |
| Roles | None | Woody worked the pit, Jenetha ran the register | Eater LA | Verified | Published |
| Family continuity | None | Family continued the business; Rodney Phillips in 2023 Rams feature | Rams | Verified | Published on /our-story. **No generation count invented** |
| Inglewood opening | None | Reported 1995 | Research snapshot | Verified | Mentioned on /our-story only. Location not published |
| Cooking method | None | Brick pits, live oak, live fire | Research snapshot | Verified | Published as the approved sentence only |
| Menu categories | None | Dinners, Sandwiches, A La Carte, Lunch Specials, Sides, Extra Dishes, Desserts, Party Platters | Business-owned menu | Verified | Published |
| Menu items | None | See `src/data/menu.ts` | Business-owned menu | Mixed | Items marked `verified` or `confirmation-required` individually |
| "Brisket" vs "Sliced Beef" | None | Sliced Beef | Business-owned menu | Verified | **"Sliced Beef" used.** "Brisket" not used anywhere |
| **Menu prices** | None | Business menu marked "effective February 2022"; third-party prices conflict | Business site vs directories | **UNRESOLVED** | **`showPrices: false`.** No price rendered anywhere. `price` kept optional on the type |
| **Online ordering URL** | None | No business-owned Slauson ordering URL verified | — | **UNRESOLVED** | **`orderOnlineUrl: null`.** The Order Online CTA is not rendered anywhere. Never rendered disabled |
| Phone ordering accepted | None | Not confirmed | — | **UNRESOLVED** | Phone CTA labelled "Call Woody's", never "Call to Order" |
| Dine-in offered | None | Not confirmed | — | **UNRESOLVED** | Not claimed anywhere |
| Reservations | None | Not confirmed | — | **UNRESOLVED** | No reservation UI. Omitted from schema |
| Catering / party process | None | Party platters on menu; process not confirmed | Business menu | **Partial** | Platters listed with "Call the restaurant to arrange". No /catering route |
| Instagram | None | instagram.com/woodysbbqla, @woodysbbqla | Verified profile | Verified | Published, in `sameAs` |
| Other social | None | None verified | — | Unknown | **No Facebook, TikTok, X or YouTube added** |
| **Average rating** | None | Volatile | Yelp/Google | **Withheld** | **Not hardcoded. No AggregateRating schema** |
| **Review count** | None | Volatile | Yelp/Google | **Withheld** | **Not hardcoded** |
| Review excerpts | None | Two candidate Yelp-derived excerpts (Nancy G., Joseph M.) | MapQuest listing snapshot | **Not reverified** | **Not published.** `publishReviewQuotes: false`. Source-link cards used instead. No Review schema |
| Inglewood location | None | 475 S Market St, Inglewood CA 90301, (310) 672-4200 | Business site | **Scope unconfirmed** | Held in `unpublishedLocationCandidates`. Not rendered, not in sitemap |
| Florence location | None | 1958 W Florence Ave; ZIP 90043 vs 90047; hours conflict | Business site vs directories | **UNRESOLVED** | Held unpublished. Not rendered |
| Multi-location scope | None | At least three locations exist | Business site | **UNRESOLVED** | Default scope is Slauson only |
| **Canonical domain** | None | `woodysbarbeque.com` is business-owned but is the multi-location site | Business site | **UNRESOLVED** | `NEXT_PUBLIC_SITE_URL` env var, defaulting to localhost. **No parked or legacy domain hardcoded** |
| Geo coordinates | None | Not sourced accurately | — | Unknown | **Omitted from schema** |
| Price range | None | Not verified | — | Unknown | **Omitted from schema** |

---

## Release blockers

Each of these must be closed by the client before launch. None is guessed in the build; each is either withheld or rendered as an explicit "check the live listing".

1. **Sunday closing time.** 9:00 PM or 10:00 PM.
2. **Exact public business name.** Bar-B-Que (signage) or Bar-B-Q (Google listing). Structured data currently uses the signage spelling.
3. **Single or multi-location scope.** Slauson only is the current default.
4. **Canonical production domain.** Set `NEXT_PUBLIC_SITE_URL` at deploy time.
5. **Current menu prices**, and whether to display them at all.
6. **Whether phone ordering is accepted**, which governs the phone CTA label.
7. **Whether dine-in is currently offered.**
8. **Whether reservations are accepted.**
9. **A verified online-ordering URL**, if one exists.
10. **Catering and party-order process.**
11. **Photography ownership and usage rights.** See `docs/asset-register.md`.
12. **Florence ZIP code, hours and current status**, if that location is ever added.
13. **Ownership relationship among locations.**
14. **Current review ratings and counts**, if they are ever to be shown.

---

## Enforcement in code

These are not conventions; they are enforced by the data layer and verified automatically.

- `ActionLink` renders **nothing** when `href` is null. There is no disabled state, so the Order Online CTA cannot appear while `orderOnlineUrl` is null.
- `verifiedOpeningHoursSpecification()` filters to `status === "verified"`, so the disputed Sunday value cannot reach `Restaurant` schema even if a time were later added to it.
- `showPrices` gates every price render site-wide.
- `check-a11y.mjs` fails the audit if any link points at the unrelated Florida business, if any href is a placeholder `#`, or if any `target="_blank"` link is missing `rel="noopener"`.
