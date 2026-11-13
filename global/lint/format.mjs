// The format pass (decision 0017): only rules that fix themselves, no type information, nothing
// reported to the AI. It runs on every file the AI writes. ESLint Stylistic and perfectionist for
// TypeScript, the layout rules of angular-eslint for templates, eslint-plugin-jsonc for JSON.
// Copied into a project as .agents/lint/; the packages come from the project's node_modules.
import stylistic from '@stylistic/eslint-plugin';
import jsonc from 'eslint-plugin-jsonc';
import perfectionist from 'eslint-plugin-perfectionist';
import tseslint from 'typescript-eslint';
import { local } from './local-plugin.mjs';

const ERROR = 'error';
const OFF = 'off';
// Two items or more: one per line. One item: on one line. Objects keep a space inside their
// braces; an object written on several lines stays so; generic arguments stay on one line.
const ONE_PER_LINE = {
  singleLine: {
    spacing: 'never',
    maxItems: 1,
  },
  multiLine: { minItems: 2 },
  overrides: {
    '{}': {
      singleLine: {
        spacing: 'always',
        maxItems: 1,
      },
      multiline: { minItems: 0 },
    },
    '<>': {
      singleLine: {
        spacing: 'never',
        maxItems: Number.POSITIVE_INFINITY,
      },
    },
  },
};
const SHARED_LAYOUT = stylistic.configs.customize({
  indent: 2,
  quotes: 'single',
  semi: true,
  jsx: false,
  braceStyle: '1tbs',
  arrowParens: true,
  commaDangle: 'always-multiline',
}).rules;
// One item per line once a list has two items. list-style splits a list written on one line; the
// two local rules split parameters, and the lists already written on several lines.
const LISTS = {
  '@stylistic/exp-list-style': [
    ERROR,
    ONE_PER_LINE,
  ],
  '@stylistic/array-bracket-newline': OFF,
  '@stylistic/array-element-newline': OFF,
  '@stylistic/object-curly-newline': OFF,
  '@stylistic/object-property-newline': OFF,
  '@stylistic/function-paren-newline': OFF,
  '@stylistic/function-call-argument-newline': OFF,
  'local/one-parameter-per-line': ERROR,
  'local/one-item-per-line': ERROR,
};
// Line breaks decided by the syntax, never by the width of a line. The rules of the shared config
// that cannot fix themselves are off: this pass only fixes.
const LINES = {
  '@stylistic/max-statements-per-line': OFF,
  '@stylistic/no-mixed-operators': OFF,
  '@stylistic/no-mixed-spaces-and-tabs': OFF,
  '@stylistic/no-tabs': OFF,
  '@stylistic/brace-style': [
    ERROR,
    '1tbs',
    { allowSingleLine: false },
  ],
  '@stylistic/multiline-ternary': [
    ERROR,
    'always-multiline',
  ],
  '@stylistic/operator-linebreak': [
    ERROR,
    'before',
  ],
  '@stylistic/newline-per-chained-call': [
    ERROR,
    { ignoreChainWithDepth: 2 },
  ],
  '@stylistic/quote-props': [
    ERROR,
    'as-needed',
  ],
  'curly': [
    ERROR,
    'all',
  ],
};
// Blank lines. Between imports: perfectionist/sort-imports.
const BLANKS = {
  '@stylistic/no-multiple-empty-lines': [
    ERROR,
    {
      max: 1,
      maxBOF: 0,
      maxEOF: 0,
    },
  ],
  '@stylistic/padded-blocks': [
    ERROR,
    'never',
  ],
  '@stylistic/lines-between-class-members': [
    ERROR,
    'always',
  ],
  '@stylistic/padding-line-between-statements': [
    ERROR,
    {
      blankLine: 'always',
      prev: '*',
      next: 'return',
    },
    {
      blankLine: 'always',
      prev: [
        'const',
        'let',
      ],
      next: '*',
    },
    {
      blankLine: 'any',
      prev: [
        'const',
        'let',
      ],
      next: [
        'const',
        'let',
      ],
    },
    {
      blankLine: 'always',
      prev: '*',
      next: [
        'function',
        'class',
        'export',
      ],
    },
    {
      blankLine: 'any',
      prev: 'export',
      next: 'export',
    },
    {
      blankLine: 'always',
      prev: [
        'function',
        'class',
        'block-like',
      ],
      next: '*',
    },
  ],
  '@stylistic/eol-last': [
    ERROR,
    'always',
  ],
  '@stylistic/linebreak-style': [
    ERROR,
    'unix',
  ],
  '@stylistic/no-trailing-spaces': ERROR,
};
// Sort everything. The blank lines between class members belong to Stylistic.
const SORTING = {
  ...perfectionist.configs['recommended-natural'].rules,
  'perfectionist/sort-classes': [
    ERROR,
    {
      type: 'natural',
      newlinesBetween: 'ignore',
    },
  ],
  'perfectionist/sort-imports': [
    ERROR,
    {
      type: 'natural',
      newlinesBetween: 1,
      newlinesInside: 0,
    },
  ],
};

function typescriptFormat(copyright) {
  return {
    name: 'format/typescript',
    files: [
      '**/*.ts',
      '**/*.mts',
    ],
    languageOptions: { parser: tseslint.parser },
    linterOptions: { reportUnusedDisableDirectives: OFF },
    plugins: {
      '@stylistic': stylistic,
      perfectionist,
      local,
    },
    rules: {
      ...SHARED_LAYOUT,
      ...LISTS,
      ...LINES,
      ...BLANKS,
      ...SORTING,
      ...copyright === undefined ? {} : {
        'local/insert-copyright': [
          ERROR,
          copyright,
        ],
      },
    },
  };
}

async function angularFormat() {
  const { default: angular } = await import('angular-eslint');

  return [
    {
      name: 'format/angular-typescript',
      files: ['**/*.ts'],
      plugins: { '@angular-eslint': angular.tsPlugin },
      rules: { '@angular-eslint/consistent-component-styles': ERROR },
    },
    {
      name: 'format/angular-template',
      files: ['**/*.html'],
      languageOptions: { parser: angular.templateParser },
      plugins: { '@angular-eslint/template': angular.templatePlugin },
      rules: {
        '@angular-eslint/template/attributes-order': [
          ERROR,
          { alphabetical: true },
        ],
        '@angular-eslint/template/prefer-self-closing-tags': ERROR,
        '@angular-eslint/template/prefer-static-string-properties': ERROR,
        '@angular-eslint/template/prefer-at-empty': ERROR,
        '@angular-eslint/template/prefer-at-else': ERROR,
        '@angular-eslint/template/prefer-contextual-for-variables': ERROR,
      },
    },
  ];
}

const jsonFormat = [
  ...jsonc.configs['flat/base'],
  {
    name: 'format/json',
    files: ['**/*.json'],
    plugins: { '@stylistic': stylistic },
    rules: {
      '@stylistic/no-trailing-spaces': ERROR,
      'jsonc/indent': [
        ERROR,
        2,
      ],
      'jsonc/key-spacing': ERROR,
      'jsonc/comma-dangle': [
        ERROR,
        'never',
      ],
      'jsonc/object-curly-newline': [
        ERROR,
        { minProperties: 1 },
      ],
      'jsonc/object-property-newline': ERROR,
      'jsonc/array-bracket-newline': [
        ERROR,
        { minItems: 2 },
      ],
      'jsonc/array-element-newline': [
        ERROR,
        { minItems: 2 },
      ],
    },
  },
];

/**
 * The format config of a project.
 * @param {{ angular: boolean, copyright?: { pattern: string, text: string } }} options
 */
export async function formatConfig(options) {
  return [
    {
      ignores: [
        'dist/',
        'coverage/',
        '.angular/',
        'node_modules/',
        '.agents/',
        '**/package-lock.json',
      ],
    },
    typescriptFormat(options.copyright),
    ...options.angular ? await angularFormat() : [],
    ...jsonFormat,
  ];
}
