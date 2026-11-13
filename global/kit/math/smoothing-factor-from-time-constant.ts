/**
 * Gives the smoothing factor of a time step from a time constant, so that smoothing does not depend on the frame rate.
 *
 * Formula: 1 - exp(-deltaTime / timeConstant), both in the same unit
 * @param deltaTime - Time step, in the unit of timeConstant.
 * @param timeConstant - Time constant of the filter, above 0, in the unit of deltaTime.
 * @returns The number the formula gives.
 * @throws {RangeError} deltaTime must be 0 or more and timeConstant above 0.
 * @example
 * smoothingFactorFromTimeConstant(1, 1); // 0.632_120_558_828_557_7
 * @see docs/math/filters-thresholds.md
 */
export function smoothingFactorFromTimeConstant(
  deltaTime: number,
  timeConstant: number,
): number {
  if (!(deltaTime >= 0) || !(timeConstant > 0)) {
    throw new RangeError('deltaTime must be 0 or more and timeConstant above 0');
  }

  return -Math.expm1(-deltaTime / timeConstant);
}
