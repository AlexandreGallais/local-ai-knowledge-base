import {
  describe,
  expect,
  it,
} from 'vitest';

import { isCloseTo } from './is-close-to.ts';

describe('isCloseTo', () => {
  it('isCloseTo(0.1 + 0.2, 0.3, { absolute: 1e-12 })', () => {
    const result = isCloseTo(
      0.1 + 0.2,
      0.3,
      { absolute: 1e-12 },
    );

    expect(result).toBe(true);
  });

  it('isCloseTo(1000.1 + 1000.2, 2000.3, { absolute: Number.EPSILON })', () => {
    const result = isCloseTo(
      1000.1 + 1000.2,
      2000.3,
      { absolute: Number.EPSILON },
    );

    expect(result).toBe(false);
  });

  it('isCloseTo(1e10 + 1, 1e10, { absolute: 0, relative: 1e-9 })', () => {
    const result = isCloseTo(
      1e10 + 1,
      1e10,
      {
        absolute: 0,
        relative: 1e-9,
      },
    );

    expect(result).toBe(true);
  });

  it('isCloseTo(Number.NaN, Number.NaN, { absolute: 1 })', () => {
    const result = isCloseTo(
      Number.NaN,
      Number.NaN,
      { absolute: 1 },
    );

    expect(result).toBe(false);
  });

  it('isCloseTo(Infinity, Infinity, { absolute: 0 })', () => {
    const result = isCloseTo(
      Infinity,
      Infinity,
      { absolute: 0 },
    );

    expect(result).toBe(true);
  });
});
