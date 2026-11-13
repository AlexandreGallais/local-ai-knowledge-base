---
title: "selector-attribute-quotes"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/selector-attribute-quotes/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# selector-attribute-quotes

Require or disallow quotes for attribute values.

```css
[target="_blank"] {}
/**     ↑      ↑
 * These quotes */
```

The `fix` option can automatically fix most of the problems reported by this rule.

This rule supports 1 message argument: the attribute value.

## Options

### `"always"`

Attribute values _must always_ be quoted.

```json
{
  "selector-attribute-quotes": "always"
}
```

The following patterns are considered problems:

```css
[title=flower] {}
```

```css
[class^=top] {}
```

The following patterns are _not_ considered problems:

```css
[title] {}
```

```css
[target="_blank"] {}
```

```css
[class|="top"] {}
```

```css
[title~='text'] {}
```

```css
[data-attribute='component'] {}
```

### `"never"`

Attribute values _must never_ be quoted.

```json
{
  "selector-attribute-quotes": "never"
}
```

The following patterns are considered problems:

```css
[target="_blank"] {}
```

```css
[class|="top"] {}
```

```css
[title~='text'] {}
```

```css
[data-attribute='component'] {}
```

The following patterns are _not_ considered problems:

```css
[title] {}
```

```css
[title=flower] {}
```

```css
[class^=top] {}
```
