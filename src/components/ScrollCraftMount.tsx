"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    ScrollCraft?: {
      mount: (root: Element | Document | string, opts?: Record<string, unknown>) => {
        layout: () => void;
      };
      instances: unknown[];
    };
  }
}

/**
 * Mounts the scrollcraft engine.
 *
 * The engine is loaded and mounted from an effect, which means after React has
 * hydrated. That ordering matters: the engine rewrites DOM (kinetic headlines
 * are split into per-line spans, stages get classes), and doing that before
 * hydration would hand React a tree that no longer matches the server HTML.
 *
 * The scenes it drives are all static server components with no state, so React
 * never re-renders those subtrees afterwards and never fights the engine for
 * ownership of the nodes it rewrote.
 *
 * The engine exposes no teardown, so mounting is guarded: in React Strict Mode
 * the effect runs twice in development, and a second mount would double every
 * act. On a re-run we re-measure instead, which is what `layout()` is for.
 */
export function ScrollCraftMount() {
  useEffect(() => {
    let cancelled = false;

    /* The engine is an ES5 IIFE that assigns window.ScrollCraft, not a module,
       so it is served from /public and loaded by a deferred <script> in the
       layout rather than bundled. That also keeps it out of TypeScript and
       ESLint, which matters because the one rule the skill is absolute about
       is that the engine is never edited per project.

       A deferred script runs before hydration, so it is normally already there
       when this effect fires; the wait covers a slow or cached-miss load. */
    const waitForEngine = async () => {
      for (let i = 0; i < 100 && !window.ScrollCraft; i++) {
        await new Promise((r) => setTimeout(r, 50));
      }
      return window.ScrollCraft;
    };

    (async () => {
      const sc = await waitForEngine();
      if (cancelled || !sc) return;

      if (sc.instances.length > 0) {
        // Already mounted (Strict Mode double-invoke, or a soft navigation
        // back to this page). Re-measure rather than mounting a second engine.
        (sc.instances[0] as { layout: () => void }).layout();
        return;
      }

      const instance = sc.mount(document.body);

      // Line splitting measures real line boxes, so a face swapping in after
      // mount changes where the lines break. The engine re-runs on
      // document.fonts.ready itself; this covers the late reflow that follows
      // a slow font on a cold cache.
      window.setTimeout(() => instance.layout(), 600);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
