---
title: "Rules (part 2 of 2)"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/docs/user-guide/rules.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# Rules (part 2 of 2)

## Enforce conventions

These rules help you write consistent code and limit its complexity. The standard config turns on fewer than half of them, as conventions are specific to you and your project. You'll need to customize most of them to suit your needs.

### Allowed, disallowed & required

Allow, disallow or require things with these `allowed-list`, `disallowed-list`, `required-list` and `no` rules.

#### At-rule

| | | |
| :-- | :-: | :-: |
| `at-rule-allowed-list`Specify a list of allowed at-rules. | | |
| `at-rule-disallowed-list`Specify a list of disallowed at-rules. | | |
| `at-rule-no-vendor-prefix`Disallow vendor prefixes for at-rules. | ✅ | 🔧 |
| `at-rule-property-required-list`Specify a list of required properties (or descriptors) for an at-rule. | | |

#### Color

| | | |
| :-- | :-: | :-: |
| `color-hex-alpha`Require or disallow alpha channel for hex colors. | | |
| `color-named`Require (where possible) or disallow named colors. | | |
| `color-no-hex`Disallow hex colors. | | |

#### Comment

| | | |
| :-- | :-: | :-: |
| `comment-word-disallowed-list`Specify a list of disallowed words within comments. | | |

#### Declaration

| | | |
| :-- | :-: | :-: |
| `declaration-no-important`Disallow `!important` within declarations. | | |
| `declaration-property-custom-property-allowed-list`Specify a list of allowed property and custom property pairs within declarations. | | |
| `declaration-property-unit-allowed-list`Specify a list of allowed property and unit pairs within declarations. | | |
| `declaration-property-unit-disallowed-list`Specify a list of disallowed property and unit pairs within declarations. | | |
| `declaration-property-value-allowed-list`Specify a list of allowed property and value pairs within declarations. | | |
| `declaration-property-value-disallowed-list`Specify a list of disallowed property and value pairs within declarations. | | |

#### Function

| | | |
| :-- | :-: | :-: |
| `function-allowed-list`Specify a list of allowed functions. | | |
| `function-disallowed-list`Specify a list of disallowed functions. | | |
| `function-url-no-scheme-relative`Disallow scheme-relative URLs. | | |
| `function-url-scheme-allowed-list`Specify a list of allowed URL schemes. | | |
| `function-url-scheme-disallowed-list`Specify a list of disallowed URL schemes. | | |

#### Length

| | | |
| :-- | :-: | :-: |
| `length-zero-no-unit`Disallow units for zero lengths. | ✅ | 🔧 |

#### Media feature

| | | |
| :-- | :-: | :-: |
| `media-feature-name-allowed-list`Specify a list of allowed media feature names. | | |
| `media-feature-name-disallowed-list`Specify a list of disallowed media feature names. | | |
| `media-feature-name-no-vendor-prefix`Disallow vendor prefixes for media feature names. | ✅ | 🔧 |
| `media-feature-name-unit-allowed-list`Specify a list of allowed name and unit pairs within media features. | | |
| `media-feature-name-value-allowed-list`Specify a list of allowed media feature name and value pairs. | | |

#### Property

| | | |
| :-- | :-: | :-: |
| `property-allowed-list`Specify a list of allowed properties. | | |
| `property-disallowed-list`Specify a list of disallowed properties. | | |
| `property-no-vendor-prefix`Disallow vendor prefixes for properties. | ✅ | 🔧 |

#### Rule

| | | |
| :-- | :-: | :-: |
| `rule-nesting-at-rule-required-list`Require rules to be nested in specific at-rules. | | |
| `rule-selector-property-disallowed-list`Specify a list of disallowed properties for selectors within rules. | | |

#### Selector

| | | |
| :-- | :-: | :-: |
| `selector-attribute-name-disallowed-list`Specify a list of disallowed attribute names. | | |
| `selector-attribute-operator-allowed-list`Specify a list of allowed attribute operators. | | |
| `selector-attribute-operator-disallowed-list`Specify a list of disallowed attribute operators. | | |
| `selector-combinator-allowed-list`Specify a list of allowed combinators. | | |
| `selector-combinator-disallowed-list`Specify a list of disallowed combinators. | | |
| `selector-disallowed-list`Specify a list of disallowed selectors. | | |
| `selector-no-qualifying-type`Disallow qualifying a selector by type. | | |
| `selector-no-vendor-prefix`Disallow vendor prefixes for selectors. | ✅ | 🔧 |
| `selector-pseudo-class-allowed-list`Specify a list of allowed pseudo-class selectors. | | |
| `selector-pseudo-class-disallowed-list`Specify a list of disallowed pseudo-class selectors. | | |
| `selector-pseudo-element-allowed-list`Specify a list of allowed pseudo-element selectors. | | |
| `selector-pseudo-element-disallowed-list`Specify a list of disallowed pseudo-element selectors. | | |

#### Unit

| | | |
| :-- | :-: | :-: |
| `unit-allowed-list`Specify a list of allowed units. | | |
| `unit-disallowed-list`Specify a list of disallowed units. | | |

#### Value

| | | |
| :-- | :-: | :-: |
| `value-no-vendor-prefix`Disallow vendor prefixes for values. | ✅ | 🔧 |
| `value-type-custom-property-required-list`Specify a list of value types that require custom properties. | | |

### Case

Specify lowercase or uppercase for words with these `case` rules.

| | | |
| :-- | :-: | :-: |
| `function-name-case`Specify lowercase or uppercase for function names. | ✅ | 🔧 |
| `selector-type-case`Specify lowercase or uppercase for type selectors. | ✅ | 🔧 |
| `value-keyword-case`Specify lowercase or uppercase for keywords values. | ✅ | 🔧 |

### Empty lines

Enforce or disallow empty lines before constructs with these `empty-line-before` rules.

| | | |
| :-- | :-: | :-: |
| `at-rule-empty-line-before`Require or disallow an empty line before at-rules. | ✅ | 🔧 |
| `comment-empty-line-before`Require or disallow an empty line before comments. | ✅ | 🔧 |
| `custom-property-empty-line-before`Require or disallow an empty line before custom properties. | ✅ | 🔧 |
| `declaration-empty-line-before`Require or disallow an empty line before declarations. | ✅ | 🔧 |
| `rule-empty-line-before`Require or disallow an empty line before rules. | ✅ | 🔧 |

### Layout mappings

Specify flow-relative or physical layout mappings with these `layout-mappings` rules.

| | | |
| :-- | :-: | :-: |
| `property-layout-mappings`Specify flow-relative or physical layout mappings for properties. | | 🔧 |
| `unit-layout-mappings`Specify flow-relative or physical layout mappings for units. | | 🔧 |
| `value-keyword-layout-mappings`Specify flow-relative or physical layout mappings for value keywords. | | 🔧 |

### Max & min

Apply limits with these `max` and `min` rules.

| | | |
| :-- | :-: | :-: |
| `declaration-property-max-values`Limit the number of values for a list of properties within declarations. | | |
| `max-nesting-depth`Limit the depth of nesting. | | |
| `number-max-precision`Limit the number of decimal places allowed in numbers. | ✅ | |
| `selector-max-attribute`Limit the number of attribute selectors in a selector. | | |
| `selector-max-class`Limit the number of classes in a selector. | | |
| `selector-max-combinators`Limit the number of combinators in a selector. | | |
| `selector-max-compound-selectors`Limit the number of compound selectors in a selector. | | |
| `selector-max-id`Limit the number of ID selectors in a selector. | | |
| `selector-max-pseudo-class`Limit the number of pseudo-classes in a selector. | | |
| `selector-max-specificity`Limit the specificity of selectors. | | |
| `selector-max-type`Limit the number of type selectors in a selector. | | |
| `selector-max-universal`Limit the number of universal selectors in a selector. | | |
| `time-min-milliseconds`Limit the minimum number of milliseconds for time values. | | |

### Notation

Enforce one representation of things that have multiple with these `notation` (sometimes implicit) rules.

| | | |
| :-- | :-: | :-: |
| `alpha-value-notation`Specify percentage or number notation for alpha-values. | ✅ | 🔧 |
| `color-function-alias-notation`Specify alias notation for color-functions. | ✅ | 🔧 |
| `color-function-notation`Specify modern or legacy notation for color-functions. | ✅ | 🔧 |
| `color-hex-length`Specify short or long notation for hex colors. | ✅ | 🔧 |
| `display-notation`Specify short or full notation for the `display` property. | | 🔧 |
| `font-weight-notation`Specify numeric or named notation for font weights. | | 🔧 |
| `hue-degree-notation`Specify number or angle notation for degree hues. | ✅ | 🔧 |
| `import-notation`Specify string or URL notation for `@import` rules. | ✅ | 🔧 |
| `keyframe-selector-notation`Specify keyword or percentage notation for keyframe selectors. | ✅ | 🔧 |
| `lightness-notation`Specify number or percentage notation for lightness. | ✅ | 🔧 |
| `media-feature-range-notation`Specify context or prefix notation for media feature ranges. | ✅ | 🔧 |
| `relative-selector-nesting-notation`Specify explicit or implicit nesting notation for relative selectors. | | 🔧 |
| `selector-not-notation`Specify simple or complex notation for `:not()` pseudo-class selectors. | ✅ | 🔧 |
| `selector-pseudo-element-colon-notation`Specify single or double colon notation for applicable pseudo-element selectors. | ✅ | 🔧 |

### Pattern

Enforce naming conventions with these `pattern` rules.

| | | |
| :-- | :-: | :-: |
| `comment-pattern`Specify a pattern for comments. | | |
| `container-name-pattern`Specify a pattern for container names. | ✅ | |
| `custom-media-pattern`Specify a pattern for custom media query names. | ✅ | |
| `custom-property-pattern`Specify a pattern for custom properties. | ✅ | |
| `keyframes-name-pattern`Specify a pattern for keyframe names. | ✅ | |
| `layer-name-pattern`Specify a pattern for layer names. | ✅ | |
| `selector-class-pattern`Specify a pattern for class selectors. | ✅ | |
| `selector-id-pattern`Specify a pattern for ID selectors. | ✅ | |
| `selector-nested-pattern`Specify a pattern for the selectors of rules nested within rules. | | |

### Quotes

Require or disallow quotes with these `quotes` rules.

| | | |
| :-- | :-: | :-: |
| `font-family-name-quotes`Require or disallow quotes for font family names. | ✅ | 🔧 |
| `function-url-quotes`Require or disallow quotes for urls. | ✅ | 🔧 |
| `selector-attribute-quotes`Require or disallow quotes for attribute values. | ✅ | 🔧 |

### Redundant

Disallow redundancy with these `no-redundant` rules.

| | | |
| :-- | :-: | :-: |
| `block-no-redundant-nested-style-rules`Disallow redundant nested style rules within blocks. | ✅ | |
| `declaration-block-no-redundant-longhand-properties`Disallow redundant longhand properties within declaration-block. | ✅ | 🔧 |
| `shorthand-property-no-redundant-values`Disallow redundant values within shorthand properties. | ✅ | 🔧 |

### Whitespace inside

Require or disallow whitespace on the inside with this `whitespace-inside` rule.

| | | |
| :-- | :-: | :-: |
| `comment-whitespace-inside`Require or disallow whitespace on the inside of comment markers. | ✅ | 🔧 |
