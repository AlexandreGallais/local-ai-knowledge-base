import type { Rect } from './types.ts';

import { formatNumber } from './format-number.ts';

/**
 * Gives the path data of a rectangle with rounded corners.
 *
 * Formula: four lines and four quarter arcs, sweep flag 1 (clockwise on screen)
 * Edge cases: The radius is capped at half the smaller side. Radius <= 0: a plain rectangle.
 * @param rect - The rectangle, in user units.
 * @param cornerRadius - Radius of the rounded corners, in user units.
 * @returns The text: SVG path data or a number, ready to write in an attribute.
 * @example
 * roundedRectPath({x:0,y:0,width:40,height:20},5); // 'M 5 0 H 35 A 5 5 0 0 1 40 5 V 15 A 5 5 0 0 1 35 20 H 5 A 5 5 0 0 1 0 15 V 5 A 5 5 0 0 1 5 ...
 * @see docs/geometry/
 */
export function roundedRectPath(
  rect: Rect,
  cornerRadius: number,
): string {
  const r = Math.min(
    cornerRadius,
    rect.width / 2,
    rect.height / 2,
  );

  return r <= 0
    ? squarePath(rect)
    : roundPath(
        rect,
        r,
      );
}

function coordinate(value: number): string {
  return formatNumber(
    value,
    3,
  );
}

function roundedCorners(
  rect: Rect,
  r: number,
): readonly string[] {
  const {
    height: h,
    width: w,
    x,
    y,
  } = rect;
  const arc = `A ${coordinate(r)} ${coordinate(r)} 0 0 1`;

  return [
    `${arc} ${coordinate(x + w)} ${coordinate(y + r)}`,
    `${arc} ${coordinate(x + w - r)} ${coordinate(y + h)}`,
    `${arc} ${coordinate(x)} ${coordinate(y + h - r)}`,
    `${arc} ${coordinate(x + r)} ${coordinate(y)}`,
  ];
}

function roundPath(
  rect: Rect,
  r: number,
): string {
  const corners = roundedCorners(
    rect,
    r,
  );
  const sides = [
    `H ${coordinate(rect.x + rect.width - r)}`,
    `V ${coordinate(rect.y + rect.height - r)}`,
    `H ${coordinate(rect.x + r)}`,
    `V ${coordinate(rect.y + r)}`,
  ];
  const outline = sides
    .map((
      side,
      index,
    ) => `${side} ${corners[index] ?? ''}`)
    .join(' ');

  return `M ${coordinate(rect.x + r)} ${coordinate(rect.y)} ${outline} Z`;
}

function squarePath(rect: Rect): string {
  const right = coordinate(rect.x + rect.width);
  const bottom = coordinate(rect.y + rect.height);

  return `M ${coordinate(rect.x)} ${coordinate(rect.y)} H ${right} V ${bottom} H ${coordinate(rect.x)} Z`;
}
