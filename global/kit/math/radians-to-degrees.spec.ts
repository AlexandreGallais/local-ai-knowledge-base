import {
  describe,
  expect,
  it,
} from 'vitest';

import { radiansToDegrees } from './radians-to-degrees.ts';

describe('radiansToDegrees', () => {
  it('radiansToDegrees(Math.PI)', () => {
    const result = radiansToDegrees(Math.PI);

    expect(result).toBe(180);
  });

  it('radiansToDegrees(Math.PI / 2)', () => {
    const result = radiansToDegrees(Math.PI / 2);

    expect(result).toBe(90);
  });
});
