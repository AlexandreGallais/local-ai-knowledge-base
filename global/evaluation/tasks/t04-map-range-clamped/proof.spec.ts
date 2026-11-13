import {
  describe,
  expect,
  it,
} from 'vitest';
import { mapRangeClamped } from './map-range-clamped.ts';

describe('proof of t04', () => {
  it('maps and clamps, also on a reversed output range', () => {
    expect(mapRangeClamped(
      50,
      {
        start: 0,
        end: 100,
      },
      {
        start: 0,
        end: 200,
      },
    )).toBeCloseTo(100, 12);
    expect(mapRangeClamped(
      150,
      {
        start: 0,
        end: 100,
      },
      {
        start: 0,
        end: 200,
      },
    )).toBeCloseTo(200, 12);
    expect(mapRangeClamped(
      25,
      {
        start: 0,
        end: 100,
      },
      {
        start: 200,
        end: 0,
      },
    )).toBeCloseTo(150, 12);
  });
  it('refuses an empty input range', () => {
    expect(() => mapRangeClamped(
      5,
      {
        start: 5,
        end: 5,
      },
      {
        start: 0,
        end: 1,
      },
    )).toThrow(RangeError);
  });
});
