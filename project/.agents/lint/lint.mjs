// The lint pass (decision 0017): no layout rule, only what the format pass cannot fix, one config per
// kind of file. One config for every project: it lints more or less according to what the project
// installs. Classes for objects that live, functions for utilities: no rule forbids either.
// The packages come from the project's node_modules.
import {
  defineConfig,
  globalIgnores,
} from 'eslint/config';
import tseslint from 'typescript-eslint';
import { local } from './local-plugin.mjs';
import {
  optional,
  prune,
} from './optional.mjs';

// Optional plugins: when one is missing, its rules are left out (optional.mjs).
const js = await optional('@eslint/js', []);
const vitest = await optional('@vitest/eslint-plugin', ['vitest']);
const importLite = await optional('eslint-plugin-import-lite', ['import-lite']);
const regexp = await optional('eslint-plugin-regexp', ['regexp']);
const unicorn = await optional('eslint-plugin-unicorn', ['unicorn']);
const ERROR = 'error';
const OFF = 'off';
const ALL_TS = '**/*.ts';
const SOURCES = 'src/**/*.ts';
const TEST_FILES = [
  '**/*.spec.ts',
  '**/*.test.ts',
];
const ONE_FUNCTION = 'local/single-exported-function';
const NO_DEFAULT_EXPORT = 'import-lite/no-default-export';
const REQUIRE_JSDOC = 'jsdoc/require-jsdoc';
const FUNCTION_LINES = 'max-lines-per-function';
const SIGNALS = 'Use @ngrx/signals.';
const linterOptions = {
  noInlineConfig: true,
  reportUnusedDisableDirectives: OFF,
};
/**
 * Size and complexity limits, one set per kind of file. The size of a function is counted in
 * statements: the format pass puts each argument of a long call on its own line, so lines only
 * catch the extremes.
 */
const LIMITS = {
  general: {
    file: 200,
    fn: 50,
    statements: 15,
    complexity: 8,
    depth: 3,
    params: 3,
  },
  angularClass: {
    file: 250,
    fn: 50,
    statements: 15,
    complexity: 8,
    depth: 3,
    params: 3,
  },
  storeFeature: {
    file: 200,
    fn: 80,
    statements: 20,
    complexity: 8,
    depth: 3,
    params: 3,
  },
};
const lines = (max) => [
  ERROR,
  {
    max,
    skipBlankLines: true,
    skipComments: true,
  },
];
const atMost = (max) => [
  ERROR,
  { max },
];

function limitRules(limit) {
  return {
    'max-lines': lines(limit.file),
    [FUNCTION_LINES]: lines(limit.fn),
    'max-statements': atMost(limit.statements),
    'complexity': atMost(limit.complexity),
    'max-depth': atMost(limit.depth),
    'max-params': atMost(limit.params),
    'max-nested-callbacks': atMost(3),
    'max-classes-per-file': [
      ERROR,
      1,
    ],
  };
}

const errors = (names) => Object.fromEntries(names.map((name) => [
  name,
  ERROR,
]));
// ---- Every TypeScript file ---------------------------------------------------------------------
const TYPESCRIPT_RULES = {
  '@typescript-eslint/strict-boolean-expressions': [
    ERROR,
    {
      allowString: false,
      allowNumber: false,
      allowNullableObject: false,
    },
  ],
  '@typescript-eslint/switch-exhaustiveness-check': [
    ERROR,
    {
      allowDefaultCaseForExhaustiveSwitch: false,
      requireDefaultForNonUnion: true,
    },
  ],
  // The format pass sorts the functions of a module by name: a function declaration may then come
  // after its first call. Function declarations are hoisted; everything else must come first.
  '@typescript-eslint/no-use-before-define': [
    ERROR,
    { functions: false },
  ],
  '@typescript-eslint/no-explicit-any': [
    ERROR,
    {
      fixToUnknown: false,
      ignoreRestArgs: false,
    },
  ],
  ...errors([
    '@typescript-eslint/no-unsafe-type-assertion',
    '@typescript-eslint/strict-void-return',
    '@typescript-eslint/require-array-sort-compare',
    '@typescript-eslint/explicit-function-return-type',
    '@typescript-eslint/explicit-module-boundary-types',
    '@typescript-eslint/no-shadow',
    '@typescript-eslint/default-param-last',
    '@typescript-eslint/consistent-return',
  ]),
};
const CORE_RULES = {
  'eqeqeq': [
    ERROR,
    'always',
  ],
  'no-param-reassign': [
    ERROR,
    { props: true },
  ],
  'no-return-assign': [
    ERROR,
    'always',
  ],
  'no-warning-comments': [
    ERROR,
    {
      terms: [
        'todo',
        'fixme',
        'xxx',
      ],
    },
  ],
  ...errors([
    'no-console',
    'no-alert',
    'no-eval',
    'no-new-func',
    'no-await-in-loop',
    'no-promise-executor-return',
    'no-constructor-return',
    'no-self-compare',
    'no-template-curly-in-string',
    'no-unmodified-loop-condition',
    'no-unreachable-loop',
    'array-callback-return',
    'default-case-last',
    'guard-for-in',
    'no-bitwise',
    'no-multi-assign',
    'no-sequences',
    'no-nested-ternary',
  ]),
};
const PLUGIN_RULES = {
  'unicorn/filename-case': [
    ERROR,
    { case: 'kebabCase' },
  ],
  ...errors([
    'unicorn/error-message',
    'unicorn/no-array-callback-reference',
    'unicorn/consistent-function-scoping',
    'unicorn/no-accessor-recursion',
    'unicorn/no-thenable',
    'unicorn/no-invalid-fetch-options',
    'unicorn/no-object-as-default-parameter',
    'unicorn/no-await-in-promise-methods',
    'unicorn/no-this-assignment',
    'unicorn/no-array-fill-with-reference-type',
    'unicorn/no-useless-recursion',
    'unicorn/no-loop-iterable-mutation',
    'unicorn/no-unused-builtin-method-return',
    'unicorn/max-nested-calls',
    'unicorn/no-empty-file',
  ]),
  ...errors([
    NO_DEFAULT_EXPORT,
    'import-lite/no-mutable-exports',
    'local/no-undeclared-import',
    'local/no-import-cycle',
    'local/no-enum',
  ]),
};
const typescriptBase = {
  name: 'lint/typescript',
  files: [ALL_TS],
  extends: [
    js?.configs.recommended,
    tseslint.configs.strictTypeChecked,
    regexp?.configs['flat/recommended'],
  ],
  plugins: {
    unicorn,
    'import-lite': importLite,
    local,
  },
  languageOptions: { parserOptions: { projectService: true } },
  linterOptions,
  rules: {
    ...limitRules(LIMITS.general),
    ...TYPESCRIPT_RULES,
    ...CORE_RULES,
    ...PLUGIN_RULES,
  },
};
// ---- Tests and tool configuration files --------------------------------------------------------
const tests = {
  name: 'lint/tests',
  files: TEST_FILES,
  extends: [vitest?.configs.recommended],
  rules: {
    'vitest/max-expects': [
      ERROR,
      { max: 5 },
    ],
    'vitest/max-nested-describe': [
      ERROR,
      { max: 2 },
    ],
    'max-lines': [
      ERROR,
      {
        max: 300,
        skipBlankLines: true,
        skipComments: true,
      },
    ],
    ...errors([
      'vitest/no-conditional-in-test',
      'vitest/require-top-level-describe',
      'vitest/prefer-hooks-in-order',
      'vitest/prefer-hooks-on-top',
      'vitest/no-duplicate-hooks',
      'vitest/require-to-throw-message',
      'vitest/no-test-return-statement',
    ]),
    ...Object.fromEntries([
      FUNCTION_LINES,
      'max-nested-callbacks',
      'max-statements',
      ONE_FUNCTION,
      'local/copyright-header',
      REQUIRE_JSDOC,
    ].map((name) => [
      name,
      OFF,
    ])),
  },
};
const toolConfigs = {
  name: 'lint/tool-configs',
  files: ['*.config.{ts,mts}'],
  extends: [tseslint.configs.disableTypeChecked],
  rules: {
    [NO_DEFAULT_EXPORT]: OFF,
    'max-lines': OFF,
    [FUNCTION_LINES]: OFF,
    'complexity': OFF,
  },
};
// Storybook asks for a default export (the config, the meta of a story file) and stories that are
// objects: the file rules of a library do not apply; the typed rules do.
const STORYBOOK_FILES = [
  '.storybook/*.ts',
  '**/*.stories.ts',
];
const storybook = {
  name: 'lint/storybook',
  files: STORYBOOK_FILES,
  rules: Object.fromEntries([
    NO_DEFAULT_EXPORT,
    ONE_FUNCTION,
    REQUIRE_JSDOC,
    FUNCTION_LINES,
  ].map((name) => [
    name,
    OFF,
  ])),
};
// ---- Angular, when the project depends on @angular/core ----------------------------------------
const BANNED_IMPORTS = {
  paths: [
    {
      name: '@ngrx/store',
      message: SIGNALS,
    },
    {
      name: '@ngrx/effects',
      message: SIGNALS,
    },
    {
      name: '@ngrx/component-store',
      message: SIGNALS,
    },
    {
      name: '@angular/common',
      importNames: [
        'CommonModule',
        'NgIf',
        'NgFor',
        'NgClass',
        'NgStyle',
        'NgSwitch',
      ],
      message: 'Use control flow blocks and class or style bindings.',
    },
    {
      name: '@angular/common/http',
      importNames: ['HttpClientModule'],
      message: 'Use provideHttpClient().',
    },
  ],
  patterns: [
    {
      group: [
        '@angular/material',
        '@angular/material/*',
        '@angular/cdk',
        '@angular/cdk/*',
      ],
      message: 'Write the component in the project: no Material, no CDK.',
    },
  ],
};
const ANGULAR_TS_RULES = errors([
  '@angular-eslint/prefer-output-emitter-ref',
  '@angular-eslint/inject-at-top',
  '@angular-eslint/no-async-lifecycle-method',
  '@angular-eslint/no-lifecycle-call',
  '@angular-eslint/no-implicit-take-until-destroyed',
  '@angular-eslint/computed-must-return',
  '@angular-eslint/reactive-context-must-read-signal',
  '@angular-eslint/no-uncalled-signals',
  '@angular-eslint/no-experimental',
  '@angular-eslint/no-developer-preview',
  '@angular-eslint/no-attribute-decorator',
  '@angular-eslint/no-forward-ref',
  '@angular-eslint/no-pipe-impure',
  '@angular-eslint/no-queries-metadata-property',
  '@angular-eslint/contextual-decorator',
  '@angular-eslint/relative-url-prefix',
  'local/no-redundant-standalone',
]);
const TEMPLATE_RULES = {
  '@angular-eslint/template/cyclomatic-complexity': [
    ERROR,
    { maxComplexity: 5 },
  ],
  '@angular-eslint/template/conditional-complexity': [
    ERROR,
    { maxComplexity: 3 },
  ],
  ...errors([
    '@angular-eslint/template/button-has-type',
    '@angular-eslint/template/no-positive-tabindex',
    '@angular-eslint/template/no-any',
    '@angular-eslint/template/no-non-null-assertion',
    '@angular-eslint/template/no-duplicate-attributes',
    '@angular-eslint/template/no-inline-styles',
    '@angular-eslint/template/no-empty-control-flow',
    '@angular-eslint/template/prefer-class-binding',
    '@angular-eslint/template/prefer-built-in-pipes',
    '@angular-eslint/template/require-switch-default',
    '@angular-eslint/template/use-track-by-function',
  ]),
};

function angularTypescript(angular, rxjsX, prefix) {
  return {
    name: 'lint/angular-typescript',
    files: [ALL_TS],
    extends: [
      angular.configs.tsRecommended,
      rxjsX?.configs.strict,
    ],
    rules: {
      ...limitRules(LIMITS.angularClass),
      ...ANGULAR_TS_RULES,
      '@angular-eslint/component-selector': [
        ERROR,
        {
          type: 'element',
          prefix,
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/directive-selector': [
        ERROR,
        {
          type: 'attribute',
          prefix,
          style: 'camelCase',
        },
      ],
      'no-restricted-imports': [
        ERROR,
        BANNED_IMPORTS,
      ],
    },
  };
}

function angularStores(ngrx) {
  return [
    {
      name: 'lint/angular-store',
      files: ['**/*.store.ts'],
      extends: [ngrx?.configs.signalsTypeChecked],
      rules: {
        'local/store-lists-features': ERROR,
        // A composed store is a short list; a small store in one file stops at 80 lines, then splits.
        'max-lines': [
          ERROR,
          {
            max: 80,
            skipBlankLines: true,
            skipComments: true,
          },
        ],
      },
    },
    {
      name: 'lint/angular-store-feature',
      files: ['**/*.feature.ts'],
      extends: [ngrx?.configs.signalsTypeChecked],
      // The type of a store feature is built by NgRx: never written by hand.
      rules: {
        ...limitRules(LIMITS.storeFeature),
        [ONE_FUNCTION]: ERROR,
        'local/store-lists-features': ERROR,
        // A feature with an input declares "<_>", as NgRx asks: a known TypeScript failure otherwise.
        '@typescript-eslint/no-unnecessary-type-parameters': OFF,
        '@typescript-eslint/no-unused-vars': [
          ERROR,
          { varsIgnorePattern: '^_$' },
        ],
        '@typescript-eslint/explicit-function-return-type': OFF,
        '@typescript-eslint/explicit-module-boundary-types': OFF,
      },
    },
  ];
}

async function angularLayers(prefix) {
  const angular = await optional('angular-eslint', [
    '@angular-eslint',
    '@angular-eslint/template',
  ]);
  const ngrx = await optional('@ngrx/eslint-plugin', ['@ngrx']);
  const rxjsX = await optional('eslint-plugin-rxjs-x', ['rxjs-x']);

  // Without angular-eslint, no Angular layer: its templates have no parser.
  if (angular === undefined) {
    return [];
  }
  return [
    angularTypescript(angular, rxjsX, prefix),
    {
      name: 'lint/angular-template',
      files: ['**/*.html'],
      extends: [
        angular.configs.templateRecommended,
        angular.configs.templateAccessibility,
      ],
      linterOptions,
      rules: TEMPLATE_RULES,
    },
    ...angularStores(ngrx),
  ];
}

// ---- JSDoc, when the project installs eslint-plugin-jsdoc (a library) -----------------------------
async function jsdocLayer() {
  const jsdoc = await optional('eslint-plugin-jsdoc', ['jsdoc']);

  return {
    name: 'lint/jsdoc',
    files: [SOURCES],
    ignores: TEST_FILES,
    extends: [jsdoc?.configs['flat/recommended-typescript-error']],
    rules: {
      [REQUIRE_JSDOC]: [
        ERROR,
        {
          publicOnly: true,
          require: {
            FunctionDeclaration: true,
            ArrowFunctionExpression: true,
            ClassDeclaration: true,
          },
        },
      ],
      ...errors([
        'jsdoc/require-description',
        'jsdoc/require-param-description',
        'jsdoc/require-returns-description',
        'jsdoc/require-example',
        'jsdoc/require-throws',
        'jsdoc/informative-docs',
      ]),
      // Layout of a comment: no layout rule in the lint pass.
      'jsdoc/check-alignment': OFF,
    },
  };
}

// ---- The copyright line, when .agents/profile.json gives one ----------------------------------------
function copyrightLayer(copyright) {
  return copyright === undefined ? [] : [
    {
      name: 'lint/copyright',
      files: [SOURCES],
      ignores: TEST_FILES,
      rules: {
        'local/copyright-header': [
          ERROR,
          { pattern: copyright.pattern },
        ],
      },
    },
  ];
}

/**
 * The lint config of a project: what options.mjs reads from package.json and .agents/profile.json.
 * @param {{ angular?: boolean, jsdoc?: boolean, prefix?: string, copyright?: { pattern: string } }} options
 */
export async function lintConfig(options = {}) {
  return defineConfig(prune([
    globalIgnores([
      'dist/',
      'coverage/',
      '.angular/',
      '.agents/',
      'node_modules/',
      'storybook-static/',
    ]),
    typescriptBase,
    ...options.angular === true ? await angularLayers(options.prefix ?? 'app') : [],
    ...options.jsdoc === true ? [await jsdocLayer()] : [],
    ...copyrightLayer(options.copyright),
    tests,
    toolConfigs,
    storybook,
  ]));
}
