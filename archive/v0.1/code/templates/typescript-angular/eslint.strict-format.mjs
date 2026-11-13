// @ts-check
// Strict formatting rules: order, braces and blank lines that Prettier leaves alone.
// Every rule here is compatible with Prettier. Loaded unless STRICT_FORMAT=0.
import stylistic from '@stylistic/eslint-plugin';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

/** @type {import('eslint').Linter.Config[]} */
export const strictFormat = [
  {
    files: ['**/*.ts'],
    plugins: {
      '@stylistic': stylistic,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // Fixed by "eslint --fix".
      curly: [
        'error',
        'all',
      ],
      'no-else-return': 'error',
      'no-lonely-if': 'error',
      'no-unneeded-ternary': 'error',
      'no-useless-rename': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
      '@angular-eslint/sort-keys-in-type-decorator': 'error',
      '@stylistic/lines-between-class-members': [
        'error',
        'always',
        { exceptAfterSingleLine: true },
      ],
      '@stylistic/padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: 'return',
        },
      ],
      '@stylistic/spaced-comment': [
        'error',
        'always',
      ],
      // Not fixed by the tool: write the members in this order.
      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: [
            'field',
            'constructor',
            'method',
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    rules: {
      // Fixed by "eslint --fix".
      '@angular-eslint/template/attributes-order': 'error',
      '@angular-eslint/template/prefer-self-closing-tags': 'error',
    },
  },
];
