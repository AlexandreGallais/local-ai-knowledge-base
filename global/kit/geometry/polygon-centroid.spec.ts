import {
  describe,
  expect,
  it,
} from 'vitest';

import { polygonCentroid } from './polygon-centroid.ts';

const square = [
  {
    x: 0,
    y: 0,
  },
  {
    x: 4,
    y: 0,
  },
  {
    x: 4,
    y: 4,
  },
  {
    x: 0,
    y: 4,
  },
];
const lShape = [
  {
    x: 0,
    y: 0,
  },
  {
    x: 4,
    y: 0,
  },
  {
    x: 4,
    y: 2,
  },
  {
    x: 2,
    y: 2,
  },
  {
    x: 2,
    y: 4,
  },
  {
    x: 0,
    y: 4,
  },
];

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

describe('polygonCentroid', () => {
  it('polygonCentroid(square)', () => {
    const result = polygonCentroid(square);

    expect(rounded(result)).toEqual({
      x: 2,
      y: 2,
    });
  });

  it('polygonCentroid(lShape)', () => {
    const result = polygonCentroid(lShape);

    expect(rounded(result)).toEqual({
      x: 1.666666667,
      y: 1.666666667,
    });
  });

  it('polygonCentroid([{x:0,y:0},{x:5,y:5},{x:10,y:10}])', () => {
    expect(() => polygonCentroid([
      {
        x: 0,
        y: 0,
      },
      {
        x: 5,
        y: 5,
      },
      {
        x: 10,
        y: 10,
      },
    ])).toThrow(RangeError);
  });
});
