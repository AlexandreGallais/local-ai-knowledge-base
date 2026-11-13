import {
  describe,
  expect,
  it,
} from 'vitest';

import { formatNumber } from './format-number.ts';

describe('formatNumber', () => {
  it('formatNumber(6.123e-16, 3)', () => {
    const result = formatNumber(
      6.123e-16,
      3,
    );

    expect(result).toBe('0');
  });

  it('formatNumber(-0.0004, 3)', () => {
    const result = formatNumber(
      -0.0004,
      3,
    );

    expect(result).toBe('0');
  });

  it('formatNumber(12.34567, 3)', () => {
    const result = formatNumber(
      12.34567,
      3,
    );

    expect(result).toBe('12.346');
  });

  it('formatNumber(NaN, 3)', () => {
    expect(() => formatNumber(
      NaN,
      3,
    )).toThrow(RangeError);
  });
});
