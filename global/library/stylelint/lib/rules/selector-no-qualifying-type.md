---
title: "selector-no-qualifying-type"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/selector-no-qualifying-type/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# selector-no-qualifying-type

Disallow qualifying a selector by type.

```css
    a.foo {}
/** ↑
 * This type selector is qualifying the class */
```

Use this rule to enforce a convention, as `.card` works on any element and has a lower specificity than `a.card`.

A type selector is "qualifying" when it is compounded with (chained to) another selector (e.g. `a.foo`, `a#foo`). This rule does not regulate type selectors that are combined with other selectors via a combinator (e.g. `a > .foo`, `a #foo`).

This rule resolves nested selectors according the CSS Nesting specification.

> **Warning:**
> This rule is only appropriate for CSS. You should not turn it on for CSS-like languages, such as SCSS or Less.

This rule supports 2 message arguments: the selector and the qualifying type.

## Options

### `true`

```json
{
  "selector-no-qualifying-type": true
}
```

The following patterns are considered problems:

```css
a.foo {
  margin: 0
}
```

```css
a#foo {
  margin: 0
}
```

```css
input[type='button'] {
  margin: 0
}
```

```css
a:is(#foo, #bar) {
  margin: 0
}
```

```css
a {
  #foo {
    margin: 0
  }
}
```

The following patterns are _not_ considered problems:

```css
.foo {
  margin: 0
}
```

```css
#foo {
  margin: 0
}
```

```css
input {
  margin: 0
}
```

## Optional secondary options

### `ignore`

```json
{ "ignore": ["array", "of", "options"] }
```

#### `"attribute"`

Allow attribute selectors qualified by type.

```json
{
  "selector-no-qualifying-type": [true, { "ignore": ["attribute"] }]
}
```

The following patterns are _not_ considered problems:

```css
input[type='button'] {
  margin: 0
}
```

#### `"class"`

Allow class selectors qualified by type.

```json
{
  "selector-no-qualifying-type": [true, { "ignore": ["class"] }]
}
```

The following patterns are _not_ considered problems:

```css
a.foo {
  margin: 0
}
```

#### `"id"`

Allow ID selectors qualified by type.

```json
{
  "selector-no-qualifying-type": [true, { "ignore": ["id"] }]
}
```

The following patterns are _not_ considered problems:

```css
a#foo {
  margin: 0
}
```
