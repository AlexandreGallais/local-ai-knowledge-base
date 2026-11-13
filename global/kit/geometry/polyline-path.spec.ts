import {
  describe,
  expect,
  it,
} from 'vitest';

import { polylinePath } from './polyline-path.ts';

describe('polylinePath', () => {
  it('polylinePath([{x:0,y:0},{x:10,y:0},{x:10,y:10}], true)', () => {
    const result = polylinePath(
      [
        {
          x: 0,
          y: 0,
        },
        {
          x: 10,
          y: 0,
        },
        {
          x: 10,
          y: 10,
        },
      ],
      true,
    );

    expect(result).toBe('M 0 0 L 10 0 L 10 10 Z');
  });

  it('polylinePath([{x:0,y:0}], false)', () => {
    expect(() => polylinePath(
      [{
        x: 0,
        y: 0,
      }],
      false,
    )).toThrow(RangeError);
  });
});
