import {
  describe,
  expect,
  it,
} from 'vitest';

import { intersectCircles } from './intersect-circles.ts';

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

describe('intersectCircles', () => {
  it('intersectCircles({ center: {x:0,y:0}, radius: 5 }, { center: {x:8,y:0}, radius: 5 })', () => {
    const result = intersectCircles(
      {
        center: {
          x: 0,
          y: 0,
        },
        radius: 5,
      },
      {
        center: {
          x: 8,
          y: 0,
        },
        radius: 5,
      },
    );

    expect(rounded(result)).toEqual({
      kind: 'points',
      points: [
        {
          x: 4,
          y: -3,
        },
        {
          x: 4,
          y: 3,
        },
      ],
    });
  });

  it('intersectCircles({ center: {x:0,y:0}, radius: 5 }, { center: {x:10,y:0}, radius: 5 })', () => {
    const result = intersectCircles(
      {
        center: {
          x: 0,
          y: 0,
        },
        radius: 5,
      },
      {
        center: {
          x: 10,
          y: 0,
        },
        radius: 5,
      },
    );

    expect(rounded(result)).toEqual({
      kind: 'points',
      points: [{
        x: 5,
        y: 0,
      }],
    });
  });

  it('intersectCircles({ center: {x:0,y:0}, radius: 5 }, { center: {x:20,y:0}, radius: 5 })', () => {
    const result = intersectCircles(
      {
        center: {
          x: 0,
          y: 0,
        },
        radius: 5,
      },
      {
        center: {
          x: 20,
          y: 0,
        },
        radius: 5,
      },
    );

    expect(rounded(result)).toEqual({ kind: 'separate' });
  });

  it('intersectCircles({ center: {x:0,y:0}, radius: 5 }, { center: {x:1,y:0}, radius: 1 })', () => {
    const result = intersectCircles(
      {
        center: {
          x: 0,
          y: 0,
        },
        radius: 5,
      },
      {
        center: {
          x: 1,
          y: 0,
        },
        radius: 1,
      },
    );

    expect(rounded(result)).toEqual({ kind: 'contained' });
  });

  it('intersectCircles({ center: {x:0,y:0}, radius: 5 }, { center: {x:0,y:0}, radius: 5 })', () => {
    const result = intersectCircles(
      {
        center: {
          x: 0,
          y: 0,
        },
        radius: 5,
      },
      {
        center: {
          x: 0,
          y: 0,
        },
        radius: 5,
      },
    );

    expect(rounded(result)).toEqual({ kind: 'coincident' });
  });
});
