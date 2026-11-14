/**
 * Theme "javascript" (lint): the recommended rules of ESLint, and the core rules that catch bugs.
 *
 * It applies to every script, TypeScript and JavaScript (.mjs, .js) alike. JavaScript files are
 * scripts run by Node, such as the config files of the tools: they get the globals of Node and no
 * rule that needs the TypeScript types.
 */
import { FILES } from '../load.mjs';

export const theme = 'javascript';

export const packages = ['@eslint/js', 'globals'];

/** Core rules that catch a bug or a risk, beyond the recommended ones. */
const RULES = {
  // Callbacks of map, filter, reduce... must return a value.
  'array-callback-return': 'error',
  // default last in a switch, or the cases after it are a trap.
  'default-case-last': 'error',
  // == converts types; == null alone is allowed, it means null or undefined.
  eqeqeq: ['error', 'always', { null: 'ignore' }],
  // for...in walks the prototype chain too.
  'guard-for-in': 'error',
  // console.log is a leftover; console.warn and console.error are messages.
  'no-console': [
    'error',
    {
      allow: ['warn', 'error'],
    },
  ],
  // A constructor that returns a value is a mistake.
  'no-constructor-return': 'error',
  // eval and its relatives run text as code: injection risk.
  'no-eval': 'error',
  'no-implied-eval': 'error',
  'no-new-func': 'error',
  // A function made in a loop that reads the loop variable sees its last value.
  'no-loop-func': 'error',
  // new String(), new Number(), new Boolean() make objects, not values.
  'no-new-wrappers': 'error',
  // The executor of a Promise returns nothing: its value is lost.
  'no-promise-executor-return': 'error',
  // return a = b is often a == mistyped.
  'no-return-assign': ['error', 'always'],
  // x === x is a mistake, or a NaN test to write with Number.isNaN.
  'no-self-compare': 'error',
  // The comma operator hides an expression.
  'no-sequences': 'error',
  // '${x}' in a plain string is a template literal mistyped.
  'no-template-curly-in-string': 'error',
  // Throw an Error, never a string: a string has no stack.
  'no-throw-literal': 'error',
  // A loop condition that the loop never changes runs forever.
  'no-unmodified-loop-condition': 'error',
  // A loop whose body always exits runs once: it is an if.
  'no-unreachable-loop': 'error',
  // let that is never reassigned is a const.
  'prefer-const': 'error',
};

/**
 * @param {Record<string, any>} loaded The packages of the theme.
 * @returns {object[]} The configs of the theme.
 */
export function configs(loaded) {
  const globals = loaded.globals;

  return [
    {
      name: 'lint/javascript',
      files: FILES.scripts,
      extends: [loaded['@eslint/js'].configs.recommended],
      rules: RULES,
    },
    {
      name: 'lint/javascript-node',
      files: FILES.javascript,
      languageOptions: { globals: globals.node },
    },
  ];
}
