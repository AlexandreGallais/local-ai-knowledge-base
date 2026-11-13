/*
 * Copyright (c) 2026 Example Corp.
 */
/**
 * Keeps a value between two bounds.
 * @param value - The value to keep in range, in any unit.
 * @param min - The lowest value allowed, in the unit of `value`.
 * @param max - The highest value allowed, in the unit of `value`.
 * @returns `min` when `value` is below it, `max` when above it, else `value`.
 * @throws {RangeError} When `min` is greater than `max`.
 * @example
 * clamp(12, 0, 10); // 10
 */
export function clamp(
  value: number,
  min: number,
  max: number,
): number {
  if (min > max) {
    throw new RangeError('min must not be greater than max');
  }

  return Math.min(
    Math.max(
      value,
      min,
    ),
    max,
  );
}
