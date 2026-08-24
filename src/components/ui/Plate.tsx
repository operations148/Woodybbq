import Image from "next/image";
import { getAsset, hasImage } from "@/data/assets";

type Ratio = "wide" | "hero" | "portrait" | "square" | "tall" | "cinema";

const ratios: Record<Ratio, string> = {
  hero: "16 / 10",
  wide: "3 / 2",
  square: "1 / 1",
  portrait: "4 / 5",
  tall: "3 / 4",
  /** The tall editorial crop used by the Scene 4 triptych. */
  cinema: "5 / 8",
};

type Props = {
  /** Asset id from src/data/assets.ts */
  id: string;
  ratio?: Ratio;
  /** Only the hero image should be priority. */
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** Larger type on the fallback, for hero and peak placements. */
  scale?: "sm" | "md" | "lg";
  /**
   * Suppress the typeset label. Use when the surrounding markup already names
   * this frame, so the name is not printed twice, or when the frame is purely
   * decorative. Has no effect once a real photograph exists.
   */
  hideLabel?: boolean;
  /**
   * Fill the parent's box instead of holding an aspect ratio. Required inside a
   * pinned stage, which is a fixed 100vh box: an aspect-ratio frame there would
   * overflow the stage's `overflow: clip` and lose its own caption.
   */
  fill?: boolean;
};

/**
 * One image slot.
 *
 * If an approved, client-owned photograph exists, it renders it. If not, it
 * renders an honest typographic composition in the brand palette: charred
 * ground, an ember rule, and the subject set in the display face.
 *
 * It never renders generic stock photography, an AI-generated substitute, a
 * hotlinked third-party image, or a grey box, because all four are worse than
 * saying plainly what the frame is for.
 */
export function Plate({
  id,
  ratio = "wide",
  priority = false,
  sizes = "(max-width: 700px) 100vw, 50vw",
  className,
  scale = "md",
  hideLabel = false,
  fill = false,
}: Props) {
  const asset = getAsset(id);
  const style = (
    fill ? { height: "100%", width: "100%" } : { aspectRatio: ratios[ratio] }
  ) as React.CSSProperties;

  if (hasImage(asset)) {
    return (
      <div className={`plate plate--photo ${className ?? ""}`} style={style}>
        <Image
          src={asset.src as string}
          alt={asset.alt}
          fill
          sizes={sizes}
          priority={priority}
          // Everything below the fold loads lazily; only the hero opts out.
          loading={priority ? undefined : "lazy"}
          className="plate__img"
          style={
            asset.objectPosition
              ? { objectPosition: asset.objectPosition }
              : undefined
          }
        />
        {/* The gradient that keeps a lower-left label readable, then the label
            itself. The card composition is the same whether the frame holds a
            photograph or the typeset stand-in, so swapping in photography does
            not move the type. */}
        {hideLabel ? null : (
          <>
            <span className="plate__veil" aria-hidden="true" />
            <div className="plate__inner" aria-hidden="true">
              <span className="plate__rule" />
              <span className="plate__label">{asset.fallbackLabel}</span>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div
      className={`plate plate--typeset plate--${scale} ${className ?? ""}`}
      style={style}
    >
      {/* Decorative: the accessible name of this frame is its caption in the
          surrounding markup, so the composition itself is hidden from AT. */}
      <div className="plate__char" aria-hidden="true" />
      {hideLabel ? null : (
        // Hidden from assistive technology on purpose. This is a visual
        // composition standing in for a photograph, and the surrounding markup
        // already carries the real name. Exposing it too gave links a doubled
        // accessible name ("Pork RibsPork Ribs").
        <div className="plate__inner" aria-hidden="true">
          <span className="plate__rule" />
          <span className="plate__label">{asset.fallbackLabel}</span>
        </div>
      )}
    </div>
  );
}
