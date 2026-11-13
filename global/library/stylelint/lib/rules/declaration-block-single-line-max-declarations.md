---
title: "declaration-block-single-line-max-declarations"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/declaration-block-single-line-max-declarations/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# declaration-block-single-line-max-declarations

Limit the number of declarations within a single-line declaration block.

```css
a { color: pink; top: 0; }
/** ↑            ↑
 * The number of these declarations */
```

This rule supports 1 message argument: the configured maximum.

## Options

### `number`

Specify a maximum number of declarations allowed.

Given:

```json
{
  "declaration-block-single-line-max-declarations": 1
}
```

The following patterns are considered problems:

```css
a { color: pink; top: 3px; }
```

```css
a,
b { color: pink; top: 3px; }
```

The following patterns are _not_ considered problems:

```css
a { color: pink; }
```

```css
a,
b { color: pink; }
```

```css
a {
  color: pink;
  top: 3px;
}
```
