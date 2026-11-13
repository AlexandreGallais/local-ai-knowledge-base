import {
  describe,
  expect,
  it,
} from 'vitest';

import { roundToDecimalsHalfEven } from './round-to-decimals-half-even.ts';

describe('roundToDecimalsHalfEven', () => {
  it('roundToDecimalsHalfEven(0.125, 2)', () => {
    const result = roundToDecimalsHalfEven(
      0.125,
      2,
    );

    expect(result).toBe(0.12);
  });

  it('roundToDecimalsHalfEven(0.135, 2)', () => {
    const result = roundToDecimalsHalfEven(
      0.135,
      2,
    );

    expect(result).toBe(0.14);
  });

  it('roundToDecimalsHalfEven(2.5, 0)', () => {
    const result = roundToDecimalsHalfEven(
      2.5,
      0,
    );

    expect(result).toBe(2);
  });

  it('roundToDecimalsHalfEven(1.015, 2)', () => {
    const result = roundToDecimalsHalfEven(
      1.015,
      2,
    );

    expect(result).toBe(1.02);
  });
});
