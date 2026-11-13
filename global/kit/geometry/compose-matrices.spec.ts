import {
  describe,
  expect,
  it,
} from 'vitest';

import { composeMatrices } from './compose-matrices.ts';
import { rotationMatrix } from './rotation-matrix.ts';
import { scaleMatrix } from './scale-matrix.ts';
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

describe('composeMatrices', () => {
  it('composeMatrices([translationMatrix(80,80), scaleMatrix(1.5,1.5), rotationMatrix(45)])', () => {
    const result = composeMatrices([
      translationMatrix(
        80,
        80,
      ),
      scaleMatrix(
        1.5,
        1.5,
      ),
      rotationMatrix(45),
    ]);

    expect(rounded(result)).toEqual([
      1.060660172,
      1.060660172,
      -1.060660172,
      1.060660172,
      80,
      80,
    ]);
  });

  it('composeMatrices([])', () => {
    const result = composeMatrices([]);

    expect(rounded(result)).toEqual([
      1,
      0,
      0,
      1,
      0,
      0,
    ]);
  });
});
