import {
  describe,
  expect,
  it,
} from 'vitest';

import { smoothingFactorFromTimeConstant } from './smoothing-factor-from-time-constant.ts';

describe('smoothingFactorFromTimeConstant', () => {
  it('smoothingFactorFromTimeConstant(1, 1)', () => {
    const result = smoothingFactorFromTimeConstant(
      1,
      1,
    );

    expect(result).toBeCloseTo(
      0.632_120_558_828_557_7,
      9,
    );
  });

  it('smoothingFactorFromTimeConstant(0, 1)', () => {
    const result = smoothingFactorFromTimeConstant(
      0,
      1,
    );

    expect(result).toBe(0);
  });

  it('smoothingFactorFromTimeConstant(1, 1 / Math.LN2)', () => {
    const result = smoothingFactorFromTimeConstant(
      1,
      1 / Math.LN2,
    );

    expect(result).toBeCloseTo(
      0.5,
      9,
    );
  });
});
