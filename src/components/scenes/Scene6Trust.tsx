import { Plate } from "@/components/ui/Plate";
import { LocationDetails } from "@/components/site/LocationDetails";
import {
  primaryLocation,
  publishReviewQuotes,
  reviewSources,
} from "@/data/business";

/**
 * Scene 6 · What LA Says, and Visit Slauson. Trusting.
 *
 * Device: `pin`. The frame holds while the argument advances from "other people
 * vouch for this" to "here is where it is and when it is open". That is a beat
 * with two states, which is what a pinned act is for.
 *
 * The cues accumulate rather than crossfade. Both carry real actions, so
 * swapping one out for the other would take a live link off the screen; the
 * reviews greet and hold at full opacity while the visit block arrives beside
 * them. Both windows close at 1 so neither stays lit through the un-pin slide.
 *
 * No review text is published: none of the candidate excerpts could be
 * reverified against its source, so the scene links to the live listings and
 * says nothing it cannot stand behind. No stars, no counts, no Review schema.
 */
export function Scene6Trust() {
  return (
    <section
      className="scene trust"
      data-scene="6"
      data-sc-act="pin"
      data-sc-span="2"
      aria-labelledby="scene-6-title"
    >
      <div data-sc-stage className="trust__stage">
        <div className="wrap trust__inner">
          <h2 id="scene-6-title" className="display display--2xl trust__title">
            What LA Says About Woody&rsquo;s
          </h2>

          <div className="trust__grid">
            {/* The two states cross over rather than accumulate. On a phone the
                stage is a single 100vh column that clips its overflow, and
                these two blocks together do not fit one; crossing them over is
                also what a pinned act is actually for. Greet form, so the stage
                is never empty while it slides in. The windows overlap by about
                12% so there is no gap where the stage reads as empty. */}
            <div className="trust__reviews" id="reviews" data-sc-cue="0 0.6 0 0.2">
              <p className="body trust__intro">
                Woody&rsquo;s has been serving the same street since 1975. The
                people who eat here have plenty to say about it, in their own
                words, on their own accounts.
              </p>

              {publishReviewQuotes ? null : (
                <ul className="trust__sources">
                  {reviewSources.map((s) => (
                    <li key={s.label}>
                      <a
                        className="source"
                        href={s.href as string}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="source__label">{s.label}</span>
                        <span className="source__arrow" aria-hidden="true">
                          &rarr;
                        </span>
                        <span className="visually-hidden">
                          (opens in a new tab)
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              <figure className="trust__figure">
                <Plate
                  id="slauson-night"
                  ratio="wide"
                  scale="sm"
                  sizes="(max-width: 900px) 100vw, 40vw"
                />
              </figure>
            </div>

            <div className="trust__visit" id="visit" data-sc-cue="0.46 1 0.22 0.06">
              <LocationDetails location={primaryLocation} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
