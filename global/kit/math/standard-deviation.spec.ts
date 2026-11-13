import {
  describe,
  expect,
  it,
} from 'vitest';

import { standardDeviation } from './standard-deviation.ts';

describe('standardDeviation', () => {
  it('standardDeviation([4, 7, 13, 16], \'sample\')', () => {
    const result = standardDeviation(
      [
        4,
        7,
        13,
        16,
      ],
      'sample',
    );

    expect(result).toBeCloseTo(
      5.477_225_575_051_661,
      9,
    );
  });

  it('standardDeviation([2, 4, 4, 4, 5, 5, 7, 9], \'population\')', () => {
    const result = standardDeviation(
      [
        2,
        4,
        4,
        4,
        5,
        5,
        7,
        9,
      ],
      'population',
    );

    expect(result).toBe(2);
  });
});
