import {
  describe,
  expect,
  it,
} from 'vitest';

import { roundHalfAwayFromZero } from './round-half-away-from-zero.ts';

describe('roundHalfAwayFromZero', () => {
  it('roundHalfAwayFromZero(2.5)', () => {
    const result = roundHalfAwayFromZero(2.5);

    expect(result).toBe(3);
  });

  it('roundHalfAwayFromZero(-2.5)', () => {
    const result = roundHalfAwayFromZero(-2.5);

    expect(result).toBe(-3);
  });

  it('roundHalfAwayFromZero(-0.5)', () => {
    const result = roundHalfAwayFromZero(-0.5);

    expect(result).toBe(-1);
  });

  it('roundHalfAwayFromZero(0.499_999_999_999_999_94)', () => {
    const result = roundHalfAwayFromZero(0.499_999_999_999_999_94);

    expect(result).toBe(0);
  });
});
