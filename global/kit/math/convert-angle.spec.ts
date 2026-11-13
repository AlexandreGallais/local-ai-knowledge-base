import {
  describe,
  expect,
  it,
} from 'vitest';

import { convertAngle } from './convert-angle.ts';

describe('convertAngle', () => {
  it('convertAngle(180, \'deg\', \'rad\')', () => {
    const result = convertAngle(
      180,
      'deg',
      'rad',
    );

    expect(result).toBe(Math.PI);
  });

  it('convertAngle(0.25, \'turn\', \'deg\')', () => {
    const result = convertAngle(
      0.25,
      'turn',
      'deg',
    );

    expect(result).toBe(90);
  });
});
