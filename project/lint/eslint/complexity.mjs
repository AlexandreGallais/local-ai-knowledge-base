/**
 * Theme "complexity" (lint): code that grows too big to read and to test.
 *
 * Core rules of ESLint, with limits wide enough for ordinary code: a limit that is reached says
 * "split this", not "write it otherwise". Change a limit here; switch the whole theme off in
 * lint/settings.mjs. Blank lines and comments are not counted. Tests have no limit on the size of
 * a function: a describe block holds all its cases.
 */
import { FILES } from '../load.mjs';

export const theme = 'complexity';
export const packages = [];
/** The limits, one place to change them. */
const LIMITS = {
  // Lines of a file.
  fileLines: 400,
  // Lines of a function.
  functionLines: 80,
  // Statements of a function.
  statements: 25,
  // Independent paths through a function (if, case, &&, ?...).
  branches: 12,
  // Nested blocks in a function.
  depth: 4,
  // Parameters of a function: beyond, pass an object.
  parameters: 4,
  // Callbacks nested in callbacks.
  callbacks: 3,
};
const lines = (max) => [
  'error',
  {
    max,
    skipBlankLines: true,
    skipComments: true,
  },
];

/** @returns {object[]} The configs of the theme. */
export function configs() {
  return [
    {
      name: 'lint/complexity',
      files: FILES.scripts,
      rules: {
        complexity: ['error', LIMITS.branches],
        'max-depth': ['error', LIMITS.depth],
        'max-lines': lines(LIMITS.fileLines),
        'max-lines-per-function': lines(LIMITS.functionLines),
        'max-nested-callbacks': ['error', LIMITS.callbacks],
        'max-params': ['error', LIMITS.parameters],
        'max-statements': ['error', LIMITS.statements],
      },
    },
    {
      name: 'lint/complexity-tests',
      files: FILES.tests,
      rules: {
        'max-lines-per-function': 'off',
        'max-nested-callbacks': 'off',
        'max-statements': 'off',
      },
    },
  ];
}
