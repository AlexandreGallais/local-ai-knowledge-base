import {
  describe,
  expect,
  it,
} from 'vitest';

import { updateRunningStatistics } from './update-running-statistics.ts';

describe('updateRunningStatistics', () => {
  it('[4, 7, 13, 16].reduce((state, value) => updateRunningStatistics(state, value), { count: 0, mean: 0, sumOfSquaredDeviations: 0 })', () => {
    const result = [
      4,
      7,
      13,
      16,
    ].reduce(
      (
        state,
        value,
      ) => updateRunningStatistics(
        state,
        value,
      ),
      {
        count: 0,
        mean: 0,
        sumOfSquaredDeviations: 0,
      },
    );

    expect(result).toEqual({
      count: 4,
      mean: 10,
      sumOfSquaredDeviations: 90,
    });
  });
});
