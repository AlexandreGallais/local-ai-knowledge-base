import {
  describe,
  expect,
  it,
} from 'vitest';

import { translationMatrix } from './translation-matrix.ts';

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

describe('translationMatrix', () => {
  it('translationMatrix(30, 40)', () => {
    const result = translationMatrix(
      30,
      40,
    );

    expect(rounded(result)).toEqual([
      1,
      0,
      0,
      1,
      30,
      40,
    ]);
  });
});
