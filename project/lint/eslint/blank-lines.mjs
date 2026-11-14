/**
 * Theme "blankLines" (format): blank lines that Prettier keeps but never adds.
 *
 * A blank line before return, after a block of declarations, before and after a function, a class
 * or a block statement, and between class members. Prettier already removes the extra ones.
 */
import { FILES } from '../load.mjs';

export const theme = 'blankLines';
export const packages = ['@stylistic/eslint-plugin'];

/**
 * @param {Record<string, any>} loaded The packages of the theme.
 * @returns {object[]} The configs of the theme.
 */
export function configs(loaded) {
  return [
    {
      name: 'format/blank-lines',
      files: FILES.scripts,
      plugins: { '@stylistic': loaded['@stylistic/eslint-plugin'] },
      rules: {
        // Between the members of a class, except two fields that follow each other.
        '@stylistic/lines-between-class-members': [
          'error',
          'always',
          { exceptAfterSingleLine: true },
        ],
        '@stylistic/padding-line-between-statements': [
          'error',
          // Before return.
          {
            blankLine: 'always',
            prev: '*',
            next: 'return',
          },
          // After a block of declarations; declarations that follow each other stay together.
          {
            blankLine: 'always',
            prev: ['const', 'let'],
            next: '*',
          },
          {
            blankLine: 'any',
            prev: ['const', 'let'],
            next: ['const', 'let'],
          },
          // Around functions, classes and block statements.
          {
            blankLine: 'always',
            prev: '*',
            next: ['function', 'class'],
          },
          {
            blankLine: 'always',
            prev: ['function', 'class', 'block-like'],
            next: '*',
          },
        ],
      },
    },
  ];
}
