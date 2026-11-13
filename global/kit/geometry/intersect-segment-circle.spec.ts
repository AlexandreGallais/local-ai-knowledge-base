import {
  describe,
  expect,
  it,
} from 'vitest';

import { intersectSegmentCircle } from './intersect-segment-circle.ts';

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

describe('intersectSegmentCircle', () => {
  it('intersectSegmentCircle({ start: {x:-10,y:0}, end: {x:10,y:0} }, { center: {x:0,y:0}, radius: 5 })', () => {
    const result = intersectSegmentCircle(
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
      {
        x: -5,
        y: 0,
      },
      {
        x: 5,
        y: 0,
      },
    ]);
  });

  it('intersectSegmentCircle({ start: {x:0,y:0}, end: {x:10,y:0} }, { center: {x:0,y:0}, radius: 5 })', () => {
    const result = intersectSegmentCircle(
      {
        end: {
          x: 10,
          y: 0,
        },
        start: {
          x: 0,
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

    expect(rounded(result)).toEqual([{
      x: 5,
      y: 0,
    }]);
  });

  it('intersectSegmentCircle({ start: {x:-1,y:0}, end: {x:1,y:0} }, { center: {x:0,y:0}, radius: 5 })', () => {
    const result = intersectSegmentCircle(
      {
        end: {
          x: 1,
          y: 0,
        },
        start: {
          x: -1,
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

    expect(rounded(result)).toEqual([]);
  });
});
