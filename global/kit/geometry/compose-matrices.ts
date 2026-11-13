import type { Matrix } from './types.ts';

import { identityMatrix } from './identity-matrix.ts';
import { multiplyMatrices } from './multiply-matrices.ts';

/**
 * Composes matrices in the order of an SVG transform attribute, left to right.
 *
 * Formula: A * B * C for [A, B, C]: the order of an SVG transform list
 * Edge cases: An empty list gives the identity. The last matrix acts on the point first.
 * @param matrices - Matrices in the order of an SVG transform attribute, left to right.
 * @returns A new matrix [a, b, c, d, e, f].
 * @example
 * composeMatrices([translationMatrix(80,80), scaleMatrix(1.5,1.5), rotationMatrix(45)]); // [1.060660172,1.060660172,-1.060660172,1.060660172,80,80]
 * @see docs/geometry/
 */
export function composeMatrices(matrices: readonly Matrix[]): Matrix {
  return matrices.reduce(
    (
      accumulator,
      matrix,
    ) => multiplyMatrices(
      accumulator,
      matrix,
    ),
    identityMatrix(),
  );
}
