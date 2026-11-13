import type {
  Matrix,
  Point,
} from './types.ts';

import { applyMatrixToPoint } from './apply-matrix-to-point.ts';
import { invertMatrix } from './invert-matrix.ts';

/**
 * Turns a pointer position in screen pixels into a point in user units.
 *
 * Formula: applyMatrixToPoint(invertMatrix(screenMatrix), clientPoint)
 * Edge cases: The matrix comes from `element.getScreenCTM()`; it is `null` when the element is not in the document. The inverse does not exist when a scale is 0.
 * @param screenMatrix - Matrix from user units to screen pixels, as getScreenCTM() gives it.
 * @param clientPoint - Point in screen pixels, as a pointer event gives it.
 * @returns A new point, in user units.
 * @example
 * clientToUserPoint([2,0,0,2,0,50], {x:100,y:100}); // {'x':50,'y':25}
 * @see docs/geometry/
 */
export function clientToUserPoint(
  screenMatrix: Matrix,
  clientPoint: Point,
): Point {
  return applyMatrixToPoint(
    invertMatrix(screenMatrix),
    clientPoint,
  );
}
