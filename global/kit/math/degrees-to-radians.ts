/**
 * Converts an angle from degrees to radians, as Math.sin and Math.cos expect it.
 *
 * Formula: degrees * pi / 180
 * @param angleDeg - Angle to work on, in degrees; any real number.
 * @returns The number the formula gives.
 * @example
 * degreesToRadians(180); // Math.PI
 * @see docs/math/angles.md
 */
export function degreesToRadians(angleDeg: number): number {
  return (angleDeg * Math.PI) / 180;
}
