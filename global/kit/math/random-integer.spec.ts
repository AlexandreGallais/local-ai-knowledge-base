import {
  describe,
  expect,
  it,
} from 'vitest';

import { randomInteger } from './random-integer.ts';

describe('randomInteger', () => {
  it('randomInteger(0, 1, 6)', () => {
    const result = randomInteger(
      0,
      1,
      6,
    );

    expect(result).toBe(1);
  });

  it('randomInteger(0.5, 1, 6)', () => {
    const result = randomInteger(
      0.5,
      1,
      6,
    );

    expect(result).toBe(4);
  });

  it('randomInteger(0.999_999, 1, 6)', () => {
    const result = randomInteger(
      0.999_999,
      1,
      6,
    );

    expect(result).toBe(6);
  });
});
