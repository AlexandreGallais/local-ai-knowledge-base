// The format of the CSS and SCSS of this project: only rules that fix themselves. `npm run format`
// runs it alone, and OpenCode runs it on each style file the AI writes; stylelint.config.mjs
// extends it, so the lint checks the format too.
// Stylelint 18 with @stylistic/stylelint-plugin 6 (its "scss/" rules) and stylelint-order 8.
import { IGNORES } from './lint/settings.mjs';

const LAYOUT = {
  'indentation': 2,
  'linebreaks': 'unix',
  'max-empty-lines': 1,
  'no-eol-whitespace': true,
  'no-empty-first-line': true,
  'no-extra-semicolons': true,
  'no-missing-end-of-source-newline': true,
  'block-opening-brace-space-before': 'always',
  'block-opening-brace-newline-after': 'always',
  'block-closing-brace-newline-before': 'always',
  'block-closing-brace-newline-after': 'always',
  'declaration-block-semicolon-newline-after': 'always',
  'declaration-block-trailing-semicolon': 'always',
  'declaration-colon-space-before': 'never',
  'declaration-colon-space-after': 'always',
  'selector-list-comma-newline-after': 'always',
  'selector-combinator-space-before': 'always',
  'selector-combinator-space-after': 'always',
  'string-quotes': 'double',
  'color-hex-case': 'lower',
  'number-leading-zero': 'always',
  'number-no-trailing-zeros': true,
  'unit-case': 'lower',
  'property-case': 'lower',
};
const layout = (prefix) => Object.fromEntries(Object
  .entries(LAYOUT)
  .map(([name, value]) => [
    `${prefix}${name}`,
    value,
  ]));
// Rules of Stylelint itself that fix themselves: notation and blank lines.
const FIRST_NESTED = 'first-nested';
const NOTATION = {
  'color-hex-length': 'short',
  'color-function-notation': 'modern',
  'alpha-value-notation': 'percentage',
  'hue-degree-notation': 'angle',
  'length-zero-no-unit': true,
  'shorthand-property-no-redundant-values': true,
  'declaration-block-no-redundant-longhand-properties': true,
  'selector-pseudo-element-colon-notation': 'double',
  'value-keyword-case': 'lower',
  'function-name-case': 'lower',
  'selector-type-case': 'lower',
  'rule-empty-line-before': [
    'always-multi-line',
    {
      except: [FIRST_NESTED],
      ignore: ['after-comment'],
    },
  ],
  'at-rule-empty-line-before': [
    'always',
    {
      except: [
        'blockless-after-same-name-blockless',
        FIRST_NESTED,
      ],
      ignore: ['after-comment'],
    },
  ],
  'comment-empty-line-before': [
    'always',
    {
      except: [FIRST_NESTED],
      ignore: ['stylelint-commands'],
    },
  ],
  'declaration-empty-line-before': 'never',
  'order/order': [
    'custom-properties',
    'dollar-variables',
    'declarations',
    'rules',
    'at-rules',
  ],
  'order/properties-alphabetical-order': true,
};

// CSS is read as SCSS (plain CSS is valid SCSS), as stylelint-config-standard-scss reads it in the
// lint: one syntax, one set of layout rules for both.
export default {
  ignoreFiles: IGNORES.map((folder) => folder.endsWith('/') ? `${folder}**` : folder),
  customSyntax: 'postcss-scss',
  plugins: [
    '@stylistic/stylelint-plugin',
    'stylelint-order',
  ],
  rules: {
    ...layout('@stylistic/scss/'),
    ...NOTATION,
  },
};
