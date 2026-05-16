/**
 * IOSON Analytics — thin wrapper around PostHog.
 *
 * Usage:
 *   import { analytics } from '@/lib/analytics';
 *   analytics.track('cta_clicked', { label: 'Request Demo', page: 'thalii' });
 *
 * PostHog is only initialised when VITE_POSTHOG_KEY is set, so analytics
 * calls are safe no-ops in development without a key.
 */

import posthog from 'posthog-js';

let initialised = false;

export const analytics = {
  /** Call once in main.tsx before rendering the app */
  init() {
    const key  = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
    const host = (import.meta.env.VITE_POSTHOG_HOST as string | undefined)
      ?? 'https://us.i.posthog.com';

    if (!key || initialised) return;

    posthog.init(key, {
      api_host:               host,
      capture_pageview:       true,   // auto page-view events
      capture_pageleave:      true,
      autocapture:            false,  // manual events only — cleaner data
      disable_session_recording: true,
      loaded: (ph) => {
        // Opt-out in dev / preview unless explicitly enabled
        if (import.meta.env.VITE_ENV !== 'production') {
          ph.opt_out_capturing();
        }
      },
    });

    initialised = true;
  },

  /** Track a custom event */
  track(event: string, properties?: Record<string, unknown>) {
    if (!initialised) return;
    posthog.capture(event, properties);
  },

  /** Track a page view (call on route change) */
  page(path?: string) {
    if (!initialised) return;
    posthog.capture('$pageview', { $current_url: path ?? window.location.href });
  },

  /** Identify a known user (call after form submit or login) */
  identify(id: string, traits?: Record<string, unknown>) {
    if (!initialised) return;
    posthog.identify(id, traits);
  },
};
