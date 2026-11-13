import {
  describe,
  expect,
  it,
} from 'vitest';

import { roundToSignificant } from './round-to-significant.ts';

describe('roundToSignificant', () => {
  it('roundToSignificant(123_456, 3)', () => {
    const result = roundToSignificant(
      123_456,
      3,
    );

    expect(result).toBe(123_000);
  });

  it('roundToSignificant(0.001_234_56, 3)', () => {
    const result = roundToSignificant(
      0.001_234_56,
      3,
    );

    expect(result).toBe(0.001_23);
  });

  it('roundToSignificant(-9.996, 3)', () => {
    const result = roundToSignificant(
      -9.996,
      3,
    );

    expect(result).toBe(-10);
  });
});
