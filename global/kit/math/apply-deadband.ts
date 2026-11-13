/**
 * Keeps the shown value until the new one moves by at least the deadband.
 *
 * Formula: value if abs(value - previousOutput) >= deadband, else previousOutput
 * @param previousOutput - Value shown before this update.
 * @param value - New measured value, in the unit of previousOutput.
 * @param deadband - Smallest change that updates the output, in the unit of the value; 0 or more.
 * @returns The number the formula gives.
 * @throws {RangeError} deadband must be 0 or more.
 * @example
 * applyDeadband(10, 10.4, 0.5); // 10
 * @see docs/math/filters-thresholds.md
 */
export function applyDeadband(
  previousOutput: number,
  value: number,
  deadband: number,
): number {
  if (!(deadband >= 0)) {
    throw new RangeError('deadband must be 0 or more');
  }

  return Math.abs(value - previousOutput) >= deadband ? value : previousOutput;
}
