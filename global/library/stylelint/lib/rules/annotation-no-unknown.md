---
title: "annotation-no-unknown"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/annotation-no-unknown/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# annotation-no-unknown

Disallow unknown annotations.

```css
a { color: green !imprtant; }
/**              ↑
 * This annotation */
```

Use this rule to avoid mistyped annotations, e.g. `!imprtant`. Browsers ignore declarations with unknown annotations.

This rule considers annotations defined in the CSS Specifications, up to and including Editor's Drafts, to be known.

This rule supports 1 message argument: the unknown annotation.

## Options

### `true`

```json
{
  "annotation-no-unknown": true
}
```

The following pattern is considered a problem:

```css
a {
  color: green !imprtant;
}
```

The following pattern is _not_ considered a problem:

```css
a {
  color: green !important;
}
```

## Optional secondary options

### `ignoreAnnotations`

```json
{ "ignoreAnnotations": ["array", "of", "annotations", "/regex/"] }
```

Given:

```json
{
  "annotation-no-unknown": [
    true,
    { "ignoreAnnotations": ["/^--foo-/", "--bar"] }
  ]
}
```

The following patterns are _not_ considered problems:

```css
a {
  color: green !--foo--bar;
}
```

```css
a {
  color: green !--bar;
}
```
