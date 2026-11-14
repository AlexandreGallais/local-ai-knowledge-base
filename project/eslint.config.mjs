/**
 * The lint of the TypeScript, JavaScript and Angular templates of this project.
 *
 * The default config of ESLint: `npx eslint .`, the editor and `npm run lint:js` read it. It starts
 * with the format (eslint.format.config.mjs), then adds the lint: real errors and recognised good
 * practice, never a matter of taste. Each theme starts from the recommended config of its library.
 *
 * Its themes, each switched on or off in lint/settings.mjs, each described in lint/eslint/<theme>.mjs:
 * - javascript        recommended rules of ESLint, core rules that catch bugs
 * - typescript        typescript-eslint strictTypeChecked, with the types
 * - imports           eslint-plugin-import-x: cycles, duplicates, undeclared packages
 * - complexity        size of files and functions, branches, nesting, parameters
 * - regexp            eslint-plugin-regexp recommended
 * - unicorn           the rules of eslint-plugin-unicorn that catch bugs
 * - tests             @vitest/eslint-plugin recommended, on *.spec.ts and *.test.ts
 * - jsdoc             JSDoc on what a library exports (off by default)
 * - angular           angular-eslint recommended, signals, OnPush, file names
 * - angularTemplates  angular-eslint template recommended, control flow, bindings
 * - accessibility     angular-eslint template accessibility
 * - rxjs              eslint-plugin-rxjs-x recommended
 * - ngrxSignals       @ngrx/eslint-plugin, Signals rules
 * - teamChoices       NgRx Signals only, no Material nor CDK, a store lists features
 */
import { defineConfig } from 'eslint/config';

import format from './eslint.format.config.mjs';
import * as accessibility from './lint/eslint/accessibility.mjs';
import * as angularTemplates from './lint/eslint/angular-templates.mjs';
import * as angular from './lint/eslint/angular.mjs';
import * as complexity from './lint/eslint/complexity.mjs';
import * as imports from './lint/eslint/imports.mjs';
import * as javascript from './lint/eslint/javascript.mjs';
import * as jsdoc from './lint/eslint/jsdoc.mjs';
import * as ngrxSignals from './lint/eslint/ngrx-signals.mjs';
import * as regexp from './lint/eslint/regexp.mjs';
import * as rxjs from './lint/eslint/rxjs.mjs';
import * as teamChoices from './lint/eslint/team-choices.mjs';
import * as tests from './lint/eslint/tests.mjs';
import * as typescript from './lint/eslint/typescript.mjs';
import * as unicorn from './lint/eslint/unicorn.mjs';
import { useThemes } from './lint/load.mjs';

export default defineConfig([
  format,
  // An eslint-disable comment that disables nothing is a leftover.
  {
    name: 'lint/disable-comments',
    linterOptions: { reportUnusedDisableDirectives: 'error' },
  },
  ...(await useThemes([
    javascript,
    typescript,
    imports,
    complexity,
    regexp,
    unicorn,
    tests,
    jsdoc,
    angular,
    angularTemplates,
    accessibility,
    rxjs,
    ngrxSignals,
    teamChoices,
  ])),
]);
