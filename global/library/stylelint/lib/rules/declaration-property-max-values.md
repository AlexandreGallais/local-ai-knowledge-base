---
title: "declaration-property-max-values"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/declaration-property-max-values/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# declaration-property-max-values

Limit the number of values for a list of properties within declarations.

```css
a { margin: 1px 2px 3px 4px; }
/**         ↑   ↑   ↑   ↑
 *          These values */
```

Use this rule to enforce a convention. For example, limit:

- `/^(margin|padding)$/` to `2` values, as four-value forms are easy to misread
- `font-family` to `3` values, so that font stacks stay short

This rule supports 2 message arguments: the property name and the configured maximum.

## Options

### `Object<string, number>`

```json
{ "property-name": 0 }
```

Specify pairs of a property and a max value. In practice, you should specify any positive integers as max values.

You can specify a regex for a property name, such as `{ "/^margin/": 0 }`.

Given:

```json
{
  "declaration-property-max-values": {
    "border": 2,
    "/^margin/": 1,
    "/(-webkit-)?transform$/": 1
  }
}
```

The following patterns are considered problems:

```css
a { border: 1px solid blue; }
```

```css
a { margin: 1px 2px; }
```

```css
a { margin-inline: 1px 2px; }
```

```css
a { -webkit-transform: scale(1) rotate(30deg); }
```

The following patterns are _not_ considered problems:

```css
a { border: 1px solid; }
```

```css
a { margin: 1px; }
```

```css
a { margin-inline: 1px; }
```

```css
a { -webkit-transform: scale(1); }
```
