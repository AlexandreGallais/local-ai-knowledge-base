import {
  describe,
  expect,
  it,
} from 'vitest';

import { lerpAngleDegrees } from './lerp-angle-degrees.ts';

describe('lerpAngleDegrees', () => {
  it('lerpAngleDegrees(350, 10, 0.5)', () => {
    const result = lerpAngleDegrees(
      350,
      10,
      0.5,
    );

    expect(result).toBe(0);
  });

  it('lerpAngleDegrees(350, 10, 0.25)', () => {
    const result = lerpAngleDegrees(
      350,
      10,
      0.25,
    );

    expect(result).toBe(355);
  });

  it('lerpAngleDegrees(0, 90, 0.5)', () => {
    const result = lerpAngleDegrees(
      0,
      90,
      0.5,
    );

    expect(result).toBe(45);
  });
});
