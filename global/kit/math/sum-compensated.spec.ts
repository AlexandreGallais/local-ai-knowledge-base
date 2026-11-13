import {
  describe,
  expect,
  it,
} from 'vitest';

import { sumCompensated } from './sum-compensated.ts';

describe('sumCompensated', () => {
  it('sumCompensated(Array.from({ length: 10 }, () => 0.1))', () => {
    const result = sumCompensated(Array.from(
      { length: 10 },
      () => 0.1,
    ));

    expect(result).toBe(1);
  });

  it('sumCompensated([])', () => {
    const result = sumCompensated([]);

    expect(result).toBe(0);
  });
});
