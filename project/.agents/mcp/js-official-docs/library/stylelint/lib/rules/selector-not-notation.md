---
title: "selector-not-notation"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/selector-not-notation/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# selector-not-notation

Specify simple or complex notation for `:not()` pseudo-class selectors.

```css
    a:not(.foo, .bar) {}
/**  ↑
 * This notation */
```

Use this rule to enforce a convention. In Selectors Level 3, only a single _simple selector_ was allowed as the argument to `:not()`, whereas Selectors Level 4 allows a _selector list_.

Choose:

- `"complex"` to author modern Selectors Level 4 CSS
- `"simple"` for older browsers, which accept only a single simple selector

> **Note:**
> The notations can have different specificities. For example:

```css
/* this complex notation has a specificity of 0,1,1 */
a:not(.foo, .bar) {}

/* this simple notation has a specificity of 0,2,1 */
a:not(.foo):not(.bar) {}
```

The `fix` option can automatically fix most of the problems reported by this rule.

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
