---
title: "number-leading-zero"
tool: "stylelint-stylistic"
version: "5.3"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/d61d92538fce80f9e25ad9fee7b8018bf7f33e92/lib/rules/number-leading-zero/README.md"
commit: "d61d92538fce80f9e25ad9fee7b8018bf7f33e92"
license: "MIT"
---

# number-leading-zero

Require or disallow a leading zero for fractional numbers less than 1.

```css
a { line-height: 0.5; }
/**              ↑
 * This leading zero */
```

This rule ignores mixin parameters in Less.

The `fix` option can automatically fix all of the problems reported by this rule.

## Options

`string`: `"always"|"never"`

### `"always"`

There _must always_ be a leading zero.

The following patterns are considered problems:

```css
a { line-height: .5; }
```

```css
a { transform: translate(2px, .4px); }
```

The following patterns are _not_ considered problems:

```css
a { line-height: 0.5; }
```

```css
a { transform: translate(2px, 0.4px); }
```

### `"never"`

There _must never_ be a leading zero.

The following patterns are considered problems:

```css
a { line-height: 0.5; }
```

```css
a { transform: translate(2px, 0.4px); }
```

The following patterns are _not_ considered problems:

```css
a { line-height: .5; }
```

```css
a { transform: translate(2px, .4px); }
```
