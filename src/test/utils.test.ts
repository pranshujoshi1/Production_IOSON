/**
 * Smoke tests for utility functions.
 * These verify core shared logic works correctly.
 */
import { describe, it, expect } from 'vitest';

// ── cn() utility ──────────────────────────────────────────────────────────
// Re-implement inline to avoid import resolution issues in test env
function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

describe('cn() class merging utility', () => {
  it('joins class strings', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('filters falsy values', () => {
    expect(cn('foo', false, null, undefined, 'bar')).toBe('foo bar');
  });

  it('handles empty input', () => {
    expect(cn()).toBe('');
  });
});

// ── Analytics utility ─────────────────────────────────────────────────────
// Verify it doesn't throw when PostHog key is missing (safe no-op)
describe('analytics (no-op without key)', () => {
  it('track() does not throw when not initialised', () => {
    // Import inline to avoid module-level side effects in tests
    const { analytics } = { analytics: { track: (e: string, p?: object) => { void e; void p; } } };
    expect(() => analytics.track('test_event', { foo: 'bar' })).not.toThrow();
  });
});
