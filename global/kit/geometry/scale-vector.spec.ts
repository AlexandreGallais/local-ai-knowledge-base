import {
  describe,
  expect,
  it,
} from 'vitest';

import { scaleVector } from './scale-vector.ts';

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

describe('scaleVector', () => {
  it('scaleVector({x:3,y:4},2)', () => {
    const result = scaleVector(
      {
        x: 3,
        y: 4,
      },
      2,
    );

    expect(rounded(result)).toEqual({
      x: 6,
      y: 8,
    });
  });
});
