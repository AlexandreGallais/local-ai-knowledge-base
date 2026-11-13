import {
  describe,
  expect,
  it,
} from 'vitest';

import { crossProduct } from './cross-product.ts';

describe('crossProduct', () => {
  it('crossProduct({x:1,y:0},{x:0,y:1})', () => {
    const result = crossProduct(
      {
        x: 1,
        y: 0,
      },
      {
        x: 0,
        y: 1,
      },
    );

    expect(result).toBeCloseTo(
      1,
      8,
    );
  });

  it('crossProduct({x:2,y:2},{x:4,y:4})', () => {
    const result = crossProduct(
      {
        x: 2,
        y: 2,
      },
      {
        x: 4,
        y: 4,
      },
    );

    expect(result).toBeCloseTo(
      0,
      8,
    );
  });
});
