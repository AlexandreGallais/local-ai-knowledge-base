import type { Point } from './types.ts';

/**
 * Gives the vector turned by 90 degrees clockwise on screen, same length.
 *
 * Formula: (-v.y, v.x): v turned by +90 degrees
 * Edge cases: With y down, +90 degrees is clockwise on screen.
 * @param v - Vector to work on, in user units.
 * @returns A new point, in user units.
 * @example
 * perpendicularVector({x:1,y:0}); // {'x':0,'y':1}
 * @see docs/geometry/
 */
export function perpendicularVector(v: Point): Point {
  return {
    x: -v.y,
    y: v.x,
  };
}
