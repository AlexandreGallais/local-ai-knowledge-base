import type { Matrix } from './types.ts';

/**
 * Gives the matrix that changes nothing: [1, 0, 0, 1, 0, 0].
 *
 * Formula: [1, 0, 0, 1, 0, 0]
 * @returns A new matrix [a, b, c, d, e, f].
 * @example
 * identityMatrix(); // [1,0,0,1,0,0]
 * @see docs/geometry/
 */
export function identityMatrix(): Matrix {
  return [
    1,
    0,
    0,
    1,
    0,
    0,
  ];
}
