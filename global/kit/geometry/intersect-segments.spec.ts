import {
  describe,
  expect,
  it,
} from 'vitest';

import { intersectSegments } from './intersect-segments.ts';

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

describe('intersectSegments', () => {
  it('intersectSegments({ start: {x:0,y:0}, end: {x:10,y:10} }, { start: {x:0,y:10}, end: {x:10,y:0} })', () => {
    const result = intersectSegments(
      {
        end: {
          x: 10,
          y: 10,
        },
        start: {
          x: 0,
          y: 0,
        },
      },
      {
        end: {
          x: 10,
          y: 0,
        },
        start: {
          x: 0,
          y: 10,
        },
      },
    );

    expect(rounded(result)).toEqual({
      x: 5,
      y: 5,
    });
  });

  it('intersectSegments({ start: {x:0,y:0}, end: {x:4,y:4} }, { start: {x:0,y:10}, end: {x:10,y:0} })', () => {
    const result = intersectSegments(
      {
        end: {
          x: 4,
          y: 4,
        },
        start: {
          x: 0,
          y: 0,
        },
      },
      {
        end: {
          x: 10,
          y: 0,
        },
        start: {
          x: 0,
          y: 10,
        },
      },
    );

    expect(result).toBe(null);
  });

  it('intersectSegments({ start: {x:0,y:0}, end: {x:5,y:5} }, { start: {x:0,y:10}, end: {x:10,y:0} })', () => {
    const result = intersectSegments(
      {
        end: {
          x: 5,
          y: 5,
        },
        start: {
          x: 0,
          y: 0,
        },
      },
      {
        end: {
          x: 10,
          y: 0,
        },
        start: {
          x: 0,
          y: 10,
        },
      },
    );

    expect(rounded(result)).toEqual({
      x: 5,
      y: 5,
    });
  });
});
