import {
  describe,
  expect,
  it,
} from 'vitest';

import { cubicBezierTangentAngle } from './cubic-bezier-tangent-angle.ts';

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

describe('cubicBezierTangentAngle', () => {
  it('cubicBezierTangentAngle({ p0: P0, p1: P1, p2: P2, p3: P3 }, 0)', () => {
    const result = cubicBezierTangentAngle(
      {
        p0: P0,
        p1: P1,
        p2: P2,
        p3: P3,
      },
      0,
    );

    expect(result).toBeCloseTo(
      90,
      8,
    );
  });

  it('cubicBezierTangentAngle({ p0: P0, p1: P1, p2: P2, p3: P3 }, 0.5)', () => {
    const result = cubicBezierTangentAngle(
      {
        p0: P0,
        p1: P1,
        p2: P2,
        p3: P3,
      },
      0.5,
    );

    expect(result).toBeCloseTo(
      0,
      8,
    );
  });

  it('cubicBezierTangentAngle({ p0: P0, p1: P1, p2: P2, p3: P3 }, 1)', () => {
    const result = cubicBezierTangentAngle(
      {
        p0: P0,
        p1: P1,
        p2: P2,
        p3: P3,
      },
      1,
    );

    expect(result).toBeCloseTo(
      -90,
      8,
    );
  });
});
