/**
 * The format of the CSS and SCSS of this project.
 *
 * Prettier lays out the styles (.prettierrc.json, .editorconfig). This config adds what Prettier does
 * not do, with rules that fix themselves. `npm run format:scss` runs it, then Prettier; OpenCode runs
 * both on each style file the AI writes. stylelint.config.mjs extends it, so the lint checks the
 * format too. CSS is read as SCSS: plain CSS is valid SCSS.
 *
 * Its themes, each switched on or off in lint/settings.mjs, each described in
 * lint/stylelint/<theme>.mjs:
 * - cssNotation  the notation of the standard config: short colors, blank lines between rules...
 * - cssOrder     properties in the order of Recess, declarations before nested rules
 */
import { mergeStylelint, useThemes } from './lint/load.mjs';
import { IGNORES } from './lint/settings.mjs';
import * as cssNotation from './lint/stylelint/css-notation.mjs';
import * as cssOrder from './lint/stylelint/css-order.mjs';

export default {
  ignoreFiles: IGNORES.map((path) => (path.endsWith('/') ? `${path}**` : path)),
  customSyntax: 'postcss-scss',
  ...mergeStylelint(await useThemes([cssNotation, cssOrder])),
};
