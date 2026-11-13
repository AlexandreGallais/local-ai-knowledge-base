import {
  describe,
  expect,
  it,
} from 'vitest';

import { describeSector } from './describe-sector.ts';

describe('describeSector', () => {
  it('describeSector({ center: {x:0,y:0}, radius: 10, startAngleDegrees: 0, endAngleDegrees: 90 })', () => {
    const result = describeSector({
      center: {
        x: 0,
        y: 0,
      },
      endAngleDegrees: 90,
      radius: 10,
      startAngleDegrees: 0,
    });

    expect(result).toBe('M 10 0 A 10 10 0 0 1 0 10 L 0 0 Z');
  });
});
