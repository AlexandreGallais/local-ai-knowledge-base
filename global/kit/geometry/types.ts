// Types of the geometry kit.

export type Matrix = readonly [
  number,
  number,
  number,
  number,
  number,
  number,
];

export interface Point {
  readonly x: number;
  readonly y: number;
}

export interface Rect {
  readonly height: number;
  readonly width: number;
  readonly x: number;
  readonly y: number;
}
