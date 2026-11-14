/**
 * Theme "unicorn" (lint): the rules of eslint-plugin-unicorn that catch a bug.
 *
 * Its recommended config is not used: much of it is a matter of taste. Only the rules below are on.
 */
import { FILES } from '../load.mjs';

export const theme = 'unicorn';
export const packages = ['eslint-plugin-unicorn'];
const RULES = {
  // new Error() without a message says nothing about what went wrong.
  'unicorn/error-message': 'error',
  // ['1', '2'].map(parseInt) gives [1, NaN]: a callback receives more arguments than it seems.
  'unicorn/no-array-callback-reference': 'error',
  // Array(3).fill({}) puts the same object in every cell.
  'unicorn/no-array-fill-with-reference-type': 'error',
  // Promise.all([await a, await b]) waits one after the other.
  'unicorn/no-await-in-promise-methods': 'error',
  // A file with no code is a leftover.
  'unicorn/no-empty-file': 'error',
  // A GET or HEAD fetch with a body throws.
  'unicorn/no-invalid-fetch-options': 'error',
  // removeEventListener with a new function removes nothing.
  'unicorn/no-invalid-remove-event-listener': 'error',
  // Promise.all([one]) is one promise.
  'unicorn/no-single-promise-in-promise-methods': 'error',
  // An object with a then method is taken for a promise by await.
  'unicorn/no-thenable': 'error',
};

/**
 * @param {Record<string, any>} loaded The packages of the theme.
 * @returns {object[]} The configs of the theme.
 */
export function configs(loaded) {
  return [
    {
      name: 'lint/unicorn',
      files: FILES.scripts,
      plugins: { unicorn: loaded['eslint-plugin-unicorn'] },
      rules: RULES,
    },
  ];
}
