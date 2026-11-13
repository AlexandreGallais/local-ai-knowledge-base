import {
  describe,
  expect,
  it,
} from 'vitest';

import { identityMatrix } from './identity-matrix.ts';

// Rounds every number to 9 decimals, as the values of the research report are.
function rounded(value: unknown): unknown {
  return JSON.parse(JSON.stringify(
    value,
    (
      _key,
      item: unknown,
    ) => typeof item === 'number' ? Number(item.toFixed(9)) + 0 : item,
  ));
}

describe('identityMatrix', () => {
  it('identityMatrix()', () => {
    const result = identityMatrix();

    expect(rounded(result)).toEqual([
      1,
      0,
      0,
      1,
      0,
      0,
    ]);
  });
});
