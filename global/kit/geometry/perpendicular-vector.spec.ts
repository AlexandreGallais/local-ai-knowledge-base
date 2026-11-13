import {
  describe,
  expect,
  it,
} from 'vitest';

import { perpendicularVector } from './perpendicular-vector.ts';

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

describe('perpendicularVector', () => {
  it('perpendicularVector({x:1,y:0})', () => {
    const result = perpendicularVector({
      x: 1,
      y: 0,
    });

    expect(rounded(result)).toEqual({
      x: 0,
      y: 1,
    });
  });
});
