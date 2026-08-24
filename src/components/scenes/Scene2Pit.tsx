import Link from "next/link";
import { Plate } from "@/components/ui/Plate";
import { ctaLabels } from "@/data/business";
import { signatureMeats } from "@/data/menu";

/**
 * Scene 2 · Straight From the Pit. Eager to explore.
 *
 * Device: `pan`. Vertical scroll, lateral travel. Sideways reads as breadth
 * where vertical reads as argument, and breadth is exactly what a lineup of
 * meats is. It is also why this is not a grid: a grid ranks, a rail does not.
 *
 * The heading rides in as the first rail item and a closing note as the last.
 * Both earn their place (the heading stops competing with the fixed bar, the
 * note gives the rail a resolution rather than an end) and, per devices.md,
 * they add the width the travel actually needs. A rail narrower than the
 * viewport travels zero pixels and the act becomes a motionless pinned screen,
 * which the harness does not catch. The overflow is measured in
 * check-rail.mjs, not assumed.
 *
 * Cards are read cropped for most of their life, so every label is one or two
 * short words.
 *
 * The visible dish name is set inside the frame by Plate, over a gradient in
 * the lower band. The span below it is the screen-reader copy, so each card has
 * exactly one accessible name whether the frame holds a photograph or the
 * typeset stand-in.
 */
export function Scene2Pit() {
  return (
    <section
      className="scene scene--surface pit"
      data-scene="2"
      data-sc-act="pan"
      data-sc-span="2.3"
      aria-labelledby="scene-2-title"
    >
      <div data-sc-stage className="pit__stage">
        <div className="rail" data-sc-pan="0.04">
          <div className="rail__lead">
            <h2 id="scene-2-title" className="display display--2xl">
              Straight From the Pit
            </h2>
            <p className="lede rail__lede">
              Ribs, tips, links, beef and chicken, off a live oak fire.
            </p>
            <Link href="/menu" className="action action--text rail__link">
              {ctaLabels.menu}
              <span className="action__arrow" aria-hidden="true">
                {" "}
                &rarr;
              </span>
            </Link>
          </div>

          {signatureMeats.map((item) => (
            <Link
              key={item.name}
              href="/menu#dinners"
              className="rail__item dish plate-link"
            >
              <Plate
                id={item.image as string}
                ratio="portrait"
                scale="sm"
                sizes="24vw"
              />
              <span className="visually-hidden">{item.name}</span>
            </Link>
          ))}

          <div className="rail__note">
            <p className="body">
              Plates come with sides. The menu changes, so call ahead to check
              what is on today.
            </p>
            <Link href="/menu" className="action action--secondary">
              {ctaLabels.fullMenu}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
