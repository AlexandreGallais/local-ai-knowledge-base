---
title: "no-multiple-whitespaces"
tool: "stylelint-stylistic"
version: "5.3"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/d61d92538fce80f9e25ad9fee7b8018bf7f33e92/lib/rules/no-multiple-whitespaces/README.md"
commit: "d61d92538fce80f9e25ad9fee7b8018bf7f33e92"
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

The following patterns are _not_ considered problems:

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
