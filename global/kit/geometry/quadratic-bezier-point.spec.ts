import {
  describe,
  expect,
  it,
} from 'vitest';

import { quadraticBezierPoint } from './quadratic-bezier-point.ts';

// Rounds every number to 9 decimals, as the values of the research report are.
function rounded(value: unknown): unknown {
  return JSON.parse(JSON.stringify(
    value,
    (
      _key,
      item: unknown,
    ) => typeof item === 'number' ? Number(item.toFixed(9)) + 0 : item,
  ));
}

describe('quadraticBezierPoint', () => {
  it('quadraticBezierPoint({ p0: {x:0,y:0}, p1: {x:5,y:10}, p2: {x:10,y:0} }, 0.5)', () => {
    const result = quadraticBezierPoint(
      {
        p0: {
          x: 0,
          y: 0,
        },
        p1: {
          x: 5,
          y: 10,
        },
        p2: {
          x: 10,
          y: 0,
        },
      },
      0.5,
    );

    expect(rounded(result)).toEqual({
      x: 5,
      y: 5,
    });
  });
});
