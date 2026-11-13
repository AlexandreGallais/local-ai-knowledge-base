import {
  describe,
  expect,
  it,
} from 'vitest';

import { interpolatePoints } from './interpolate-points.ts';

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

describe('interpolatePoints', () => {
  it('interpolatePoints({x:0,y:0},{x:10,y:20},0.25)', () => {
    const result = interpolatePoints(
      {
        x: 0,
        y: 0,
      },
      {
        x: 10,
        y: 20,
      },
      0.25,
    );

    expect(rounded(result)).toEqual({
      x: 2.5,
      y: 5,
    });
  });
});
