import {
  describe,
  expect,
  it,
} from 'vitest';

import { roundToDecimals } from './round-to-decimals.ts';

describe('roundToDecimals', () => {
  it('roundToDecimals(1.005, 2)', () => {
    const result = roundToDecimals(
      1.005,
      2,
    );

    expect(result).toBe(1.01);
  });

  it('roundToDecimals(-1.005, 2)', () => {
    const result = roundToDecimals(
      -1.005,
      2,
    );

    expect(result).toBe(-1.01);
  });

  it('roundToDecimals(2.675, 2)', () => {
    const result = roundToDecimals(
      2.675,
      2,
    );

    expect(result).toBe(2.68);
  });

  it('roundToDecimals(0.1 + 0.2, 10)', () => {
    const result = roundToDecimals(
      0.1 + 0.2,
      10,
    );

    expect(result).toBe(0.3);
  });

  it('roundToDecimals(-0.004, 2)', () => {
    const result = roundToDecimals(
      -0.004,
      2,
    );

    expect(result).toBe(0);
  });
});
