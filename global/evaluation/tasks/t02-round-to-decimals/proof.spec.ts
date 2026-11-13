import {
  describe,
  expect,
  it,
} from 'vitest';
import { roundToDecimals } from './round-to-decimals.ts';

describe('proof of t02', () => {
  it('rounds a half away from zero, without the binary trap', () => {
    expect(roundToDecimals(1.005, 2)).toBe(1.01);
    expect(roundToDecimals(2.675, 2)).toBe(2.68);
    expect(roundToDecimals(-2.5, 0)).toBe(-3);
  });
  it('refuses a number of decimals that is not an integer from 0 to 15', () => {
    expect(() => roundToDecimals(1, 1.5)).toThrow(RangeError);
    expect(() => roundToDecimals(1, 16)).toThrow(RangeError);
  });
});
