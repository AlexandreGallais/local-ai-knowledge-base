import {
  describe,
  expect,
  it,
} from 'vitest';

import { roundedRectPath } from './rounded-rect-path.ts';

describe('roundedRectPath', () => {
  it('roundedRectPath({x:0,y:0,width:40,height:20},5)', () => {
    const result = roundedRectPath(
      {
        height: 20,
        width: 40,
        x: 0,
        y: 0,
      },
      5,
    );

    expect(result).toBe('M 5 0 H 35 A 5 5 0 0 1 40 5 V 15 A 5 5 0 0 1 35 20 H 5 A 5 5 0 0 1 0 15 V 5 A 5 5 0 0 1 5 0 Z');
  });

  it('roundedRectPath({x:0,y:0,width:40,height:20},0)', () => {
    const result = roundedRectPath(
      {
        height: 20,
        width: 40,
        x: 0,
        y: 0,
      },
      0,
    );

    expect(result).toBe('M 0 0 H 40 V 20 H 0 Z');
  });
});
