/**
 * A value kept between two bounds.
 * @param value The value.
 * @param min The lowest value allowed.
 * @param max The highest value allowed.
 * @returns min when value is below it, max when value is above it, else value.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
