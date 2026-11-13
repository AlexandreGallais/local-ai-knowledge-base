---
title: "declaration-block-no-shorthand-property-overrides"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/declaration-block-no-shorthand-property-overrides/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# declaration-block-no-shorthand-property-overrides

Disallow shorthand properties that override related longhand properties.

```css
a { background-repeat: repeat; background: green; }
/**                            ↑
 * This overrides the longhand property before it */
```

In almost every case, this is just an authorial oversight. For more about this behavior, see MDN's documentation of shorthand properties.

This rule supports 2 message arguments: the shorthand property and the overridden longhand declaration.

## Options

### `true`

```json
{
  "declaration-block-no-shorthand-property-overrides": true
}
```

The following patterns are considered problems:

```css
a {
  padding-left: 10px;
  padding: 20px;
}
```

```css
a {
  transition-property: opacity;
  transition: opacity 1s linear;
}
```

```css
a {
  -webkit-transition-property: opacity;
  -webkit-transition: opacity 1s linear;
}
```

```css
a {
  border-top-width: 1px;
  top: 0;
  bottom: 3px;
  border: 2px solid blue;
}
```

The following patterns are _not_ considered problems:

```css
a { padding: 10px; padding-left: 20px; }
```

```css
a { transition-property: opacity; } a { transition: opacity 1s linear; }
```

```css
a { transition-property: opacity; -webkit-transition: opacity 1s linear; }
```
