import type { Point } from './types.ts';

/**
 * Adds two vectors component by component, or moves a point by a vector.
 *
 * Formula: (a.x + b.x, a.y + b.y)
 * @param a - First point or vector, in user units.
 * @param b - Second point or vector, in user units.
 * @returns A new point, in user units.
 * @example
 * addVectors({x:1,y:2},{x:3,y:-5}); // {'x':4,'y':-3}
 * @see docs/geometry/
 */
export function addVectors(
  a: Point,
  b: Point,
): Point {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
  };
}
