import {
  describe,
  expect,
  it,
} from 'vitest';

import { roundToStep } from './round-to-step.ts';

describe('roundToStep', () => {
  it('roundToStep(0.3, 0.1)', () => {
    const result = roundToStep(
      0.3,
      0.1,
    );

    expect(result).toBe(0.3);
  });

  it('roundToStep(7.3, 0.5)', () => {
    const result = roundToStep(
      7.3,
      0.5,
    );

    expect(result).toBe(7.5);
  });

  it('roundToStep(-7.3, 0.5)', () => {
    const result = roundToStep(
      -7.3,
      0.5,
    );

    expect(result).toBe(-7.5);
  });

  it('roundToStep(0.74, 0.05)', () => {
    const result = roundToStep(
      0.74,
      0.05,
    );

    expect(result).toBe(0.75);
  });
});
