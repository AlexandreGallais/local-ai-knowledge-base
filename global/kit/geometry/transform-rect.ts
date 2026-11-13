import type {
  Matrix,
  Point,
  Rect,
} from './types.ts';

import { applyMatrixToPoint } from './apply-matrix-to-point.ts';
import { rectFromPoints } from './rect-from-points.ts';

/**
 * Gives the bounding box of a rectangle moved by a matrix.
 *
 * Formula: transform the four corners, then rectFromPoints
 * Edge cases: After a rotation the result is larger than the shape: it is the box of the rotated box.
 * @param m - Matrix [a, b, c, d, e, f] of SVG matrix(a b c d e f).
 * @param rect - The rectangle, in user units.
 * @returns A new rectangle, in user units.
 * @example
 * transformRect(rotationMatrix(45), {x:0,y:0,width:10,height:10}); // {'x':-7.071067812,'y':0,'width':14.142135624,'height':14.142135624}
 * @see docs/geometry/
 */
export function transformRect(
  m: Matrix,
  rect: Rect,
): Rect {
  return rectFromPoints(rectCorners(rect).map((corner) => applyMatrixToPoint(
    m,
    corner,
  )));
}

function rectCorners(rect: Rect): readonly Point[] {
  const right = rect.x + rect.width;
  const bottom = rect.y + rect.height;

  return [
    {
      x: rect.x,
      y: rect.y,
    },
    {
      x: right,
      y: rect.y,
    },
    {
      x: right,
      y: bottom,
    },
    {
      x: rect.x,
      y: bottom,
    },
  ];
}
