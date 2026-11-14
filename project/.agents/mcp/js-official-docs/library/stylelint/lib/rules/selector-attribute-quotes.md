---
title: "selector-attribute-quotes"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/selector-attribute-quotes/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# selector-attribute-quotes

Require or disallow quotes for attribute values.

```css
[target="_blank"] {}
/**     ↑      ↑
 * These quotes */
```

Use this rule to enforce a convention. Quotes around an attribute value are required when it contains spaces or special characters, and optional otherwise.

Choose:

- `"always"` so that any value works, e.g. `[href="/"]`
- `"never"` for brevity, as this rule allows the quotes a value needs

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
