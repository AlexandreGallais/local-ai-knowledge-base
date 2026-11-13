---
title: "block-opening-brace-newline-after"
tool: "stylelint-stylistic"
version: "5.3"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/d61d92538fce80f9e25ad9fee7b8018bf7f33e92/lib/rules/block-opening-brace-newline-after/README.md"
commit: "d61d92538fce80f9e25ad9fee7b8018bf7f33e92"
license: "MIT"
---

# block-opening-brace-newline-after

Require a newline after the opening brace of blocks.

```css
  a {
    ↑ color: pink; }
/** ↑
 * The newline after this brace */
```

This rule allows an end-of-line comment followed by a newline. For example,

```css
a { /* end-of-line comment */
  color: pink;
}
```

The `fix` option can automatically fix all of the problems reported by this rule.

## Options

`string`: `"always"|"always-multi-line"|"never-multi-line"`

### `"always"`

There _must always_ be a newline after the opening brace.

The following patterns are considered problems:

```css
a{ color: pink; }
```

```css
a{ color: pink;
}
```

```css
a{ /* end-of-line comment
  with a newline */
  color: pink;
}
```

The following patterns are _not_ considered problems:

```css
a {
color: pink; }
```

```css
a
{
color: pink; }
```

```css
a { /* end-of-line comment */
  color: pink;
}
```

### `"always-multi-line"`

There _must always_ be a newline after the opening brace in multi-line blocks.

The following patterns are considered problems:

```css
a{color: pink;
}
```

The following patterns are _not_ considered problems:

```css
a { color: pink; }
```

```css
a {
color: pink; }
```

### `"never-multi-line"`

There _must never_ be whitespace after the opening brace in multi-line blocks.

The following patterns are considered problems:

```css
a { color: pink;
}
```

The following patterns are _not_ considered problems:

```css
a { color: pink; }
```

```css
a {color: pink;
}
```

## Optional secondary options

### `ignore: ["rules"]`

Ignore the opening brace of rules.

For example, with `"always"`:

The following pattern is _not_ considered a problem:

```css
a { color: pink; }
```
