import type { Arc } from './shapes.ts';

import { formatNumber } from './format-number.ts';
import { polarToCartesian } from './polar-to-cartesian.ts';

/**
 * Gives the path data of a circular arc between two angles, for the d attribute.
 *
 * Formula: sweep = end - start; large-arc-flag = |sweep| > 180 ? 1 : 0; sweep-flag = sweep > 0 ? 1 : 0; `M start A r r 0 large sweep end`
 * Edge cases: sweep = 0: throws `RangeError`. |sweep| >= 360: two half arcs, because an arc whose two end points are equal is not drawn.
 * @param arc - Center and radius, in user units, then start and end angles in degrees, 0 on +x, clockwise on screen.
 * @returns The text: SVG path data or a number, ready to write in an attribute.
 * @throws {RangeError} describeArc: start and end angles are equal.
 * @example
 * describeArc({ center: {x:100,y:100}, radius: 50, startAngleDegrees: 0, endAngleDegrees: 90 }); // 'M 150 100 A 50 50 0 0 1 100 150'
 * @see docs/geometry/
 */
export function describeArc(arc: Arc): string {
  const sweep = arc.endAngleDegrees - arc.startAngleDegrees;

  if (sweep === 0) {
    throw new RangeError('describeArc: start and end angles are equal');
  }

  const sweepFlag = sweep > 0 ? '1' : '0';

  return Math.abs(sweep) >= 360
    ? fullCircle(
        arc,
        sweepFlag,
      )
    : partialArc(
        arc,
        Math.abs(sweep) > 180 ? '1' : '0',
        sweepFlag,
      );
}

function coordinate(value: number): string {
  return formatNumber(
    value,
    3,
  );
}

function fullCircle(
  arc: Arc,
  sweepFlag: string,
): string {
  const r = coordinate(arc.radius);
  const start = polarToCartesian(
    arc.center,
    arc.radius,
    arc.startAngleDegrees,
  );
  const opposite = polarToCartesian(
    arc.center,
    arc.radius,
    arc.startAngleDegrees + 180,
  );
  const back = `A ${r} ${r} 0 1 ${sweepFlag} ${coordinate(start.x)} ${coordinate(start.y)}`;

  return `M ${coordinate(start.x)} ${coordinate(start.y)} A ${r} ${r} 0 1 ${sweepFlag} ${coordinate(opposite.x)} ${coordinate(opposite.y)} ${back}`;
}

function partialArc(
  arc: Arc,
  largeArcFlag: string,
  sweepFlag: string,
): string {
  const r = coordinate(arc.radius);
  const start = polarToCartesian(
    arc.center,
    arc.radius,
    arc.startAngleDegrees,
  );
  const end = polarToCartesian(
    arc.center,
    arc.radius,
    arc.endAngleDegrees,
  );

  return `M ${coordinate(start.x)} ${coordinate(start.y)} A ${r} ${r} 0 ${largeArcFlag} ${sweepFlag} ${coordinate(end.x)} ${coordinate(end.y)}`;
}
