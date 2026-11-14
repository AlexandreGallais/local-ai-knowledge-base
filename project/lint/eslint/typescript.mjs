/**
 * Theme "typescript" (lint): the strict config of typescript-eslint, with the types.
 *
 * strictTypeChecked reads the types of the program through tsconfig.json (projectService): it
 * catches promises left floating, unsafe any, conditions that are always true, wrong template
 * expressions and more. A few typed rules are added below. JavaScript files get no typed rule.
 */
import { FILES } from '../load.mjs';

export const theme = 'typescript';
export const packages = ['typescript-eslint'];
/** Typed rules that catch a bug, beyond strictTypeChecked. */
const RULES = {
  // An `as` that the types do not prove hides a wrong type.
  '@typescript-eslint/no-unsafe-type-assertion': 'error',
  // A variable or parameter named _ or _something is unused on purpose.
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    },
  ],
  // [10, 9, 1].sort() gives [1, 10, 9]: numbers need a compare function.
  '@typescript-eslint/require-array-sort-compare': ['error', { ignoreStringArrays: true }],
  // A function that returns a value where a void function is expected loses it.
  '@typescript-eslint/strict-void-return': 'error',
  // A switch on a union must handle every member, so that a new member is not forgotten.
  '@typescript-eslint/switch-exhaustiveness-check': 'error',
};

/**
 * @param {Record<string, any>} loaded The packages of the theme.
 * @returns {object[]} The configs of the theme.
 */
export function configs(loaded) {
  return [
    {
      name: 'lint/typescript',
      files: FILES.typescript,
      extends: [loaded['typescript-eslint'].configs.strictTypeChecked],
      languageOptions: { parserOptions: { projectService: true } },
      rules: RULES,
    },
  ];
}
