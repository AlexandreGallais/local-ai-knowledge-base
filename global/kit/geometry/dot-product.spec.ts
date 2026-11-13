import {
  describe,
  expect,
  it,
} from 'vitest';

import { dotProduct } from './dot-product.ts';

describe('dotProduct', () => {
  it('dotProduct({x:1,y:2},{x:3,y:4})', () => {
    const result = dotProduct(
      {
        x: 1,
        y: 2,
      },
      {
        x: 3,
        y: 4,
      },
    );

    expect(result).toBeCloseTo(
      11,
      8,
    );
  });

  it('dotProduct({x:1,y:0},{x:0,y:1})', () => {
    const result = dotProduct(
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
      0,
      8,
    );
  });
});
