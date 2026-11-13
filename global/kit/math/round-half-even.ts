/**
 * Rounds to the nearest integer; a half goes to the even integer (banker's rounding).
 *
 * Formula: nearest integer; on a tie, the even one
 * @param value - Number the formula works on.
 * @returns The number the formula gives.
 * @example
 * roundHalfEven(0.5); // 0
 * @see docs/math/rounding.md
 */
export function roundHalfEven(value: number): number {
  if (!Number.isFinite(value)) {
    return value;
  }

  const floor = Math.floor(value);
  const fraction = value - floor;

  if (fraction < 0.5) {
    return floor;
  }

  if (fraction > 0.5) {
    return floor + 1;
  }

  return floor % 2 === 0 ? floor : floor + 1;
}
