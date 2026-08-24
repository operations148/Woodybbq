import { Plate } from "@/components/ui/Plate";
import { ActionLink } from "@/components/ui/ActionLink";
import { brand } from "@/data/business";

/**
 * Scene 3 · The 1975 Story. Connected.
 *
 * The hard cut. This is the only scene on a paper ground, and the change of
 * ground does more to separate the chapters than any transition could. It is
 * also the deliberate trough: the quietest scene, with the most air, sitting
 * directly in front of the peak so the peak has something to be louder than.
 *
 * Every sentence here is traceable to the researched sources. No invented
 * founder biography, no generation count, no awards, no recipe detail.
 * Because no founder or historic photograph is licensed, the date carries the
 * frame typographically instead, which is the documented fallback.
 */
export function Scene3Story() {
  return (
    <section
      className="scene scene--after-pin ground-paper story"
      data-scene="3"
      data-sc-act="flow"
      aria-labelledby="scene-3-title"
    >
      <div className="wrap story__grid">
        {/* Reduced top padding, because the pan stage in front of this needs a
            full viewport to scroll off and full section padding on top of that
            delays the first line by another screen. */}
        <div className="story__text" data-sc-in data-sc-stagger="70">
          {/* The one kinetic headline on the page. It lives on a flow act
              because a flow act's progress tracks the section travelling
              through the viewport, so the assembly actually happens in front
              of the reader. On a pinned act it would finish before the act's
              progress left 0. Lines, not words or characters: characters turn
              reading into waiting. */}
          <h2
            id="scene-3-title"
            className="display display--2xl"
            data-sc-cue="0.04 1"
            data-sc-kinetic="lines"
          >
            A South Los Angeles Tradition Since 1975
          </h2>

          <div className="story__prose">
            <p className="body body--ink story__first">
              Woody Phillips came to Los Angeles from Louisiana in the 1960s. In
              August 1975, he and Jenetha Phillips opened a barbecue restaurant
              on West Slauson Avenue.
            </p>
            <p className="body">
              He worked the pit. She ran the register. The family has carried the
              business forward ever since, in the same neighborhood, on the same
              street.
            </p>
          </div>

          <p className="story__cta">
            <ActionLink href="/our-story" variant="text" arrow>
              Read the full story
            </ActionLink>
          </p>
        </div>

        <div className="story__aside">
          {/* A wipe reads as a change of state, which is what this beat is:
              the page has just cut from the pit to 1975. */}
          <figure
            className="story__figure"
            data-sc-reveal="up"
            data-sc-reveal-at="0.08 0.5"
          >
            <Plate
              id="slauson-exterior"
              ratio="portrait"
              scale="sm"
              sizes="(max-width: 900px) 100vw, 34vw"
              hideLabel
            />
            <figcaption className="label story__caption">
              3446 W Slauson Ave
            </figcaption>
          </figure>

          <p className="story__date" aria-hidden="true">
            <span className="story__date-month">August</span>
            <span className="story__date-year num">{brand.foundedYear}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
