---
title: "selector-no-deprecated"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/selector-no-deprecated/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# selector-no-deprecated

Disallow deprecated selectors.

```css
nobr {}
/** ↑
 * This selector */
```

This rule flags selectors that were removed or deprecated after being in the CSS specifications, including Editor Drafts, and were either:

- shipped in a release browser version
- shipped in a pre-release browser version
- shipped but behind feature flags
- polyfilled with some adoption before any browser shipped
- given an MDN page

The `fix` option can automatically fix some of the problems reported by this rule.

This rule supports up to 2 message arguments: the deprecated selector, or the selector and its replacement.

## Options

### `true`

```json
{
  "selector-no-deprecated": true
}
```

The following patterns are considered problems:

```css
acronym {}
```

```css
a:focus-ring {}
```

```css
.foo::shadow a {}
```

The following patterns are _not_ considered problems:

```css
abbr {}
```

```css
a:focus-visible {}
```

## Optional secondary options

### `ignoreSelectors`

```json
{ "ignoreSelectors": ["array", "of", "selectors", "/regex/"] }
```

Given:

```json
{
  "selector-no-deprecated": [true, { "ignoreSelectors": ["contains", "/ern/"] }]
}
```

The following patterns are _not_ considered problems:

```css
:contains(a) {}
```

```css
svg hkern, vkern {}
```
