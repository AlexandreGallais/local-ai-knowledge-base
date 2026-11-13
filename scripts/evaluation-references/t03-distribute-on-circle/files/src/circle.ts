// Shapes of the circle functions.
export interface Point {
  readonly x: number;
  readonly y: number;
}

export interface Circle {
  readonly center: Point;
  readonly radius: number;
}

export interface PlacedPoint extends Point {
  readonly angleDegrees: number;
}
