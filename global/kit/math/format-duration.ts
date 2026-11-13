import { splitDuration } from './split-duration.ts';

/**
 * Writes a duration in seconds as hh:mm:ss, never as -00:00:00.
 *
 * Formula: from splitDuration, two digits for each part
 * @param durationS - Duration, in seconds; negative values keep their sign.
 * @returns The text: SVG path data or a number, ready to write in an attribute.
 * @example
 * formatDuration(3661); // '01:01:01'
 * @see docs/math/time-animation.md
 */
export function formatDuration(durationS: number): string {
  const parts = splitDuration(durationS);
  const isNegative = parts.sign === -1 && parts.hours + parts.minutes + parts.seconds > 0;

  return `${isNegative ? '-' : ''}${padTwoDigits(parts.hours)}:${padTwoDigits(parts.minutes)}:${padTwoDigits(parts.seconds)}`;
}

function padTwoDigits(part: number): string {
  return String(part).padStart(
    2,
    '0',
  );
}
