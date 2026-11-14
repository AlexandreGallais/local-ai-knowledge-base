/**
 * Theme "teamChoices" (lint): the choices the team made for its Angular projects.
 *
 * They are choices, not errors: switch this theme off in a project that chose otherwise.
 * - State with @ngrx/signals only: no @ngrx/store, @ngrx/effects nor @ngrx/component-store.
 * - Components written in the project: no Angular Material, no CDK.
 * - Control flow and bindings rather than CommonModule, NgIf, NgFor, NgClass, NgStyle, NgSwitch.
 * - A store (*.store.ts) lists either the features of its sub-domains or the blocks of a small store
 *   (withState, withComputed, withMethods...), never both: rule team/store-lists-features, below.
 */
import { FILES } from '../load.mjs';

export const theme = 'teamChoices';
export const packages = [];
const SIGNALS = 'The team uses @ngrx/signals.';
/** The imports the team does not use, and what it uses instead. */
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
      importNames: ['CommonModule', 'NgClass', 'NgFor', 'NgIf', 'NgStyle', 'NgSwitch'],
      message: 'Use @if, @for, @switch and [class.x], [style.x] bindings.',
    },
  ],
  patterns: [
    {
      group: ['@angular/material', '@angular/material/*', '@angular/cdk', '@angular/cdk/*'],
      message: 'The team writes its components: no Angular Material, no CDK.',
    },
  ],
};
/** The building blocks of @ngrx/signals; any other with...() call is a feature of the project. */
const STORE_BLOCKS = new Set([
  'withComputed',
  'withEntities',
  'withEventHandlers',
  'withFeature',
  'withHooks',
  'withLinkedState',
  'withMethods',
  'withProps',
  'withReducer',
  'withState',
]);

/**
 * The with...() calls given to signalStore().
 * @param {any} node A CallExpression.
 * @returns {any[]} The calls.
 */
function withCalls(node) {
  return node.arguments.filter(
    (argument) =>
      argument.type === 'CallExpression' &&
      argument.callee.type === 'Identifier' &&
      /^with[A-Z]/u.test(argument.callee.name),
  );
}

/** Rule team/store-lists-features. */
const storeListsFeatures = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'A store lists either the features of its sub-domains or the blocks of a small store.',
    },
    schema: [],
    messages: {
      mixed: 'This store lists features of sub-domains: move "{{name}}" into a feature file.',
    },
  },
  create(context) {
    return {
      CallExpression(node) {
        if (node.callee.type !== 'Identifier' || node.callee.name !== 'signalStore') {
          return;
        }

        const calls = withCalls(node);

        if (!calls.some((call) => !STORE_BLOCKS.has(call.callee.name))) {
          return;
        }

        for (const call of calls.filter((item) => STORE_BLOCKS.has(item.callee.name))) {
          context.report({
            node: call,
            messageId: 'mixed',
            data: { name: call.callee.name },
          });
        }
      },
    };
  },
};

/** @returns {object[]} The configs of the theme. */
export function configs() {
  return [
    {
      name: 'lint/team-choices',
      files: FILES.scripts,
      rules: {
        'no-restricted-imports': ['error', BANNED_IMPORTS],
      },
    },
    {
      name: 'lint/team-choices-stores',
      files: ['**/*.store.ts'],
      plugins: { team: { rules: { 'store-lists-features': storeListsFeatures } } },
      rules: { 'team/store-lists-features': 'error' },
    },
  ];
}
