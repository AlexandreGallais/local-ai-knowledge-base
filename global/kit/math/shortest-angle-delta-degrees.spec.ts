import {
  describe,
  expect,
  it,
} from 'vitest';

import { shortestAngleDeltaDegrees } from './shortest-angle-delta-degrees.ts';

describe('shortestAngleDeltaDegrees', () => {
  it('shortestAngleDeltaDegrees(350, 10)', () => {
    const result = shortestAngleDeltaDegrees(
      350,
      10,
    );

    expect(result).toBe(20);
  });

  it('shortestAngleDeltaDegrees(10, 350)', () => {
    const result = shortestAngleDeltaDegrees(
      10,
      350,
    );

    expect(result).toBe(-20);
  });

  it('shortestAngleDeltaDegrees(-10, 370)', () => {
    const result = shortestAngleDeltaDegrees(
      -10,
      370,
    );

    expect(result).toBe(20);
  });
});
