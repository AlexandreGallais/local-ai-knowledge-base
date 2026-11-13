import {
  describe,
  expect,
  it,
} from 'vitest';

import { isPolygonClockwiseOnScreen } from './is-polygon-clockwise-on-screen.ts';

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

describe('isPolygonClockwiseOnScreen', () => {
  it('isPolygonClockwiseOnScreen(square)', () => {
    const result = isPolygonClockwiseOnScreen(square);

    expect(result).toBe(true);
  });
});
