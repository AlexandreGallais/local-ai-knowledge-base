---
title: "unicode-bom"
tool: "stylelint-stylistic"
version: "5.3"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/d61d92538fce80f9e25ad9fee7b8018bf7f33e92/lib/rules/unicode-bom/README.md"
commit: "d61d92538fce80f9e25ad9fee7b8018bf7f33e92"
license: "MIT"
---

# unicode-bom

Require or disallow the Unicode Byte Order Mark.

## Options

`string`: `"always"|"never"`

### `"always"`

The following pattern is considered a problem:

```css
a {}
```

The following pattern is _not_ considered a problem:

```css
U+FEFF
a {}
```

### `"never"`

The following pattern is considered a problem:

```css
U+FEFF
a {}
```

The following pattern is _not_ considered a problem:

```css
a {}
```
