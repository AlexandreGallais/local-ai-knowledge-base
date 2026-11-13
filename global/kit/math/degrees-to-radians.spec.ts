import {
  describe,
  expect,
  it,
} from 'vitest';

import { degreesToRadians } from './degrees-to-radians.ts';

describe('degreesToRadians', () => {
  it('degreesToRadians(180)', () => {
    const result = degreesToRadians(180);

    expect(result).toBe(Math.PI);
  });

  it('degreesToRadians(90)', () => {
    const result = degreesToRadians(90);

    expect(result).toBe(Math.PI / 2);
  });
});
