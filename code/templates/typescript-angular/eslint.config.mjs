// @ts-check
// ESLint configuration for an Angular 22 project.
// Needs: eslint 10, @eslint/js 10, typescript-eslint 8, angular-eslint 22, typescript 6.0,
// eslint-config-prettier 10, and the packages of eslint.strict-format.mjs.
import eslint from '@eslint/js';
import angular from 'angular-eslint';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import {
  defineConfig,
  globalIgnores,
} from 'eslint/config';
import tseslint from 'typescript-eslint';
import { strictFormat } from './eslint.strict-format.mjs';

// Single switch for the strict formatting rules.
// On by default. Run with STRICT_FORMAT=0 to turn them off.
const STRICT_FORMAT = process.env.STRICT_FORMAT !== '0';
// Selector prefix of the project: change it to the project's prefix.
const PREFIX = 'app';

export default defineConfig([
  globalIgnores([
    'dist/',
    'coverage/',
    '.angular/',
  ]),
  {
    // An inline "eslint-disable" comment has no effect: fix the code instead.
    linterOptions: { noInlineConfig: true },
  },
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    languageOptions: { parserOptions: { projectService: true } },
    rules: {
      // Core rules.
      eqeqeq: [
        'error',
        'always',
      ],
      'no-param-reassign': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      // Type rules that no preset turns on.
      '@typescript-eslint/no-unsafe-type-assertion': 'error',
      '@typescript-eslint/prefer-readonly': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      // Preset rules, adjusted.
      '@typescript-eslint/no-confusing-void-expression': [
        'error',
        { ignoreArrowShorthand: true },
      ],
      '@typescript-eslint/no-extraneous-class': [
        'error',
        { allowWithDecorator: true },
      ],
      '@typescript-eslint/non-nullable-type-assertion-style': 'off',
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowAny: false,
          allowBoolean: false,
          allowNever: false,
          allowNullish: false,
          allowNumber: true,
          allowRegExp: false,
        },
      ],
      // Angular rules that the recommended preset leaves off or as a warning.
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: PREFIX,
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: PREFIX,
          style: 'camelCase',
        },
      ],
      '@angular-eslint/computed-must-return': 'error',
      '@angular-eslint/no-async-lifecycle-method': 'error',
      '@angular-eslint/no-duplicates-in-metadata-arrays': 'error',
      '@angular-eslint/no-implicit-take-until-destroyed': 'error',
      '@angular-eslint/no-lifecycle-call': 'error',
      '@angular-eslint/no-uncalled-signals': 'error',
      '@angular-eslint/prefer-host-metadata-property': 'error',
      '@angular-eslint/prefer-output-emitter-ref': 'error',
      '@angular-eslint/prefer-output-readonly': 'error',
      '@angular-eslint/prefer-signal-model': 'error',
      '@angular-eslint/prefer-signals': 'error',
      '@angular-eslint/prefer-standalone': 'error',
      '@angular-eslint/use-lifecycle-interface': 'error',
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      angular.configs.templateRecommended,
      angular.configs.templateAccessibility,
    ],
    rules: {
      '@angular-eslint/template/button-has-type': 'error',
      '@angular-eslint/template/no-any': 'error',
      '@angular-eslint/template/no-duplicate-attributes': 'error',
      '@angular-eslint/template/no-empty-control-flow': 'error',
      '@angular-eslint/template/no-interpolation-in-attributes': 'error',
      '@angular-eslint/template/no-nested-tags': 'error',
      '@angular-eslint/template/no-non-null-assertion': 'error',
      '@angular-eslint/template/prefer-at-else': 'error',
      '@angular-eslint/template/prefer-at-empty': 'error',
      '@angular-eslint/template/prefer-class-binding': 'error',
      '@angular-eslint/template/prefer-contextual-for-variables': 'error',
      '@angular-eslint/template/prefer-ngsrc': 'error',
      '@angular-eslint/template/prefer-style-binding': 'error',
      '@angular-eslint/template/prefer-template-literal': 'error',
    },
  },
  // Turns off every rule that conflicts with Prettier. Keep it after the presets.
  eslintConfigPrettier,
  // Strict formatting rules come last. Each one is compatible with Prettier.
  ...(STRICT_FORMAT ? strictFormat : []),
]);
