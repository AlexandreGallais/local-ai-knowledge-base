import {
  describe,
  expect,
  it,
} from 'vitest';

import { percentOf } from './percent-of.ts';

describe('percentOf', () => {
  it('percentOf(1, 8)', () => {
    const result = percentOf(
      1,
      8,
    );

    expect(result).toBe(12.5);
  });

  it('percentOf(7, 100)', () => {
    const result = percentOf(
      7,
      100,
    );

    expect(result).toBe(7);
  });

  it('percentOf(1, 3)', () => {
    const result = percentOf(
      1,
      3,
    );

    expect(result).toBe(33.333_333_333_333_336);
  });
});
