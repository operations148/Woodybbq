import { ActionLink } from "@/components/ui/ActionLink";
import { ctaLabels, primaryLocation } from "@/data/business";

/**
 * The standing conversion bar on phones: the three actions a hungry visitor
 * actually wants, one tap away from anywhere on the site.
 *
 * Order Online is absent by construction, because it routes through ActionLink
 * and `orderOnlineUrl` is null. It will appear here automatically, and only
 * here and in the header, once a verified URL exists.
 *
 * The body reserves space for it with padding on small screens, so it never
 * covers the last line of a scene or the browser's own controls.
 */
export function MobileActionBar() {
  return (
    <div className="actionbar">
      <nav className="actionbar__inner" aria-label="Quick actions">
        <ActionLink href="/menu" variant="secondary" className="actionbar__item">
          {ctaLabels.menu}
        </ActionLink>
        <ActionLink
          href={primaryLocation.phoneHref}
          variant="primary"
          className="actionbar__item"
        >
          Call
          <span className="visually-hidden"> Woody&rsquo;s</span>
        </ActionLink>
        <ActionLink
          href={primaryLocation.directionsUrl}
          variant="secondary"
          className="actionbar__item"
        >
          Directions
        </ActionLink>
      </nav>
    </div>
  );
}
