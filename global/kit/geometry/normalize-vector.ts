import type { Point } from './types.ts';

/**
 * Gives the vector of length 1 with the same direction.
 *
 * Formula: v / |v|
 * Edge cases: Zero vector: throws `RangeError`. Never return NaN.
 * @param v - Vector to work on, in user units.
 * @returns A new point, in user units.
 * @throws {RangeError} normalizeVector: zero-length vector.
 * @example
 * normalizeVector({x:3,y:4}); // {'x':0.6,'y':0.8}
 * @see docs/geometry/
 */
export function normalizeVector(v: Point): Point {
  const length = Math.hypot(
    v.x,
    v.y,
  );

  if (length === 0) {
    throw new RangeError('normalizeVector: zero-length vector');
  }

  return {
    x: v.x / length,
    y: v.y / length,
  };
}
