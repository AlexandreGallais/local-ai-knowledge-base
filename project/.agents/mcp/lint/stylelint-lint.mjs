// The lint pass for CSS and SCSS: no layout rule, no rule that fixes itself in the format pass.
// Stylelint 18, stylelint-config-standard-scss 18 and @double-great/stylelint-a11y.
export default {
  extends: ['stylelint-config-standard-scss'],
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
