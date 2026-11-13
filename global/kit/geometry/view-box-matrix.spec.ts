import {
  describe,
  expect,
  it,
} from 'vitest';

import { viewBoxMatrix } from './view-box-matrix.ts';

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

describe('viewBoxMatrix', () => {
  it('viewBoxMatrix({x:0,y:0,width:100,height:50}, {x:0,y:0,width:200,height:200}, { alignX: \'mid\', alignY: \'mid\', fit: \'meet\' })', () => {
    const result = viewBoxMatrix(
      {
        height: 50,
        width: 100,
        x: 0,
        y: 0,
      },
      {
        height: 200,
        width: 200,
        x: 0,
        y: 0,
      },
      {
        alignX: 'mid',
        alignY: 'mid',
        fit: 'meet',
      },
    );

    expect(rounded(result)).toEqual([
      2,
      0,
      0,
      2,
      0,
      50,
    ]);
  });

  it('viewBoxMatrix({ x: 0, y: 0, width: 100, height: 50 }, { x: 0, y: 0, width: 200, height: 200 }, { alignX: \'mid\', alignY: \'mid\', fit: \'slice\' })', () => {
    const result = viewBoxMatrix(
      {
        height: 50,
        width: 100,
        x: 0,
        y: 0,
      },
      {
        height: 200,
        width: 200,
        x: 0,
        y: 0,
      },
      {
        alignX: 'mid',
        alignY: 'mid',
        fit: 'slice',
      },
    );

    expect(rounded(result)).toEqual([
      4,
      0,
      0,
      4,
      -100,
      0,
    ]);
  });

  it('viewBoxMatrix({ x: 0, y: 0, width: 100, height: 50 }, { x: 0, y: 0, width: 200, height: 200 }, { alignX: \'mid\', alignY: \'mid\', fit: \'none\' })', () => {
    const result = viewBoxMatrix(
      {
        height: 50,
        width: 100,
        x: 0,
        y: 0,
      },
      {
        height: 200,
        width: 200,
        x: 0,
        y: 0,
      },
      {
        alignX: 'mid',
        alignY: 'mid',
        fit: 'none',
      },
    );

    expect(rounded(result)).toEqual([
      2,
      0,
      0,
      4,
      0,
      0,
    ]);
  });

  it('viewBoxMatrix({ x: 0, y: 0, width: 100, height: 50 }, { x: 0, y: 0, width: 200, height: 200 }, { alignX: \'min\', alignY: \'max\', fit: \'meet\' })', () => {
    const result = viewBoxMatrix(
      {
        height: 50,
        width: 100,
        x: 0,
        y: 0,
      },
      {
        height: 200,
        width: 200,
        x: 0,
        y: 0,
      },
      {
        alignX: 'min',
        alignY: 'max',
        fit: 'meet',
      },
    );

    expect(rounded(result)).toEqual([
      2,
      0,
      0,
      2,
      0,
      100,
    ]);
  });

  it('viewBoxMatrix({x:-50,y:-50,width:100,height:100}, {x:0,y:0,width:300,height:300}, { alignX: \'mid\', alignY: \'mid\', fit: \'meet\' })', () => {
    const result = viewBoxMatrix(
      {
        height: 100,
        width: 100,
        x: -50,
        y: -50,
      },
      {
        height: 300,
        width: 300,
        x: 0,
        y: 0,
      },
      {
        alignX: 'mid',
        alignY: 'mid',
        fit: 'meet',
      },
    );

    expect(rounded(result)).toEqual([
      3,
      0,
      0,
      3,
      150,
      150,
    ]);
  });
});
