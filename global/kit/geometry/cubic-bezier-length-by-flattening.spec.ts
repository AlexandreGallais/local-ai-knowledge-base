import {
  describe,
  expect,
  it,
} from 'vitest';

import { cubicBezierLengthByFlattening } from './cubic-bezier-length-by-flattening.ts';

describe('cubicBezierLengthByFlattening', () => {
  it('measures the test curve close to its length, 20', () => {
    const result = cubicBezierLengthByFlattening(
      {
        p0: {
          x: 0,
          y: 0,
        },
        p1: {
          x: 0,
          y: 10,
        },
        p2: {
          x: 10,
          y: 10,
        },
        p3: {
          x: 10,
          y: 0,
        },
      },
      1000,
    );

    expect(result).toBeCloseTo(
      20,
      4,
    );
  });
});
