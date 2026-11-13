import {
  describe,
  expect,
  it,
} from 'vitest';

import { vectorLength } from './vector-length.ts';

describe('vectorLength', () => {
  it('vectorLength({x:3,y:4})', () => {
    const result = vectorLength({
      x: 3,
      y: 4,
    });

    expect(result).toBeCloseTo(
      5,
      8,
    );
  });
});
