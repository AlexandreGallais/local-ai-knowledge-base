/**
 * Theme "cssAccessibility" (lint): styles that keep a page usable for everyone.
 *
 * Rules of @double-great/stylelint-a11y: the focus stays visible, motion can be reduced, text stays
 * readable.
 */
export const theme = 'cssAccessibility';
export const packages = ['@double-great/stylelint-a11y'];
const RULES = {
  // An animation needs its prefers-reduced-motion version.
  'a11y/media-prefers-reduced-motion': true,
  // outline: none hides the focus from keyboard users.
  'a11y/no-outline-none': true,
  // :hover without :focus leaves the keyboard out.
  'a11y/selector-pseudo-class-focus': true,
};

/** @returns {object[]} The part of the Stylelint config this theme brings. */
export function configs() {
  return [
    {
      plugins: ['@double-great/stylelint-a11y'],
      rules: RULES,
    },
  ];
}
