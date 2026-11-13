import {
  describe,
  expect,
  it,
} from 'vitest';

import { modulo } from './modulo.ts';

describe('modulo', () => {
  it('modulo(-1, 360)', () => {
    const result = modulo(
      -1,
      360,
    );

    expect(result).toBe(359);
  });

  it('modulo(-13, 5)', () => {
    const result = modulo(
      -13,
      5,
    );

    expect(result).toBe(2);
  });

  it('modulo(13, -5)', () => {
    const result = modulo(
      13,
      -5,
    );

    expect(result).toBe(-2);
  });

  it('modulo(5.5, 2)', () => {
    const result = modulo(
      5.5,
      2,
    );

    expect(result).toBe(1.5);
  });
});
