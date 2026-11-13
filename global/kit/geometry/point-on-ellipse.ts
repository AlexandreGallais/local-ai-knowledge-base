import type { Ellipse } from './shapes.ts';
import type { Point } from './types.ts';

import { degreesToRadians } from '../math/degrees-to-radians.ts';

/**
 * Gives the point of a rotated ellipse at an angle.
 *
 * Formula: x = rx*cos(t)*cos(phi) - ry*sin(t)*sin(phi) + cx; y = rx*cos(t)*sin(phi) + ry*sin(t)*cos(phi) + cy
 * Edge cases: t is the angle before the stretch and the rotation: it is not the visual angle when rx != ry.
 * @param ellipse - Center (cx, cy), radii (rx, ry) in user units, and rotation in degrees.
 * @param angleDegrees - Angle in degrees, 0 on the +x axis, clockwise on screen.
 * @returns A new point, in user units.
 * @example
 * pointOnEllipse({ cx: 0, cy: 0, rx: 20, ry: 10, rotationDegrees: 0 }, 90); // {'x':0,'y':10}
 * @see docs/geometry/
 */
export function pointOnEllipse(
  ellipse: Ellipse,
  angleDegrees: number,
): Point {
  const phi = degreesToRadians(ellipse.rotationDegrees);
  const theta = degreesToRadians(angleDegrees);
  const {
    cx,
    cy,
    rx,
    ry,
  } = ellipse;

  return {
    x: rx * Math.cos(theta) * Math.cos(phi) - ry * Math.sin(theta) * Math.sin(phi) + cx,
    y: rx * Math.cos(theta) * Math.sin(phi) + ry * Math.sin(theta) * Math.cos(phi) + cy,
  };
}
