import type { Matrix } from './types.ts';

import { composeMatrices } from './compose-matrices.ts';
import { rotationMatrix } from './rotation-matrix.ts';
import { translationMatrix } from './translation-matrix.ts';

/**
 * Gives the matrix of rotate(angle cx cy): a rotation around a point.
 *
 * Formula: translate(cx, cy) * rotate(a) * translate(-cx, -cy): the SVG `rotate(a cx cy)`
 * Edge cases: The centre is in the current user system.
 * @param angleDegrees - Angle in degrees, 0 on the +x axis, clockwise on screen.
 * @param cx - X of the center, in user units.
 * @param cy - Y of the center, in user units.
 * @returns A new matrix [a, b, c, d, e, f].
 * @example
 * rotationAroundMatrix(90, 50, 50); // [0,1,-1,0,100,0]
 * @see docs/geometry/
 */
export function rotationAroundMatrix(
  angleDegrees: number,
  cx: number,
  cy: number,
): Matrix {
  return composeMatrices([
    translationMatrix(
      cx,
      cy,
    ),
    rotationMatrix(angleDegrees),
    translationMatrix(
      -cx,
      -cy,
    ),
  ]);
}
