import {
  describe,
  expect,
  it,
} from 'vitest';

import { matrixToString } from './matrix-to-string.ts';
import { rotationMatrix } from './rotation-matrix.ts';

describe('matrixToString', () => {
  it('matrixToString(rotationMatrix(90))', () => {
    const result = matrixToString(rotationMatrix(90));

    expect(result).toBe('matrix(0 1 -1 0 0 0)');
  });
});
