---
title: "selector-pseudo-class-no-unknown"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/selector-pseudo-class-no-unknown/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# selector-pseudo-class-no-unknown

Disallow unknown pseudo-class selectors.

```css
  a:hover {}
/** ↑
 * This pseudo-class selector */
```

Use this rule to avoid mistyped pseudo-classes, e.g. `:hovr`. Browsers ignore the whole rule, as an unknown pseudo-class invalidates the selector.

This rule considers pseudo-class selectors defined in the CSS Specifications, up to and including Editor's Drafts, to be known.

This rule ignores vendor-prefixed pseudo-class selectors.

This rule supports 1 message argument: the unknown pseudo-class.

## Options

### `true`

```json
{
  "selector-pseudo-class-no-unknown": true
}
```

The following patterns are considered problems:

```css
a:unknown {}
```

```css
a:UNKNOWN {}
```

```css
a:hoverr {}
```

The following patterns are _not_ considered problems:

```css
a:hover {}
```

```css
a:focus {}
```

```css
:not(p) {}
```

```css
input:-moz-placeholder {}
```

## Optional secondary options

### `ignorePseudoClasses`

```json
{ "ignorePseudoClasses": ["array", "of", "pseudo-classes", "/regex/"] }
```

Given:

```json
{
  "selector-pseudo-class-no-unknown": [
    true,
    { "ignorePseudoClasses": ["/^--my-/", "--pseudo-class"] }
  ]
}
```

The following patterns are _not_ considered problems:

```css
a:--my-pseudo {}
```

```css
a:--my-other-pseudo {}
```

```css
a:--pseudo-class {}
```
