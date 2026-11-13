import {
  describe,
  expect,
  it,
} from 'vitest';

import { composeMatrices } from './compose-matrices.ts';
import { decomposeMatrix } from './decompose-matrix.ts';
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

describe('decomposeMatrix', () => {
  it('decomposeMatrix(composeMatrices([translationMatrix(10,20), rotationMatrix(30), scaleMatrix(2,3)]))', () => {
    const result = decomposeMatrix(composeMatrices([
      translationMatrix(
        10,
        20,
      ),
      rotationMatrix(30),
      scaleMatrix(
        2,
        3,
      ),
    ]));

    expect(rounded(result)).toEqual({
      rotationDegrees: 30,
      scaleX: 2,
      scaleY: 3,
      skewXDegrees: 0,
      translateX: 10,
      translateY: 20,
    });
  });
});
