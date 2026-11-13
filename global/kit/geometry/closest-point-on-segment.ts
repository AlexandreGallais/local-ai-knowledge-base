import type { Point } from './types.ts';

/**
 * Gives the point of a segment closest to a point.
 *
 * Formula: u = ((p - a) . (b - a)) / |b - a|^2, clamped to [0, 1]; point = a + u*(b - a)
 * Edge cases: a = b: returns a. Without the clamp, the point is on the infinite line.
 * @param p - The point, in user units.
 * @param a - First point or vector, in user units.
 * @param b - Second point or vector, in user units.
 * @returns A new point, in user units.
 * @example
 * closestPointOnSegment({x:5,y:5},{x:0,y:0},{x:10,y:0}); // {'x':5,'y':0}
 * @see docs/geometry/
 */
export function closestPointOnSegment(
  p: Point,
  a: Point,
  b: Point,
): Point {
  const lengthSquared = (b.x - a.x) ** 2 + (b.y - a.y) ** 2;

  if (lengthSquared === 0) {
    return a;
  }

  const u = ((p.x - a.x) * (b.x - a.x) + (p.y - a.y) * (b.y - a.y)) / lengthSquared;
  const clamped = Math.min(
    1,
    Math.max(
      0,
      u,
    ),
  );

  return {
    x: a.x + clamped * (b.x - a.x),
    y: a.y + clamped * (b.y - a.y),
  };
}
