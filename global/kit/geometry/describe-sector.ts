import type { Arc } from './shapes.ts';

import { describeArc } from './describe-arc.ts';
import { formatNumber } from './format-number.ts';

/**
 * Gives the path data of a pie sector: center, arc, back to the center.
 *
 * Formula: describeArc(...) + ` L center Z`
 * Edge cases: Same as describeArc.
 * @param arc - Center and radius, in user units, then start and end angles in degrees, 0 on +x, clockwise on screen.
 * @returns The text: SVG path data or a number, ready to write in an attribute.
 * @example
 * describeSector({ center: {x:0,y:0}, radius: 10, startAngleDegrees: 0, endAngleDegrees: 90 }); // 'M 10 0 A 10 10 0 0 1 0 10 L 0 0 Z'
 * @see docs/geometry/
 */
export function describeSector(arc: Arc): string {
  return `${describeArc(arc)} L ${coordinate(arc.center.x)} ${coordinate(arc.center.y)} Z`;
}

function coordinate(value: number): string {
  return formatNumber(
    value,
    3,
  );
}
