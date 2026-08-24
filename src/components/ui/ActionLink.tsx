import Link from "next/link";

type Props = {
  href: string | null | undefined;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "text";
  external?: boolean;
  className?: string;
  /** Adds a nudging arrow. Omit on primary CTAs where the label stands alone. */
  arrow?: boolean;
  /** Extra context for screen readers when the label alone is ambiguous. */
  srSuffix?: string;
};

/**
 * The only way a call to action reaches the page.
 *
 * If `href` is null or empty it renders NOTHING. There is no disabled state,
 * because a disabled conversion control presented as functional is worse than
 * an absent one. This is what keeps the Order Online CTA off the site while
 * `orderOnlineUrl` is null.
 */
export function ActionLink({
  href,
  children,
  variant = "secondary",
  external = false,
  className,
  arrow = false,
  srSuffix,
}: Props) {
  if (!href) return null;

  const cls = `action action--${variant} ${className ?? ""}`.trim();

  const inner = (
    <>
      {children}
      {srSuffix ? <span className="visually-hidden"> {srSuffix}</span> : null}
      {arrow ? (
        <span className="action__arrow" aria-hidden="true">
          &rarr;
        </span>
      ) : null}
    </>
  );

  const isExternal = external || /^(https?:|tel:|mailto:)/.test(href);

  if (isExternal) {
    const isProtocolLink = /^(tel:|mailto:)/.test(href);
    return (
      <a
        href={href}
        className={cls}
        {...(isProtocolLink
          ? {}
          : { target: "_blank", rel: "noopener noreferrer" })}
      >
        {inner}
        {isProtocolLink ? null : (
          <span className="visually-hidden"> (opens in a new tab)</span>
        )}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
