import {
  describe,
  expect,
  it,
} from 'vitest';

import { normalizeVector } from './normalize-vector.ts';

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

describe('normalizeVector', () => {
  it('normalizeVector({x:3,y:4})', () => {
    const result = normalizeVector({
      x: 3,
      y: 4,
    });

    expect(rounded(result)).toEqual({
      x: 0.6,
      y: 0.8,
    });
  });

  it('normalizeVector({x:0,y:0})', () => {
    expect(() => normalizeVector({
      x: 0,
      y: 0,
    })).toThrow(RangeError);
  });
});
