import {
  describe,
  expect,
  it,
} from 'vitest';

import { percentOf } from './percent-of';

describe('percentOf', () => {
  it('gives the share of a part, in percent', () => {
    expect(percentOf(
      30,
      120,
    )).toBe(25);
    expect(percentOf(
      -5,
      20,
    )).toBe(-25);
  });
  it('keeps the decimals: rounding is the caller\'s choice', () => {
    expect(percentOf(
      1,
      3,
    )).toBeCloseTo(
      33.333_333,
      6,
    );
  });
  it('refuses a whole of 0', () => {
    expect(() => percentOf(
      1,
      0,
    )).toThrow(RangeError);
  });
});
