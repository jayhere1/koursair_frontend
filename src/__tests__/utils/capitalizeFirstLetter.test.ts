import { describe, it, expect } from 'vitest';
import { capitalizeFirstLetter } from '@/utils/helper';

describe('capitalizeFirstLetter', () => {
  it('capitalizes lowercase string', () => {
    expect(capitalizeFirstLetter('hello')).toBe('Hello');
  });

  it('keeps already capitalized string', () => {
    expect(capitalizeFirstLetter('Hello')).toBe('Hello');
  });

  it('returns empty string for empty input', () => {
    expect(capitalizeFirstLetter('')).toBe('');
  });

  it('returns empty string for undefined', () => {
    expect(capitalizeFirstLetter(undefined)).toBe('');
  });

  it('capitalizes single character', () => {
    expect(capitalizeFirstLetter('a')).toBe('A');
  });
});
