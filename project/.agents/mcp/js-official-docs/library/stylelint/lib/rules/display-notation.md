---
title: "display-notation"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/display-notation/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# display-notation

Specify short or full notation for the `display` property.

```css
a { display: block; }
/**          ↑
 *           This notation */
```

Use this rule to enforce a convention. The `display` property accepts a multi-keyword syntax that names the outer and inner display types separately, e.g. `inline flex`. Each single keyword maps to such a pair, e.g. `inline-flex` to `inline flex` and `block` to `block flow`.

Choose:

- `"full"` to compose values from their outer and inner display types, which makes it easier to understand how an element will behave
- `"short"` for brevity and older browsers, which accept only the single-keyword syntax

This rule ignores `$sass`, `@less`, and `var(--custom-property)` variable syntaxes.

The `fix` option can automatically fix all of the problems reported by this rule.

This rule supports 2 message arguments: the display value and its expected notation.

## Options

### `"full"`

Applicable display values _must always_ use the full notation.

```json
{
  "display-notation": "full"
}
```

The following patterns are considered problems:

```css
a { display: block; }
```

```css
a { display: grid; }
```

```css
a { display: list-item; }
```

The following patterns are _not_ considered problems:

```css
a { display: block flow; }
```

```css
a { display: block grid; }
```

```css
a { display: block flow list-item; }
```

### `"short"`

Applicable display values _must always_ use the short notation.

```json
{
  "display-notation": "short"
}
```

The following patterns are considered problems:

```css
a { display: block flow; }
```

```css
a { display: block grid; }
```

```css
a { display: block flow list-item; }
```

The following patterns are _not_ considered problems:

```css
a { display: block; }
```

```css
a { display: grid; }
```

```css
a { display: list-item; }
```
