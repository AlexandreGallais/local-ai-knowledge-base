import {
  describe,
  expect,
  it,
} from 'vitest';

import { lerp } from './lerp.ts';

describe('lerp', () => {
  it('lerp(10, 20, 0.25)', () => {
    const result = lerp(
      10,
      20,
      0.25,
    );

    expect(result).toBe(12.5);
  });

  it('lerp(10, 20, 1)', () => {
    const result = lerp(
      10,
      20,
      1,
    );

    expect(result).toBe(20);
  });

  it('lerp(10, 20, 1.5)', () => {
    const result = lerp(
      10,
      20,
      1.5,
    );

    expect(result).toBe(25);
  });

  it('lerp(20, 620, 0.8)', () => {
    const result = lerp(
      20,
      620,
      0.8,
    );

    expect(result).toBe(500);
  });
});
