import {
  describe,
  expect,
  it,
} from 'vitest';

import { midpoint } from './midpoint.ts';

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

describe('midpoint', () => {
  it('midpoint({x:0,y:0},{x:10,y:4})', () => {
    const result = midpoint(
      {
        x: 0,
        y: 0,
      },
      {
        x: 10,
        y: 4,
      },
    );

    expect(rounded(result)).toEqual({
      x: 5,
      y: 2,
    });
  });
});
