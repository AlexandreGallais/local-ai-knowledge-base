---
title: "declaration-block-no-shorthand-property-overrides"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/declaration-block-no-shorthand-property-overrides/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# declaration-block-no-shorthand-property-overrides

Disallow shorthand properties that override related longhand properties.

```css
a { background-repeat: repeat; background: green; }
/**                            ↑
 * This overrides the longhand property before it */
```

Use this rule to avoid longhands that a later shorthand silently undoes. Browsers reset every longhand a shorthand covers.

This rule reports physical shorthands, like `padding`, that override flow-relative properties, such as `padding-inline`.

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
  padding-inline: 10px;
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
a { padding: 10px; padding-inline: 20px; }
```

```css
a { transition-property: opacity; } a { transition: opacity 1s linear; }
```

```css
a { transition-property: opacity; -webkit-transition: opacity 1s linear; }
```
