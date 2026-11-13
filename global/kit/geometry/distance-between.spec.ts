import {
  describe,
  expect,
  it,
} from 'vitest';

import { distanceBetween } from './distance-between.ts';

describe('distanceBetween', () => {
  it('distanceBetween({x:1,y:1},{x:4,y:5})', () => {
    const result = distanceBetween(
      {
        x: 1,
        y: 1,
      },
      {
        x: 4,
        y: 5,
      },
    );

    expect(result).toBeCloseTo(
      5,
      8,
    );
  });
});
