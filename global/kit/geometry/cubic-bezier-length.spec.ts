import {
  describe,
  expect,
  it,
} from 'vitest';

import { cubicBezierLengthByFlattening } from './cubic-bezier-length-by-flattening.ts';
import { cubicBezierLength } from './cubic-bezier-length.ts';

const P0 = {
  x: 0,
  y: 0,
};
const P1 = {
  x: 0,
  y: 10,
};
const P2 = {
  x: 10,
  y: 10,
};
const P3 = {
  x: 10,
  y: 0,
};

describe('cubicBezierLength', () => {
  it('cubicBezierLength({ p0: P0, p1: P1, p2: P2, p3: P3 })', () => {
    const result = cubicBezierLength({
      p0: P0,
      p1: P1,
      p2: P2,
      p3: P3,
    });

    expect(result).toBeCloseTo(
      20,
      8,
    );
  });

  it('cubicBezierLength({ p0: {x:0,y:0}, p1: {x:10,y:0}, p2: {x:20,y:0}, p3: {x:30,y:0} })', () => {
    const result = cubicBezierLength({
      p0: {
        x: 0,
        y: 0,
      },
      p1: {
        x: 10,
        y: 0,
      },
      p2: {
        x: 20,
        y: 0,
      },
      p3: {
        x: 30,
        y: 0,
      },
    });

    expect(result).toBeCloseTo(
      30,
      8,
    );
  });

  it('cubicBezierLengthByFlattening({ p0: P0, p1: P1, p2: P2, p3: P3 }, 1000)', () => {
    const result = cubicBezierLengthByFlattening(
      {
        p0: P0,
        p1: P1,
        p2: P2,
        p3: P3,
      },
      1000,
    );

    expect(result).toBeCloseTo(
      19.999992146,
      8,
    );
  });
});
