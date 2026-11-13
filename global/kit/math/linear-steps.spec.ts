import {
  describe,
  expect,
  it,
} from 'vitest';

import { linearSteps } from './linear-steps.ts';

describe('linearSteps', () => {
  it('linearSteps(0, 100, 4)', () => {
    const result = linearSteps(
      0,
      100,
      4,
    );

    expect(result).toEqual([
      0,
      25,
      50,
      75,
      100,
    ]);
  });

  it('linearSteps(0, 1, 10)[3]', () => {
    const result = linearSteps(
      0,
      1,
      10,
    )[3];

    expect(result).toBe(0.3);
  });
});
