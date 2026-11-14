/**
 * Theme "regexp" (lint): regular expressions that are wrong, slow or misleading.
 *
 * The recommended config of eslint-plugin-regexp: useless or overlapping parts, backtracking that can
 * hang, character classes that do not match what they seem to.
 */
import { FILES } from '../load.mjs';

export const theme = 'regexp';
export const packages = ['eslint-plugin-regexp'];

/**
 * @param {Record<string, any>} loaded The packages of the theme.
 * @returns {object[]} The configs of the theme.
 */
export function configs(loaded) {
  return [
    {
      name: 'lint/regexp',
      files: FILES.scripts,
      extends: [loaded['eslint-plugin-regexp'].configs['flat/recommended']],
    },
  ];
}
