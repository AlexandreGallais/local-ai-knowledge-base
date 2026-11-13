import {
  describe,
  expect,
  it,
} from 'vitest';

import { applyMatrixToPoint } from './apply-matrix-to-point.ts';
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

describe('applyMatrixToPoint', () => {
  it('applyMatrixToPoint([3,1,-1,3,30,40], {x:10,y:10})', () => {
    const result = applyMatrixToPoint(
      [
        3,
        1,
        -1,
        3,
        30,
        40,
      ],
      {
        x: 10,
        y: 10,
      },
    );

    expect(rounded(result)).toEqual({
      x: 50,
      y: 80,
    });
  });

  it('applyMatrixToPoint([2,0,0,2,10,10], {x:5,y:4})', () => {
    const result = applyMatrixToPoint(
      [
        2,
        0,
        0,
        2,
        10,
        10,
      ],
      {
        x: 5,
        y: 4,
      },
    );

    expect(rounded(result)).toEqual({
      x: 20,
      y: 18,
    });
  });

  it('applyMatrixToPoint(multiplyMatrices(translationMatrix(100,0), rotationMatrix(90)), {x:10,y:0})', () => {
    const result = applyMatrixToPoint(
      multiplyMatrices(
        translationMatrix(
          100,
          0,
        ),
        rotationMatrix(90),
      ),
      {
        x: 10,
        y: 0,
      },
    );

    expect(rounded(result)).toEqual({
      x: 100,
      y: 10,
    });
  });
});
