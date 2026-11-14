/**
 * The settings of the format and the lint of this project.
 *
 * The four configs at the root of the project read this file: eslint.format.config.mjs,
 * eslint.config.mjs, stylelint.format.config.mjs and stylelint.config.mjs. Change the settings
 * here, never in those configs.
 *
 * THEMES switches each group of rules on (true) or off (false). Switch off a theme that blocks the
 * team today, without uninstalling its package; switch it on again later. A theme whose packages
 * are not installed stays off, whatever it says here, and the lint says so. Each theme is one file
 * of lint/eslint/ or lint/stylelint/, which starts with what it checks.
 */
export const THEMES = {
  // ---- Format: what the format pass adds to Prettier. It fixes by itself, without a word.
  // A blank line before return, after a block of declarations, around functions and classes.
  blankLines: true,
  // Braces around the body of every if, else, for, while and do.
  braces: true,
  // The copyright comment at the top of each file of src/, when COPYRIGHT below is set.
  copyright: true,
  // CSS and SCSS: the notation of the standard config (short colors, blank lines between rules...).
  cssNotation: true,
  // CSS and SCSS properties in the order of Recess, declarations before nested rules.
  cssOrder: true,
  // Imports, exports, object keys, class members, interfaces and union types sorted.
  sort: true,
  // Angular templates: attributes sorted, self-closing tags, @else and @empty blocks.
  templateFormat: true,
  // ---- Lint of TypeScript and JavaScript: what is left once the format is done.
  // The recommended rules of ESLint, and the core rules that catch bugs.
  javascript: true,
  // typescript-eslint strictTypeChecked, and a few typed checks more.
  typescript: true,
  // Imports: cycles, duplicates, packages not declared in package.json, mutable exports.
  imports: true,
  // Size and complexity: lines per file and per function, branches, nesting, parameters.
  complexity: true,
  // Regular expressions: eslint-plugin-regexp recommended.
  regexp: true,
  // The rules of eslint-plugin-unicorn that catch bugs.
  unicorn: true,
  // Tests (*.spec.ts, *.test.ts): @vitest/eslint-plugin recommended, and assertions that check.
  tests: true,
  // JSDoc on what a library exports. Turn it on in a library.
  jsdoc: false,
  // ---- Angular: turn these off in a project without Angular.
  // Components, directives, pipes and services: angular-eslint recommended, and signals used well.
  angular: true,
  // Templates: angular-eslint recommended, control flow, complexity of expressions.
  angularTemplates: true,
  // Accessibility of templates: angular-eslint accessibility.
  accessibility: true,
  // RxJS: eslint-plugin-rxjs-x recommended.
  rxjs: true,
  // NgRx Signals: the Signals rules of @ngrx/eslint-plugin.
  ngrxSignals: true,
  // The choices of the team: NgRx Signals only, no Angular Material nor CDK, a store lists features.
  teamChoices: true,
  // ---- Lint of CSS and SCSS.
  // stylelint-config-standard-scss, and limits on selectors, specificity and nesting.
  css: true,
  // Accessibility of styles: @double-great/stylelint-a11y.
  cssAccessibility: true,
};

/**
 * The copyright line every file of src/ starts with, as 'Copyright (c) 2026 Example Corp.'. The
 * format writes it at the top of a file that has none, and the lint asks for it. Empty: no line.
 */
export const COPYRIGHT = '';
/** The prefix of the selectors of Angular components and directives: <app-valve>, [appTooltip]. */
export const SELECTOR_PREFIX = 'app';

/** What is neither formatted nor linted, besides node_modules/. */
export const IGNORES = [
  '.agents/',
  '.angular/',
  'coverage/',
  'dist/',
  'storybook-static/',
  '**/package-lock.json',
];
