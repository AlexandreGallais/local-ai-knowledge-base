import type {
  Point,
  Rect,
} from './types.ts';

/**
 * Gives the smallest rectangle that holds all the points.
 *
 * Formula: min and max of the x and of the y
 * Edge cases: Empty list: throws `RangeError`. One point: width and height 0.
 * @param points - The points, in order, in user units.
 * @returns A new rectangle, in user units.
 * @throws {RangeError} rectFromPoints: at least one point is required.
 * @example
 * rectFromPoints([{x:5,y:1},{x:-2,y:8},{x:3,y:3}]); // {'x':-2,'y':1,'width':7,'height':7}
 * @see docs/geometry/
 */
export function rectFromPoints(points: readonly Point[]): Rect {
  if (points.length === 0) {
    throw new RangeError('rectFromPoints: at least one point is required');
  }

  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);

  return {
    height: Math.max(...ys) - minY,
    width: Math.max(...xs) - minX,
    x: minX,
    y: minY,
  };
}
