import {
  describe,
  expect,
  it,
} from 'vitest';
import { distributeOnCircle } from './distribute-on-circle.ts';

describe('proof of t03', () => {
  it('places four points clockwise from the top', () => {
    const points = distributeOnCircle(
      {
        center: {
          x: 0,
          y: 0,
        },
        radius: 10,
      },
      4,
      -90,
    );
    const expected = [
      [0, -10],
      [10, 0],
      [0, 10],
      [-10, 0],
    ];

    expect(points).toHaveLength(4);
    points.forEach((point, index) => {
      expect(point.x).toBeCloseTo(expected[index]?.[0] ?? Number.NaN, 9);
      expect(point.y).toBeCloseTo(expected[index]?.[1] ?? Number.NaN, 9);
    });
    expect(points[1]?.angleDegrees).toBeCloseTo(0, 9);
  });
  it('refuses a count below 1', () => {
    expect(() => distributeOnCircle(
      {
        center: {
          x: 0,
          y: 0,
        },
        radius: 10,
      },
      0,
      0,
    )).toThrow(RangeError);
  });
});
