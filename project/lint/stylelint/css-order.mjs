/**
 * Theme "cssOrder" (format): CSS and SCSS in a fixed order, fixed at once.
 *
 * - In a rule, the properties in the order of Recess: position first, then the box, typography and
 *   visual properties. The order the documentation of stylelint-order proposes, from
 *   stylelint-config-recess-order.
 * - In a rule, the variables and declarations before the nested rules: a declaration written after
 *   a nested rule does not apply where it seems to with native CSS nesting.
 */
export const theme = 'cssOrder';
export const packages = ['stylelint-config-recess-order'];

/** @returns {object[]} The part of the Stylelint config this theme brings. */
export function configs() {
  return [
    {
      extends: ['stylelint-config-recess-order'],
      rules: {
        'order/order': ['custom-properties', 'dollar-variables', 'declarations', 'rules'],
      },
    },
  ];
}
