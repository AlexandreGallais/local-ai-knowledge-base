import {
  describe,
  expect,
  it,
} from 'vitest';

import { matrixDeterminant } from './matrix-determinant.ts';
import { scaleMatrix } from './scale-matrix.ts';

describe('matrixDeterminant', () => {
  it('matrixDeterminant([3,1,-1,3,30,40])', () => {
    const result = matrixDeterminant([
      3,
      1,
      -1,
      3,
      30,
      40,
    ]);

    expect(result).toBeCloseTo(
      10,
      8,
    );
  });

  it('matrixDeterminant(scaleMatrix(-1,1))', () => {
    const result = matrixDeterminant(scaleMatrix(
      -1,
      1,
    ));

    expect(result).toBeCloseTo(
      -1,
      8,
    );
  });
});
