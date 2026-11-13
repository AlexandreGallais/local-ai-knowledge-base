---
title: "function-max-empty-lines"
tool: "stylelint-stylistic"
version: "6.0"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/3cd01e1c32e87a7d92b99c3a35e869bc36c019bb/lib/rules/function-max-empty-lines/README.md"
commit: "3cd01e1c32e87a7d92b99c3a35e869bc36c019bb"
license: "MIT"
---

# function-max-empty-lines

Limit the number of adjacent empty lines within functions.

```css
a {
  transform:
    translate(
                /* ← */
      1,        /* ↑ */
                /* ← */
      1         /* ↑ */
                /* ← */
    );          /* ↑ */
}               /* ↑ */
/**                ↑
 *            These lines */
```

The `fix` option can automatically fix all of the problems reported by this rule.

The `message` secondary option can accept the arguments of this rule.

## Options

`int`: Maximum number of adjacent empty lines allowed.

For example, with `0`:

The following patterns are considered problems:

```css
a {
  transform:
    translate(

      1,
      1
    );
}
```

```css
a {
  transform:
    translate(
      1,

      1
    );
}
```

```css
a {
  transform:
    translate(
      1,
      1

    );
}
```

The following patterns are _not_ considered problems:

```css
a {
  transform:
    translate(
      1,
      1
    );
}
```
