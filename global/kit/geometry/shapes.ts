// Types of the geometry kit.

import type { Point } from './types.ts';

export type AlignX = 'max' | 'mid' | 'min';

export type AlignY = 'max' | 'mid' | 'min';

export type AnchorName
  = | 'bottom-center'
    | 'bottom-left'
    | 'bottom-right'
    | 'center'
    | 'center-left'
    | 'center-right'
    | 'top-center'
    | 'top-left'
    | 'top-right';

export interface Arc extends Circle {
  readonly endAngleDegrees: number;
  readonly startAngleDegrees: number;
}

export interface AspectRatio {
  readonly alignX: AlignX;
  readonly alignY: AlignY;
  readonly fit: ViewBoxFit;
}

export interface Circle {
  readonly center: Point;
  readonly radius: number;
}

export interface CubicBezier extends QuadraticBezier {
  readonly p3: Point;
}

export type DistributeMode = 'space-around' | 'space-between' | 'space-evenly';

export interface Ellipse {
  readonly cx: number;
  readonly cy: number;
  readonly rotationDegrees: number;
  readonly rx: number;
  readonly ry: number;
}

export interface Grid {
  readonly cellHeight: number;
  readonly cellWidth: number;
  readonly columns: number;
  readonly gapX: number;
  readonly gapY: number;
  readonly origin: Point;
}

export interface QuadraticBezier {
  readonly p0: Point;
  readonly p1: Point;
  readonly p2: Point;
}

export interface Segment {
  readonly end: Point;
  readonly start: Point;
}

export interface Span {
  readonly end: number;
  readonly start: number;
}

export type ViewBoxFit = 'meet' | 'none' | 'slice';
