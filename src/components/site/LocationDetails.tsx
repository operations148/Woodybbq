import { ActionLink } from "@/components/ui/ActionLink";
import {
  ctaLabels,
  formatAddress,
  formatTime,
  hasHoursConflict,
  orderOnlineUrl,
  type Location,
} from "@/data/business";

/**
 * Address, phone, actions and hours for one location.
 *
 * The hours block is the careful part. Sources disagree on the Sunday closing
 * time, so Sunday is never given a time here. Verified days are grouped into
 * ranges, the conflicted day is shown as unresolved with a link to the live
 * listing, and the caveat sits under the whole block. That is also why the
 * disputed value cannot reach the Restaurant schema: it does not exist as a
 * time anywhere in the data.
 */
export function LocationDetails({
  location,
  /** Set to 2 where this block is the first heading under the page's H1. */
  headingLevel = 3,
}: {
  location: Location;
  headingLevel?: 2 | 3;
}) {
  const groups = groupHours(location);
  const conflicted = location.hours.filter((h) => h.status === "conflict");
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <div className="loc">
      <Heading className="display display--lg loc__title">
        Visit Woody&rsquo;s on Slauson
      </Heading>

      <address className="loc__address">
        <span className="loc__street">{location.address.street}</span>
        <span className="loc__city">
          {location.address.city}, {location.address.state}{" "}
          <span className="num">{location.address.postalCode}</span>
        </span>
        <a className="loc__phone num" href={location.phoneHref}>
          {location.phone}
        </a>
        <span className="visually-hidden">{formatAddress(location)}</span>
      </address>

      <dl className="loc__hours">
        {groups.map((g) => (
          <div key={g.label} className="loc__hours-row">
            <dt>{g.label}</dt>
            <dd className="num">{g.value}</dd>
          </div>
        ))}
        {conflicted.map((h) => (
          <div key={h.day} className="loc__hours-row loc__hours-row--open">
            <dt>{h.day}</dt>
            <dd>
              <a
                href={location.googleListingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="action--text"
              >
                Check today
                <span className="visually-hidden">
                  &rsquo;s hours on the Google listing (opens in a new tab)
                </span>
              </a>
            </dd>
          </div>
        ))}
      </dl>

      {hasHoursConflict(location) ? (
        <p className="loc__caveat">
          Hours can change. Check today&rsquo;s hours before visiting.
        </p>
      ) : null}

      <div className="loc__actions">
        <ActionLink href={location.phoneHref} variant="primary">
          {ctaLabels.phone}
        </ActionLink>
        <ActionLink href={location.directionsUrl} variant="secondary" external>
          {ctaLabels.directions}
        </ActionLink>
        <ActionLink href={location.googleListingUrl} variant="secondary" external>
          {ctaLabels.hours}
        </ActionLink>
        <ActionLink href={orderOnlineUrl} variant="secondary">
          {ctaLabels.order}
        </ActionLink>
      </div>
    </div>
  );
}

/** Collapse consecutive verified days that share the same open and close. */
function groupHours(location: Location) {
  const out: { label: string; value: string }[] = [];
  let run: { start: string; end: string; opens: string; closes: string } | null =
    null;

  const flush = () => {
    if (!run) return;
    out.push({
      label: run.start === run.end ? run.start : `${run.start} to ${run.end}`,
      value: `${formatTime(run.opens)} to ${formatTime(run.closes)}`,
    });
    run = null;
  };

  for (const h of location.hours) {
    if (h.status !== "verified" || !h.opens || !h.closes) {
      flush();
      continue;
    }
    if (run && run.opens === h.opens && run.closes === h.closes) {
      run.end = h.day;
    } else {
      flush();
      run = { start: h.day, end: h.day, opens: h.opens, closes: h.closes };
    }
  }
  flush();
  return out;
}
