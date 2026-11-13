---
title: "no-extra-semicolons"
tool: "stylelint-stylistic"
version: "5.3"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/d61d92538fce80f9e25ad9fee7b8018bf7f33e92/lib/rules/no-extra-semicolons/README.md"
commit: "d61d92538fce80f9e25ad9fee7b8018bf7f33e92"
license: "MIT"
---

# no-extra-semicolons

Disallow extra semicolons.

```css
a { color: pink;; }
/**             ↑
 *  This semicolons */
```

This rule ignores semicolons after Less mixins.

The `fix` option can automatically fix all of the problems reported by this rule.

## Options

### `true`

The following patterns are considered problems:

```css
@import "x.css";;
```

```css
@import "x.css";
;
```

```css
a {
  color: pink;;
}
```

```css
a {
  ;color: pink;
}
```

```css
a {
  color: pink;
  ;
}
```

```css
a {
  color: red;
}
;
b {
  color: white;
}
```

The following patterns are _not_ considered problems:

```css
@import "x.css";
```

```css
a {
  color: pink;
}
```
