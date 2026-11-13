import {
  describe,
  expect,
  it,
} from 'vitest';

import { applyHysteresis } from './apply-hysteresis.ts';

describe('applyHysteresis', () => {
  it('applyHysteresis(false, 60, { activateAt: 60, deactivateAt: 59 })', () => {
    const result = applyHysteresis(
      false,
      60,
      {
        activateAt: 60,
        deactivateAt: 59,
      },
    );

    expect(result).toBe(true);
  });

  it('applyHysteresis(true, 59.5, { activateAt: 60, deactivateAt: 59 })', () => {
    const result = applyHysteresis(
      true,
      59.5,
      {
        activateAt: 60,
        deactivateAt: 59,
      },
    );

    expect(result).toBe(true);
  });

  it('applyHysteresis(true, 59, { activateAt: 60, deactivateAt: 59 })', () => {
    const result = applyHysteresis(
      true,
      59,
      {
        activateAt: 60,
        deactivateAt: 59,
      },
    );

    expect(result).toBe(false);
  });

  it('applyHysteresis(false, 10, { activateAt: 10, deactivateAt: 11 })', () => {
    const result = applyHysteresis(
      false,
      10,
      {
        activateAt: 10,
        deactivateAt: 11,
      },
    );

    expect(result).toBe(true);
  });
});
