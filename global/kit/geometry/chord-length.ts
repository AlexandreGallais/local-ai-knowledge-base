import { degreesToRadians } from '../math/degrees-to-radians.ts';

/**
 * Gives the straight length between the two ends of an arc of a circle.
 *
 * Formula: 2 * r * sin(|angle| / 2)
 * Edge cases: The straight distance between two neighbours on a circle of N objects is chordLength(r, 360 / N).
 * @param radius - Radius, in user units.
 * @param angleDegrees - Angle in degrees, 0 on the +x axis, clockwise on screen.
 * @returns The number the formula gives.
 * @example
 * chordLength(10, 60); // 10
 * @see docs/geometry/
 */
export function chordLength(
  radius: number,
  angleDegrees: number,
): number {
  return 2 * radius * Math.sin(degreesToRadians(Math.abs(angleDegrees)) / 2);
}
