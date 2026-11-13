---
title: "number-leading-zero"
tool: "stylelint-stylistic"
version: "6.0"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/3cd01e1c32e87a7d92b99c3a35e869bc36c019bb/lib/rules/number-leading-zero/README.md"
commit: "3cd01e1c32e87a7d92b99c3a35e869bc36c019bb"
license: "MIT"
---

# number-leading-zero

Require or disallow a leading zero for fractional numbers less than 1.

```css
a { line-height: 0.5; }
/**              ↑
 * This leading zero */
```

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

The following patterns are _not_ considered problems:

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

The following patterns are _not_ considered problems:

```css
a { line-height: .5; }
```

```css
a { transform: translate(2px, .4px); }
```
