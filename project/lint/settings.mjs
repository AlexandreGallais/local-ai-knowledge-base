// The settings of the format and the lint of this project. Change them here: both configs read them.
// The copyright comment every source file of src/ starts with, as 'Copyright (c) 2026 Example Corp.'.
// The format writes it at the top of a file that has none; the lint asks for it. Empty: no comment.
export const COPYRIGHT = '';
// The prefix of the selectors of the Angular components and directives: <app-user-list>, [appTooltip].
export const SELECTOR_PREFIX = 'app';

// What is neither formatted nor linted.
export const IGNORES = [
  'dist/',
  'coverage/',
  '.angular/',
  '.agents/',
  'node_modules/',
  'storybook-static/',
  '**/package-lock.json',
];
