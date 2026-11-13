import {
  describe,
  expect,
  it,
} from 'vitest';
import { lerp } from './lerp.ts';

describe('proof of t01', () => {
  it('interpolates and extrapolates', () => {
    expect(lerp(10, 20, 0.25)).toBeCloseTo(12.5, 12);
    expect(lerp(0, 10, 1.5)).toBeCloseTo(15, 12);
    expect(lerp(-4, 4, 0.5)).toBeCloseTo(0, 12);
  });
});
