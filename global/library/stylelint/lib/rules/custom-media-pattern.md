---
title: "custom-media-pattern"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/custom-media-pattern/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# custom-media-pattern

Specify a pattern for custom media query names.

```css
@custom-media --foo (max-width: 30em);
/**             ↑
 * The pattern of this */
```

This rule supports 2 message arguments: the custom media name and the configured pattern.

## Options

### `string`

Specify a regex string not surrounded with `"/"`.

Given:

```json
{
  "custom-media-pattern": "foo-.+"
}
```

The following patterns are considered problems:

```css
@custom-media --bar (min-width: 30em);
```

The following patterns are _not_ considered problems:

```css
@custom-media --foo-bar (min-width: 30em);
```
