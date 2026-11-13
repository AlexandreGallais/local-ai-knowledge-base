import {
  describe,
  expect,
  it,
} from 'vitest';

import { parseDecimal } from './parse-decimal.ts';

describe('parseDecimal', () => {
  it('parseDecimal(\'3.14\')', () => {
    const result = parseDecimal('3.14');

    expect(result).toBe(3.14);
  });

  it('parseDecimal(\' 42 \')', () => {
    const result = parseDecimal(' 42 ');

    expect(result).toBe(42);
  });

  it('parseDecimal(\'\')', () => {
    const result = parseDecimal('');

    expect(result).toBeNaN();
  });

  it('parseDecimal(\'1,5\', \',\')', () => {
    const result = parseDecimal(
      '1,5',
      ',',
    );

    expect(result).toBe(1.5);
  });

  it('parseDecimal(\'12abc\')', () => {
    const result = parseDecimal('12abc');

    expect(result).toBeNaN();
  });

  it('parseDecimal(\'0x10\')', () => {
    const result = parseDecimal('0x10');

    expect(result).toBeNaN();
  });
});
