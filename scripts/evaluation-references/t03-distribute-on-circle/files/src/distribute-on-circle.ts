import type {
  Circle,
  PlacedPoint,
} from './circle.ts';

/**
 * Places points at equal distance on a full circle, starting at an angle.
 *
 * Formula: angle_i = start + i * 360 / count; x = cx + r * cos(angle), y = cy + r * sin(angle)
 * @param circle - Center and radius of the circle, in user units.
 * @param count - Number of points, an integer of 1 or more.
 * @param startAngleDegrees - Angle of the first point, in degrees, 0 on +x, clockwise on screen.
 * @returns The points, in order, each with its angle in degrees.
 * @throws {RangeError} count must be an integer of 1 or more.
 * @example
 * distributeOnCircle({ center: { x: 0, y: 0 }, radius: 10 }, 4, -90); // (0,-10), (10,0), (0,10), (-10,0)
 */
export function distributeOnCircle(circle: Circle, count: number, startAngleDegrees: number): readonly PlacedPoint[] {
  if (!Number.isInteger(count) || count < 1) {
    throw new RangeError('count must be an integer of 1 or more');
  }
  const step = 360 / count;

  return Array.from({ length: count }, (_unused, index) => {
    const angleDegrees = startAngleDegrees + index * step;
    const radians = angleDegrees * Math.PI / 180;

    return {
      angleDegrees,
      x: circle.center.x + circle.radius * Math.cos(radians),
      y: circle.center.y + circle.radius * Math.sin(radians),
    };
  });
}
