// Types of the geometry kit.

import type { Ellipse } from './shapes.ts';
import type { Point } from './types.ts';

export type ArcConversion
  = | (CenterArc & { readonly kind: 'arc' })
    | { readonly kind: 'line' }
    | { readonly kind: 'omitted' };

export interface CenterArc extends Ellipse {
  readonly startAngleDegrees: number;
  readonly sweepAngleDegrees: number;
}

export type CircleIntersection
  = | { readonly kind: 'coincident' }
    | { readonly kind: 'contained' }
    | {
      readonly kind: 'points';
      readonly points: readonly Point[];
    }
    | { readonly kind: 'separate' };

export interface EndpointArc {
  readonly largeArc: boolean;
  readonly rotationDegrees: number;
  readonly rx: number;
  readonly ry: number;
  readonly sweep: boolean;
  readonly x1: number;
  readonly x2: number;
  readonly y1: number;
  readonly y2: number;
}

export type LineIntersection
  = | { readonly kind: 'coincident' }
    | { readonly kind: 'parallel' }
    | {
      readonly kind: 'point';
      readonly point: Point;
      readonly ua: number;
      readonly ub: number;
    };

export interface MatrixParts {
  readonly rotationDegrees: number;
  readonly scaleX: number;
  readonly scaleY: number;
  readonly skewXDegrees: number;
  readonly translateX: number;
  readonly translateY: number;
}

export interface PlacedPoint extends Point {
  readonly angleDegrees: number;
}
