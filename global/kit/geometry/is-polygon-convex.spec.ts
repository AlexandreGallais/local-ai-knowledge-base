import {
  describe,
  expect,
  it,
} from 'vitest';

import { isPolygonConvex } from './is-polygon-convex.ts';

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

describe('isPolygonConvex', () => {
  it('isPolygonConvex(square)', () => {
    const result = isPolygonConvex(square);

    expect(result).toBe(true);
  });

  it('isPolygonConvex(lShape)', () => {
    const result = isPolygonConvex(lShape);

    expect(result).toBe(false);
  });
});
