import {
  describe,
  expect,
  it,
} from 'vitest';

import { applyMatrixToPoint } from './apply-matrix-to-point.ts';
import { rotationAroundMatrix } from './rotation-around-matrix.ts';

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

describe('rotationAroundMatrix', () => {
  it('rotationAroundMatrix(90, 50, 50)', () => {
    const result = rotationAroundMatrix(
      90,
      50,
      50,
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

  it('applyMatrixToPoint(rotationAroundMatrix(90,50,50), {x:60,y:50})', () => {
    const result = applyMatrixToPoint(
      rotationAroundMatrix(
        90,
        50,
        50,
      ),
      {
        x: 60,
        y: 50,
      },
    );

    expect(rounded(result)).toEqual({
      x: 50,
      y: 60,
    });
  });
});
