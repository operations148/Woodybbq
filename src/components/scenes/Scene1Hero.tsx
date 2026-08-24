import { Plate } from "@/components/ui/Plate";
import { ActionLink } from "@/components/ui/ActionLink";
import { ctaLabels, orderOnlineUrl, primaryLocation } from "@/data/business";
import { getAsset, hasImage } from "@/data/assets";

/**
 * Scene 1 · Arrival. Hungry and curious.
 *
 * Device: `pin`. The stage holds while the plate settles and the page begins.
 * It becomes a `scrub` act the moment hero footage exists: the stage, poster,
 * scrim and copy are already in the shape the engine wants, so adding the clip
 * is a data change (see the videoReady branch below), not a rebuild.
 *
 * Cue form is `"0 1 0 0"`, greet and hold: full opacity at p = 0, no ramp at
 * either end. A hero must be on the landing screen, so it greets; and the
 * conversion actions must never fade while the act is still pinned, so it
 * holds. It still closes at p = 1, which is what stops it staying lit through
 * the un-pin slide and colliding with Scene 2.
 */
export function Scene1Hero() {
  const hero = getAsset("hero-ribs");
  const videoReady = false; // flips on when hero footage is approved

  return (
    <section
      className="scene hero"
      data-scene="1"
      data-sc-act="pin"
      data-sc-span="1.7"
      aria-labelledby="scene-1-title"
    >
      <div data-sc-stage className="hero__stage">
        <div className="hero__grid">
          <div
            className="hero__copy"
            data-sc-cue="0 1 0 0"
            data-sc-rise="0"
          >
            <p className="label label--ember">Serving Los Angeles Since 1975</p>

            <h1 id="scene-1-title" className="display hero__title">
              Los Angeles BBQ.
              <br />
              Done the Woody&rsquo;s Way.
            </h1>

            <p className="lede hero__lede">
              Brick pits. Live oak fire. Saucy ribs, links, sliced beef, and
              chicken from a South Los Angeles family tradition.
            </p>

            <div className="hero__actions">
              <ActionLink href="/menu" variant="primary">
                {ctaLabels.menu}
              </ActionLink>
              <ActionLink href={primaryLocation.phoneHref} variant="secondary">
                {ctaLabels.phone}
              </ActionLink>
              <ActionLink href={orderOnlineUrl} variant="secondary">
                {ctaLabels.order}
              </ActionLink>
            </div>

            <p className="hero__meta">
              <a
                className="action--text"
                href={primaryLocation.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {ctaLabels.directions}
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
              <span className="hero__dot" aria-hidden="true" />
              <span>{primaryLocation.address.street}</span>
            </p>
          </div>

          {/* The ground. Present at p = 0, which is what a pinned act needs so
              the stage is never empty while it slides into view. */}
          <div className="hero__plate">
            {videoReady && hasImage(hero) ? (
              <video
                data-sc-scrub
                data-sc-src="/video/woodys-hero.mp4"
                data-sc-src-mobile="/video/woodys-hero-m.mp4"
                muted
                playsInline
              />
            ) : null}
            {/* No label: the H1 beside it already names the brand, and a
                "Pork Ribs" tag on the hero would just be a second caption
                competing with it. */}
            <Plate
              id="hero-ribs"
              ratio="tall"
              scale="lg"
              priority
              fill
              hideLabel
              sizes="(max-width: 900px) 100vw, 46vw"
              className="hero__plate-inner"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
