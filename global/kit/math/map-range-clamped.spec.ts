import {
  describe,
  expect,
  it,
} from 'vitest';

import { mapRangeClamped } from './map-range-clamped.ts';

describe('mapRangeClamped', () => {
  it('mapRangeClamped(-10, { start: 10, end: 130 }, { start: 0, end: 960 })', () => {
    const result = mapRangeClamped(
      -10,
      {
        end: 130,
        start: 10,
      },
      {
        end: 960,
        start: 0,
      },
    );

    expect(result).toBe(0);
  });

  it('mapRangeClamped(22, { start: 4, end: 20 }, { start: 0, end: 100 })', () => {
    const result = mapRangeClamped(
      22,
      {
        end: 20,
        start: 4,
      },
      {
        end: 100,
        start: 0,
      },
    );

    expect(result).toBe(100);
  });

  it('mapRangeClamped(1.5, { start: 0, end: 10 }, { start: -135, end: 135 })', () => {
    const result = mapRangeClamped(
      1.5,
      {
        end: 10,
        start: 0,
      },
      {
        end: 135,
        start: -135,
      },
    );

    expect(result).toBeCloseTo(
      -94.5,
      9,
    );
  });
});
