import {
  describe,
  expect,
  it,
} from 'vitest';

import { normalizeAngleDegrees } from './normalize-angle-degrees.ts';

describe('normalizeAngleDegrees', () => {
  it('normalizeAngleDegrees(-90)', () => {
    const result = normalizeAngleDegrees(-90);

    expect(result).toBe(270);
  });

  it('normalizeAngleDegrees(360)', () => {
    const result = normalizeAngleDegrees(360);

    expect(result).toBe(0);
  });

  it('normalizeAngleDegrees(720.5)', () => {
    const result = normalizeAngleDegrees(720.5);

    expect(result).toBe(0.5);
  });
});
