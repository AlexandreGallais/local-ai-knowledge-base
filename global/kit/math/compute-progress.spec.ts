import {
  describe,
  expect,
  it,
} from 'vitest';

import { computeProgress } from './compute-progress.ts';

describe('computeProgress', () => {
  it('computeProgress(1000, 2000, 1500)', () => {
    const result = computeProgress(
      1000,
      2000,
      1500,
    );

    expect(result).toBe(0.25);
  });

  it('computeProgress(1000, 2000, 500)', () => {
    const result = computeProgress(
      1000,
      2000,
      500,
    );

    expect(result).toBe(0);
  });

  it('computeProgress(1000, 2000, 5000)', () => {
    const result = computeProgress(
      1000,
      2000,
      5000,
    );

    expect(result).toBe(1);
  });
});
