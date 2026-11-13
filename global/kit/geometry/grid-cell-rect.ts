import type { Grid } from './shapes.ts';
import type { Rect } from './types.ts';

/**
 * Gives the rectangle of the cell at an index of a grid.
 *
 * Formula: column = index % columns; row = floor(index / columns); x = origin.x + column*(cellWidth + gapX); y = origin.y + row*(cellHeight + gapY)
 * Edge cases: index is counted from 0, row by row. columns < 1 or a non-integer: throws `RangeError`. The gap is between cells only, not on the outer edges.
 * @param grid - Origin, number of columns, cell size and gaps of the grid, in user units.
 * @param index - Index of the cell, from 0, row by row.
 * @returns A new rectangle, in user units.
 * @throws {RangeError} gridCellRect: columns must be >= 1 and index >= 0, both integers.
 * @example
 * gridCellRect({ origin: {x:10,y:10}, columns: 4, cellWidth: 30, cellHeight: 20, gapX: 5, gapY: 5 }, 0); // {'x':10,'y':10,'width':30,'height':20}
 * @see docs/geometry/
 */
export function gridCellRect(
  grid: Grid,
  index: number,
): Rect {
  if (!Number.isInteger(grid.columns) || grid.columns < 1 || !Number.isInteger(index) || index < 0) {
    throw new RangeError('gridCellRect: columns must be >= 1 and index >= 0, both integers');
  }

  const column = index % grid.columns;
  const row = Math.floor(index / grid.columns);

  return {
    height: grid.cellHeight,
    width: grid.cellWidth,
    x: grid.origin.x + column * (grid.cellWidth + grid.gapX),
    y: grid.origin.y + row * (grid.cellHeight + grid.gapY),
  };
}
