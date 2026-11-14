// The format pass (decision 0017): only rules that fix themselves, no type information, nothing
// reported to the AI. It runs on every file the AI writes. ESLint Stylistic and perfectionist for
// TypeScript, the layout rules of angular-eslint for templates, eslint-plugin-jsonc for JSON.
// Copied into a project as .agents/lint/; the packages come from the project's node_modules.
import tseslint from 'typescript-eslint';
import { local } from './local-plugin.mjs';
import {
  optional,
  prune,
} from './optional.mjs';

// Optional plugins: when one is missing, its rules are left out (optional.mjs).
const STYLISTIC = '@stylistic';
const stylistic = await optional('@stylistic/eslint-plugin', [STYLISTIC]);
const jsonc = await optional('eslint-plugin-jsonc', ['jsonc']);
const perfectionist = await optional('eslint-plugin-perfectionist', ['perfectionist']);

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
const SHARED_LAYOUT = stylistic?.configs.customize({
  indent: 2,
  quotes: 'single',
  semi: true,
  jsx: false,
  braceStyle: '1tbs',
  arrowParens: true,
  commaDangle: 'always-multiline',
})?.rules;
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
  ...perfectionist?.configs['recommended-natural'].rules,
  // Fields set by inject() come first, as @angular-eslint/inject-at-top asks of the lint pass; the
  // other members keep the default order of the plugin.
  'perfectionist/sort-classes': [
    ERROR,
    {
      type: 'natural',
      newlinesBetween: 'ignore',
      customGroups: [
        {
          groupName: 'injected-property',
          selector: 'property',
          elementValuePattern: '^inject\\(',
        },
      ],
      groups: [
        'injected-property',
        'index-signature',
        ['static-property', 'static-accessor-property'],
        ['static-get-method', 'static-set-method'],
        ['protected-static-property', 'protected-static-accessor-property'],
        ['protected-static-get-method', 'protected-static-set-method'],
        ['private-static-property', 'private-static-accessor-property'],
        ['private-static-get-method', 'private-static-set-method'],
        'static-block',
        ['property', 'accessor-property'],
        ['get-method', 'set-method'],
        ['protected-property', 'protected-accessor-property'],
        ['protected-get-method', 'protected-set-method'],
        ['private-property', 'private-accessor-property'],
        ['private-get-method', 'private-set-method'],
        'constructor',
        ['static-method', 'static-function-property'],
        ['protected-static-method', 'protected-static-function-property'],
        ['private-static-method', 'private-static-function-property'],
        ['method', 'function-property'],
        ['protected-method', 'protected-function-property'],
        ['private-method', 'private-function-property'],
        'unknown',
      ],
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
      [STYLISTIC]: stylistic,
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
  const angular = await optional('angular-eslint', [
    '@angular-eslint',
    '@angular-eslint/template',
  ]);

  if (angular === undefined) {
    return [];
  }
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

// Without eslint-plugin-jsonc, JSON files are left as they are.
const jsonFormat = jsonc === undefined ? [] : [
  ...jsonc.configs['flat/base'],
  {
    name: 'format/json',
    files: ['**/*.json'],
    plugins: { [STYLISTIC]: stylistic },
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
  return prune([
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
  ]);
}
