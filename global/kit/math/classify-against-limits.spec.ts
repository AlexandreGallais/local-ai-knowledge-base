import {
  describe,
  expect,
  it,
} from 'vitest';

import { classifyAgainstLimits } from './classify-against-limits.ts';

describe('classifyAgainstLimits', () => {
  it('classifyAgainstLimits(5, { lowLowLimit: 10, lowLimit: 20, highLimit: 80, highHighLimit: 90 })', () => {
    const result = classifyAgainstLimits(
      5,
      {
        highHighLimit: 90,
        highLimit: 80,
        lowLimit: 20,
        lowLowLimit: 10,
      },
    );

    expect(result).toBe('lowLow');
  });

  it('classifyAgainstLimits(50, { lowLowLimit: 10, lowLimit: 20, highLimit: 80, highHighLimit: 90 })', () => {
    const result = classifyAgainstLimits(
      50,
      {
        highHighLimit: 90,
        highLimit: 80,
        lowLimit: 20,
        lowLowLimit: 10,
      },
    );

    expect(result).toBe('normal');
  });

  it('classifyAgainstLimits(95, { lowLowLimit: 10, lowLimit: 20, highLimit: 80, highHighLimit: 90 })', () => {
    const result = classifyAgainstLimits(
      95,
      {
        highHighLimit: 90,
        highLimit: 80,
        lowLimit: 20,
        lowLowLimit: 10,
      },
    );

    expect(result).toBe('highHigh');
  });

  it('classifyAgainstLimits(Number.NaN, { lowLowLimit: 10, lowLimit: 20, highLimit: 80, highHighLimit: 90 })', () => {
    const result = classifyAgainstLimits(
      Number.NaN,
      {
        highHighLimit: 90,
        highLimit: 80,
        lowLimit: 20,
        lowLowLimit: 10,
      },
    );

    expect(result).toBe('unknown');
  });
});
