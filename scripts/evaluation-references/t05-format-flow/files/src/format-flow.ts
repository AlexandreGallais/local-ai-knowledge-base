import type { FlowUnit } from './flow-unit.ts';

const UNITS_PER_M3_PER_H: Readonly<Record<FlowUnit, number>> = {
  'L/min': 1000 / 60,
  'm3/h': 1,
};

/**
 * Writes a flow rate for a display, in the unit asked.
 * @param m3PerH - Flow rate to show, measured in cubic metres per hour (m3/h).
 * @param unit - Display unit: "m3/h" or "L/min".
 * @returns The value with two decimals and its unit, as "1.50 m3/h".
 * @example
 * formatFlow(0.6, 'L/min'); // "10.00 L/min"
 */
export function formatFlow(m3PerH: number, unit: FlowUnit): string {
  return `${(m3PerH * UNITS_PER_M3_PER_H[unit]).toFixed(2)} ${unit}`;
}
