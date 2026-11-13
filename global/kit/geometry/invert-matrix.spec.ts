import {
  describe,
  expect,
  it,
} from 'vitest';

import { invertMatrix } from './invert-matrix.ts';
import { scaleMatrix } from './scale-matrix.ts';

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

describe('invertMatrix', () => {
  it('invertMatrix([2,0,0,2,0,50])', () => {
    const result = invertMatrix([
      2,
      0,
      0,
      2,
      0,
      50,
    ]);

    expect(rounded(result)).toEqual([
      0.5,
      0,
      0,
      0.5,
      0,
      -25,
    ]);
  });

  it('invertMatrix([3,1,-1,3,30,40])', () => {
    const result = invertMatrix([
      3,
      1,
      -1,
      3,
      30,
      40,
    ]);

    expect(rounded(result)).toEqual([
      0.3,
      -0.1,
      0.1,
      0.3,
      -13,
      -9,
    ]);
  });

  it('invertMatrix(scaleMatrix(0,1))', () => {
    expect(() => invertMatrix(scaleMatrix(
      0,
      1,
    ))).toThrow(RangeError);
  });
});
