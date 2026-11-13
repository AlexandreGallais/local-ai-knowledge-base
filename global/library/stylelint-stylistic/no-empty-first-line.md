---
title: "no-empty-first-line"
tool: "stylelint-stylistic"
version: "5.3"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/d61d92538fce80f9e25ad9fee7b8018bf7f33e92/lib/rules/no-empty-first-line/README.md"
commit: "d61d92538fce80f9e25ad9fee7b8018bf7f33e92"
license: "MIT"
---

# no-empty-first-line

Disallow empty first lines.

```css
    \n
    /** ↑
     * This newline */
    a { color: pink; }
```

This rule ignores empty sources. Use the `no-empty-source` rule to disallow these.

The `fix` option can automatically fix all of the problems reported by this rule.

## Options

### `true`

The following patterns are considered problems:

```css
\n
a { color: pink; }
```

The following patterns are _not_ considered problems:

```css
a { color: pink; }
```
