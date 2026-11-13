---
title: "annotation-no-unknown"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/annotation-no-unknown/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# annotation-no-unknown

Disallow unknown annotations.

```css
a { color: green !imprtant; }
/**              ↑
 * This annotation */
```

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
