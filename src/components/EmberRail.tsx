/**
 * The Since-1975 ember rail.
 *
 * Part one of the signature move: a single hairline pinned in the left margin
 * for the whole page, lit from the top and drawn downward by the reader's own
 * scroll. It threads the seven cuts together without belonging to any of them.
 *
 * Part two is the seam that travels the Scene 4 triptych. Part three is the
 * underline it becomes beneath the wordmark in Scene 7. All three read the same
 * published value, --ember-p, so it is one stroke rather than three effects.
 *
 * Presentational and inert: it consumes a custom property and carries no state
 * of its own, so with JavaScript absent the rail simply stands at full height.
 */
export function EmberRail() {
  return (
    <div className="ember-rail" aria-hidden="true">
      <span className="ember-rail__track" />
      <span className="ember-rail__lit" />
      <span className="ember-rail__head" />
      <span className="ember-rail__mark">Since 1975</span>
    </div>
  );
}
