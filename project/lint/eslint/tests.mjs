/**
 * Theme "tests" (lint): tests that check something.
 *
 * The recommended config of @vitest/eslint-plugin (a test with no assertion, a focused or disabled
 * test, an expect in the wrong place...), and the rules below. It applies to *.spec.ts and
 * *.test.ts.
 */
import { FILES } from '../load.mjs';

export const theme = 'tests';
export const packages = ['@vitest/eslint-plugin'];
const RULES = {
  // An if in a test hides the case that is not run.
  'vitest/no-conditional-in-test': 'error',
  // Two beforeEach in one describe: the order is a trap.
  'vitest/no-duplicate-hooks': 'error',
  // A test returns nothing; a promise is awaited.
  'vitest/no-test-return-statement': 'error',
  // toThrow() without a message passes on any error.
  'vitest/require-to-throw-message': 'error',
};

/**
 * @param {Record<string, any>} loaded The packages of the theme.
 * @returns {object[]} The configs of the theme.
 */
export function configs(loaded) {
  return [
    {
      name: 'lint/tests',
      files: FILES.tests,
      extends: [loaded['@vitest/eslint-plugin'].configs.recommended],
      rules: RULES,
    },
  ];
}
