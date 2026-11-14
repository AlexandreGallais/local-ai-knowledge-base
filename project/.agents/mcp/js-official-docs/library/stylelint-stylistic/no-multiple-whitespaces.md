---
title: "no-multiple-whitespaces"
tool: "stylelint-stylistic"
version: "6.0"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/3cd01e1c32e87a7d92b99c3a35e869bc36c019bb/lib/rules/no-multiple-whitespaces/README.md"
commit: "3cd01e1c32e87a7d92b99c3a35e869bc36c019bb"
license: "MIT"
---

# no-multiple-whitespaces

Disallow multiple whitespaces.

```css
.foo { background: linear-gradient(rgb(0··0··0), white)··no-repeat }
/**                                      ↑  ↑           ↑
 *                                       These whitespaces
 */
```

The `fix` option can automatically fix most of the problems reported by this rule.

Where the configuration lists `named-grid-areas-alignment` with its `alignColumns` option, this rule leaves alone the runs between the tokens of a row line of a `grid-template` or `grid` shorthand, which that rule pads into columns.

A run inside a comment is left alone. Where an unquoted address opens straight behind a lower-case `url(`, plain CSS and Less read comment delimiters as part of the address, so a run written there is collapsed.

## Options

### `true`

The following patterns are considered problems:

```css
a { gap: 1em  2em }
```

```css
a { transform: translate(50%,  50%) }
```

```css
a { aspect-ratio: 1  /  2 }
```

```css
a { border: 1px  solid   black }
```

```css
a { color: rgb(0  0   0    /    0) }
```

The following patterns are _not_ considered problems:

```css
a { gap: 1em 2em }
```

```css
a { transform: translate(50%, 50%) }
```

```css
a { aspect-ratio: 1 / 2 }
```

```css
a { border: 1px solid black }
```

```css
a { color: rgb(0 0 0 / 0) }
```
