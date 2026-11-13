import type { MatrixParts } from './results.ts';
import type { Matrix } from './types.ts';

import { radiansToDegrees } from '../math/radians-to-degrees.ts';
import { matrixDeterminant } from './matrix-determinant.ts';

/**
 * Splits a matrix into translation, rotation, scale and skew.
 *
 * Formula: sx = hypot(a, b); r = atan2(b, a); sy = det / sx; shear = (a*c + b*d) / sx; skewX = atan(shear / sy). m = translate * rotate(r) * skewX * scale(sx, sy)
 * Edge cases: First column zero: throws `RangeError`. A mirror gives a negative sy. The parts are not unique: other orders give other values.
 * @param m - Matrix [a, b, c, d, e, f] of SVG matrix(a b c d e f).
 * @returns A new MatrixParts value, as described above.
 * @throws {RangeError} decomposeMatrix: first column is zero.
 * @example
 * decomposeMatrix(composeMatrices([translationMatrix(10,20), rotationMatrix(30), scaleMatrix(2,3)])); // {'translateX':10,'translateY':20,'rotationDegrees':30,'skewXDegrees':0,'scaleX':2,'scaleY' ...
 * @see docs/geometry/
 */
export function decomposeMatrix(m: Matrix): MatrixParts {
  const scaleX = Math.hypot(
    m[0],
    m[1],
  );

  if (scaleX === 0) {
    throw new RangeError('decomposeMatrix: first column is zero');
  }

  const determinant = matrixDeterminant(m);
  const scaleY = determinant / scaleX;
  const shear = (m[0] * m[2] + m[1] * m[3]) / scaleX;

  return {
    rotationDegrees: radiansToDegrees(Math.atan2(
      m[1],
      m[0],
    )),
    scaleX,
    scaleY,
    skewXDegrees: scaleY === 0 ? 0 : radiansToDegrees(Math.atan(shear / scaleY)),
    translateX: m[4],
    translateY: m[5],
  };
}
