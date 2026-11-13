import { shiftDecimalPoint } from './shift-decimal-point.ts';

/**
 * Rounds to a number of decimals as a person expects it, a half away from zero.
 *
 * Formula: shift the point by d places, round a half away from zero, shift back
 * @param value - Number the formula works on.
 * @param decimals - Number of decimals kept, an integer from 0 to 15.
 * @returns The number the formula gives.
 * @throws {RangeError} decimals must be an integer from 0 to 15.
 * @example
 * roundToDecimals(1.005, 2); // 1.01
 * @see docs/math/rounding.md
 */
export function roundToDecimals(
  value: number,
  decimals: number,
): number {
  if (!Number.isInteger(decimals) || decimals < 0 || decimals > 15) {
    throw new RangeError('decimals must be an integer from 0 to 15');
  }

  if (!Number.isFinite(value)) {
    return value;
  }

  const shifted = shiftDecimalPoint(
    Math.abs(value),
    decimals,
  );

  return Math.sign(value) * shiftDecimalPoint(
    Math.round(shifted),
    -decimals,
  ) + 0;
}
