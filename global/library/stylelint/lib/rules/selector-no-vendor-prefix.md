---
title: "selector-no-vendor-prefix"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/selector-no-vendor-prefix/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# selector-no-vendor-prefix

Disallow vendor prefixes for selectors.

```css
input::-moz-placeholder {}
/**     ↑
 * This prefix */
```

This rule ignores non-standard vendor-prefixed selectors that aren't handled by Autoprefixer.

The `fix` option can automatically fix all of the problems reported by this rule. However, it will not remove duplicate selectors produced when the prefixes are removed. You can use Autoprefixer itself, with the `add` option off and the `remove` option on, in these situations.

This rule supports 1 message argument: the vendor-prefixed selector.

## Options

### `true`

```json
{
  "selector-no-vendor-prefix": true
}
```

The following patterns are considered problems:

```css
input::-moz-placeholder {}
```

```css
:-webkit-full-screen a {}
```

The following patterns are _not_ considered problems:

```css
input::placeholder {}
```

```css
:full-screen a {}
```

## Optional secondary options

### `ignoreSelectors`

```json
{ "ignoreSelectors": ["array", "of", "selectors", "/regex/"] }
```

Ignore vendor prefixes for selectors.

Given:

```json
{
  "selector-no-vendor-prefix": [
    true,
    { "ignoreSelectors": ["::-webkit-input-placeholder", "/-moz-.*/"] }
  ]
}
```

The following patterns are _not_ considered problems:

```css
input::-webkit-input-placeholder {
  color: pink;
}

input::-moz-placeholder {
  color: pink;
}
```
