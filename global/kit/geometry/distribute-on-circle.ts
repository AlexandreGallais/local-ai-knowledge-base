import type { PlacedPoint } from './results.ts';
import type { Circle } from './shapes.ts';

import { polarToCartesian } from './polar-to-cartesian.ts';

/**
 * Places N points at equal distance on a full circle, starting at an angle.
 *
 * Formula: step = 360 / count; angle_i = start + i*step; point_i = polarToCartesian(center, radius, angle_i)
 * Edge cases: count must be an integer >= 1, else `RangeError`. The last point is one step before the start: never divide by count - 1 on a full circle.
 * @param circle - Center and radius of the circle, in user units.
 * @param count - Number of items, an integer of 1 or more.
 * @param startAngleDegrees - Angle of the first item or of the start of the arc, in degrees, 0 on +x, clockwise on screen.
 * @returns The points, in order, each with its angle in degrees.
 * @throws {RangeError} distributeOnCircle: count must be an integer >= 1.
 * @example
 * distributeOnCircle({ center: {x:0,y:0}, radius: 10 }, 6, 0); // [{'x':10,'y':0,'angleDegrees':0},{'x':5,'y':8.660254038,'angleDegrees':60},{'x':-5,'y':8.6 ...
 * @see docs/geometry/
 */
export function distributeOnCircle(
  circle: Circle,
  count: number,
  startAngleDegrees: number,
): readonly PlacedPoint[] {
  if (!Number.isInteger(count) || count < 1) {
    throw new RangeError('distributeOnCircle: count must be an integer >= 1');
  }

  const step = 360 / count;

  return Array.from({ length: count }, (
    _unused,
    index,
  ) => {
    const angleDegrees = startAngleDegrees + index * step;

    return {
      ...polarToCartesian(
        circle.center,
        circle.radius,
        angleDegrees,
      ),
      angleDegrees,
    };
  });
}
