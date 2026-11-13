import {
  describe,
  expect,
  it,
} from 'vitest';

import { rectFromPoints } from './rect-from-points.ts';

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

describe('rectFromPoints', () => {
  it('rectFromPoints([{x:5,y:1},{x:-2,y:8},{x:3,y:3}])', () => {
    const result = rectFromPoints([
      {
        x: 5,
        y: 1,
      },
      {
        x: -2,
        y: 8,
      },
      {
        x: 3,
        y: 3,
      },
    ]);

    expect(rounded(result)).toEqual({
      height: 7,
      width: 7,
      x: -2,
      y: 1,
    });
  });
});
