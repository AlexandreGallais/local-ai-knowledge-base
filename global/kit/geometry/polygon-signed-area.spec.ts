import {
  describe,
  expect,
  it,
} from 'vitest';

import { polygonSignedArea } from './polygon-signed-area.ts';

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

describe('polygonSignedArea', () => {
  it('polygonSignedArea(square)', () => {
    const result = polygonSignedArea(square);

    expect(result).toBeCloseTo(
      16,
      8,
    );
  });

  it('polygonSignedArea(square.toReversed())', () => {
    const result = polygonSignedArea(square.toReversed());

    expect(result).toBeCloseTo(
      -16,
      8,
    );
  });

  it('polygonSignedArea(lShape)', () => {
    const result = polygonSignedArea(lShape);

    expect(result).toBeCloseTo(
      12,
      8,
    );
  });
});
