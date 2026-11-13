import {
  describe,
  expect,
  it,
} from 'vitest';

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

describe('scaleMatrix', () => {
  it('scaleMatrix(2, 3)', () => {
    const result = scaleMatrix(
      2,
      3,
    );

    expect(rounded(result)).toEqual([
      2,
      0,
      0,
      3,
      0,
      0,
    ]);
  });
});
