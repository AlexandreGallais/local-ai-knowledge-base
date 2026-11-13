import {
  describe,
  expect,
  it,
} from 'vitest';

import { subtractVectors } from './subtract-vectors.ts';

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

describe('subtractVectors', () => {
  it('subtractVectors({x:4,y:6},{x:1,y:2})', () => {
    const result = subtractVectors(
      {
        x: 4,
        y: 6,
      },
      {
        x: 1,
        y: 2,
      },
    );

    expect(rounded(result)).toEqual({
      x: 3,
      y: 4,
    });
  });
});
