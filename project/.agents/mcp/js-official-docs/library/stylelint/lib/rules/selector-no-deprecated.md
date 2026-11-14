---
title: "selector-no-deprecated"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/selector-no-deprecated/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# selector-no-deprecated

Disallow deprecated selectors.

```css
nobr {}
/** ↑
 * This selector */
```

Use this rule to avoid selectors that browsers may remove at any time, e.g. `::shadow`. Some already have, and a removed selector invalidates the whole rule.

This rule reports selectors that were removed or deprecated after being in the CSS specifications, including Editor Drafts, and were either:

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
