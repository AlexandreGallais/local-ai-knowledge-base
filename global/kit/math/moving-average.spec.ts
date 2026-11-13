import {
  describe,
  expect,
  it,
} from 'vitest';

import { movingAverage } from './moving-average.ts';

describe('movingAverage', () => {
  it('movingAverage([1, 2, 3, 4, 5], 3)', () => {
    const result = movingAverage(
      [
        1,
        2,
        3,
        4,
        5,
      ],
      3,
    );

    expect(result).toEqual([
      2,
      3,
      4,
    ]);
  });

  it('movingAverage([1, 2], 3)', () => {
    const result = movingAverage(
      [
        1,
        2,
      ],
      3,
    );

    expect(result).toEqual([]);
  });
});
