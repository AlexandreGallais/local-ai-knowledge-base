---
title: "block-opening-brace-space-after"
tool: "stylelint-stylistic"
version: "6.0"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/3cd01e1c32e87a7d92b99c3a35e869bc36c019bb/lib/rules/block-opening-brace-space-after/README.md"
commit: "3cd01e1c32e87a7d92b99c3a35e869bc36c019bb"
license: "MIT"
---

# block-opening-brace-space-after

Require a single space or disallow whitespace after the opening brace of blocks.

```css
  a { color: pink; }
/** ↑
 * The space after this brace */
```

The `fix` option can automatically fix all of the problems reported by this rule.

## Options

`string`: `"always"|"never"|"always-single-line"|"never-single-line"|"always-multi-line"|"never-multi-line"`

### `"always"`

There _must always_ be a single space after the opening brace.

The following patterns are considered problems:

```css
a {color: pink; }
```

```css
a {
color: pink; }
```

The following patterns are _not_ considered problems:

```css
a { color: pink; }
```

```css
a { color: pink;
}
```

### `"never"`

There _must never_ be whitespace after the opening brace.

The following patterns are considered problems:

```css
a { color: pink; }
```

```css
a {
color: pink; }
```

The following patterns are _not_ considered problems:

```css
a {color: pink; }
```

```css
a
{color: pink; }
```

### `"always-single-line"`

There _must always_ be a single space after the opening brace in single-line blocks.

The following patterns are considered problems:

```css
a {color: pink; }
```

The following patterns are _not_ considered problems:

```css
a { color: pink; }
```

```css
a {color: pink;
}
```

### `"never-single-line"`

There _must never_ be whitespace after the opening brace in single-line blocks.

The following patterns are considered problems:

```css
a { color: pink; }
```

The following patterns are _not_ considered problems:

```css
a {color: pink; }
```

```css
a { color: pink;
}
```

### `"always-multi-line"`

There _must always_ be a single space after the opening brace in multi-line blocks.

The following patterns are considered problems:

```css
a {color: pink;
}
```

The following patterns are _not_ considered problems:

```css
a {color: pink; }
```

```css
a { color: pink;
}
```

### `"never-multi-line"`

There _must never_ be whitespace after the opening brace in multi-line blocks.

The following patterns are considered problems:

```css
a { color: pink;
}
```

The following patterns are _not_ considered problems:

```css
a { color: pink; }
```

```css
a {color: pink;
}
```

## Optional secondary options

### `ignore: ["at-rules"]`

Ignore the opening brace of at-rules.

For example, with `"always"`:

The following pattern is _not_ considered a problem:

```css
@media print {
  a { color: pink; }
}
```
