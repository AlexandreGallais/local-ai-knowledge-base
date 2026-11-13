import {
  describe,
  expect,
  it,
} from 'vitest';

import { gridCellRect } from './grid-cell-rect.ts';

// Rounds every number to 9 decimals, as the values of the research report are.
function rounded(value: unknown): unknown {
  return JSON.parse(JSON.stringify(
    value,
    (
      _key,
      item: unknown,
    ) => typeof item === 'number' ? Number(item.toFixed(9)) + 0 : item,
  ));
}

describe('gridCellRect', () => {
  it('gridCellRect({ origin: {x:10,y:10}, columns: 4, cellWidth: 30, cellHeight: 20, gapX: 5, gapY: 5 }, 0)', () => {
    const result = gridCellRect(
      {
        cellHeight: 20,
        cellWidth: 30,
        columns: 4,
        gapX: 5,
        gapY: 5,
        origin: {
          x: 10,
          y: 10,
        },
      },
      0,
    );

    expect(rounded(result)).toEqual({
      height: 20,
      width: 30,
      x: 10,
      y: 10,
    });
  });

  it('gridCellRect({ origin: {x:10,y:10}, columns: 4, cellWidth: 30, cellHeight: 20, gapX: 5, gapY: 5 }, 5)', () => {
    const result = gridCellRect(
      {
        cellHeight: 20,
        cellWidth: 30,
        columns: 4,
        gapX: 5,
        gapY: 5,
        origin: {
          x: 10,
          y: 10,
        },
      },
      5,
    );

    expect(rounded(result)).toEqual({
      height: 20,
      width: 30,
      x: 45,
      y: 35,
    });
  });

  it('gridCellRect({ origin: {x:10,y:10}, columns: 4, cellWidth: 30, cellHeight: 20, gapX: 5, gapY: 5 }, 7)', () => {
    const result = gridCellRect(
      {
        cellHeight: 20,
        cellWidth: 30,
        columns: 4,
        gapX: 5,
        gapY: 5,
        origin: {
          x: 10,
          y: 10,
        },
      },
      7,
    );

    expect(rounded(result)).toEqual({
      height: 20,
      width: 30,
      x: 115,
      y: 35,
    });
  });
});
