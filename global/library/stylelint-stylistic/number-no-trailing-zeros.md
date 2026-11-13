---
title: "number-no-trailing-zeros"
tool: "stylelint-stylistic"
version: "6.0"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/3cd01e1c32e87a7d92b99c3a35e869bc36c019bb/lib/rules/number-no-trailing-zeros/README.md"
commit: "3cd01e1c32e87a7d92b99c3a35e869bc36c019bb"
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

The following patterns are _not_ considered problems:

```css
a { top: 1px }
```

```css
a { top: 1.01px }
```
