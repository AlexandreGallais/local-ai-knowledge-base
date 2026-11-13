---
title: "Rules (part 1 of 2)"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/docs/user-guide/rules.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# Rules

There are over one hundred built-in rules to help you:

- avoid errors
- enforce conventions

We turn on most of the rules in our standard config (✅) and many can be autofixed (🔧).

## Avoid errors

You can avoid errors with these `no` rules.

### Deprecated

Disallow deprecated things with these `no-deprecated` rules.

| | | |
| :-- | :-: | :-: |
| `at-rule-no-deprecated`Disallow deprecated at-rules. | ✅ | 🔧 |
| `declaration-property-value-keyword-no-deprecated`Disallow deprecated keywords for properties within declarations. | ✅ | 🔧 |
| `media-type-no-deprecated`Disallow deprecated media types. | ✅ | |
| `property-no-deprecated`Disallow deprecated properties. | ✅ | 🔧 |
| `selector-no-deprecated`Disallow deprecated selectors. | | 🔧 |

### Descending

Disallow descending things with these `no-descending` rules.

| | | |
| :-- | :-: | :-: |
| `no-descending-specificity`Disallow selectors of lower specificity from coming after overriding selectors of higher specificity. | ✅ | |

### Duplicate

Disallow duplicates with these `no-duplicate` rules.

| | | |
| :-- | :-: | :-: |
| `declaration-block-no-duplicate-custom-properties`Disallow duplicate custom properties within declaration blocks. | ✅ | |
| `declaration-block-no-duplicate-properties`Disallow duplicate properties within declaration blocks. | ✅ | 🔧 |
| `font-family-no-duplicate-names`Disallow duplicate names within font families. | ✅ | |
| `keyframe-block-no-duplicate-selectors`Disallow duplicate selectors within keyframe blocks. | ✅ | |
| `no-duplicate-at-import-rules`Disallow duplicate `@import` rules. | ✅ | |
| `no-duplicate-selectors`Disallow duplicate selectors. | ✅ | |

### Empty

Disallow empty things with these `no-empty` rules.

| | | |
| :-- | :-: | :-: |
| `block-no-empty`Disallow empty blocks. | ✅ | |
| `comment-no-empty`Disallow empty comments. | ✅ | |
| `no-empty-source`Disallow empty sources. | ✅ | |

### Invalid

Disallow invalid syntax with these (sometimes implicit) `no-invalid` rules.

| | | |
| :-- | :-: | :-: |
| `at-rule-prelude-no-invalid`Disallow invalid preludes for at-rules. | ✅ | |
| `color-no-invalid-hex`Disallow invalid hex colors. | | |
| `function-calc-no-unspaced-operator`Disallow invalid unspaced operator within `calc` functions. | ✅ | 🔧 |
| `keyframe-declaration-no-important`Disallow invalid `!important` within keyframe declarations. | ✅ | |
| `media-query-no-invalid`Disallow invalid media queries. | ✅ | |
| `named-grid-areas-no-invalid`Disallow invalid named grid areas. | ✅ | |
| `no-invalid-double-slash-comments`Disallow invalid double-slash comments. | ✅ | |
| `no-invalid-position-at-import-rule`Disallow invalid position `@import` rules. | ✅ | |
| `no-invalid-position-declaration`Disallow invalid position declarations. | ✅ | |
| `selector-no-invalid`Disallow invalid selectors. | | |
| `string-no-newline`Disallow invalid newlines within strings. | ✅ | |
| `syntax-string-no-invalid`Disallow invalid syntax strings. | ✅ | |

### Irregular

Disallow irregular things with these `no-irregular` rules.

| | | |
| :-- | :-: | :-: |
| `no-irregular-whitespace`Disallow irregular whitespace. | ✅ | |

### Missing

Disallow missing things with these `no-missing` rules.

| | | |
| :-- | :-: | :-: |
| `custom-property-no-missing-var-function`Disallow missing `var` function for custom properties. | ✅ | |
| `font-family-no-missing-generic-family-keyword`Disallow a missing generic family keyword within font families. | ✅ | |
| `nesting-selector-no-missing-scoping-root`Disallow missing scoping root for nesting selectors. | ✅ | |

### Non-standard

Disallow non-standard things with these `no-nonstandard` rules.

| | | |
| :-- | :-: | :-: |
| `function-linear-gradient-no-nonstandard-direction`Disallow non-standard direction values for linear gradient functions. | | |

### Overrides

Disallow overrides with these `no-overrides` rules.

| | | |
| :-- | :-: | :-: |
| `declaration-block-no-shorthand-property-overrides`Disallow shorthand properties that override related longhand properties. | ✅ | |

### Unmatchable

Disallow unmatchable things with these `no-unmatchable` rules.

| | | |
| :-- | :-: | :-: |
| `selector-anb-no-unmatchable`Disallow unmatchable An+B selectors. | ✅ | |
| `selector-no-unmatchable`Disallow unmatchable selectors. | | |

### Unknown

Disallow unknown things with these `no-unknown` rules.

| | | |
| :-- | :-: | :-: |
| `annotation-no-unknown`Disallow unknown annotations. | ✅ | |
| `at-rule-descriptor-no-unknown`Disallow unknown at-rule descriptors. | ✅ | |
| `at-rule-descriptor-value-no-unknown`Disallow unknown values for descriptors within at-rules. | ✅ | |
| `at-rule-no-unknown`Disallow unknown at-rules. | ✅ | |
| `declaration-property-value-no-unknown`Disallow unknown values for properties within declarations. | ✅ | |
| `function-no-unknown`Disallow unknown functions. | | |
| `media-feature-name-no-unknown`Disallow unknown media feature names. | ✅ | |
| `media-feature-name-value-no-unknown`Disallow unknown values for media features. | ✅ | |
| `no-unknown-animations`Disallow unknown animations. | | |
| `no-unknown-custom-media`Disallow unknown custom media queries. | | |
| `no-unknown-custom-properties`Disallow unknown custom properties. | | |
| `property-no-unknown`Disallow unknown properties. | ✅ | |
| `selector-pseudo-class-no-unknown`Disallow unknown pseudo-class selectors. | ✅ | |
| `selector-pseudo-element-no-unknown`Disallow unknown pseudo-element selectors. | ✅ | |
| `selector-type-no-unknown`Disallow unknown type selectors. | ✅ | |
| `unit-no-unknown`Disallow unknown units. | | |
