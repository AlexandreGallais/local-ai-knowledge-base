import { roundHalfEven } from './round-half-even.ts';
import { shiftDecimalPoint } from './shift-decimal-point.ts';

/**
 * Rounds to a number of decimals; a half goes to the even last digit.
 *
 * Formula: shift the point by d places, round a half to even, shift back
 * @param value - Number the formula works on.
 * @param decimals - Number of decimals kept, an integer from 0 to 15.
 * @returns The number the formula gives.
 * @throws {RangeError} decimals must be an integer from 0 to 15.
 * @example
 * roundToDecimalsHalfEven(0.125, 2); // 0.12
 * @see docs/math/rounding.md
 */
export function roundToDecimalsHalfEven(
  value: number,
  decimals: number,
): number {
  if (!Number.isInteger(decimals) || decimals < 0 || decimals > 15) {
    throw new RangeError('decimals must be an integer from 0 to 15');
  }

  if (!Number.isFinite(value)) {
    return value;
  }

  return shiftDecimalPoint(
    roundHalfEven(shiftDecimalPoint(
      value,
      decimals,
    )),
    -decimals,
  );
}
