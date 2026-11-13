import {
  describe,
  expect,
  it,
} from 'vitest';

import { stackSizes } from './stack-sizes.ts';

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

describe('stackSizes', () => {
  it('stackSizes([20,40,10],100,8)', () => {
    const result = stackSizes(
      [
        20,
        40,
        10,
      ],
      100,
      8,
    );

    expect(rounded(result)).toEqual([
      100,
      128,
      176,
    ]);
  });
});
