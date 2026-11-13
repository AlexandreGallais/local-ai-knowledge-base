import type {
  Circle,
  Segment,
} from './shapes.ts';

interface Quadratic {
  readonly a: number;
  readonly b: number;
  readonly c: number;
}

/**
 * Gives where an infinite line crosses a circle: 0, 1 or 2 points.
 *
 * Formula: a = |p2 - p1|^2; b = 2*((p2 - p1) . (p1 - c)); c = |p1 - c|^2 - r^2; u = (-b +- sqrt(b^2 - 4ac)) / 2a. Returns the u values, smallest first.
 * Edge cases: b^2 - 4ac < 0: no value. = 0: one value (tangent). p1 = p2: throws `RangeError`.
 * @param line - Two different points of the infinite line, in user units.
 * @param circle - Center and radius of the circle, in user units.
 * @returns A new list; the inputs are not changed.
 * @throws {RangeError} intersectLineCircle: the two points of the line are equal.
 * @example
 * intersectLineCircle({ start: {x:-10,y:0}, end: {x:10,y:0} }, { center: {x:0,y:0}, radius: 5 }); // [0.25,0.75]
 * @see docs/geometry/
 */
export function intersectLineCircle(
  line: Segment,
  circle: Circle,
): readonly number[] {
  const {
    a,
    b,
    c,
  } = lineCircleQuadratic(
    line,
    circle,
  );

  if (a === 0) {
    throw new RangeError('intersectLineCircle: the two points of the line are equal');
  }

  const discriminant = b * b - 4 * a * c;

  if (discriminant < 0) {
    return [];
  }

  const root = Math.sqrt(discriminant);

  return discriminant === 0
    ? [-b / (2 * a)]
    : [
        (-b - root) / (2 * a),
        (-b + root) / (2 * a),
      ];
}

function lineCircleQuadratic(
  line: Segment,
  circle: Circle,
): Quadratic {
  const {
    end: p2,
    start: p1,
  } = line;
  const {
    center,
    radius,
  } = circle;

  return {
    a: (p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2,
    b: 2 * ((p2.x - p1.x) * (p1.x - center.x) + (p2.y - p1.y) * (p1.y - center.y)),
    c: (p1.x - center.x) ** 2 + (p1.y - center.y) ** 2 - radius * radius,
  };
}
