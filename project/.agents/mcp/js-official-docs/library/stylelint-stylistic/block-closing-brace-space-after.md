---
title: "block-closing-brace-space-after"
tool: "stylelint-stylistic"
version: "6.0"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/3cd01e1c32e87a7d92b99c3a35e869bc36c019bb/lib/rules/block-closing-brace-space-after/README.md"
commit: "3cd01e1c32e87a7d92b99c3a35e869bc36c019bb"
license: "MIT"
---

# block-closing-brace-space-after

Require a single space or disallow whitespace after the closing brace of blocks.

```css
a { color: pink; }
/**              ↑
 * The space after this brace */
```

This rule allows a trailing semicolon after the closing brace of a block. For example,

```css
:root {
  --toolbar-theme: {
    background-color: hsl(120, 70%, 95%);
  };
/* ↑
 * This semicolon */
}
```

The `fix` option can automatically fix most of the problems reported by this rule. Where `block-closing-brace-newline-after` asks something else of the same run, the fix may leave the run to that rule; it also leaves a run holding a stray semicolon. The warning stands in both.

## Options

`string`: `"always"|"never"|"always-single-line"|"never-single-line"|"always-multi-line"|"never-multi-line"`

### `"always"`

There _must always_ be a single space after the closing brace.

The following patterns are considered problems:

```css
a { color: pink; }b { color: red; }
```

```css
a { color: pink; }
b { color: red; }
```

The following patterns are _not_ considered problems:

```css
a { color: pink; } b { color: red; }
```

### `"never"`

There _must never_ be whitespace after the closing brace.

The following patterns are considered problems:

```css
a { color: pink; } b { color: red; }
```

```css
a { color: pink; }
b { color: red; }
```

The following patterns are _not_ considered problems:

```css
a { color: pink; }b { color: red; }
```

```css
a { color: pink;
}b { color: red; }
```

### `"always-single-line"`

There _must always_ be a single space after the closing brace in single-line blocks.

The following patterns are considered problems:

```css
a { color: pink; }b { color: red; }
```

The following patterns are _not_ considered problems:

```css
a { color: pink; } b { color: red; }
```

```css
a { color: pink;
}b { color: red; }
```

### `"never-single-line"`

There _must never_ be whitespace after the closing brace in single-line blocks.

The following patterns are considered problems:

```css
a { color: pink; } b { color: red; }
```

The following patterns are _not_ considered problems:

```css
a { color: pink; }b { color: red; }
```

```css
a { color: pink;
} b { color: red; }
```

### `"always-multi-line"`

There _must always_ be a single space after the closing brace in multi-line blocks.

The following patterns are considered problems:

```css
a { color: pink;
}b { color: red; }
```

The following patterns are _not_ considered problems:

```css
a { color: pink; }b { color: red; }
```

```css
a { color: pink;
} b { color: red; }
```

### `"never-multi-line"`

There _must never_ be whitespace after the closing brace in multi-line blocks.

The following patterns are considered problems:

```css
a { color: pink;
} b { color: red; }
```

The following patterns are _not_ considered problems:

```css
a { color: pink; } b { color: red; }
```

```css
a { color: pink;
}b { color: red; }
```
