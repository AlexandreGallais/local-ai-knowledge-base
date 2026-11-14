---
title: "color-hex-case"
tool: "stylelint-stylistic"
version: "6.0"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/3cd01e1c32e87a7d92b99c3a35e869bc36c019bb/lib/rules/color-hex-case/README.md"
commit: "3cd01e1c32e87a7d92b99c3a35e869bc36c019bb"
license: "MIT"
---

# color-hex-case

Specify lowercase or uppercase for hex colors.

```css
a { color: #fff }
/**        ↑
 * This hex color */
```

The `fix` option can automatically fix all of the problems reported by this rule.

The `message` secondary option can accept the arguments of this rule.

## Options

`string`: `"lower"|"upper"`

### `"lower"`

The following patterns are considered problems:

```css
a { color: #FFF; }
```

The following patterns are _not_ considered problems:

```css
a { color: #000; }
```

```css
a { color: #fff; }
```

### `"upper"`

The following patterns are considered problems:

```css
a { color: #fff; }
```

The following patterns are _not_ considered problems:

```css
a { color: #000; }
```

```css
a { color: #FFF; }
```
