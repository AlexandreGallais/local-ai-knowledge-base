---
title: "selector-pseudo-class-case"
tool: "stylelint-stylistic"
version: "6.0"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/3cd01e1c32e87a7d92b99c3a35e869bc36c019bb/lib/rules/selector-pseudo-class-case/README.md"
commit: "3cd01e1c32e87a7d92b99c3a35e869bc36c019bb"
license: "MIT"
---

# selector-pseudo-class-case

Specify lowercase or uppercase for pseudo-class selectors.

```css
  a:hover {}
/** ↑
 * This pseudo-class selector */
```

The `fix` option can automatically fix all of the problems reported by this rule.

The `message` secondary option can accept the arguments of this rule.

## Options

`string`: `"lower"|"upper"`

### `"lower"`

The following patterns are considered problems:

```css
a:Hover {}
```

```css
a:hOvEr {}
```

```css
a:HOVER {}
```

```css
:ROOT {}
```

```css
:-MS-INPUT-PLACEHOLDER {}
```

The following patterns are _not_ considered problems:

```css
a:hover {}
```

```css
:root {}
```

```css
:-ms-input-placeholder {}
```

### `"upper"`

The following patterns are considered problems:

```css
a:Hover {}
```

```css
a:hOvEr {}
```

```css
a:hover {}
```

```css
:root {}
```

```css
:-ms-input-placeholder {}
```

The following patterns are _not_ considered problems:

```css
a:HOVER {}
```

```css
:ROOT {}
```

```css
:-MS-INPUT-PLACEHOLDER {}
```
