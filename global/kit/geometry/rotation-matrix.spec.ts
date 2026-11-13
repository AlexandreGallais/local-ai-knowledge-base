import {
  describe,
  expect,
  it,
} from 'vitest';

import { rotationMatrix } from './rotation-matrix.ts';

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

describe('rotationMatrix', () => {
  it('rotationMatrix(90)', () => {
    const result = rotationMatrix(90);

    expect(rounded(result)).toEqual([
      0,
      1,
      -1,
      0,
      0,
      0,
    ]);
  });

  it('rotationMatrix(30)', () => {
    const result = rotationMatrix(30);

    expect(rounded(result)).toEqual([
      0.866025404,
      0.5,
      -0.5,
      0.866025404,
      0,
      0,
    ]);
  });
});
