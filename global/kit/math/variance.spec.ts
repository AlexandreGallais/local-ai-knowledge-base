import {
  describe,
  expect,
  it,
} from 'vitest';

import { variance } from './variance.ts';

describe('variance', () => {
  it('variance([4, 7, 13, 16], \'sample\')', () => {
    const result = variance(
      [
        4,
        7,
        13,
        16,
      ],
      'sample',
    );

    expect(result).toBe(30);
  });

  it('variance([4, 7, 13, 16], \'population\')', () => {
    const result = variance(
      [
        4,
        7,
        13,
        16,
      ],
      'population',
    );

    expect(result).toBe(22.5);
  });

  it('variance([1e9 + 4, 1e9 + 7, 1e9 + 13, 1e9 + 16], \'sample\')', () => {
    const result = variance(
      [
        1e9 + 4,
        1e9 + 7,
        1e9 + 13,
        1e9 + 16,
      ],
      'sample',
    );

    expect(result).toBe(30);
  });
});
