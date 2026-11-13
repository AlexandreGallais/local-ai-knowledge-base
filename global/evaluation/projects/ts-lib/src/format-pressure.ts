/*
 * Copyright (c) 2026 Example Corp.
 */
import type { PressureUnit } from './pressure-unit.ts';

const PASCALS_PER_UNIT: Readonly<Record<PressureUnit, number>> = {
  bar: 100_000,
  kPa: 1000,
};

/**
 * Writes a pressure for a display, in the unit asked.
 * @param pascals - Value to show, measured in pascals (Pa).
 * @param unit - Display unit: "bar" or "kPa".
 * @returns The value with two decimals and its unit, as "1.25 bar".
 * @example
 * formatPressure(125_000, 'bar'); // "1.25 bar"
 */
export function formatPressure(
  pascals: number,
  unit: PressureUnit,
): string {
  return `${(pascals / PASCALS_PER_UNIT[unit]).toFixed(2)} ${unit}`;
}
