/**
 * Theme "angular" (lint): components, directives, pipes and services written as Angular advises.
 *
 * The recommended TypeScript config of angular-eslint, the selector prefix of lint/settings.mjs, and
 * the rules below: signals used well, OnPush change detection, lifecycle methods used as Angular
 * calls them, file names as the Angular style guide writes them.
 */
import { FILES } from '../load.mjs';
import { SELECTOR_PREFIX } from '../settings.mjs';

export const theme = 'angular';

export const packages = ['angular-eslint', 'eslint-plugin-unicorn'];

const RULES = {
  // computed() returns its value.
  '@angular-eslint/computed-must-return': 'error',
  // A decorator only where Angular reads it (@Input in a component, not in a service).
  '@angular-eslint/contextual-decorator': 'error',
  // Angular does not await a lifecycle method.
  '@angular-eslint/no-async-lifecycle-method': 'error',
  // takeUntilDestroyed() outside an injection context throws at run time.
  '@angular-eslint/no-implicit-take-until-destroyed': 'error',
  // Angular calls ngOnInit and the others; the code does not.
  '@angular-eslint/no-lifecycle-call': 'error',
  // An impure pipe runs at every change detection.
  '@angular-eslint/no-pipe-impure': 'error',
  // A signal read without its parentheses is always truthy.
  '@angular-eslint/no-uncalled-signals': 'error',
  // OnPush: the change detection Angular advises with signals and without zone.js.
  '@angular-eslint/prefer-on-push-component-change-detection': 'error',
  // output() rather than @Output() with an EventEmitter.
  '@angular-eslint/prefer-output-emitter-ref': 'error',
  // input(), model(), viewChild()... rather than their decorators.
  '@angular-eslint/prefer-signals': 'error',
  // A computed() or effect() that reads no signal never runs again.
  '@angular-eslint/reactive-context-must-read-signal': 'error',
  // An empty class with a decorator is an Angular class, not a mistake.
  '@typescript-eslint/no-extraneous-class': ['error', { allowWithDecorator: true }],
  // File names in kebab-case, as the Angular style guide and ng generate write them.
  'unicorn/filename-case': ['error', { case: 'kebabCase' }],
};

/**
 * @param {Record<string, any>} loaded The packages of the theme.
 * @returns {object[]} The configs of the theme.
 */
export function configs(loaded) {
  return [
    {
      name: 'lint/angular',
      files: FILES.typescript,
      extends: [loaded['angular-eslint'].configs.tsRecommended],
      plugins: { unicorn: loaded['eslint-plugin-unicorn'] },
      rules: {
        ...RULES,
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix: SELECTOR_PREFIX,
            style: 'kebab-case',
          },
        ],
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            prefix: SELECTOR_PREFIX,
            style: 'camelCase',
          },
        ],
      },
    },
  ];
}
