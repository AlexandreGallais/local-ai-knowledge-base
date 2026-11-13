---
title: "selector-pseudo-element-case"
tool: "stylelint-stylistic"
version: "5.3"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/d61d92538fce80f9e25ad9fee7b8018bf7f33e92/lib/rules/selector-pseudo-element-case/README.md"
commit: "d61d92538fce80f9e25ad9fee7b8018bf7f33e92"
license: "MIT"
---

# selector-pseudo-element-case

Specify lowercase or uppercase for pseudo-element selectors.

```css
  a::before {}
/**  ↑
 * This pseudo-element selector */
```

The `fix` option can automatically fix all of the problems reported by this rule.

The `message` secondary option can accept the arguments of this rule.

## Options

`string`: `"lower"|"upper"`

### `"lower"`

The following patterns are considered problems:

```css
a:Before {}
```

```css
a:bEfOrE {}
```

```css
a:BEFORE {}
```

```css
a::Before {}
```

```css
a::bEfOrE {}
```

```css
a::BEFORE {}
```

```css
input::-MOZ-PLACEHOLDER {}
```

The following patterns are _not_ considered problems:

```css
a:before {}
```

```css
a::before {}
```

```css
input::-moz-placeholder {}
```

### `"upper"`

The following patterns are considered problems:

```css
a:Before {}
```

```css
a:bEfOrE {}
```

```css
a:BEFORE {}
```

```css
a::Before {}
```

```css
a::bEfOrE {}
```

```css
a::before {}
```

```css
input::-moz-placeholder {}
```

The following patterns are _not_ considered problems:

```css
a:BEFORE {}
```

```css
a::BEFORE {}
```

```css
input::-MOZ-PLACEHOLDER {}
```
