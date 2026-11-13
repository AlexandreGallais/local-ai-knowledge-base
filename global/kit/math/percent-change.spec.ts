import {
  describe,
  expect,
  it,
} from 'vitest';

import { percentChange } from './percent-change.ts';

describe('percentChange', () => {
  it('percentChange(50, 75)', () => {
    const result = percentChange(
      50,
      75,
    );

    expect(result).toBe(50);
  });

  it('percentChange(80, 60)', () => {
    const result = percentChange(
      80,
      60,
    );

    expect(result).toBe(-25);
  });

  it('percentChange(-50, -25)', () => {
    const result = percentChange(
      -50,
      -25,
    );

    expect(result).toBe(50);
  });
});
