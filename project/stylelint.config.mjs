// The lint of the CSS and SCSS of this project, the default config of Stylelint: the editor and
// `npm run lint` read it. It starts from the standard config of Stylelint for SCSS, adds the format
// (stylelint.format.config.mjs), then the quality rules below: specificity, nesting, accessibility.
export default {
  extends: [
    'stylelint-config-standard-scss',
    './stylelint.format.config.mjs',
  ],
  plugins: ['@double-great/stylelint-a11y'],
  ignoreDisables: true,
  rules: {
    'declaration-no-important': true,
    'max-nesting-depth': 2,
    'selector-max-id': 0,
    'selector-max-universal': 0,
    'selector-max-compound-selectors': 3,
    'selector-max-specificity': '0,3,0',
    'selector-max-class': 3,
    'selector-max-combinators': 2,
    'selector-no-qualifying-type': true,
    'selector-disallowed-list': [['/::ng-deep/', '/:host-context/']],
    'color-named': 'never',
    'time-min-milliseconds': 100,
    'no-unknown-animations': true,
    'declaration-property-value-disallowed-list': {
      transition: ['/\\ball\\b/'],
      outline: [
        'none',
        '0',
      ],
    },
    'comment-word-disallowed-list': [['/^\\s*(todo|fixme)/i']],
    'a11y/no-outline-none': true,
    'a11y/selector-pseudo-class-focus': true,
    'a11y/font-size-is-readable': true,
    'a11y/no-text-align-justify': true,
  },
};
