/**
 * The lint of the CSS and SCSS of this project.
 *
 * The default config of Stylelint: the editor and `npm run lint:scss` read it. It starts with the
 * format (stylelint.format.config.mjs), then adds the lint: real errors and recognised good
 * practice, never a matter of taste.
 *
 * Its themes, each switched on or off in lint/settings.mjs, each described in
 * lint/stylelint/<theme>.mjs:
 * - css               stylelint-config-standard-scss, specificity and nesting
 * - cssAccessibility  @double-great/stylelint-a11y: focus, motion, readable text
 */
import { mergeStylelint, useThemes } from './lint/load.mjs';
import * as cssAccessibility from './lint/stylelint/css-accessibility.mjs';
import * as css from './lint/stylelint/css.mjs';
import format from './stylelint.format.config.mjs';

const lint = mergeStylelint(await useThemes([css, cssAccessibility]));

export default {
  ...format,
  extends: [...lint.extends, ...format.extends],
  plugins: [...format.plugins, ...lint.plugins],
  // A stylelint-disable comment that disables nothing is a leftover.
  reportNeedlessDisables: true,
  rules: {
    ...format.rules,
    ...lint.rules,
  },
};
