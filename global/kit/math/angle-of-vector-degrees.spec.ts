import {
  describe,
  expect,
  it,
} from 'vitest';

import { angleOfVectorDegrees } from './angle-of-vector-degrees.ts';

describe('angleOfVectorDegrees', () => {
  it('angleOfVectorDegrees(1, 0)', () => {
    const result = angleOfVectorDegrees(
      1,
      0,
    );

    expect(result).toBe(0);
  });

  it('angleOfVectorDegrees(0, 1)', () => {
    const result = angleOfVectorDegrees(
      0,
      1,
    );

    expect(result).toBe(90);
  });

  it('angleOfVectorDegrees(-1, 0)', () => {
    const result = angleOfVectorDegrees(
      -1,
      0,
    );

    expect(result).toBe(180);
  });

  it('angleOfVectorDegrees(0, -1)', () => {
    const result = angleOfVectorDegrees(
      0,
      -1,
    );

    expect(result).toBe(270);
  });
});
