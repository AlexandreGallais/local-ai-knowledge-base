import {
  describe,
  expect,
  it,
} from 'vitest';

import { angleBetweenPoints } from './angle-between-points.ts';

describe('angleBetweenPoints', () => {
  it('angleBetweenPoints({x:10,y:10},{x:10,y:30})', () => {
    const result = angleBetweenPoints(
      {
        x: 10,
        y: 10,
      },
      {
        x: 10,
        y: 30,
      },
    );

    expect(result).toBeCloseTo(
      90,
      8,
    );
  });

  it('angleBetweenPoints({x:0,y:0},{x:-5,y:-5})', () => {
    const result = angleBetweenPoints(
      {
        x: 0,
        y: 0,
      },
      {
        x: -5,
        y: -5,
      },
    );

    expect(result).toBeCloseTo(
      -135,
      8,
    );
  });
});
