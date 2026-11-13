import type { Matrix } from './types.ts';

import { formatNumber } from './format-number.ts';

/**
 * Writes a matrix as an SVG transform attribute: matrix(a b c d e f).
 *
 * Formula: `matrix(a b c d e f)`, six decimals
 * Edge cases: Never write NaN in an attribute: the formatter throws.
 * @param m - Matrix [a, b, c, d, e, f] of SVG matrix(a b c d e f).
 * @returns The text: SVG path data or a number, ready to write in an attribute.
 * @example
 * matrixToString(rotationMatrix(90)); // 'matrix(0 1 -1 0 0 0)'
 * @see docs/geometry/
 */
export function matrixToString(m: Matrix): string {
  return `matrix(${m.map((value) => formatNumber(
    value,
    6,
  )).join(' ')})`;
}
