import {
  describe,
  expect,
  it,
} from 'vitest';

import { isPointInPolygon } from './is-point-in-polygon.ts';

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

describe('isPointInPolygon', () => {
  it('isPointInPolygon({x:1,y:1}, lShape)', () => {
    const result = isPointInPolygon(
      {
        x: 1,
        y: 1,
      },
      lShape,
    );

    expect(result).toBe(true);
  });

  it('isPointInPolygon({x:3,y:3}, lShape)', () => {
    const result = isPointInPolygon(
      {
        x: 3,
        y: 3,
      },
      lShape,
    );

    expect(result).toBe(false);
  });

  it('isPointInPolygon({x:5,y:1}, square)', () => {
    const result = isPointInPolygon(
      {
        x: 5,
        y: 1,
      },
      square,
    );

    expect(result).toBe(false);
  });
});
