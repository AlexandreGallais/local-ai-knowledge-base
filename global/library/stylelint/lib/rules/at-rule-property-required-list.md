---
title: "at-rule-property-required-list"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/at-rule-property-required-list/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# at-rule-property-required-list

Specify a list of required properties (or descriptors) for an at-rule.

```css
    @font-face { font-display: swap; font-family: 'foo'; }
/**  ↑           ↑                   ↑
 *  At-rule and required descriptor names */
```

This rule supports 2 message arguments: the at-rule and the required property.

## Options

### `Array<string>`

```json
{ "at-rule-name": ["array", "of", "properties", "or", "descriptors"] }
```

Given:

```json
{
  "at-rule-property-required-list": {
    "font-face": ["font-display", "font-family", "font-style"]
  }
}
```

The following patterns are considered problems:

```css
@font-face {
    font-family: 'foo';
    src: url('./fonts/foo.woff2') format('woff2');
}
```

```css
@font-face {
    font-family: 'foo';
    font-style: normal;
    src: url('./fonts/foo.woff2') format('woff2');
}
```

The following patterns are _not_ considered problems:

```css
@font-face {
    font-display: swap;
    font-family: 'foo';
    font-style: normal;
    src: url('./fonts/foo.woff2') format('woff2');
}
```
