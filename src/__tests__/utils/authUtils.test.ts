import { describe, it, expect } from 'vitest';
import { isJwtExpired } from '@/stores/authStore';

const makeJwt = (payload: Record<string, unknown>): string =>
  'h.' + btoa(JSON.stringify(payload)) + '.s';

describe('isJwtExpired', () => {
  it('returns false for valid token expiring in 1 hour', () => {
    const token = makeJwt({ exp: Math.floor(Date.now() / 1000) + 3600 });
    expect(isJwtExpired(token)).toBe(false);
  });

  it('returns true for token expired 1 hour ago', () => {
    const token = makeJwt({ exp: Math.floor(Date.now() / 1000) - 3600 });
    expect(isJwtExpired(token)).toBe(true);
  });

  it('returns true for token expiring exactly now', () => {
    const token = makeJwt({ exp: Math.floor(Date.now() / 1000) });
    expect(isJwtExpired(token)).toBe(true);
  });

  it('returns true for malformed token (no dots)', () => {
    expect(isJwtExpired('notsatoken')).toBe(true);
  });

  it('returns true for invalid base64 payload', () => {
    expect(isJwtExpired('h.!!!invalid!!!.s')).toBe(true);
  });

  it('returns true for non-JSON payload', () => {
    expect(isJwtExpired('h.' + btoa('not json') + '.s')).toBe(true);
  });

  it('returns true for empty string', () => {
    expect(isJwtExpired('')).toBe(true);
  });
});
