import {
  describe,
  expect,
  it,
} from 'vitest';

import { applyDeadband } from './apply-deadband.ts';

describe('applyDeadband', () => {
  it('applyDeadband(10, 10.4, 0.5)', () => {
    const result = applyDeadband(
      10,
      10.4,
      0.5,
    );

    expect(result).toBe(10);
  });

  it('applyDeadband(10, 10.5, 0.5)', () => {
    const result = applyDeadband(
      10,
      10.5,
      0.5,
    );

    expect(result).toBe(10.5);
  });

  it('applyDeadband(10, 9.4, 0.5)', () => {
    const result = applyDeadband(
      10,
      9.4,
      0.5,
    );

    expect(result).toBe(9.4);
  });
});
