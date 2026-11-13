---
title: "selector-pseudo-element-no-unknown"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/selector-pseudo-element-no-unknown/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# selector-pseudo-element-no-unknown

Disallow unknown pseudo-element selectors.

```css
  a::before {}
/**  ↑
 * This pseudo-element selector */
```

This rule considers pseudo-element selectors defined in the CSS Specifications, up to and including Editor's Drafts, to be known.

This rule ignores vendor-prefixed pseudo-element selectors.

This rule supports 1 message argument: the unknown pseudo-element.

## Options

### `true`

```json
{
  "selector-pseudo-element-no-unknown": true
}
```

The following patterns are considered problems:

```css
a::pseudo {}
```

```css
a::PSEUDO {}
```

```css
a::element {}
```

The following patterns are _not_ considered problems:

```css
a:before {}
```

```css
a::before {}
```

```css
::selection {}
```

```css
input::-moz-placeholder {}
```

## Optional secondary options

### `ignorePseudoElements`

```json
{ "ignorePseudoElements": ["array", "of", "pseudo-elements", "/regex/"] }
```

Given:

```json
{
  "selector-pseudo-element-no-unknown": [
    true,
    { "ignorePseudoElements": ["/^--my-/", "--pseudo-element"] }
  ]
}
```

The following patterns are _not_ considered problems:

```css
a::--my-pseudo {}
```

```css
a::--my-other-pseudo {}
```

```css
a::--pseudo-element {}
```
