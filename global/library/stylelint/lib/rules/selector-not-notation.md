---
title: "selector-not-notation"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/selector-not-notation/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# selector-not-notation

Specify simple or complex notation for `:not()` pseudo-class selectors.

```css
    a:not(.foo, .bar) {}
/**  ↑
 * This notation */
```

In Selectors Level 3, only a single _simple selector_ was allowed as the argument to `:not()`, whereas Selectors Level 4 allows a _selector list_.

Use:

- `"complex"` to author modern Selectors Level 4 CSS
- `"simple"` for backwards compatibility with older browsers

> **Note:**
> The notations can have different specificities. For example:

```css
/* this complex notation has a specificity of 0,1,1 */
a:not(.foo, .bar) {}

/* this simple notation has a specificity of 0,2,1 */
a:not(.foo):not(.bar) {}
```

The `fix` option option can automatically fix most of the problems reported by this rule.

This rule supports 1 message argument: the configured notation.

## Options

### `"simple"`

```json
{
  "selector-not-notation": "simple"
}
```

The following patterns are considered problems:

```css
:not(a, div) {}
```

```css
:not(a.foo) {}
```

The following patterns are _not_ considered problems:

```css
:not(a):not(div) {}
```

```css
:not(a) {}
```

### `"complex"`

```json
{
  "selector-not-notation": "complex"
}
```

The following pattern is considered a problem:

```css
:not(a):not(div) {}
```

The following patterns are _not_ considered problems:

```css
:not(a, div) {}
```

```css
:not(a.foo) {}
```

```css
:not(a).foo:not(:empty) {}
```
