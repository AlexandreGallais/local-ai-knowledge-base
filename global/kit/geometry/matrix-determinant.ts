import type { Matrix } from './types.ts';

/**
 * Gives the determinant of a matrix: 0 when it has no inverse.
 *
 * Formula: a*d - b*c
 * Edge cases: 0: no inverse. Negative: the matrix mirrors. Its absolute value is the area factor.
 * @param m - Matrix [a, b, c, d, e, f] of SVG matrix(a b c d e f).
 * @returns The number the formula gives.
 * @example
 * matrixDeterminant([3,1,-1,3,30,40]); // 10
 * @see docs/geometry/
 */
export function matrixDeterminant(m: Matrix): number {
  return m[0] * m[3] - m[1] * m[2];
}
