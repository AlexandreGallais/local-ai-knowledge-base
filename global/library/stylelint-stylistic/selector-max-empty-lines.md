---
title: "selector-max-empty-lines"
tool: "stylelint-stylistic"
version: "5.3"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/d61d92538fce80f9e25ad9fee7b8018bf7f33e92/lib/rules/selector-max-empty-lines/README.md"
commit: "d61d92538fce80f9e25ad9fee7b8018bf7f33e92"
license: "MIT"
---

# selector-max-empty-lines

Limit the number of adjacent empty lines within selectors.

```css
a,
              /* ← */
b {        /* ↑ */
  color: red; /* ↑ */
}             /* ↑ */
/**              ↑
 *        This empty line */
```

The `fix` option can automatically fix all of the problems reported by this rule.

The `message` secondary option can accept the arguments of this rule.

## Options

`int`: Maximum number of adjacent empty lines allowed.

For example, with `0`:

The following patterns are considered problems:

```css
a

b {
  color: red;
}
```

```css
a,

b {
  color: red;
}
```

```css
a

>
b {
  color: red;
}
```

```css
a
>

b {
  color: red;
}
```

The following patterns are _not_ considered problems:

```css
a b {
  color: red;
}
```

```css
a
b {
  color: red;
}
```

```css
a,
b {
  color: red;
}
```

```css
a > b {
  color: red;
}
```

```css
a
>
b {
  color: red;
}
```
