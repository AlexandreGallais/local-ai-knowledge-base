import {
  describe,
  expect,
  it,
} from 'vitest';

import { advanceFixedTimestep } from './advance-fixed-timestep.ts';

describe('advanceFixedTimestep', () => {
  it('advanceFixedTimestep(0, 16, { stepMs: 10, maximumFrameTimeMs: 250 })', () => {
    const result = advanceFixedTimestep(
      0,
      16,
      {
        maximumFrameTimeMs: 250,
        stepMs: 10,
      },
    );

    expect(result).toEqual({
      accumulatorMs: 6,
      alpha: 0.6,
      stepCount: 1,
    });
  });

  it('advanceFixedTimestep(0, 1000, { stepMs: 10, maximumFrameTimeMs: 250 }).stepCount', () => {
    const result = advanceFixedTimestep(
      0,
      1000,
      {
        maximumFrameTimeMs: 250,
        stepMs: 10,
      },
    ).stepCount;

    expect(result).toBe(25);
  });
});
