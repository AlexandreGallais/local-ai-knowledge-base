/**
 * Theme "css" (lint): CSS and SCSS that stay valid, simple to override and easy to read.
 *
 * The standard config of Stylelint for SCSS (unknown properties, units, selectors, duplicate
 * properties, invalid values...), and limits on specificity and nesting below. Stylelint has no
 * layout rule since its version 16: Prettier lays out the styles.
 */
export const theme = 'css';
export const packages = ['stylelint-config-standard-scss'];
const RULES = {
  // Animations of everything: slow, and changes that were not meant to move.
  'declaration-property-value-disallowed-list': { transition: [String.raw`/\ball\b/`] },
  // !important breaks the cascade: the next rule needs another one.
  'declaration-no-important': true,
  // Nested SCSS beyond 3 levels makes long, fragile selectors.
  'max-nesting-depth': 3,
  // ::ng-deep is deprecated by Angular and leaks styles out of the component.
  'selector-pseudo-element-disallowed-list': ['ng-deep'],
  // An id selector cannot be overridden by a class.
  'selector-max-id': 0,
  // Beyond this specificity, overriding a rule needs a stronger one.
  'selector-max-specificity': '0,4,0',
};

/** @returns {object[]} The part of the Stylelint config this theme brings. */
export function configs() {
  return [
    {
      extends: ['stylelint-config-standard-scss'],
      rules: RULES,
    },
  ];
}
