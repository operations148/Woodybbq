import { Plate } from "@/components/ui/Plate";

/**
 * Scene 4 · The Woody's Way. Immersed. THE PEAK.
 *
 * Device: `pin`, with a kinetic heading and a wipe sequence. It carries the
 * longest span on the page, the quietest scene in front of it, and the one
 * bespoke interaction. It becomes the page's second and last `scrub` act when
 * pit footage arrives.
 *
 * Everything inside is driven from `--sc-p`, the progress the engine publishes
 * on this act. That is the documented way to build something the device kit
 * does not cover, and it means the sequence is paced by the reader's hand
 * rather than by a duration.
 *
 * Frame one carries no wipe on purpose. A pinned stage becomes fully visible
 * about a viewport before its own progress leaves 0, so an act whose content
 * is entirely progress-gated shows an empty stage for that whole travel. Frame
 * one is the ground that stops that happening; frames two and three are the
 * sequence.
 */

const frames = [
  { id: "pit-fire", caption: "Live oak fire" },
  { id: "pit-cooking", caption: "The brick pit" },
  { id: "pit-plate", caption: "The plate" },
];

export function Scene4PitToPlate() {
  const videoReady = false; // flips on when pit footage is approved

  return (
    <section
      className="scene pitplate"
      data-scene="4"
      data-sc-act="pin"
      data-sc-span="3.3"
      aria-labelledby="scene-4-title"
    >
      <div data-sc-stage className="pitplate__stage">
        {videoReady ? (
          <video
            data-sc-scrub
            data-sc-src="/video/woodys-pit.mp4"
            data-sc-src-mobile="/video/woodys-pit-m.mp4"
            muted
            playsInline
          />
        ) : null}

        <div className="pitplate__inner">
          {/* Greet form (third value 0): full opacity the instant the act
              begins. A pinned stage is fully on screen about a viewport before
              its progress leaves 0, so a heading that ramps in from nothing
              leaves the reader looking at an all but empty stage for that whole
              travel. Ground OR greet; this act has both.

              No kinetic here for the same reason: an assembly that finishes
              before p leaves 0 is an assembly nobody sees. The kinetic headline
              lives on Scene 3, a flow act the reader scrolls through. */}
          <div className="pitplate__head">
            <h2
              id="scene-4-title"
              className="display display--2xl"
              data-sc-cue="0 0.88 0"
            >
              BBQ Done the Woody&rsquo;s Way
            </h2>
            <p className="lede pitplate__lede" data-sc-cue="0 0.88 0">
              Brick pits. Live oak fire. The smoke says everything.
            </p>
          </div>

          <ol className="pitplate__frames">
            {frames.map((f, i) => (
              <li
                key={f.id}
                className="pitplate__frame"
                style={{ "--i": i } as React.CSSProperties}
              >
                <figure>
                  <div className="pitplate__mask">
                    <Plate
                      id={f.id}
                      ratio="portrait"
                      scale="md"
                      fill
                      sizes="(max-width: 860px) 33vw, 30vw"
                    />
                  </div>
                  <figcaption className="visually-hidden">
                    {f.caption}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ol>

          {/* The seam. Part two of the ember line, and the only element that
              spans all three frames, so the sequence reads as one move rather
              than three crossfades. */}
          <div className="pitplate__seam" aria-hidden="true">
            <span className="pitplate__seam-track" />
            <span className="pitplate__seam-lit" />
            <span className="pitplate__seam-mark">Since 1975</span>
          </div>

          <ul className="pitplate__facts" data-sc-cue="0.34 1">
            <li>Live oak fire</li>
            <li>Brick pit barbecue</li>
            <li>A family tradition</li>
            <li>South Los Angeles roots</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
