import { describe, it, expect } from 'vitest';
import { getAgeFromDob, isFutureDate } from '@/lib/helper';

const yearsAgo = (n: number, offsetDays = 0): string => {
  const d = new Date();
  d.setFullYear(d.getFullYear() - n);
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
};

describe('getAgeFromDob', () => {
  it('returns correct age for person born 30 years ago', () => {
    expect(getAgeFromDob(yearsAgo(30, -10))).toBe(30);
  });

  it('returns correct age when birthday is today', () => {
    expect(getAgeFromDob(yearsAgo(25))).toBe(25);
  });

  it('returns N-1 when birthday is tomorrow', () => {
    expect(getAgeFromDob(yearsAgo(25, 1))).toBe(24);
  });

  it('returns N when birthday was yesterday', () => {
    expect(getAgeFromDob(yearsAgo(25, -1))).toBe(25);
  });

  it('handles leap year birthday (Feb 29)', () => {
    // Use a known leap year birthday
    const age = getAgeFromDob('2000-02-29');
    const today = new Date();
    const expected =
      today.getMonth() > 1 ||
      (today.getMonth() === 1 && today.getDate() >= 29)
        ? today.getFullYear() - 2000
        : today.getFullYear() - 2000 - 1;
    expect(age).toBe(expected);
  });

  it('returns 0 for newborn born today', () => {
    const today = new Date().toISOString().split('T')[0];
    expect(getAgeFromDob(today)).toBe(0);
  });

  it('handles Jan 1 birthday', () => {
    const age = getAgeFromDob(yearsAgo(20, 0).replace(/-\d{2}-\d{2}$/, '-01-01'));
    expect(typeof age).toBe('number');
    expect(age).toBeGreaterThanOrEqual(19);
    expect(age).toBeLessThanOrEqual(21);
  });

  it('handles Dec 31 birthday', () => {
    const year = new Date().getFullYear() - 20;
    const age = getAgeFromDob(`${year}-12-31`);
    expect(typeof age).toBe('number');
    expect(age).toBeGreaterThanOrEqual(19);
    expect(age).toBeLessThanOrEqual(20);
  });
});

describe('isFutureDate', () => {
  it('returns false for yesterday', () => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    expect(isFutureDate(d.toISOString().split('T')[0])).toBe(false);
  });

  it('returns false for today', () => {
    const today = new Date().toISOString().split('T')[0];
    expect(isFutureDate(today)).toBe(false);
  });

  it('returns true for tomorrow', () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    expect(isFutureDate(d.toISOString().split('T')[0])).toBe(true);
  });

  it('returns true for far future', () => {
    expect(isFutureDate('2099-01-01')).toBe(true);
  });

  it('returns false for far past', () => {
    expect(isFutureDate('1990-01-01')).toBe(false);
  });
});
