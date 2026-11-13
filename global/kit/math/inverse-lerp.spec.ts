import {
  describe,
  expect,
  it,
} from 'vitest';

import { inverseLerp } from './inverse-lerp.ts';

describe('inverseLerp', () => {
  it('inverseLerp(10, 20, 12.5)', () => {
    const result = inverseLerp(
      10,
      20,
      12.5,
    );

    expect(result).toBe(0.25);
  });

  it('inverseLerp(20, 10, 12.5)', () => {
    const result = inverseLerp(
      20,
      10,
      12.5,
    );

    expect(result).toBe(0.75);
  });
});
