import {
  describe,
  expect,
  it,
} from 'vitest';

import { intersectLineCircle } from './intersect-line-circle.ts';

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

describe('intersectLineCircle', () => {
  it('intersectLineCircle({ start: {x:-10,y:0}, end: {x:10,y:0} }, { center: {x:0,y:0}, radius: 5 })', () => {
    const result = intersectLineCircle(
      {
        end: {
          x: 10,
          y: 0,
        },
        start: {
          x: -10,
          y: 0,
        },
      },
      {
        center: {
          x: 0,
          y: 0,
        },
        radius: 5,
      },
    );

    expect(rounded(result)).toEqual([
      0.25,
      0.75,
    ]);
  });

  it('intersectLineCircle({ start: {x:-10,y:5}, end: {x:10,y:5} }, { center: {x:0,y:0}, radius: 5 })', () => {
    const result = intersectLineCircle(
      {
        end: {
          x: 10,
          y: 5,
        },
        start: {
          x: -10,
          y: 5,
        },
      },
      {
        center: {
          x: 0,
          y: 0,
        },
        radius: 5,
      },
    );

    expect(rounded(result)).toEqual([0.5]);
  });

  it('intersectLineCircle({ start: {x:-10,y:6}, end: {x:10,y:6} }, { center: {x:0,y:0}, radius: 5 })', () => {
    const result = intersectLineCircle(
      {
        end: {
          x: 10,
          y: 6,
        },
        start: {
          x: -10,
          y: 6,
        },
      },
      {
        center: {
          x: 0,
          y: 0,
        },
        radius: 5,
      },
    );

    expect(rounded(result)).toEqual([]);
  });
});
