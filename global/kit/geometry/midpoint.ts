import type { Point } from './types.ts';

/**
 * Gives the point halfway between two points.
 *
 * Formula: ((a.x+b.x)/2, (a.y+b.y)/2)
 * @param a - First point or vector, in user units.
 * @param b - Second point or vector, in user units.
 * @returns A new point, in user units.
 * @example
 * midpoint({x:0,y:0},{x:10,y:4}); // {'x':5,'y':2}
 * @see docs/geometry/
 */
export function midpoint(
  a: Point,
  b: Point,
): Point {
  return {
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
  };
}
