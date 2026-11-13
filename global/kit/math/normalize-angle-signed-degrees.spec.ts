import {
  describe,
  expect,
  it,
} from 'vitest';

import { normalizeAngleSignedDegrees } from './normalize-angle-signed-degrees.ts';

describe('normalizeAngleSignedDegrees', () => {
  it('normalizeAngleSignedDegrees(190)', () => {
    const result = normalizeAngleSignedDegrees(190);

    expect(result).toBe(-170);
  });

  it('normalizeAngleSignedDegrees(-190)', () => {
    const result = normalizeAngleSignedDegrees(-190);

    expect(result).toBe(170);
  });

  it('normalizeAngleSignedDegrees(180)', () => {
    const result = normalizeAngleSignedDegrees(180);

    expect(result).toBe(-180);
  });
});
