import {
  describe,
  expect,
  it,
} from 'vitest';

import { exponentialSmoothing } from './exponential-smoothing.ts';

describe('exponentialSmoothing', () => {
  it('exponentialSmoothing(71, 70, 0.1)', () => {
    const result = exponentialSmoothing(
      71,
      70,
      0.1,
    );

    expect(result).toBeCloseTo(
      70.9,
      9,
    );
  });

  it('exponentialSmoothing(20, 30, 0.25)', () => {
    const result = exponentialSmoothing(
      20,
      30,
      0.25,
    );

    expect(result).toBe(22.5);
  });

  it('exponentialSmoothing(5, 9, 1)', () => {
    const result = exponentialSmoothing(
      5,
      9,
      1,
    );

    expect(result).toBe(9);
  });
});
