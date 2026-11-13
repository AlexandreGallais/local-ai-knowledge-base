import type { Thresholds } from './inputs.ts';

/**
 * Gives the next state of an alarm with two thresholds, so that a noisy value does not make it flicker.
 *
 * Formula: high alarm: active at value >= activateAt, inactive at value <= deactivateAt, else unchanged
 * @param isActive - State of the alarm before this value.
 * @param value - New measured value, in the unit of the thresholds.
 * @param thresholds - activateAt turns the alarm on, deactivateAt turns it off, in the unit of the value; activateAt below deactivateAt makes a low alarm.
 * @returns True when the condition of the formula holds.
 * @example
 * applyHysteresis(false, 60, { activateAt: 60, deactivateAt: 59 }); // true
 * @see docs/math/filters-thresholds.md
 */
export function applyHysteresis(
  isActive: boolean,
  value: number,
  thresholds: Thresholds,
): boolean {
  const {
    activateAt,
    deactivateAt,
  } = thresholds;
  const isHighAlarm = activateAt >= deactivateAt;
  const reachesOn = isHighAlarm ? value >= activateAt : value <= activateAt;
  const reachesOff = isHighAlarm ? value <= deactivateAt : value >= deactivateAt;

  if (reachesOn) {
    return true;
  }

  return reachesOff ? false : isActive;
}
