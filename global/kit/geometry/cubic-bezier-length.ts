import type { CubicBezier } from './shapes.ts';

import { cubicBezierDerivative } from './cubic-bezier-derivative.ts';
import { vectorLength } from './vector-length.ts';

interface GaussNode {
  readonly node: number;
  readonly weight: number;
}

interface Legendre {
  readonly previous: number;
  readonly value: number;
}

/**
 * Measures the length of a cubic Bezier curve by Gauss-Legendre quadrature.
 *
 * Formula: integral over [0, 1] of |derivative(t)|, by Gauss-Legendre quadrature: 0.5 * sum(w_i * |derivative(0.5*x_i + 0.5)|)
 * Edge cases: No exact formula for a cubic. Test with a tolerance of 1e-6. A browser gives 20.000004 for this curve with `getTotalLength()`.
 * @param curve - The control points p0 to p3 (p0 to p2 for a quadratic curve), in user units.
 * @returns The number the formula gives.
 * @example
 * cubicBezierLength({ p0: P0, p1: P1, p2: P2, p3: P3 }); // 20
 * @see docs/geometry/
 */
export function cubicBezierLength(curve: CubicBezier): number {
  const order = 24;
  const nodes = Array.from(
    { length: order },
    (
      _unused,
      index,
    ) => gaussNode(
      order,
      Math.cos((Math.PI * (index + 0.75)) / (order + 0.5)),
    ),
  );

  return 0.5 * nodes.reduce(
    (
      sum,
      {
        node,
        weight,
      },
    ) => sum + weight * vectorLength(cubicBezierDerivative(
      curve,
      0.5 * node + 0.5,
    )),
    0,
  );
}

function gaussNode(
  order: number,
  start: number,
): GaussNode {
  const newtonStep = (x: number): number => {
    const {
      previous,
      value,
    } = legendreAt(
      order,
      x,
    );

    return x - value / ((order * (x * value - previous)) / (x * x - 1));
  };

  const node = Array
    .from({ length: 100 })
    .reduce<number>((x) => newtonStep(x), start);
  const {
    previous,
    value,
  } = legendreAt(
    order,
    node,
  );
  const derivative = (order * (node * value - previous)) / (node * node - 1);

  return {
    node,
    weight: 2 / ((1 - node * node) * derivative * derivative),
  };
}

function legendreAt(
  order: number,
  x: number,
): Legendre {
  return Array
    .from({ length: order - 1 }, (
      _unused,
      index,
    ) => index + 2)
    .reduce(
      (
        state,
        k,
      ) => ({
        previous: state.value,
        value: ((2 * k - 1) * x * state.value - (k - 1) * state.previous) / k,
      }),
      {
        previous: 1,
        value: x,
      },
    );
}
