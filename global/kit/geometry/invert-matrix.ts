import type { Matrix } from './types.ts';

import { matrixDeterminant } from './matrix-determinant.ts';

/**
 * Gives the matrix that undoes a matrix.
 *
 * Formula: det = a*d - b*c; [d/det, -b/det, -c/det, a/det, (c*f - d*e)/det, (b*e - a*f)/det]
 * Edge cases: det = 0: throws `RangeError`. `DOMMatrix.inverse()` does not throw: it returns NaN in every field.
 * @param m - Matrix [a, b, c, d, e, f] of SVG matrix(a b c d e f).
 * @returns A new matrix [a, b, c, d, e, f].
 * @throws {RangeError} invertMatrix: matrix is not invertible.
 * @example
 * invertMatrix([2,0,0,2,0,50]); // [0.5,0,0,0.5,0,-25]
 * @see docs/geometry/
 */
export function invertMatrix(m: Matrix): Matrix {
  const determinant = matrixDeterminant(m);

  if (determinant === 0 || !Number.isFinite(determinant)) {
    throw new RangeError('invertMatrix: matrix is not invertible');
  }

  return [
    m[3] / determinant,
    -m[1] / determinant,
    -m[2] / determinant,
    m[0] / determinant,
    (m[2] * m[5] - m[3] * m[4]) / determinant,
    (m[1] * m[4] - m[0] * m[5]) / determinant,
  ];
}
