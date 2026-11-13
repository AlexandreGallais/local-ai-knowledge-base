---
title: "number-no-trailing-zeros"
tool: "stylelint-stylistic"
version: "5.3"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/d61d92538fce80f9e25ad9fee7b8018bf7f33e92/lib/rules/number-no-trailing-zeros/README.md"
commit: "d61d92538fce80f9e25ad9fee7b8018bf7f33e92"
license: "MIT"
---

# number-no-trailing-zeros

Disallow trailing zeros in numbers.

```css
a { top: 0.5000px; bottom: 1.0px; }
/**         ↑                ↑
 *        These trailing zeros */
```

The `fix` option can automatically fix some of the problems reported by this rule.

## Options

### `true`

The following patterns are considered problems:

```css
a { top: 1.0px }
```

```css
a { top: 1.01000px }
```

The following patterns are _not_ considered problems:

```css
a { top: 1px }
```

```css
a { top: 1.01px }
```
