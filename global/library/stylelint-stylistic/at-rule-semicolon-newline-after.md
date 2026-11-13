---
title: "at-rule-semicolon-newline-after"
tool: "stylelint-stylistic"
version: "5.3"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/d61d92538fce80f9e25ad9fee7b8018bf7f33e92/lib/rules/at-rule-semicolon-newline-after/README.md"
commit: "d61d92538fce80f9e25ad9fee7b8018bf7f33e92"
license: "MIT"
---

# at-rule-semicolon-newline-after

Require a newline after the semicolon of at-rules.

```css
@import url("x.css");
@import url("y.css");
/**                 ↑
 * The newline after these semicolons */
```

This rule allows an end-of-line comment followed by a newline. For example:

```css
@import url("x.css"); /* end-of-line comment */

a {}
```

A comment on a line of its own stands behind that newline already, so whatever follows the comment on its line is none of this rule's business:

```css
@import url("x.css");
/* comment */ a {}
```

The `fix` option can automatically fix all of the problems reported by this rule.

## Options

`string`: `"always"`

### `"always"`

There _must always_ be a newline after the semicolon.

The following patterns are considered problems:

```css
@import url("x.css"); @import url("y.css");
```

```css
@import url("x.css"); a {}
```

The following patterns are _not_ considered problems:

```css
@import url("x.css");
@import url("y.css");
```

```css
@import url("x.css"); /* end-of-line comment */
a {}
```

```css
@import url("x.css");

a {}
```
