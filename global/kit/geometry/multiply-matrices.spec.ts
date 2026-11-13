import {
  describe,
  expect,
  it,
} from 'vitest';

import { multiplyMatrices } from './multiply-matrices.ts';
import { rotationMatrix } from './rotation-matrix.ts';
import { translationMatrix } from './translation-matrix.ts';

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

describe('multiplyMatrices', () => {
  it('multiplyMatrices(translationMatrix(100,0), rotationMatrix(90))', () => {
    const result = multiplyMatrices(
      translationMatrix(
        100,
        0,
      ),
      rotationMatrix(90),
    );

    expect(rounded(result)).toEqual([
      0,
      1,
      -1,
      0,
      100,
      0,
    ]);
  });

  it('multiplyMatrices(rotationMatrix(90), translationMatrix(100,0))', () => {
    const result = multiplyMatrices(
      rotationMatrix(90),
      translationMatrix(
        100,
        0,
      ),
    );

    expect(rounded(result)).toEqual([
      0,
      1,
      -1,
      0,
      0,
      100,
    ]);
  });
});
