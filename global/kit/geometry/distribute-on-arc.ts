import type { PlacedPoint } from './results.ts';
import type { Arc } from './shapes.ts';

import { polarToCartesian } from './polar-to-cartesian.ts';

/**
 * Places N points at equal distance on an arc, both ends included.
 *
 * Formula: step = (end - start) / (count - 1); the first point is on start, the last on end
 * Edge cases: count = 1: one point at the middle angle. On an arc, divide by count - 1; on a full circle, by count.
 * @param arc - Center and radius, in user units, then start and end angles in degrees, 0 on +x, clockwise on screen.
 * @param count - Number of items, an integer of 1 or more.
 * @returns The points, in order, each with its angle in degrees.
 * @throws {RangeError} distributeOnArc: count must be an integer >= 1.
 * @example
 * distributeOnArc({ center: {x:0,y:0}, radius: 10, startAngleDegrees: -180, endAngleDegrees: 0 }, 5).map(p => p.angleDegrees); // [-180,-135,-90,-45,0]
 * @see docs/geometry/
 */
export function distributeOnArc(
  arc: Arc,
  count: number,
): readonly PlacedPoint[] {
  if (!Number.isInteger(count) || count < 1) {
    throw new RangeError('distributeOnArc: count must be an integer >= 1');
  }

  const step = count === 1 ? 0 : (arc.endAngleDegrees - arc.startAngleDegrees) / (count - 1);
  const first = count === 1 ? (arc.startAngleDegrees + arc.endAngleDegrees) / 2 : arc.startAngleDegrees;

  return Array.from({ length: count }, (
    _unused,
    index,
  ) => {
    const angleDegrees = first + index * step;

    return {
      ...polarToCartesian(
        arc.center,
        arc.radius,
        angleDegrees,
      ),
      angleDegrees,
    };
  });
}
