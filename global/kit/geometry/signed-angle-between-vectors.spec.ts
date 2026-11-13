import {
  describe,
  expect,
  it,
} from 'vitest';

import { signedAngleBetweenVectors } from './signed-angle-between-vectors.ts';

describe('signedAngleBetweenVectors', () => {
  it('signedAngleBetweenVectors({x:1,y:0},{x:0,y:1})', () => {
    const result = signedAngleBetweenVectors(
      {
        x: 1,
        y: 0,
      },
      {
        x: 0,
        y: 1,
      },
    );

    expect(result).toBeCloseTo(
      90,
      8,
    );
  });

  it('signedAngleBetweenVectors({x:0,y:1},{x:1,y:0})', () => {
    const result = signedAngleBetweenVectors(
      {
        x: 0,
        y: 1,
      },
      {
        x: 1,
        y: 0,
      },
    );

    expect(result).toBeCloseTo(
      -90,
      8,
    );
  });
});
