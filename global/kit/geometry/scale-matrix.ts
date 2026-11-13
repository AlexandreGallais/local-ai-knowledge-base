import type { Matrix } from './types.ts';

/**
 * Gives the matrix of scale(sx sy).
 *
 * Formula: [sx, 0, 0, sy, 0, 0]
 * Edge cases: A scale of 0 gives a matrix with no inverse. A negative scale mirrors.
 * @param sx - Horizontal scale factor.
 * @param sy - Vertical scale factor.
 * @returns A new matrix [a, b, c, d, e, f].
 * @example
 * scaleMatrix(2, 3); // [2,0,0,3,0,0]
 * @see docs/geometry/
 */
export function scaleMatrix(
  sx: number,
  sy: number,
): Matrix {
  return [
    sx,
    0,
    0,
    sy,
    0,
    0,
  ];
}
