import type { Matrix } from './types.ts';

/**
 * Gives the matrix of translate(tx ty).
 *
 * Formula: [1, 0, 0, 1, tx, ty]
 * @param tx - Horizontal move, in user units.
 * @param ty - Vertical move, in user units.
 * @returns A new matrix [a, b, c, d, e, f].
 * @example
 * translationMatrix(30, 40); // [1,0,0,1,30,40]
 * @see docs/geometry/
 */
export function translationMatrix(
  tx: number,
  ty: number,
): Matrix {
  return [
    1,
    0,
    0,
    1,
    tx,
    ty,
  ];
}
