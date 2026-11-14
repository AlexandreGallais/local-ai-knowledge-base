---
title: "selector-pseudo-class-parentheses-space-inside"
tool: "stylelint-stylistic"
version: "6.0"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/3cd01e1c32e87a7d92b99c3a35e869bc36c019bb/lib/rules/selector-pseudo-class-parentheses-space-inside/README.md"
commit: "3cd01e1c32e87a7d92b99c3a35e869bc36c019bb"
license: "MIT"
---

# selector-pseudo-class-parentheses-space-inside

Require a single space or disallow whitespace on the inside of the parentheses within pseudo-class selectors.

```css
input:not( [type="submit"] ) {}
/**      ↑                 ↑
 * The space inside these two parentheses */
```

The `fix` option can automatically fix the problems reported by this rule, leaving any comment inside the parentheses where it is.

An empty argument, as in `input:not()` or `input:not(,[type="submit"])`, has no inside to space out; where whitespace stands at one, the whole list is passed over. An end of the parentheses whose whitespace is the line break closing an inline comment is passed over too.

## Options

`string`: `"always"|"never"`

### `"always"`

There _must always_ be a single space inside the parentheses.

The following patterns are considered problems:

```css
input:not([type="submit"]) {}
```

```css
input:not([type="submit"] ) {}
```

The following patterns are _not_ considered problems:

```css
input:not( [type="submit"] ) {}
```

### `"never"`

There _must never_ be whitespace on the inside the parentheses.

The following patterns are considered problems:

```css
input:not( [type="submit"] ) {}
```

```css
input:not( [type="submit"]) {}
```

The following patterns are _not_ considered problems:

```css
input:not([type="submit"]) {}
```
